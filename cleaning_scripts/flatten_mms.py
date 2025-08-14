import xml.etree.ElementTree as ET

INPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_final.xml"
OUTPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_final_flat.xml"

def flatten_mms(elem):
    # Remove <addrs> tag
    for addrs in elem.findall('addrs'):
        elem.remove(addrs)
    # Extract text/plain message(s)
    message_texts = []
    has_image = False
    for parts in elem.findall('parts'):
        for part in parts.findall('part'):
            if part.attrib.get('ct') == 'text/plain':
                msg = part.attrib.get('text', '')
                if msg:
                    # Escape double quotes for XML attribute
                    msg = msg.replace('"', '&quot;')
                    message_texts.append(msg)
            if part.attrib.get('ct', '').startswith('image/'):
                has_image = True
        elem.remove(parts)
    # Add message and image info to mms tag
    if message_texts:
        elem.attrib['body'] = ' '.join(message_texts)
    if has_image:
        elem.attrib['has_image'] = 'true'
    else:
        elem.attrib['has_image'] = 'false'
    # Return as a self-closing tag
    return elem

def main():
    context = ET.iterparse(INPUT_FILE, events=("start", "end"))
    _, root = next(context)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for event, elem in context:
            if event == "end":
                if elem.tag == "sms":
                    out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
                    elem.clear()
                elif elem.tag == "mms":
                    flat = flatten_mms(elem)
                    # Write as a single-line self-closing tag
                    attribs = ' '.join(f'{k}="{v}"' for k, v in flat.attrib.items())
                    out.write(f'<mms {attribs} />\n')
                    elem.clear()
        out.write('</smses>\n')
    print(f"Flat file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
