import xml.etree.ElementTree as ET

INPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_combined.xml"
OUTPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_cleaned.xml"

# Fields to keep for sms and mms
SMS_KEEP = {"date", "body", "contact_name", "readable_date", "type"}
MMS_KEEP = {"date", "contact_name"}
PART_KEEP = {"ct", "text"}

def clean_sms(elem):
    # Save original type
    orig_type = elem.attrib.get('type', None)
    for key in list(elem.attrib.keys()):
        if key not in SMS_KEEP:
            del elem.attrib[key]
    # Set type to 'sent' or 'received'
    if orig_type == '2':
        elem.attrib['type'] = 'sent'
    elif orig_type == '1':
        elem.attrib['type'] = 'received'
    else:
        elem.attrib['type'] = 'unknown'
    return elem

def clean_mms(elem):
    # Remove group MMS (contact_name with comma) at the very start
    contact_name = elem.attrib.get('contact_name', '')
    if ',' in contact_name:
        return None

    # Determine sent/received from <addr type="137"> (sender)
    mms_type = 'unknown'
    for addrs in elem.findall('addrs'):
        for addr in addrs.findall('addr'):
            if addr.attrib.get('type') == '137':
                # If the address is your number, it's sent; otherwise, received
                # Replace 'YOUR_NUMBER' with your actual number (e.g., '+1234567890')
                if addr.attrib.get('address', '') == '+4252332828':
                    mms_type = 'sent'
                else:
                    mms_type = 'received'
                break
    elem.attrib['type'] = mms_type
    for key in list(elem.attrib.keys()):
        if key not in MMS_KEEP and key != 'type':
            del elem.attrib[key]
    # Only keep <part> children with ct and text attributes
    for parts in elem.findall('parts'):
        for part in list(parts):
            for key in list(part.attrib.keys()):
                if key not in PART_KEEP:
                    del part.attrib[key]
    # Remove all children except <parts> and <addrs>
    for child in list(elem):
        if child.tag not in ('parts', 'addrs'):
            elem.remove(child)
    return elem

def main():
    context = ET.iterparse(INPUT_FILE, events=("start", "end"))
    _, root = next(context)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for event, elem in context:
            if event == "end":
                if elem.tag == "sms":
                    out.write(ET.tostring(clean_sms(elem), encoding='unicode'))
                    elem.clear()
                elif elem.tag == "mms":
                    cleaned = clean_mms(elem)
                    if cleaned is not None:
                        out.write(ET.tostring(cleaned, encoding='unicode'))
                    elem.clear()
        out.write('\n</smses>\n')
    print(f"Cleaned file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
