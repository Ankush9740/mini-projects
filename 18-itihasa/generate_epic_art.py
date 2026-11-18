import os
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def get_gradient_color(c1, c2, factor):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * factor) for i in range(len(c1)))

def draw_ornate_border(draw, w, h, gold_color=(230, 199, 122), inner_color=(87, 31, 39)):
    # Outer frame
    draw.rectangle([0, 0, w-1, h-1], outline=gold_color, width=4)
    draw.rectangle([12, 12, w-13, h-13], outline=inner_color, width=2)
    draw.rectangle([20, 20, w-21, h-21], outline=gold_color, width=3)
    
    # Corner ornaments
    corner_size = 40
    for cx, cy in [(20, 20), (w-20, 20), (20, h-20), (w-20, h-20)]:
        draw.arc([cx-corner_size, cy-corner_size, cx+corner_size, cy+corner_size], 0, 360, fill=gold_color, width=2)
        draw.ellipse([cx-4, cy-4, cx+4, cy+4], fill=gold_color)

def draw_divine_halo(draw, cx, cy, radius, halo_color=(230, 199, 122), rays=24):
    for r in range(radius, radius - 30, -3):
        alpha_factor = (radius - r) / 30.0
        c = tuple(int(halo_color[i] * 0.8 + 255 * 0.2 * alpha_factor) for i in range(3))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c, width=2)
    # Radiating golden rays
    for i in range(rays):
        angle = i * (2 * math.pi / rays)
        x1 = cx + (radius - 10) * math.cos(angle)
        y1 = cy + (radius - 10) * math.sin(angle)
        x2 = cx + (radius + 25) * math.cos(angle)
        y2 = cy + (radius + 25) * math.sin(angle)
        draw.line([x1, y1, x2, y2], fill=halo_color, width=2)

def draw_temple_arch(draw, w, h, top_y=60, color=(201, 154, 69)):
    cx = w // 2
    # Indian trefoil or cusped arch
    arch_pts = []
    # Left base
    arch_pts.append((40, h - 80))
    arch_pts.append((40, top_y + 140))
    # Left cusp
    for a in range(180, 270, 5):
        rad = math.radians(a)
        arch_pts.append((100 + 60 * math.cos(rad), top_y + 140 + 60 * math.sin(rad)))
    # Center cusp
    for a in range(210, 330, 5):
        rad = math.radians(a)
        arch_pts.append((cx + 80 * math.cos(rad), top_y + 60 + 60 * math.sin(rad)))
    # Right cusp
    for a in range(270, 360, 5):
        rad = math.radians(a)
        arch_pts.append((w - 100 + 60 * math.cos(rad), top_y + 140 + 60 * math.sin(rad)))
    arch_pts.append((w - 40, top_y + 140))
    arch_pts.append((w - 40, h - 80))
    
    draw.line(arch_pts, fill=color, width=3)

