import gc
import sys
import xml.etree.ElementTree as ET



INPUT_FILES = [
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_part1_wrapped.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_part2_wrapped.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_part3_wrapped.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_part4_wrapped.xml",
]
OUTPUT_TEMPLATE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_part{}.xml"

def get_year_from_readable_date(date_str):
    # Expects format like 'Apr 8, 2014 4:58:54 PM'
    try:
        return int(date_str.split(', ')[1].split()[0])
    except Exception:
        return None

def should_keep_message(elem):
    return 'Helen Maslen' in elem.attrib.get('contact_name', '')

def should_keep_mms(elem):
    contact_names = elem.attrib.get('contact_name', '')
    return 'Helen Maslen' in contact_names

def main():
    if len(sys.argv) != 2 or not sys.argv[1].isdigit() or not (1 <= int(sys.argv[1]) <= 4):
        print("Usage: python remove_old_sms.py <part_number 1-4>")
        sys.exit(1)
    idx = int(sys.argv[1])
    input_file = INPUT_FILES[idx - 1]
    output_file = OUTPUT_TEMPLATE.format(idx)
    print(f"Processing {input_file} ...")

    with open(output_file, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        context = ET.iterparse(input_file, events=("end",))
        line_count = 0
        for event, elem in context:
            write_elem = False
            if elem.tag == "sms":
                if should_keep_message(elem):
                    out.write(ET.tostring(elem, encoding='unicode'))
                write_elem = True
            elif elem.tag == "mms":
                if should_keep_mms(elem):
                    out.write(ET.tostring(elem, encoding='unicode'))
                write_elem = True
            line_count += 1
            if line_count % 10000 == 0:
                print(f"Processed {line_count} elements in part {idx}...")
            if write_elem:
                elem.clear()
            if line_count % 10000 == 0:
                gc.collect()
        out.write('\n</smses>')
    print(f"Done. Cleaned file written to {output_file}")

if __name__ == "__main__":
    main()