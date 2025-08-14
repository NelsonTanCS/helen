import xml.etree.ElementTree as ET

INPUT_FILE = r"c:\Users\Nelson\git\helen\text_with_helen_merged_sorted.xml"
OUTPUT_FILE = r"c:\Users\Nelson\git\helen\text_with_helen_merged_sorted_clean.xml"

KEEP_FIELDS = {"date", "type", "body", "has_image"}

def main():
    tree = ET.parse(INPUT_FILE)
    root = tree.getroot()
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for elem in root:
            for key in list(elem.attrib.keys()):
                if key not in KEEP_FIELDS:
                    del elem.attrib[key]
            out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
        out.write('</smses>\n')
    print(f"Cleaned file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
