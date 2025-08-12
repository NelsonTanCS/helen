import json
import xml.etree.ElementTree as ET
from datetime import datetime

# Input JSON file (replace with your actual file path)
JSON_FILE = r"c:\Users\Nelson\git\helen\message_1.json"
# Output XML file to append to
XML_FILE = r"c:\Users\Nelson\git\helen\text_with_helen.xml"
# Output file
OUTPUT_FILE = r"c:\Users\Nelson\git\helen\text_with_helen_merged.xml"

MY_NAME = "Nelson Tan"
HELEN_NAME = "helen maslen"

# Helper to convert ms timestamp to yyyymmdd HH:MM:SS

def format_date(ms):
    try:
        dt = datetime.fromtimestamp(int(ms) / 1000)
        return dt.strftime('%Y%m%d %H:%M:%S')
    except Exception:
        return str(ms)

def main():
    # Load JSON
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    messages = data['messages']

    # Parse existing XML
    tree = ET.parse(XML_FILE)
    root = tree.getroot()

    new_sms_elems = []
    for msg in messages:
        sender = msg.get('sender_name', '').strip().lower()
        content = msg.get('content', '')
        ts = msg.get('timestamp_ms')
        date_str = format_date(ts)
        # Determine type
        msg_type = 'sent' if sender == MY_NAME.lower() else 'received'
        # Check for image (if 'photos' or similar key exists)
        has_image = 'false'
        if 'photos' in msg or 'files' in msg:
            has_image = 'true'
        # Escape double quotes in body
        if content:
            content = content.replace('"', '&quot;')
        # Create new sms element
        sms_elem = ET.Element('sms', {
            'date': date_str,
            'contact_name': HELEN_NAME.title(),
            'type': msg_type,
            'body': content or '',
            'has_image': has_image
        })
        new_sms_elems.append(sms_elem)

    # Write merged XML with each <sms> on a new line
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('<?xml version="1.0" encoding="utf-8"?>\n<smses>\n')
        for elem in root:
            out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
        for elem in new_sms_elems:
            out.write(ET.tostring(elem, encoding='unicode').strip() + '\n')
        out.write('</smses>\n')
    print(f"Merged file written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
