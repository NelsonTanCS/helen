import xml.etree.ElementTree as ET

INPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_cleaned.xml"
OUTPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_final.xml"

# Define the rules for sent/received based on <addr> type="137" and address
RECEIVED_ADDR = "+14255184879"
RECEIVED_TYPE = "137"
SENT_ADDR = "+14252332828"
SENT_TYPE = "137"

def update_mms_type(elem):
    # Look for <addr> with type and address
    found = False
    for addrs in elem.findall('addrs'):
        for addr in addrs.findall('addr'):
            if addr.attrib.get('type') == RECEIVED_TYPE and addr.attrib.get('address') == RECEIVED_ADDR:
                elem.attrib['type'] = 'received'
                found = True
                break
            elif addr.attrib.get('type') == SENT_TYPE and addr.attrib.get('address') == SENT_ADDR:
                elem.attrib['type'] = 'sent'
                found = True
                break
        if found:
            break
    return elem

def main():
    context = ET.iterparse(INPUT_FILE, events=("start", "end"))
    _, root = next(context)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for event, elem in context:
            if event == "end":
                if elem.tag == "sms":
                    out.write(ET.tostring(elem, encoding='unicode'))
                    elem.clear()
                elif elem.tag == "mms":
                    out.write(ET.tostring(update_mms_type(elem), encoding='unicode'))
                    elem.clear()
        out.write('\n</smses>\n')
    print(f"Final file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
