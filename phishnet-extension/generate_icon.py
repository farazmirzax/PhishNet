#!/usr/bin/env python3
"""
Simple script to generate a placeholder icon for the PhishNet extension.
Run this to create icon.png in the current directory.
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("❌ PIL not installed. Installing...")
    import subprocess
    subprocess.check_call([
        "pip", "install", "pillow"
    ])
    from PIL import Image, ImageDraw, ImageFont

# Create a 128x128 image with gradient purple background
size = 128
img = Image.new('RGB', (size, size), color=(102, 126, 234))
draw = ImageDraw.Draw(img, 'RGBA')

# Draw a shield shape (simple)
# Shield outline
shield_x, shield_y = 32, 20
shield_w, shield_h = 64, 80

# Shield body (light background for contrast)
draw.rectangle(
    [(shield_x, shield_y), (shield_x + shield_w, shield_y + shield_h)],
    fill=(255, 255, 255, 200),
    outline=(255, 255, 255, 255),
    width=2
)

# Shield point (bottom)
draw.polygon(
    [(shield_x, shield_y + shield_h), 
     (shield_x + shield_w // 2, shield_y + shield_h + 16),
     (shield_x + shield_w, shield_y + shield_h)],
    fill=(255, 255, 255, 200),
    outline=(255, 255, 255, 255)
)

# Draw "P" for PhishNet
try:
    font = ImageFont.truetype("arial.ttf", 48)
except:
    font = ImageFont.load_default()

text = "P"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
text_x = (size - text_width) // 2
text_y = (size - text_height) // 2 - 10

draw.text((text_x, text_y), text, fill=(102, 126, 234, 255), font=font)

# Save
img.save('icon.png')
print("✅ icon.png created successfully!")