def generate_art_card(filepath, title, subtitle, epic_type, symbol_type, bg_gradient, accent_color=(230, 199, 122), width=800, height=1000):
    img = Image.new('RGB', (width, height), bg_gradient[0])
    draw = ImageDraw.Draw(img)
    
    # 1. Background vertical gradient
    for y in range(height):
        factor = y / height
        c = get_gradient_color(bg_gradient[0], bg_gradient[1], factor)
        draw.line([(0, y), (width, y)], fill=c)
        
    # 2. Celestial / Forest / Battlefield Ambient Texture
    random.seed(abs(hash(title)))
    for _ in range(60):
        sx = random.randint(30, width - 30)
        sy = random.randint(30, height - 30)
        sr = random.randint(1, 4)
        draw.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=(243, 231, 208, 120))
        
    # 3. Ornate Temple Arch & Pillars
    draw_temple_arch(draw, width, height, top_y=70, color=accent_color)
    draw_ornate_border(draw, width, height, gold_color=accent_color)
    
    # Pillars
    draw.rectangle([40, 180, 65, height - 90], fill=(56, 42, 37), outline=accent_color, width=2)
    draw.rectangle([width - 65, 180, width - 40, height - 90], fill=(56, 42, 37), outline=accent_color, width=2)
    
    # 4. Central Divine Aura & Sacred Iconography
    cx = width // 2
    cy = int(height * 0.44)
    
    # Divine Halo
    draw_divine_halo(draw, cx, cy - 20, radius=160, halo_color=accent_color, rays=28)
    
    # Sacred Symbol Renderings based on symbol_type
    if symbol_type == 'bow':
        # Divine Kodanda / Gandiva Bow
        draw.arc([cx - 140, cy - 140, cx + 80, cy + 180], 90, 270, fill=accent_color, width=8)
        draw.line([cx - 30, cy - 140, cx - 30, cy + 180], fill=(243, 231, 208), width=3)
        # Divine Arrow
        draw.line([cx - 180, cy + 20, cx + 180, cy + 20], fill=accent_color, width=6)
        draw.polygon([(cx + 180, cy + 20), (cx + 150, cy + 5), (cx + 155, cy + 20), (cx + 150, cy + 35)], fill=(230, 199, 122))
        draw.polygon([(cx - 180, cy + 20), (cx - 160, cy + 10), (cx - 165, cy + 20), (cx - 160, cy + 30)], fill=(142, 48, 55))
    elif symbol_type == 'chakra':
        # Sudarshana Chakra
        draw.ellipse([cx - 120, cy - 120, cx + 120, cy + 120], outline=accent_color, width=6)
        draw.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], outline=(142, 48, 55), width=4)
        draw.ellipse([cx - 35, cy - 35, cx + 35, cy + 35], fill=accent_color, outline=(87, 31, 39), width=3)
        for i in range(16):
            ang = i * (2 * math.pi / 16)
            x1 = cx + 35 * math.cos(ang)
            y1 = cy + 35 * math.sin(ang)
            x2 = cx + 100 * math.cos(ang)
            y2 = cy + 100 * math.sin(ang)
            draw.line([x1, y1, x2, y2], fill=accent_color, width=3)
            # Flame tips
            fx = cx + 128 * math.cos(ang)
            fy = cy + 128 * math.sin(ang)
            draw.polygon([(x2, y2), (fx, fy), (cx + 105 * math.cos(ang+0.1), cy + 105 * math.sin(ang+0.1))], fill=accent_color)
    elif symbol_type == 'lotus':
        # Sacred Golden Lotus
        for i in range(12):
            ang = i * (2 * math.pi / 12)
            px = cx + 80 * math.cos(ang)
            py = cy + 30 + 50 * math.sin(ang)
            draw.ellipse([px - 30, py - 40, px + 30, py + 40], fill=(142, 48, 55, 180), outline=accent_color, width=2)
        draw.ellipse([cx - 50, cy - 10, cx + 50, cy + 70], fill=(201, 154, 69), outline=accent_color, width=4)
        draw.ellipse([cx - 25, cy + 10, cx + 25, cy + 50], fill=(243, 231, 208))
    elif symbol_type == 'chariot':
        # Celestial Chariot Wheel & Flag
        draw.ellipse([cx - 100, cy - 70, cx + 100, cy + 130], outline=accent_color, width=8)
        draw.ellipse([cx - 30, cy + 30, cx + 30, cy + 30], fill=accent_color)
        for i in range(12):
            ang = i * (2 * math.pi / 12)
            draw.line([cx + 30*math.cos(ang), cy + 30 + 30*math.sin(ang), cx + 96*math.cos(ang), cy + 30 + 96*math.sin(ang)], fill=accent_color, width=4)
        # Dhwaja (flag)
        draw.line([cx + 40, cy - 170, cx + 40, cy + 30], fill=accent_color, width=5)
        draw.polygon([(cx + 40, cy - 170), (cx + 150, cy - 130), (cx + 40, cy - 90)], fill=(142, 48, 55), outline=accent_color)
    elif symbol_type == 'flute':
        # Murali Flute & Peacock Feather
        # Feather
        draw.ellipse([cx + 20, cy - 110, cx + 90, cy - 40], fill=(23, 43, 67), outline=(104, 139, 167), width=3)
        draw.ellipse([cx + 35, cy - 95, cx + 75, cy - 55], fill=(52, 78, 61), outline=accent_color, width=2)
        draw.ellipse([cx + 45, cy - 85, cx + 65, cy - 65], fill=accent_color)
        draw.line([cx + 55, cy - 40, cx + 10, cy + 60], fill=accent_color, width=3)
        # Flute
        draw.line([cx - 150, cy + 60, cx + 140, cy - 30], fill=accent_color, width=12)
        for hole in range(6):
            hx = cx - 100 + hole * 35
            hy = cy + 45 - hole * 11
            draw.ellipse([hx - 4, hy - 4, hx + 4, hy + 4], fill=(56, 42, 37))
    elif symbol_type == 'mace':
        # Gada of Bhima / Hanuman
        draw.ellipse([cx - 60, cy - 130, cx + 60, cy - 30], fill=(201, 154, 69), outline=accent_color, width=5)
        draw.polygon([(cx, cy - 150), (cx - 20, cy - 130), (cx + 20, cy - 130)], fill=accent_color)
        draw.line([cx, cy - 30, cx, cy + 160], fill=accent_color, width=12)
        draw.ellipse([cx - 20, cy + 150, cx + 20, cy + 175], fill=(87, 31, 39), outline=accent_color, width=3)
    elif symbol_type == 'sword':
        # Royal Khadga & Shield
        draw.ellipse([cx - 90, cy - 60, cx + 90, cy + 120], fill=(56, 42, 37), outline=accent_color, width=5)
        draw.ellipse([cx - 30, cy + 30, cx + 30, cy + 30], fill=accent_color)
        # Sword
        draw.line([cx - 120, cy - 140, cx + 120, cy + 100], fill=(243, 231, 208), width=8)
        draw.line([cx + 90, cy + 70, cx + 70, cy + 110], fill=accent_color, width=10)
    elif symbol_type == 'mountain':
        # Dronagiri Sanjeevani Mountain carried by Hanuman
        draw.polygon([(cx, cy - 120), (cx - 130, cy + 60), (cx + 130, cy + 60)], fill=(52, 78, 61), outline=accent_color, width=4)
        draw.polygon([(cx + 40, cy - 80), (cx - 50, cy + 60), (cx + 110, cy + 60)], fill=(87, 31, 39, 160))
        # Glowing Sanjeevani herb
        draw.ellipse([cx - 15, cy - 60, cx + 15, cy - 30], fill=(230, 199, 122), outline=(243, 231, 208), width=2)
    elif symbol_type == 'temple':
        # Sacred Temple Vimana / Shikhara
        draw.polygon([(cx, cy - 150), (cx - 30, cy - 110), (cx + 30, cy - 110)], fill=accent_color)
        draw.polygon([(cx, cy - 170), (cx - 6, cy - 150), (cx + 6, cy - 150)], fill=(243, 231, 208))
        draw.rectangle([cx - 60, cy - 110, cx + 60, cy - 50], fill=(142, 48, 55), outline=accent_color, width=3)
        draw.rectangle([cx - 90, cy - 50, cx + 90, cy + 40], fill=(56, 42, 37), outline=accent_color, width=4)
        draw.rectangle([cx - 120, cy + 40, cx + 120, cy + 130], fill=(87, 31, 39), outline=accent_color, width=4)
        # Sacred Gateway (Gopuram arch)
        draw.arc([cx - 40, cy + 60, cx + 40, cy + 140], 180, 360, fill=accent_color, width=4)
        draw.line([cx - 40, cy + 100, cx - 40, cy + 130], fill=accent_color, width=4)
        draw.line([cx + 40, cy + 100, cx + 40, cy + 130], fill=accent_color, width=4)
    else:
        # Default Sacred Kalash / Om
        draw.ellipse([cx - 70, cy - 20, cx + 70, cy + 100], fill=(201, 154, 69), outline=accent_color, width=5)
        draw.polygon([(cx, cy - 120), (cx - 40, cy - 30), (cx + 40, cy - 30)], fill=(52, 78, 61), outline=accent_color, width=3)
        draw.circle = draw.ellipse([cx - 12, cy - 135, cx + 12, cy - 110], fill=(230, 199, 122))

    # 5. Base Title Plaque (Ancient Manuscript Styled Cartouche)
    plaque_y = height - 160
    draw.rectangle([60, plaque_y, width - 60, height - 70], fill=(23, 15, 12), outline=accent_color, width=2)
    draw.rectangle([66, plaque_y + 4, width - 66, height - 74], outline=(142, 48, 55), width=1)
    
    # Subtitle / Epic ribbon
    draw.rectangle([cx - 120, plaque_y - 14, cx + 120, plaque_y + 12], fill=(142, 48, 55), outline=accent_color, width=1)
    
    # Typography using default or standard font
    try:
        font_title = ImageFont.truetype("georgia.ttf", 36)
        font_sub = ImageFont.truetype("arial.ttf", 16)
        font_epic = ImageFont.truetype("georgia.ttf", 14)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_epic = ImageFont.load_default()

    # Draw Text
    draw.text((cx, plaque_y - 2), epic_type.upper(), fill=accent_color, anchor="mm", font=font_epic)
    draw.text((cx, plaque_y + 35), title.upper(), fill=(243, 231, 208), anchor="mm", font=font_title)
    draw.text((cx, plaque_y + 65), subtitle, fill=(230, 199, 122), anchor="mm", font=font_sub)

    # Save image
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    img.save(filepath, quality=92)

