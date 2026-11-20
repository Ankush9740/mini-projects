import os
import urllib.request
import urllib.parse
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import io

os.makedirs('assets/images/hero', exist_ok=True)
os.makedirs('assets/images/characters', exist_ok=True)
os.makedirs('assets/images/kandas', exist_ok=True)
os.makedirs('assets/images/events', exist_ok=True)
os.makedirs('assets/images/places', exist_ok=True)

HEADERS = {'User-Agent': 'ItihasaEducationalProject/1.0 (https://itihasa.org; research@itihasa.org)'}

def download_image(url):
    try:
        clean_url = url.split('?')[0]
        req = urllib.request.Request(clean_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as resp:
            return resp.read()
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return None

def process_and_save(image_bytes, target_path, width=800, height=1000, quality=85):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Center-crop to aspect ratio
        img_ratio = img.width / img.height
        target_ratio = width / height
        
        if img_ratio > target_ratio:
            # Image is wider: crop sides
            new_width = int(img.height * target_ratio)
            left = (img.width - new_width) // 2
            img = img.crop((left, 0, left + new_width, img.height))
        else:
            # Image is taller: crop top/bottom
            new_height = int(img.width / target_ratio)
            top = int((img.height - new_height) * 0.3) # bias slightly towards top for portraits
            top = max(0, min(top, img.height - new_height))
            img = img.crop((0, top, img.width, top + new_height))
            
        img = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Save both as WebP and JPG for maximum compatibility
        webp_path = target_path.replace('.jpg', '.webp')
        img.save(webp_path, 'WEBP', quality=quality)
        img.save(target_path, 'JPEG', quality=quality)
        print(f"Saved: {target_path} and {webp_path}")
        return True
    except Exception as e:
        print(f"Error processing {target_path}: {e}")
        return False

def make_parchment_fallback(target_path, title, subtitle, sanskrit, width=800, height=1000):
    # Refined Minimal Indian Manuscript Card
    img = Image.new('RGB', (width, height), (247, 243, 234)) # warm aged ivory
    draw = ImageDraw.Draw(img)
    
    # Subtle deckle-edge border
    draw.rectangle([12, 12, width-13, height-13], outline=(201, 154, 69), width=1)
    draw.rectangle([20, 20, width-21, height-21], outline=(142, 48, 55), width=2)
    draw.rectangle([24, 24, width-25, height-25], outline=(230, 199, 122), width=1)
    
    # Corner flourishes
    c_color = (142, 48, 55)
    for cx, cy in [(24, 24), (width-24, 24), (24, height-24), (width-24, height-24)]:
        draw.arc([cx-15, cy-15, cx+15, cy+15], 0, 360, fill=(201, 154, 69), width=2)
        draw.ellipse([cx-3, cy-3, cx+3, cy+3], fill=c_color)

    # Center medallion
    cx = width // 2
    cy = int(height * 0.42)
    draw.ellipse([cx-120, cy-120, cx+120, cy+120], outline=(201, 154, 69), width=2)
    draw.ellipse([cx-112, cy-112, cx+112, cy+112], outline=(142, 48, 55), width=1)

    try:
        f_sanskrit = ImageFont.truetype("mangal.ttf", 42)
        f_title = ImageFont.truetype("georgia.ttf", 32)
        f_sub = ImageFont.truetype("georgia.ttf", 16)
    except:
        f_sanskrit = ImageFont.load_default()
        f_title = ImageFont.load_default()
        f_sub = ImageFont.load_default()

    draw.text((cx, cy - 10), sanskrit, fill=(142, 48, 55), anchor="mm", font=f_sanskrit)
    draw.text((cx, cy + 45), "॥ श्री ॥", fill=(201, 154, 69), anchor="mm", font=f_sanskrit)

    # Title Banner
    py = height - 160
    draw.rectangle([40, py, width-40, height-60], fill=(255, 253, 248), outline=(201, 154, 69), width=1)
    draw.line([60, py + 48, width-60, py + 48], fill=(142, 48, 55), width=1)
    draw.text((cx, py + 26), title.upper(), fill=(44, 34, 30), anchor="mm", font=f_title)
    draw.text((cx, py + 72), subtitle, fill=(142, 48, 55), anchor="mm", font=f_sub)

    webp_path = target_path.replace('.jpg', '.webp')
    img.save(webp_path, 'WEBP', quality=85)
    img.save(target_path, 'JPEG', quality=85)
    print(f"Fallback created: {target_path} and {webp_path}")

print("Art processing module initialized.")
