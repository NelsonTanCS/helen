import re

INPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259.xml"
OUTPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast.xml"

year_pattern = re.compile(r'readable_date="[A-Za-z]+ \d{1,2}, (\d{4})')

with open(INPUT_FILE, 'r', encoding='utf-8') as infile, open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
    for line in infile:
        if '<sms ' in line:
            match = year_pattern.search(line)
            if match and int(match.group(1)) < 2024:
                continue  # Skip this message
        outfile.write(line)

print(f"Done. Cleaned file written to {OUTPUT_FILE}")
