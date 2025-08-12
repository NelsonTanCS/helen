import xml.etree.ElementTree as ET
from datetime import datetime

INPUT_FILE = r"c:\Users\Nelson\git\helen\text_with_helen_merged.xml"
OUTPUT_FILE = r"c:\Users\Nelson\git\helen\text_with_helen_merged_sorted.xml"

def parse_date(date_str):
    # Expects format yyyymmdd HH:MM:SS
    try:
        return datetime.strptime(date_str, "%Y%m%d %H:%M:%S")
    except Exception:
        return None

def main():
    tree = ET.parse(INPUT_FILE)
    root = tree.getroot()
    messages = []
    for elem in root:
        date_val = elem.attrib.get('date')
        dt = parse_date(date_val) if date_val else None
        if dt:
            messages.append((dt, elem))
        else:
            messages.append((datetime.min, elem))  # fallback for missing/invalid date
    # Sort by datetime
    messages.sort(key=lambda x: x[0])
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for _, elem in messages:
            out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
        out.write('</smses>\n')
    print(f"Sorted file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
