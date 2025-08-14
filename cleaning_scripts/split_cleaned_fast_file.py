INPUT_FILE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast.xml"
OUTPUT_TEMPLATE = r"c:\Users\Nelson\Downloads\sms-20250810215259_cleaned_fast_part{}.xml"

part = 1
line_count = 0
max_lines = 0

# First, count total lines
with open(INPUT_FILE, 'r', encoding='utf-8') as infile:
    for _ in infile:
        max_lines += 1

lines_per_file = max_lines // 4 + 1

with open(INPUT_FILE, 'r', encoding='utf-8') as infile:
    outfile = open(OUTPUT_TEMPLATE.format(part), 'w', encoding='utf-8')
    for i, line in enumerate(infile, 1):
        outfile.write(line)
        if i % lines_per_file == 0 and part < 4:
            outfile.close()
            part += 1
            outfile = open(OUTPUT_TEMPLATE.format(part), 'w', encoding='utf-8')
    outfile.close()

print("Done. Split into 4 parts.")
