import xml.etree.ElementTree as ET

# Input and output file paths
input_file = "c:/Users/Nelson/Downloads/calls-20250810215259.xml"
output_file = "c:/Users/Nelson/Downloads/calls_with_helen.xml"

# Define the contact name to filter by
helen_name = "Helen Maslen"

# Parse the XML file
tree = ET.parse(input_file)
root = tree.getroot()

# Create a new root for filtered calls
filtered_root = ET.Element(root.tag)

for call in root:
    # Check if the call is between you and Helen Maslen
    # This assumes the contact name is in an attribute like 'contact_name' or similar
    # Adjust the attribute name as needed based on the actual XML structure
    contact = call.attrib.get("contact_name") or call.attrib.get("name") or call.attrib.get("number")
    if contact and helen_name.lower() in contact.lower():
        filtered_root.append(call)

# Write the filtered calls to a new XML file
filtered_tree = ET.ElementTree(filtered_root)
filtered_tree.write(output_file, encoding="utf-8", xml_declaration=True)
