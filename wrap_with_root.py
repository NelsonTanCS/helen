import sys

if len(sys.argv) != 2:
    print("Usage: python wrap_with_root.py <input_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = input_file.replace('.xml', '_wrapped.xml')

with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
    outfile.write('<smses>\n')
    for line in infile:
        outfile.write(line)
    outfile.write('\n</smses>\n')

print(f"Wrapped file written to {output_file}")