def generate_landscape_banner(filepath, title, subtitle, epic_type, bg_gradient, width=1200, height=700, theme="forest"):
    img = Image.new('RGB', (width, height), bg_gradient[0])
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    for y in range(height):
        factor = y / height
        c = get_gradient_color(bg_gradient[0], bg_gradient[1], factor)
        draw.line([(0, y), (width, y)], fill=c)
        
    cx = width // 2
    cy = height // 2
    
    # Celestial sun / moon
    if theme == "forest" or theme == "dawn":
        # Golden morning sun
        draw.ellipse([cx - 140, 60, cx + 140, 340], fill=(230, 199, 122, 180))
        draw.ellipse([cx - 100, 100, cx + 100, 300], fill=(243, 231, 208))
    elif theme == "battle":
        # Crimson / Solar eclipse aura
        draw.ellipse([cx - 160, 40, cx + 160, 360], fill=(142, 48, 55, 180))
        draw.ellipse([cx - 110, 90, cx + 110, 310], fill=(201, 154, 69))
    elif theme == "night" or theme == "ocean":
        # Lapis celestial moon
        draw.ellipse([cx - 120, 60, cx + 120, 300], fill=(104, 139, 167, 180))
        draw.ellipse([cx - 80, 100, cx + 80, 260], fill=(243, 231, 208))
        
    # Mountain / Tree / Chariot Silhouettes at bottom
    if theme == "forest":
        # Dandakaranya Sacred Forest
        draw.polygon([(0, height), (0, 380), (220, 280), (450, 420), (750, 260), (1000, 390), (width, 310), (width, height)], fill=(35, 52, 40))
        draw.polygon([(0, height), (150, 440), (380, 360), (620, 480), (880, 380), (1100, 460), (width, 420), (width, height)], fill=(20, 35, 25))
    elif theme == "battle":
        # Kurukshetra battle landscape with flags
        draw.polygon([(0, height), (0, 420), (300, 360), (550, 440), (850, 350), (width, 410), (width, height)], fill=(40, 20, 24))
        # Silhouettes of battle flags
        for fx in [200, 380, 520, 720, 950]:
            draw.line([fx, 260, fx, 420], fill=(230, 199, 122), width=3)
            draw.polygon([(fx, 260), (fx + 60, 280), (fx, 300)], fill=(142, 48, 55))
    elif theme == "ocean":
        # Rama Setu ocean waves
        draw.rectangle([0, 450, width, height], fill=(18, 38, 58))
        for w in range(0, width, 60):
            draw.arc([w, 430, w + 120, 490], 0, 180, fill=(104, 139, 167), width=3)
        # Stone bridge
        draw.polygon([(100, height), (350, 480), (850, 480), (1100, height)], fill=(75, 62, 50), outline=(201, 154, 69), width=2)
    else:
        # Ancient City / Palace
        draw.rectangle([0, 460, width, height], fill=(42, 28, 24))
        # Palaces and temples shikhara
        draw.polygon([(300, 460), (360, 240), (420, 460)], fill=(87, 31, 39), outline=(230, 199, 122), width=2)
        draw.polygon([(780, 460), (840, 220), (900, 460)], fill=(87, 31, 39), outline=(230, 199, 122), width=2)
        draw.rectangle([450, 320, 750, 460], fill=(56, 42, 37), outline=(230, 199, 122), width=3)
        
    # Ornate Border
    draw_ornate_border(draw, width, height, gold_color=(230, 199, 122), inner_color=(87, 31, 39))
    
    # Title Plaque
    py = height - 140
    draw.rectangle([cx - 360, py, cx + 360, height - 40], fill=(23, 15, 12, 230), outline=(230, 199, 122), width=3)
    draw.rectangle([cx - 352, py + 6, cx + 352, height - 46], outline=(142, 48, 55), width=1)
    
    try:
        font_title = ImageFont.truetype("georgia.ttf", 34)
        font_sub = ImageFont.truetype("arial.ttf", 16)
        font_epic = ImageFont.truetype("georgia.ttf", 14)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_epic = ImageFont.load_default()
        
    draw.text((cx, py + 18), epic_type.upper(), fill=(201, 154, 69), anchor="mm", font=font_epic)
    draw.text((cx, py + 52), title.upper(), fill=(243, 231, 208), anchor="mm", font=font_title)
    draw.text((cx, py + 80), subtitle, fill=(230, 199, 122), anchor="mm", font=font_sub)

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    img.save(filepath, quality=92)

print("Image generator module ready.")
