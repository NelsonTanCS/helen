import xml.etree.ElementTree as ET
import json

# Input and output file paths
input_file = "text_with_helen_merged_sorted_clean.xml"
output_file = "text_with_helen_merged_sorted_clean.json"

# Parse the XML file
tree = ET.parse(input_file)
root = tree.getroot()

messages = []

for msg in root:
    # Only keep the minimal fields
    date = msg.attrib.get("date", "")
    type_ = msg.attrib.get("type", "")  # This should be 'sent' or 'received'
    body = msg.attrib.get("body", "")
    has_image = msg.attrib.get("has_image", "false")
    # Convert has_image to boolean
    has_image = has_image.lower() == "true"
    messages.append({
        "date": date,
        "type": type_,
        "body": body,
        "has_image": has_image
    })

# Write to JSON file
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(messages, f, ensure_ascii=False, indent=2)
