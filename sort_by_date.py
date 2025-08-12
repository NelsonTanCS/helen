import xml.etree.ElementTree as ET
from datetime import datetime

INPUT_FILE = r"text_with_helen_merged.xml"
OUTPUT_FILE = r"text_with_helen_merged_sorted.xml"

def format_date(ms):
    # ms is a string representing milliseconds since epoch
    try:
        dt = datetime.fromtimestamp(int(ms) / 1000)
        return dt.strftime('%Y%m%d %H:%M:%S')
    except Exception:
        return ms

def main():
    tree = ET.parse(INPUT_FILE)
    root = tree.getroot()
    messages = []
    for elem in root:
        date_val = elem.attrib.get('date')
        if date_val:
            messages.append((int(date_val), elem))
    # Sort by date
    messages.sort(key=lambda x: x[0])
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for _, elem in messages:
            # Format date
            orig_date = elem.attrib.get('date')
            if orig_date:
                elem.attrib['date'] = format_date(orig_date)
            # Escape double quotes in body attribute
            if 'body' in elem.attrib:
                elem.attrib['body'] = elem.attrib['body'].replace('"', '&quot;')
            out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
        out.write('</smses>\n')
    print(f"Sorted file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
