import sys

# List your 4 part files here
PART_FILES = [
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_part1.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_part2.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_part3.xml",
    r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_part4.xml",
]
OUTPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_helen_combined.xml"

def main():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        outfile.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for part in PART_FILES:
            with open(part, 'r', encoding='utf-8') as infile:
                for line in infile:
                    # Skip XML declaration and root tags
                    if line.strip().startswith('<?xml') or line.strip().startswith('<smses') or line.strip().startswith('</smses'):
                        continue
                    outfile.write(line)
        outfile.write('\n</smses>\n')
    print(f"Combined file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
