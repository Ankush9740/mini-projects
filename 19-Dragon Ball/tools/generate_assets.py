"""
Generate authentic 16-bit SNES/GBA-quality pixel-art spritesheets,
multi-layer parallax Rocky Wasteland & stage backgrounds, effects,
and retro WAV audio files for DRAGON BALL: SAIYAN LEGACY.
"""
import os
import math
import wave
import struct
import random
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")

for sub in ["sprites", "backgrounds", "effects", "audio"]:
    os.makedirs(os.path.join(ASSETS, sub), exist_ok=True)

CLEAR = (0, 0, 0, 0)
OUTLINE = (22, 16, 30, 255)  # Deep indigo-charcoal 16-bit ink outline

# ---------------------------------------------------------------------------
# 16-BIT SHADED PALETTES (Highlights, Midtones, Deep Shadows)
# ---------------------------------------------------------------------------
PAL_GOKU_BASE = {
    ".": CLEAR,
    "K": OUTLINE,
    "H": (26, 24, 42, 255),      # Hair base
    "h": (56, 58, 92, 255),      # Hair sheen
    "d": (14, 12, 24, 255),      # Hair deep shadow
    "S": (244, 188, 140, 255),   # Skin mid
    "L": (255, 218, 178, 255),   # Skin highlight
    "s": (196, 134, 92, 255),    # Skin shadow
    "W": (248, 248, 255, 255),   # Eye white
    "E": (20, 22, 34, 255),      # Eye pupil
    "O": (236, 98, 20, 255),     # Gi orange mid
    "G": (255, 148, 48, 255),    # Gi orange highlight
    "o": (176, 56, 12, 255),     # Gi orange shadow
    "B": (34, 78, 188, 255),     # Blue cloth mid
    "C": (64, 122, 232, 255),    # Blue cloth highlight
    "b": (18, 44, 120, 255),     # Blue cloth shadow
    "R": (212, 42, 48, 255),     # Boot red trim
    "Y": (248, 212, 64, 255),    # Gold accent / energy
    "M": (255, 248, 210, 255),   # Motion smear / bright white-gold
}

PAL_GOKU_SSJ = {
    **PAL_GOKU_BASE,
    "H": (246, 206, 40, 255),    # Golden hair mid
    "h": (255, 248, 156, 255),   # Bright gold sheen
    "d": (196, 134, 16, 255),    # Gold shadow
    "E": (36, 214, 198, 255),    # Teal SSJ eyes
    "S": (252, 202, 152, 255),   # Golden-lit skin
    "L": (255, 232, 196, 255),
    "O": (248, 122, 28, 255),    # Brighter SSJ gi
    "G": (255, 184, 78, 255),
    "B": (46, 96, 216, 255),
}

PAL_SCOUT = {
    ".": CLEAR,
    "K": OUTLINE,
    "W": (232, 234, 246, 255),   # Armor white mid
    "L": (252, 252, 255, 255),   # Armor highlight
    "w": (162, 168, 194, 255),   # Armor shadow
    "P": (108, 54, 152, 255),    # Purple undersuit mid
    "p": (66, 30, 98, 255),      # Purple shadow
    "V": (146, 86, 192, 255),    # Purple highlight
    "S": (142, 186, 224, 255),   # Alien blue skin
    "s": (94, 134, 174, 255),
    "T": (182, 218, 246, 255),   # Skin highlight
    "G": (82, 240, 114, 255),    # Green scouter
    "g": (36, 154, 68, 255),
    "R": (224, 58, 66, 255),     # Accent
    "E": (248, 248, 255, 255),
    "Y": (236, 188, 60, 255),
}

PAL_GREMLIN = {
    ".": CLEAR,
    "K": OUTLINE,
    "G": (88, 178, 64, 255),     # Green body mid
    "L": (146, 226, 92, 255),    # Green highlight
    "g": (48, 116, 38, 255),     # Green shadow
    "B": (142, 100, 62, 255),    # Cranium armor mid
    "b": (94, 62, 36, 255),      # Cranium shadow
    "T": (186, 140, 92, 255),    # Cranium highlight
    "R": (236, 48, 52, 255),     # Fierce red eyes
    "W": (246, 242, 220, 255),   # Claws & fangs
    "w": (188, 182, 156, 255),
}

PAL_BLASTER = {
    ".": CLEAR,
    "K": OUTLINE,
    "A": (54, 62, 96, 255),      # Slate armor mid
    "L": (88, 98, 142, 255),     # Slate highlight
    "a": (30, 34, 58, 255),      # Slate shadow
    "C": (196, 56, 148, 255),    # Magenta trim/cannon
    "c": (124, 28, 92, 255),
    "M": (242, 114, 198, 255),   # Magenta highlight
    "S": (196, 158, 220, 255),   # Violet skin
    "s": (140, 102, 166, 255),
    "R": (255, 76, 84, 255),     # Visor glow
    "Y": (255, 216, 76, 255),    # Energy tip
}

PAL_BRUTE = {
    ".": CLEAR,
    "K": OUTLINE,
    "S": (224, 162, 116, 255),   # Tan muscle mid
    "L": (248, 196, 152, 255),   # Muscle highlight
    "s": (164, 106, 72, 255),    # Muscle shadow
    "A": (42, 46, 70, 255),      # Dark armor
    "a": (24, 26, 42, 255),
    "Y": (236, 184, 42, 255),    # Gold plates
    "G": (255, 224, 96, 255),    # Gold highlight
    "y": (162, 116, 20, 255),    # Gold shadow
    "W": (244, 244, 248, 255),
    "R": (228, 48, 52, 255),     # Red scouter
    "H": (28, 24, 34, 255),
}

PAL_BOSS1 = {  # Saiyan Vanguard (Raditz-inspired)
    ".": CLEAR,
    "K": OUTLINE,
    "H": (24, 22, 38, 255),
    "h": (62, 60, 98, 255),
    "d": (14, 12, 22, 255),
    "S": (236, 178, 134, 255),
    "L": (252, 212, 172, 255),
    "s": (176, 120, 82, 255),
    "A": (40, 38, 58, 255),
    "a": (22, 20, 34, 255),
    "Y": (214, 164, 64, 255),
    "G": (246, 204, 104, 255),
    "y": (144, 104, 34, 255),
    "R": (216, 46, 62, 255),
    "W": (248, 248, 255, 255),
}

PAL_BOSS2 = {  # Berserker Titan
    ".": CLEAR,
    "K": OUTLINE,
    "S": (182, 112, 82, 255),
    "L": (222, 148, 114, 255),
    "s": (124, 68, 48, 255),
    "H": (228, 226, 242, 255),
    "A": (62, 34, 48, 255),
    "a": (36, 18, 28, 255),
    "Y": (244, 184, 48, 255),
    "G": (255, 224, 104, 255),
    "y": (170, 118, 20, 255),
    "R": (255, 68, 52, 255),
    "W": (248, 248, 255, 255),
}

PAL_BOSS3 = {  # Crimson Commander
    ".": CLEAR,
    "K": OUTLINE,
    "S": (162, 70, 168, 255),
    "L": (204, 114, 210, 255),
    "s": (108, 38, 116, 255),
    "W": (238, 240, 248, 255),
    "w": (172, 176, 198, 255),
    "A": (32, 32, 48, 255),
    "a": (18, 18, 30, 255),
    "Y": (236, 188, 56, 255),
    "G": (255, 224, 112, 255),
    "y": (164, 122, 28, 255),
    "R": (248, 60, 64, 255),
    "B": (64, 216, 240, 255),
}

PAL_BOSS4 = {  # Emperor Frost
    ".": CLEAR,
    "K": OUTLINE,
    "W": (240, 242, 252, 255),
    "L": (255, 255, 255, 255),
    "w": (184, 188, 214, 255),
    "P": (134, 46, 178, 255),
    "p": (78, 22, 116, 255),
    "C": (224, 142, 255, 255),
    "R": (246, 48, 72, 255),
}


# ---------------------------------------------------------------------------
# Organic Pixel-Art Drawing Primitives
# ---------------------------------------------------------------------------
def new_frame(w=64, h=64):
    return [[None for _ in range(w)] for _ in range(h)]


def put(grid, x, y, ch):
    h, w = len(grid), len(grid[0])
    xi, yi = int(round(x)), int(round(y))
    if 0 <= xi < w and 0 <= yi < h and ch is not None:
        grid[yi][xi] = ch


def get(grid, x, y):
    h, w = len(grid), len(grid[0])
    xi, yi = int(round(x)), int(round(y))
    if 0 <= xi < w and 0 <= yi < h:
        return grid[yi][xi]
    return None


def rect(grid, x, y, w, h, ch):
    for yy in range(int(round(y)), int(round(y + h))):
        for xx in range(int(round(x)), int(round(x + w))):
            put(grid, xx, yy, ch)


def ellipse(grid, cx, cy, rx, ry, ch):
    for yy in range(int(cy - ry - 1), int(cy + ry + 2)):
        for xx in range(int(cx - rx - 1), int(cx + rx + 2)):
            if rx > 0 and ry > 0:
                if ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2 <= 1.0:
                    put(grid, xx, yy, ch)


def capsule(grid, x0, y0, x1, y1, r0, r1, ch, hi=None, sh=None):
    """Draw a tapered organic limb/muscle segment with directional cel-shading."""
    steps = max(int(math.hypot(x1 - x0, y1 - y0) * 2), 1)
    for i in range(steps + 1):
        t = i / steps
        cx = x0 + (x1 - x0) * t
        cy = y0 + (y1 - y0) * t
        r = r0 + (r1 - r0) * t
        ri = int(math.ceil(r))
        for dy in range(-ri, ri + 1):
            for dx in range(-ri, ri + 1):
                if dx * dx + dy * dy <= r * r + 0.15:
                    col = ch
                    if sh and (dx > r * 0.35 or dy > r * 0.35):
                        col = sh
                    elif hi and (dx < -r * 0.3 and dy < -r * 0.25):
                        col = hi
                    put(grid, cx + dx, cy + dy, col)


def line(grid, x0, y0, x1, y1, ch, thick=1):
    steps = max(abs(int(x1 - x0)), abs(int(y1 - y0)), 1)
    for i in range(steps + 1):
        t = i / steps
        x = round(x0 + (x1 - x0) * t)
        y = round(y0 + (y1 - y0) * t)
        if thick <= 1:
            put(grid, x, y, ch)
        else:
            ellipse(grid, x, y, thick * 0.5, thick * 0.5, ch)


def tri(grid, x0, y0, x1, y1, x2, y2, ch):
    minx = max(0, int(min(x0, x1, x2)))
    maxx = min(len(grid[0]) - 1, int(max(x0, x1, x2)))
    miny = max(0, int(min(y0, y1, y2)))
    maxy = min(len(grid) - 1, int(max(y0, y1, y2)))

    def edge(ax, ay, bx, by, px, py):
        return (px - ax) * (by - ay) - (py - ay) * (bx - ax)

    area = edge(x0, y0, x1, y1, x2, y2)
    if area == 0:
        return
    for y in range(miny, maxy + 1):
        for x in range(minx, maxx + 1):
            w0 = edge(x1, y1, x2, y2, x, y)
            w1 = edge(x2, y2, x0, y0, x, y)
            w2 = edge(x0, y0, x1, y1, x, y)
            if (area > 0 and w0 >= 0 and w1 >= 0 and w2 >= 0) or (
                area < 0 and w0 <= 0 and w1 <= 0 and w2 <= 0
            ):
                put(grid, x, y, ch)


def add_outline(grid, outline_ch="K"):
    h, w = len(grid), len(grid[0])
    out = [row[:] for row in grid]
    for y in range(h):
        for x in range(w):
            if grid[y][x] is None:
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and grid[ny][nx] is not None:
                        out[y][x] = outline_ch
                        break
    return out


def render_grid(grid, palette):
    h, w = len(grid), len(grid[0])
    img = Image.new("RGBA", (w, h), CLEAR)
    px = img.load()
    for y in range(h):
        for x in range(w):
            ch = grid[y][x]
            if ch is not None and ch in palette:
                px[x, y] = palette[ch]
    return img


def build_sheet(frames, palette, cell_w=64, cell_h=64):
    sheet = Image.new("RGBA", (cell_w * len(frames), cell_h), CLEAR)
    for i, g in enumerate(frames):
        img = render_grid(add_outline(g), palette)
        sheet.paste(img, (i * cell_w, 0))
    return sheet


# ---------------------------------------------------------------------------
# GOKU SPRITESHEET (64x64 cells, 34 frames, ground at y=58)
#  0- 3: idle (4)
#  4- 7: walk (4)
#  8-11: run  (4)
# 12-14: jump (takeoff, rise, fall)
# 15-18: punch (windup, straight, cross windup, uppercut)
# 19-22: kick (chamber, extend, follow, air kick)
# 23-24: ki_blast (gather, fire)
# 25-27: kamehameha (cup1, cup2, fire)
# 28-29: charge (2)
# 30-31: hit (stagger, recover)
# 32-33: transform (crouch, roar) -> wait let's also add KO!
# 34-35: ko (airborne, ground)
# Total: 36 frames
# ---------------------------------------------------------------------------
def draw_goku_head(g, cx, cy, ssj=False, mouth="neutral", look_up=0):
    # Hair spikes (sculpted multi-tiered Dragon Ball silhouette)
    if ssj:
        ellipse(g, cx - 1, cy - 3, 5.5, 3.5, "H")
        tri(g, cx - 7, cy - 1, cx - 14, cy - 11, cx - 2, cy - 6, "H")
        tri(g, cx - 6, cy - 3, cx - 8, cy - 17, cx, cy - 7, "H")
        tri(g, cx - 2, cy - 5, cx + 1, cy - 19, cx + 4, cy - 7, "H")
        tri(g, cx + 1, cy - 4, cx + 9, cy - 15, cx + 6, cy - 4, "H")
        tri(g, cx + 4, cy - 2, cx + 11, cy - 8, cx + 5, cy, "H")
        # Gold shading & highlights
        line(g, cx - 7, cy - 14, cx - 3, cy - 7, "h")
        line(g, cx + 1, cy - 17, cx + 1, cy - 8, "h")
        line(g, cx + 7, cy - 13, cx + 4, cy - 6, "h")
        line(g, cx - 12, cy - 9, cx - 6, cy - 4, "d")
    else:
        ellipse(g, cx - 1, cy - 3, 5, 3.5, "H")
        tri(g, cx - 5, cy - 1, cx - 13, cy - 3, cx - 4, cy - 5, "H")
        tri(g, cx - 5, cy - 3, cx - 12, cy - 10, cx - 2, cy - 6, "H")
        tri(g, cx - 4, cy - 5, cx - 6, cy - 15, cx + 1, cy - 7, "H")
        tri(g, cx - 1, cy - 5, cx + 3, cy - 15, cx + 4, cy - 6, "H")
        tri(g, cx + 2, cy - 4, cx + 10, cy - 10, cx + 6, cy - 2, "H")
        tri(g, cx + 4, cy - 2, cx + 10, cy - 2, cx + 5, cy + 1, "H")
        # Hair highlights & inner depth
        line(g, cx - 5, cy - 12, cx - 2, cy - 7, "h")
        line(g, cx + 2, cy - 12, cx + 3, cy - 7, "h")
        line(g, cx - 10, cy - 8, cx - 5, cy - 4, "d")

    # Sculpted Jaw & Face (angled slightly right)
    ellipse(g, cx + 0.5, cy + 1, 4.8, 4.8, "S")
    rect(g, cx - 1, cy + 4, 5, 2, "S")
    put(g, cx + 4, cy + 4, "s")  # chin contour
    # Cheek & neck shadow
    rect(g, cx - 4, cy + 1, 2, 4, "s")
    put(g, cx - 3, cy + 5, "s")
    # Highlight on cheek/nose bridge
    put(g, cx + 3, cy + 1, "L")
    put(g, cx + 2, cy - 1, "L")
    # Ear detail
    rect(g, cx - 4, cy, 2, 3, "s")
    put(g, cx - 4, cy + 1, "S")

    # Forehead bangs (sit snugly over brow)
    tri(g, cx + 1, cy - 4, cx + 5, cy, cx - 1, cy - 1, "H")
    tri(g, cx - 2, cy - 4, cx + 1, cy, cx - 4, cy, "H")
    rect(g, cx - 4, cy - 3, 9, 2, "H")

    # Expressive Eye & Fierce Brow
    ey = cy - look_up
    put(g, cx + 1, ey, "W")
    put(g, cx + 2, ey, "W")
    put(g, cx + 3, ey, "E")
    put(g, cx + 3, ey + 1, "E")
    put(g, cx + 2, ey + 1, "W")
    line(g, cx + 1, ey - 1, cx + 4, ey - 1, "H" if ssj else "K")

    # Mouth
    if mouth == "shout":
        rect(g, cx + 1, cy + 3, 3, 2, "K")
        put(g, cx + 2, cy + 3, "W")
    elif mouth == "grit":
        line(g, cx + 1, cy + 3, cx + 4, cy + 3, "W")
    else:
        line(g, cx + 1, cy + 3, cx + 3, cy + 3, "s")


def draw_goku_torso(g, cx, cy, lean=0, sash_swing=0):
    # Muscular neck
    rect(g, cx - 2 + lean, cy - 3, 4, 4, "s")
    put(g, cx + lean, cy - 2, "S")
    # Blue undershirt & collar
    ellipse(g, cx + lean, cy + 2, 5.5, 3, "B")
    # Broad Gi Chest with folds & highlights
    tri(g, cx - 6 + lean, cy + 1, cx + 6 + lean, cy + 1, cx + 4 + lean, cy + 11, "O")
    tri(g, cx - 6 + lean, cy + 1, cx - 4 + lean, cy + 11, cx + 4 + lean, cy + 11, "O")
    # Left-side gi shading & fold lines
    rect(g, cx - 5 + lean, cy + 2, 2, 9, "o")
    line(g, cx - 2 + lean, cy + 5, cx + 2 + lean, cy + 9, "o")
    line(g, cx + 2 + lean, cy + 3, cx + 4 + lean, cy + 8, "G")
    # V-neck showing blue undershirt + pec shadow
    tri(g, cx - 1 + lean, cy + 1, cx + 4 + lean, cy + 1, cx + 2 + lean, cy + 6, "B")
    put(g, cx + 1 + lean, cy + 3, "s")
    put(g, cx + 2 + lean, cy + 3, "S")
    # Gi waist skirt flare
    rect(g, cx - 5 + lean, cy + 11, 10, 3, "O")
    rect(g, cx - 5 + lean, cy + 12, 3, 2, "o")
    # Blue Obi Sash + dynamic trailing tails
    rect(g, cx - 5 + lean, cy + 10, 10, 2, "B")
    rect(g, cx - 5 + lean, cy + 11, 4, 1, "b")
    put(g, cx + 1 + lean, cy + 10, "C")
    line(g, cx - 4 + lean, cy + 11, cx - 8 + lean - sash_swing, cy + 16, "B", 2)
    line(g, cx - 3 + lean, cy + 11, cx - 6 + lean - sash_swing, cy + 15, "C", 1)


def draw_goku_arm(g, sx, sy, ex, ey, hx, hy, fist_size=2.1):
    # Gi shoulder sleeve cap
    capsule(g, sx, sy, sx + (ex - sx) * 0.35, sy + (ey - sy) * 0.35, 2.4, 2.2, "B", "C", "b")
    # Muscular bicep + forearm
    capsule(g, sx + (ex - sx) * 0.3, sy + (ey - sy) * 0.3, ex, ey, 2.2, 2.0, "S", "L", "s")
    mx = ex + (hx - ex) * 0.55
    my = ey + (hy - ey) * 0.55
    capsule(g, ex, ey, mx, my, 2.0, 1.8, "S", "L", "s")
    # Blue wristband
    capsule(g, mx, my, hx, hy, 1.9, 1.9, "B", "C", "b")
    # Fist
    ellipse(g, hx, hy, fist_size, fist_size, "S")
    put(g, hx + 0.5, hy - 0.5, "L")


def draw_goku_leg(g, hx, hy, kx, ky, fx, fy, face=1):
    # Baggy martial arts Gi pants (thigh + shin)
    capsule(g, hx, hy, kx, ky, 3.2, 2.8, "O", "G", "o")
    capsule(g, kx, ky, fx, fy - 3, 2.8, 2.2, "O", "G", "o")
    # Blue shin-boot with red stripe & yellow laces
    capsule(g, fx, fy - 3, fx, fy, 2.4, 2.4, "B", "C", "b")
    rect(g, fx - 2, fy - 1, 5 + (1 if face > 0 else 0), 3, "B")
    rect(g, fx - 1, fy - 2, 2, 1, "Y")
    line(g, fx - 1, fy, fx + 2, fy, "R")


def build_goku_frames(ssj=False):
    frames = []

    # 0-3: Idle (4 frames breathing + slight guard bounce)
    for i, (dy, gx) in enumerate([(0, 0), (1, 0), (1, 1), (0, 0)]):
        g = new_frame()
        draw_goku_leg(g, 26, 42, 24, 49, 23, 56)
        draw_goku_leg(g, 33, 42, 36, 49, 36, 56)
        draw_goku_torso(g, 29, 29 + dy)
        draw_goku_arm(g, 25, 32 + dy, 23, 36 + dy, 29, 36 + dy)  # back guard fist
        draw_goku_arm(g, 34, 32 + dy, 37, 36 + dy, 41 + gx, 33 + dy)  # lead guard fist
        draw_goku_head(g, 30, 22 + dy, ssj=ssj)
        frames.append(g)

    # 4-7: Walk (4 frames rhythmic martial-arts stride)
    walk_poses = [
        (-1, 25, 49, 22, 56, 35, 48, 38, 56, 22, 36, 39, 34),
        (0, 28, 49, 29, 56, 33, 45, 34, 52, 27, 37, 34, 35),
        (-1, 34, 48, 37, 56, 26, 49, 23, 56, 36, 36, 24, 36),
        (0, 32, 46, 31, 53, 28, 49, 29, 56, 33, 37, 27, 36),
    ]
    for dy, klx, kly, flx, fly, krx, kry, frx, fry, a1x, a1y, a2x, a2y in walk_poses:
        g = new_frame()
        draw_goku_leg(g, 28, 42 + dy, klx, kly, flx, fly)
        draw_goku_leg(g, 33, 42 + dy, krx, kry, frx, fry)
        draw_goku_torso(g, 30, 29 + dy, lean=1, sash_swing=2)
        draw_goku_arm(g, 26, 32 + dy, 24, 36 + dy, a1x, a1y)
        draw_goku_arm(g, 35, 32 + dy, 36, 36 + dy, a2x, a2y)
        draw_goku_head(g, 32, 22 + dy, ssj=ssj)
        frames.append(g)

    # 8-11: Run (4 frames dynamic low-leaning Dragon Ball dash)
    run_poses = [
        (-1, 23, 49, 17, 56, 38, 47, 44, 54, 18, 35, 42, 34),
        (1, 28, 48, 26, 56, 35, 44, 32, 51, 22, 37, 38, 36),
        (-1, 37, 47, 43, 55, 24, 49, 18, 56, 40, 35, 20, 36),
        (1, 34, 45, 31, 52, 29, 48, 27, 56, 35, 37, 24, 36),
    ]
    for dy, klx, kly, flx, fly, krx, kry, frx, fry, a1x, a1y, a2x, a2y in run_poses:
        g = new_frame()
        draw_goku_leg(g, 28, 42 + dy, klx, kly, flx, fly)
        draw_goku_leg(g, 32, 42 + dy, krx, kry, frx, fry)
        draw_goku_torso(g, 30, 30 + dy, lean=3, sash_swing=5)
        draw_goku_arm(g, 27, 33 + dy, 23, 36 + dy, a1x, a1y)
        draw_goku_arm(g, 36, 33 + dy, 39, 35 + dy, a2x, a2y)
        draw_goku_head(g, 35, 23 + dy, ssj=ssj, mouth="grit")
        frames.append(g)

    # 12-14: Jump (takeoff crouch, rising knee-tuck, falling spread)
    # 12: takeoff
    g = new_frame()
    draw_goku_leg(g, 26, 43, 22, 50, 24, 56)
    draw_goku_leg(g, 33, 43, 37, 49, 36, 56)
    draw_goku_torso(g, 29, 31, lean=2)
    draw_goku_arm(g, 25, 34, 21, 38, 19, 39)
    draw_goku_arm(g, 34, 34, 38, 37, 41, 35)
    draw_goku_head(g, 32, 24, ssj=ssj)
    frames.append(g)
    # 13: rising
    g = new_frame()
    draw_goku_leg(g, 27, 40, 24, 48, 22, 54)
    draw_goku_leg(g, 33, 39, 39, 41, 37, 48)
    draw_goku_torso(g, 29, 27, lean=1, sash_swing=3)
    draw_goku_arm(g, 25, 30, 20, 28, 18, 24)
    draw_goku_arm(g, 34, 30, 39, 28, 42, 25)
    draw_goku_head(g, 31, 20, ssj=ssj, look_up=1)
    frames.append(g)
    # 14: falling
    g = new_frame()
    draw_goku_leg(g, 27, 40, 23, 47, 20, 54)
    draw_goku_leg(g, 33, 40, 37, 47, 40, 53)
    draw_goku_torso(g, 29, 28, lean=0, sash_swing=2)
    draw_goku_arm(g, 25, 31, 19, 27, 17, 23)
    draw_goku_arm(g, 34, 31, 40, 27, 43, 24)
    draw_goku_head(g, 30, 21, ssj=ssj)
    frames.append(g)

    # 15-18: Punch Combo (windup, snappy straight, cross windup, rising uppercut)
    # 15: windup
    g = new_frame()
    draw_goku_leg(g, 26, 42, 23, 49, 22, 56)
    draw_goku_leg(g, 33, 42, 36, 49, 37, 56)
    draw_goku_torso(g, 28, 29, lean=-1)
    draw_goku_arm(g, 33, 32, 38, 35, 42, 34)
    draw_goku_arm(g, 24, 32, 20, 35, 18, 33)
    draw_goku_head(g, 29, 22, ssj=ssj)
    frames.append(g)
    # 16: straight punch extend + pixel speed lines
    g = new_frame()
    draw_goku_leg(g, 26, 42, 22, 49, 19, 56)
    draw_goku_leg(g, 34, 42, 39, 48, 42, 56)
    draw_goku_torso(g, 31, 30, lean=3, sash_swing=4)
    draw_goku_arm(g, 27, 33, 22, 36, 19, 35)
    draw_goku_arm(g, 36, 32, 45, 32, 54, 31, fist_size=2.6)
    line(g, 44, 29, 50, 29, "M")
    line(g, 43, 34, 51, 34, "Y")
    draw_goku_head(g, 34, 23, ssj=ssj, mouth="shout")
    frames.append(g)
    # 17: cross windup
    g = new_frame()
    draw_goku_leg(g, 26, 42, 24, 49, 23, 56)
    draw_goku_leg(g, 34, 42, 38, 49, 39, 56)
    draw_goku_torso(g, 30, 30, lean=1)
    draw_goku_arm(g, 26, 33, 24, 39, 21, 41)
    draw_goku_arm(g, 35, 33, 40, 35, 44, 33)
    draw_goku_head(g, 32, 23, ssj=ssj, mouth="grit")
    frames.append(g)
    # 18: rising uppercut finisher
    g = new_frame()
    draw_goku_leg(g, 27, 42, 23, 49, 20, 56)
    draw_goku_leg(g, 34, 41, 38, 48, 40, 56)
    draw_goku_torso(g, 31, 28, lean=2, sash_swing=4)
    draw_goku_arm(g, 26, 31, 22, 36, 20, 37)
    draw_goku_arm(g, 35, 30, 42, 25, 49, 17, fist_size=2.6)
    line(g, 46, 24, 51, 18, "M")
    draw_goku_head(g, 33, 21, ssj=ssj, mouth="shout", look_up=1)
    frames.append(g)

    # 19-22: Kick (chamber, full roundhouse extension, recover, air kick)
    # 19: chamber
    g = new_frame()
    draw_goku_leg(g, 26, 42, 24, 49, 23, 56)
    draw_goku_leg(g, 32, 41, 38, 37, 36, 44)
    draw_goku_torso(g, 28, 29, lean=-1)
    draw_goku_arm(g, 24, 32, 20, 30, 22, 26)
    draw_goku_arm(g, 33, 32, 37, 31, 39, 28)
    draw_goku_head(g, 28, 22, ssj=ssj)
    frames.append(g)
    # 20: high roundhouse kick extension
    g = new_frame()
    draw_goku_leg(g, 25, 42, 23, 49, 21, 56)
    draw_goku_leg(g, 31, 40, 43, 33, 55, 26)
    line(g, 45, 25, 53, 22, "M")
    draw_goku_torso(g, 26, 30, lean=-2, sash_swing=4)
    draw_goku_arm(g, 22, 33, 17, 29, 16, 25)
    draw_goku_arm(g, 30, 33, 35, 31, 37, 29)
    draw_goku_head(g, 26, 23, ssj=ssj, mouth="shout")
    frames.append(g)
    # 21: snap recover
    g = new_frame()
    draw_goku_leg(g, 26, 42, 24, 49, 23, 56)
    draw_goku_leg(g, 33, 42, 37, 45, 41, 51)
    draw_goku_torso(g, 28, 29)
    draw_goku_arm(g, 24, 32, 21, 35, 25, 34)
    draw_goku_arm(g, 33, 32, 37, 34, 40, 31)
    draw_goku_head(g, 29, 22, ssj=ssj)
    frames.append(g)
    # 22: flying air kick
    g = new_frame()
    draw_goku_leg(g, 25, 40, 21, 44, 17, 48)
    draw_goku_leg(g, 31, 39, 43, 37, 55, 34)
    line(g, 44, 32, 54, 30, "M")
    draw_goku_torso(g, 26, 28, lean=-2, sash_swing=5)
    draw_goku_arm(g, 22, 31, 16, 28, 15, 24)
    draw_goku_arm(g, 31, 31, 36, 29, 39, 27)
    draw_goku_head(g, 26, 21, ssj=ssj, mouth="shout")
    frames.append(g)

    # 23-24: Ki Blast (gather palm, fire palm)
    for step, hx in [(0, 41), (1, 51)]:
        g = new_frame()
        draw_goku_leg(g, 26, 42, 24, 49, 22, 56)
        draw_goku_leg(g, 33, 42, 37, 49, 39, 56)
        draw_goku_torso(g, 30, 29, lean=1 + step)
        draw_goku_arm(g, 26, 32, 22, 36, 20, 35)
        draw_goku_arm(g, 35, 32, 41, 32, hx, 31)
        if step == 1:
            ellipse(g, hx + 2, 31, 2.2, 2.2, "Y")
            put(g, hx + 2, 31, "M")
        draw_goku_head(g, 32 + step, 22, ssj=ssj, mouth="shout" if step else "grit")
        frames.append(g)

    # 25-27: Kamehameha (cup back 1, cup back 2, double palm blast)
    for step in range(3):
        g = new_frame()
        if step < 2:
            draw_goku_leg(g, 25, 43, 21, 50, 19, 56)
            draw_goku_leg(g, 34, 43, 38, 50, 40, 56)
            draw_goku_torso(g, 29, 31, lean=-1)
            draw_goku_arm(g, 25, 34, 21, 39, 17, 39 + step)
            draw_goku_arm(g, 33, 34, 26, 40, 19, 41 + step)
            draw_goku_head(g, 30, 24, ssj=ssj, mouth="grit")
        else:
            draw_goku_leg(g, 25, 42, 21, 49, 18, 56)
            draw_goku_leg(g, 35, 42, 41, 48, 44, 56)
            draw_goku_torso(g, 32, 30, lean=3, sash_swing=5)
            draw_goku_arm(g, 28, 32, 38, 32, 49, 31)
            draw_goku_arm(g, 37, 33, 44, 33, 51, 33)
            draw_goku_head(g, 35, 23, ssj=ssj, mouth="shout")
        frames.append(g)

    # 28-29: Charge Ki (2 frames intense flared stance)
    for dy in (0, 1):
        g = new_frame()
        draw_goku_leg(g, 25, 43, 21, 50, 19, 56)
        draw_goku_leg(g, 34, 43, 38, 50, 40, 56)
        draw_goku_torso(g, 29, 31 + dy, sash_swing=4 + dy)
        draw_goku_arm(g, 24, 34 + dy, 19, 38 + dy, 17, 42 + dy)
        draw_goku_arm(g, 34, 34 + dy, 40, 38 + dy, 42, 42 + dy)
        draw_goku_head(g, 29, 24 + dy, ssj=ssj, mouth="shout")
        frames.append(g)

    # 30-31: Hit / Damage Recoil (sharp stagger -> recovery)
    for step, lean in [(0, -4), (1, -2)]:
        g = new_frame()
        draw_goku_leg(g, 26, 42, 23, 49, 21, 56)
        draw_goku_leg(g, 33, 42, 37, 49, 39, 55)
        draw_goku_torso(g, 28 + step, 30, lean=lean, sash_swing=3)
        draw_goku_arm(g, 23, 32, 17, 29, 14, 24 + step * 3)
        draw_goku_arm(g, 32, 33, 38, 30, 41, 26 + step * 3)
        draw_goku_head(g, 26 + step, 23, ssj=ssj, mouth="shout" if step == 0 else "grit")
        frames.append(g)

    # 32-33: Transform (crouch gather, explosive SSJ roar)
    g = new_frame()
    draw_goku_leg(g, 25, 43, 21, 50, 19, 56)
    draw_goku_leg(g, 34, 43, 38, 50, 40, 56)
    draw_goku_torso(g, 29, 32)
    draw_goku_arm(g, 25, 35, 22, 40, 25, 43)
    draw_goku_arm(g, 34, 35, 37, 40, 34, 43)
    draw_goku_head(g, 29, 25, ssj=ssj, mouth="grit")
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 25, 43, 21, 50, 19, 56)
    draw_goku_leg(g, 34, 43, 38, 50, 40, 56)
    draw_goku_torso(g, 29, 29, sash_swing=6)
    draw_goku_arm(g, 24, 32, 17, 27, 13, 21)
    draw_goku_arm(g, 34, 32, 41, 27, 45, 21)
    draw_goku_head(g, 29, 22, ssj=True, mouth="shout", look_up=1)
    frames.append(g)

    # 34-35: KO (airborne tumble, flat defeated)
    g = new_frame()
    draw_goku_leg(g, 26, 40, 20, 43, 14, 45)
    draw_goku_leg(g, 30, 42, 26, 48, 22, 53)
    draw_goku_torso(g, 31, 32, lean=-4)
    draw_goku_arm(g, 27, 33, 22, 28, 18, 24)
    draw_goku_arm(g, 35, 35, 40, 33, 44, 31)
    draw_goku_head(g, 27, 26, ssj=ssj, mouth="grit")
    frames.append(g)

    g = new_frame()
    capsule(g, 11, 52, 24, 52, 3.2, 3.0, "O", "G", "o")
    rect(g, 10, 49, 5, 6, "B")
    capsule(g, 25, 51, 38, 51, 4.2, 4.0, "O", "G", "o")
    rect(g, 25, 47, 3, 8, "B")
    ellipse(g, 43, 51, 4.5, 4.0, "S")
    tri(g, 46, 49, 55, 44, 51, 53, "H")
    tri(g, 44, 47, 52, 42, 49, 49, "H")
    frames.append(g)

    return frames


# ---------------------------------------------------------------------------
# DETAILED 16-BIT ENEMIES (64x64 cells, 12 frames each)
#  0-1: idle (2)
#  2-5: walk (4)
#  6:   windup
#  7:   attack strike
#  8:   special
#  9:   hit recoil
# 10-11: ko (tumble, flat)
# ---------------------------------------------------------------------------
def build_scout_frames():
    frames = []
    # Pose table: (dy, lean, legL, legR, armB, armF, mode)
    poses = [
        (0, 0, (26, 49, 24, 56), (34, 49, 36, 56), (22, 36, 27, 36), (37, 36, 41, 33), "idle"),
        (1, 0, (26, 49, 24, 56), (34, 49, 36, 56), (22, 37, 27, 37), (37, 37, 41, 34), "idle"),
        (-1, 1, (24, 49, 21, 56), (36, 48, 39, 56), (21, 36, 20, 35), (37, 36, 41, 34), "walk"),
        (0, 1, (28, 49, 29, 56), (34, 45, 34, 52), (24, 37, 27, 37), (35, 36, 37, 35), "walk"),
        (-1, 1, (35, 48, 38, 56), (25, 49, 22, 56), (26, 36, 36, 36), (35, 37, 24, 36), "walk"),
        (0, 1, (32, 46, 31, 53), (28, 49, 29, 56), (27, 37, 32, 36), (34, 37, 27, 37), "walk"),
        (0, -1, (25, 49, 23, 56), (34, 49, 37, 56), (21, 34, 19, 31), (37, 34, 40, 33), "windup"),
        (0, 3, (24, 49, 20, 56), (37, 48, 42, 56), (22, 36, 19, 35), (41, 32, 53, 31), "attack"),
        (0, 2, (25, 49, 22, 56), (35, 49, 39, 56), (22, 36, 19, 36), (40, 32, 49, 31), "special"),
        (0, -3, (25, 49, 22, 56), (35, 49, 38, 55), (19, 30, 16, 25), (37, 30, 41, 26), "hit"),
        (0, -4, (22, 44, 17, 48), (28, 48, 24, 53), (20, 29, 16, 24), (39, 32, 44, 30), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            capsule(g, 12, 52, 24, 52, 3.0, 2.6, "P", "V", "p")
            rect(g, 10, 49, 5, 6, "W")
            capsule(g, 25, 51, 38, 51, 4.2, 4.0, "W", "L", "w")
            rect(g, 26, 47, 3, 8, "P")
            ellipse(g, 43, 51, 4.5, 4.0, "S")
            rect(g, 43, 48, 3, 2, "G")
            frames.append(g)
            continue

        cx = 30 + lean
        # Legs (purple undersuit + white armored boots)
        capsule(g, cx - 3, 42 + dy, legL[0], legL[1], 3.0, 2.5, "P", "V", "p")
        capsule(g, legL[0], legL[1], legL[2], legL[3] - 2, 2.5, 2.1, "P", "V", "p")
        rect(g, legL[2] - 2, legL[3] - 2, 6, 4, "W")
        rect(g, legL[2] - 2, legL[3], 6, 2, "w")

        capsule(g, cx + 2, 42 + dy, legR[0], legR[1], 3.0, 2.5, "P", "V", "p")
        capsule(g, legR[0], legR[1], legR[2], legR[3] - 2, 2.5, 2.1, "P", "V", "p")
        rect(g, legR[2] - 2, legR[3] - 2, 6, 4, "W")
        rect(g, legR[2] - 2, legR[3], 6, 2, "w")

        # Frieza-Force Battle Armor (ribbed chest, curved pauldrons, armored hip tassets)
        capsule(g, cx, 31 + dy, cx, 40 + dy, 5.5, 4.8, "W", "L", "w")
        rect(g, cx - 5, 38 + dy, 11, 2, "P")  # waist belt
        # Hip armor flaps
        tri(g, cx - 6, 40 + dy, cx - 2, 40 + dy, cx - 5, 45 + dy, "W")
        tri(g, cx + 2, 40 + dy, cx + 6, 40 + dy, cx + 5, 45 + dy, "W")
        # Chest ribs & purple sternum
        rect(g, cx - 2, 31 + dy, 5, 5, "P")
        line(g, cx - 4, 33 + dy, cx + 4, 33 + dy, "w")
        # Curved shoulder pauldrons
        ellipse(g, cx - 6, 30 + dy, 3.5, 2.2, "W")
        put(g, cx - 6, 29 + dy, "L")
        ellipse(g, cx + 6, 30 + dy, 3.5, 2.2, "W")
        put(g, cx + 6, 29 + dy, "L")

        # Back arm
        capsule(g, cx - 5, 32 + dy, armB[0], armB[1], 2.0, 1.8, "P", "V", "p")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.8, "S", "T", "s")
        # Front arm
        capsule(g, cx + 5, 32 + dy, armF[0], armF[1], 2.2, 2.0, "P", "V", "p")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.0, 2.0, "S", "T", "s")
        ellipse(g, armF[2], armF[3], 2.2, 2.2, "S")

        # Sculpted Alien Head + Helmet + Glowing Green Scouter
        hx, hy = cx + 1, 22 + dy
        ellipse(g, hx, hy + 1, 4.6, 4.8, "S")
        rect(g, hx - 4, hy + 2, 2, 3, "s")
        put(g, hx + 3, hy + 2, "T")
        # Sleek helmet ridge
        ellipse(g, hx - 1, hy - 3, 4.8, 2.5, "P")
        line(g, hx - 4, hy - 4, hx + 2, hy - 4, "V")
        # Scouter earpiece & green lens
        rect(g, hx - 3, hy - 1, 2, 3, "W")
        rect(g, hx, hy - 1, 5, 2, "G")
        put(g, hx + 4, hy - 1, "g")
        line(g, hx + 1, hy + 3, hx + 3, hy + 3, "K")
        frames.append(g)
    return frames


def build_gremlin_frames():
    frames = []
    poses = [
        (0, 1, (25, 50, 22, 56), (34, 50, 36, 56), (22, 38, 28, 39), (37, 37, 42, 38), "idle"),
        (1, 1, (25, 51, 22, 56), (34, 51, 36, 56), (22, 39, 28, 40), (37, 38, 42, 39), "idle"),
        (-1, 2, (23, 50, 19, 56), (36, 48, 39, 55), (21, 38, 20, 39), (38, 37, 43, 36), "walk"),
        (-3, 2, (26, 47, 23, 52), (35, 46, 38, 51), (22, 35, 27, 36), (38, 34, 44, 33), "walk"),
        (-1, 2, (36, 49, 39, 56), (24, 50, 20, 56), (24, 38, 34, 39), (36, 38, 26, 39), "walk"),
        (0, 2, (31, 48, 30, 54), (27, 50, 27, 56), (24, 38, 30, 38), (36, 37, 41, 38), "walk"),
        (2, -1, (24, 51, 21, 56), (35, 51, 38, 56), (19, 35, 16, 30), (36, 35, 39, 32), "windup"),
        (-2, 4, (22, 48, 17, 54), (37, 47, 43, 53), (20, 36, 17, 35), (42, 32, 53, 30), "attack"),
        (-2, 3, (23, 49, 19, 55), (36, 48, 41, 54), (21, 36, 18, 34), (41, 33, 50, 32), "special"),
        (0, -3, (24, 50, 21, 56), (35, 50, 38, 55), (18, 32, 15, 27), (38, 32, 42, 28), "hit"),
        (0, -4, (21, 45, 16, 49), (28, 49, 24, 53), (19, 31, 15, 26), (39, 33, 44, 31), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            ellipse(g, 24, 52, 9, 4.5, "G")
            ellipse(g, 24, 51, 5, 2.5, "L")
            ellipse(g, 36, 51, 5, 4.5, "B")
            frames.append(g)
            continue

        cx = 29 + lean
        # Hunched muscular bio-legs with claws
        capsule(g, cx - 4, 44 + dy, legL[0], legL[1], 3.0, 2.4, "G", "L", "g")
        capsule(g, legL[0], legL[1], legL[2], legL[3], 2.4, 2.0, "G", "L", "g")
        put(g, legL[2] + 2, legL[3], "W")
        capsule(g, cx + 3, 44 + dy, legR[0], legR[1], 3.0, 2.4, "G", "L", "g")
        capsule(g, legR[0], legR[1], legR[2], legR[3], 2.4, 2.0, "G", "L", "g")
        put(g, legR[2] + 3, legR[3], "W")

        # Hunched veined green torso
        ellipse(g, cx, 37 + dy, 6.5, 7, "G")
        ellipse(g, cx + 1, 35 + dy, 3.5, 4, "L")
        rect(g, cx - 5, 39 + dy, 3, 4, "g")
        # Shoulder ridges
        ellipse(g, cx - 5, 33 + dy, 2.5, 2.5, "g")
        ellipse(g, cx + 5, 33 + dy, 2.5, 2.5, "L")

        # Arms + sharp claws
        capsule(g, cx - 5, 34 + dy, armB[0], armB[1], 2.1, 1.8, "G", "L", "g")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.6, "G", "L", "g")
        put(g, armB[2] + 2, armB[3], "W")
        capsule(g, cx + 5, 34 + dy, armF[0], armF[1], 2.2, 1.9, "G", "L", "g")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 1.9, 1.7, "G", "L", "g")
        line(g, armF[2] + 1, armF[3] - 1, armF[2] + 4, armF[3] - 2, "W")
        line(g, armF[2] + 1, armF[3] + 1, armF[2] + 4, armF[3] + 1, "W")

        # Bulbous Saibaman cranium with brown armor ridges & red eyes
        hx, hy = cx + 2, 26 + dy
        ellipse(g, hx, hy + 1, 5.5, 5.0, "G")
        ellipse(g, hx, hy - 3, 5.2, 3.2, "B")
        line(g, hx - 3, hy - 4, hx + 3, hy - 4, "T")
        line(g, hx, hy - 5, hx, hy - 1, "b")  # cranium seam
        put(g, hx + 2, hy, "R")
        put(g, hx + 4, hy, "R")
        line(g, hx + 1, hy + 3, hx + 5, hy + 3, "W")
        frames.append(g)
    return frames


def build_blaster_frames():
    frames = []
    poses = [
        (0, 0, (26, 49, 24, 56), (34, 49, 36, 56), (22, 36, 26, 36), (37, 36, 42, 34), "idle"),
        (1, 0, (26, 49, 24, 56), (34, 49, 36, 56), (22, 37, 26, 37), (37, 37, 42, 35), "idle"),
        (-1, 1, (24, 49, 21, 56), (36, 48, 39, 56), (21, 36, 20, 35), (37, 35, 42, 34), "walk"),
        (0, 1, (28, 49, 29, 56), (34, 45, 34, 52), (24, 37, 27, 37), (36, 36, 40, 35), "walk"),
        (-1, 1, (35, 48, 38, 56), (25, 49, 22, 56), (26, 36, 34, 36), (36, 36, 41, 35), "walk"),
        (0, 1, (32, 46, 31, 53), (28, 49, 29, 56), (26, 37, 30, 36), (36, 36, 41, 35), "walk"),
        (0, -1, (25, 49, 23, 56), (34, 49, 37, 56), (21, 35, 19, 34), (37, 34, 43, 33), "windup"),
        (0, 1, (24, 49, 21, 56), (35, 49, 38, 56), (22, 36, 20, 35), (41, 33, 49, 32), "attack"),
        (0, 1, (24, 49, 21, 56), (35, 49, 38, 56), (22, 36, 20, 35), (41, 33, 49, 32), "special"),
        (0, -3, (25, 49, 22, 56), (35, 49, 38, 55), (19, 30, 16, 26), (37, 30, 41, 27), "hit"),
        (0, -4, (22, 44, 17, 48), (28, 48, 24, 53), (20, 29, 16, 24), (39, 32, 44, 30), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            capsule(g, 12, 52, 24, 52, 3.0, 2.6, "A", "L", "a")
            capsule(g, 25, 51, 38, 51, 4.2, 4.0, "C", "M", "c")
            ellipse(g, 43, 51, 4.5, 4.0, "S")
            frames.append(g)
            continue

        cx = 30 + lean
        # Legs
        capsule(g, cx - 3, 42 + dy, legL[0], legL[1], 3.0, 2.5, "A", "L", "a")
        capsule(g, legL[0], legL[1], legL[2], legL[3], 2.5, 2.2, "A", "L", "a")
        rect(g, legL[2] - 2, legL[3] - 2, 5, 3, "C")
        capsule(g, cx + 2, 42 + dy, legR[0], legR[1], 3.0, 2.5, "A", "L", "a")
        capsule(g, legR[0], legR[1], legR[2], legR[3], 2.5, 2.2, "A", "L", "a")
        rect(g, legR[2] - 2, legR[3] - 2, 5, 3, "C")

        # Cape / mantle & chest armor
        tri(g, cx - 5, 30 + dy, cx - 10, 44 + dy, cx - 2, 42 + dy, "c")
        capsule(g, cx, 31 + dy, cx, 40 + dy, 5.5, 4.8, "A", "L", "a")
        rect(g, cx - 4, 32 + dy, 8, 5, "C")
        line(g, cx - 4, 32 + dy, cx + 3, 32 + dy, "M")
        rect(g, cx - 5, 38 + dy, 10, 2, "Y")
        ellipse(g, cx - 5, 30 + dy, 3, 2, "A")
        ellipse(g, cx + 5, 30 + dy, 3, 2, "A")

        # Back arm & Forearm Ki Cannon
        capsule(g, cx - 5, 32 + dy, armB[0], armB[1], 2.0, 1.8, "A", "L", "a")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.8, "S", None, "s")
        capsule(g, cx + 5, 32 + dy, armF[0], armF[1], 2.2, 2.2, "C", "M", "c")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.6, 2.4, "C", "M", "c")
        if mode == "windup":
            ellipse(g, armF[2] + 2, armF[3], 2.5, 2.5, "Y")
        elif mode in ("attack", "special"):
            ellipse(g, armF[2] + 2, armF[3], 3.0, 3.0, "R")
            put(g, armF[2] + 2, armF[3], "Y")

        # Angular Helmet & Glowing Visor
        hx, hy = cx + 1, 22 + dy
        ellipse(g, hx, hy + 1, 4.5, 4.6, "S")
        tri(g, hx - 5, hy - 2, hx - 2, hy - 7, hx + 4, hy - 3, "A")
        rect(g, hx - 4, hy - 4, 9, 3, "A")
        line(g, hx - 3, hy - 5, hx + 3, hy - 5, "L")
        rect(g, hx, hy - 1, 5, 2, "R")
        put(g, hx + 2, hy - 1, "Y")
        frames.append(g)
    return frames


def build_heavy_or_boss(kind):
    pal = {
        "brute": PAL_BRUTE,
        "boss1": PAL_BOSS1,
        "boss2": PAL_BOSS2,
        "boss3": PAL_BOSS3,
        "boss4": PAL_BOSS4,
    }[kind]
    frames = []
    # 12 frames matching standard enemy animation table
    poses = [
        (0, 0, (25, 48, 22, 57), (36, 48, 38, 57), (20, 34, 24, 36), (40, 34, 44, 32), "idle"),
        (1, 0, (25, 48, 22, 57), (36, 48, 38, 57), (20, 35, 24, 37), (40, 35, 44, 33), "idle"),
        (-1, 1, (23, 48, 19, 57), (38, 47, 42, 57), (19, 34, 17, 34), (40, 34, 45, 32), "walk"),
        (0, 1, (28, 48, 29, 57), (36, 44, 36, 52), (22, 35, 26, 36), (38, 34, 41, 33), "walk"),
        (-1, 1, (37, 47, 41, 57), (24, 48, 20, 57), (24, 34, 36, 35), (38, 35, 24, 35), "walk"),
        (0, 1, (34, 45, 33, 53), (28, 48, 29, 57), (25, 35, 31, 35), (36, 35, 28, 36), "walk"),
        (0, -1, (24, 48, 21, 57), (36, 48, 39, 57), (19, 31, 16, 26), (39, 31, 42, 27), "windup"),
        (0, 3, (23, 48, 18, 57), (39, 47, 45, 57), (20, 34, 16, 33), (44, 29, 56, 28), "attack"),
        (-2, 1, (24, 47, 21, 55), (37, 47, 40, 55), (17, 29, 13, 23), (43, 28, 51, 24), "special"),
        (0, -3, (24, 48, 20, 57), (37, 48, 41, 56), (17, 28, 14, 22), (40, 28, 45, 24), "hit"),
        (0, -4, (21, 43, 15, 47), (29, 47, 24, 52), (18, 27, 14, 22), (41, 30, 46, 28), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            if kind == "boss4":
                capsule(g, 11, 52, 24, 52, 3.2, 2.8, "W", "L", "w")
                capsule(g, 25, 51, 39, 51, 4.5, 4.2, "P", "C", "p")
                ellipse(g, 45, 51, 5, 4.2, "W")
            else:
                capsule(g, 10, 52, 24, 52, 3.8, 3.2, "A", None, "a")
                capsule(g, 25, 51, 41, 51, 5.2, 4.8, "Y" if "Y" in pal else "W", None, "y" if "y" in pal else "w")
                ellipse(g, 47, 51, 5, 4.5, "S" if "S" in pal else "W")
            frames.append(g)
            continue

        cx = 30 + lean
        leg_c = "W" if kind == "boss4" else ("A" if "A" in pal else "W")
        leg_hi = "L" if kind == "boss4" else None
        leg_sh = "w" if kind == "boss4" else "a"
        boot_c = "w" if kind == "boss4" else ("Y" if kind in ("brute", "boss2") else "W")

        # Muscular Legs
        capsule(g, cx - 4, 40 + dy, legL[0], legL[1], 3.6, 3.0, leg_c, leg_hi, leg_sh)
        capsule(g, legL[0], legL[1], legL[2], legL[3] - 2, 3.0, 2.5, leg_c, leg_hi, leg_sh)
        rect(g, legL[2] - 3, legL[3] - 3, 7, 4, boot_c)
        capsule(g, cx + 4, 40 + dy, legR[0], legR[1], 3.6, 3.0, leg_c, leg_hi, leg_sh)
        capsule(g, legR[0], legR[1], legR[2], legR[3] - 2, 3.0, 2.5, leg_c, leg_hi, leg_sh)
        rect(g, legR[2] - 3, legR[3] - 3, 7, 4, boot_c)

        # Tail (Boss 4 Frost or Boss 1 Saiyan waist-wrapped tail)
        if kind == "boss4":
            capsule(g, cx - 5, 38 + dy, cx - 15, 33 + dy, 2.2, 1.8, "W", "L", "w")
            capsule(g, cx - 15, 33 + dy, cx - 19, 40 + dy, 1.8, 1.3, "W", None, "w")

        # Torso
        if kind == "boss4":
            capsule(g, cx, 26 + dy, cx, 38 + dy, 6.2, 5.0, "W", "L", "w")
            ellipse(g, cx + 1, 30 + dy, 3.5, 3.0, "P")
            put(g, cx + 2, 29 + dy, "C")
            rect(g, cx - 6, 36 + dy, 12, 2, "w")
        else:
            armor_c = "W" if kind == "boss3" else "A"
            armor_sh = "w" if kind == "boss3" else "a"
            plate_c = "Y" if "Y" in pal else "W"
            plate_hi = "G" if "G" in pal else "W"
            plate_sh = "y" if "y" in pal else "w"
            capsule(g, cx, 27 + dy, cx, 39 + dy, 7.5, 6.0, armor_c, None, armor_sh)
            capsule(g, cx, 28 + dy, cx, 36 + dy, 6.2, 5.2, plate_c, plate_hi, plate_sh)
            # Winged Saiyan shoulder pauldrons
            tri(g, cx - 12, 25 + dy, cx - 4, 24 + dy, cx - 5, 30 + dy, plate_c)
            tri(g, cx + 4, 24 + dy, cx + 12, 25 + dy, cx + 5, 30 + dy, plate_c)
            line(g, cx - 11, 25 + dy, cx - 5, 25 + dy, plate_hi)
            line(g, cx + 5, 25 + dy, cx + 11, 25 + dy, plate_hi)
            # Waist belt / Saiyan tail wrap
            rect(g, cx - 7, 37 + dy, 14, 3, "R" if kind == "boss1" else plate_sh)

        # Arms
        arm_c = "W" if kind == "boss4" else "S"
        arm_hi = "L"
        arm_sh = "w" if kind == "boss4" else "s"
        capsule(g, cx - 7, 27 + dy, armB[0], armB[1], 2.8, 2.3, arm_c, arm_hi, arm_sh)
        capsule(g, armB[0], armB[1], armB[2], armB[3], 2.3, 2.2, arm_c, arm_hi, arm_sh)
        capsule(g, cx + 7, 27 + dy, armF[0], armF[1], 3.0, 2.5, arm_c, arm_hi, arm_sh)
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.5, 2.4, arm_c, arm_hi, arm_sh)
        fist_c = "P" if kind == "boss4" else ("R" if mode == "special" else arm_c)
        ellipse(g, armF[2], armF[3], 2.8, 2.8, fist_c)

        # Head & Character-specific silhouette
        hx, hy = cx + 1, 18 + dy
        skin_c = "W" if kind == "boss4" else "S"
        ellipse(g, hx, hy + 1, 5.2, 5.2, skin_c)
        if kind != "boss4":
            rect(g, hx - 4, hy + 2, 2, 3, "s")
            put(g, hx + 3, hy + 1, "L")
        if kind == "boss1":
            # Wild long Raditz-style spiky Saiyan mane
            tri(g, hx - 4, hy - 2, hx - 16, hy + 10, hx - 4, hy + 14, "H")
            tri(g, hx - 5, hy - 3, hx - 14, hy + 2, hx - 3, hy + 6, "H")
            tri(g, hx - 4, hy - 4, hx - 12, hy - 11, hx, hy - 5, "H")
            tri(g, hx + 1, hy - 4, hx + 8, hy - 11, hx + 5, hy - 2, "H")
            line(g, hx - 11, hy + 4, hx - 6, hy + 8, "h")
            rect(g, hx, hy - 1, 5, 2, "R")
        elif kind == "boss2":
            tri(g, hx - 2, hy - 4, hx + 2, hy - 12, hx + 5, hy - 3, "H")
            put(g, hx + 3, hy, "R")
            put(g, hx + 4, hy, "R")
        elif kind == "boss3":
            tri(g, hx - 4, hy - 3, hx - 10, hy - 10, hx - 1, hy - 4, "S")
            tri(g, hx + 3, hy - 3, hx + 10, hy - 10, hx + 5, hy - 3, "S")
            rect(g, hx, hy - 1, 5, 2, "B")
            put(g, hx + 3, hy + 1, "R")
        elif kind == "brute":
            rect(g, hx, hy - 1, 5, 2, "R")
            line(g, hx - 3, hy - 3, hx + 2, hy - 3, "s")
        elif kind == "boss4":
            ellipse(g, hx, hy - 3, 4.5, 2.5, "P")
            put(g, hx + 3, hy, "R")
            put(g, hx + 4, hy, "R")
        frames.append(g)
    return build_sheet(frames, pal, 64, 64)


# ---------------------------------------------------------------------------
# EFFECTS SPRITESHEET (32x32 cells)
# ---------------------------------------------------------------------------
def build_effects_sheet():
    cell = 32
    n = 9
    sheet = Image.new("RGBA", (cell * n, cell), CLEAR)

    def circle_cell(idx, rings):
        im = Image.new("RGBA", (cell, cell), CLEAR)
        for r, col in rings:
            for y in range(cell):
                for x in range(cell):
                    if (x - 16) ** 2 + (y - 16) ** 2 <= r ** 2:
                        im.putpixel((x, y), col)
        sheet.paste(im, (idx * cell, 0))

    circle_cell(0, [(10, (42, 138, 240, 220)), (7, (112, 224, 255, 255)), (4, (248, 252, 255, 255))])
    circle_cell(1, [(10, (240, 152, 24, 220)), (7, (255, 232, 72, 255)), (4, (255, 252, 224, 255))])
    circle_cell(2, [(9, (186, 28, 86, 220)), (6, (255, 84, 112, 255)), (3, (255, 228, 232, 255))])

    for idx, col_outer in [(3, (255, 220, 72, 255)), (4, (248, 120, 32, 255))]:
        im = Image.new("RGBA", (cell, cell), CLEAR)
        d = ImageDraw.Draw(im)
        for ang in range(0, 360, 45):
            rad = math.radians(ang)
            x2 = 16 + round(math.cos(rad) * 12)
            y2 = 16 + round(math.sin(rad) * 12)
            d.line([(16, 16), (x2, y2)], fill=col_outer, width=2)
        d.ellipse([12, 12, 20, 20], fill=(255, 255, 255, 255))
        sheet.paste(im, (idx * cell, 0))

    for idx, c1, c2 in [
        (5, (64, 196, 255, 190), (212, 248, 255, 220)),
        (6, (248, 204, 48, 195), (255, 248, 168, 225)),
    ]:
        im = Image.new("RGBA", (cell, cell), CLEAR)
        d = ImageDraw.Draw(im)
        d.polygon([(4, 30), (8, 10), (13, 18), (16, 4), (20, 17), (25, 9), (28, 30)], fill=c1)
        d.polygon([(8, 30), (11, 16), (16, 10), (21, 16), (24, 30)], fill=c2)
        sheet.paste(im, (idx * cell, 0))

    circle_cell(7, [(7, OUTLINE), (6, (44, 192, 248, 255)), (3, (224, 252, 255, 255))])
    circle_cell(8, [(7, OUTLINE), (6, (64, 212, 92, 255)), (3, (218, 255, 212, 255))])
    return sheet


# ---------------------------------------------------------------------------
# 16-BIT PIXEL-ART PARALLAX BACKGROUNDS (Bayer-dithered skies, organic rock
# mesas, multi-layer depth, rich terrain details)
# ---------------------------------------------------------------------------
BAYER4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
]


def draw_dithered_sky(img, stops):
    """stops: list of (y, (r,g,b)) sorted ascending by y."""
    W, H = img.size
    px = img.load()
    for y in range(H):
        # Find enclosing stops
        c0 = stops[0][1]
        c1 = stops[-1][1]
        t = 0.0
        for i in range(len(stops) - 1):
            y0, col0 = stops[i]
            y1, col1 = stops[i + 1]
            if y0 <= y <= y1:
                c0, c1 = col0, col1
                t = (y - y0) / max(1, (y1 - y0))
                break
        by = y & 3
        for x in range(W):
            thresh = (BAYER4[by][x & 3] + 0.5) / 16.0
            col = c1 if t > thresh else c0
            px[x, y] = (col[0], col[1], col[2], 255)


def draw_pixel_cloud(d, cx, cy, scale, top_col, mid_col, sh_col):
    # Puffy organic 16-bit cumulus cloud built from overlapping ellipses
    blobs = [
        (0, 0, 22, 8),
        (-18, 3, 14, 6),
        (18, 4, 15, 6),
        (-7, -5, 13, 7),
        (8, -4, 11, 6),
    ]
    for ox, oy, rx, ry in blobs:
        rx, ry = rx * scale, ry * scale
        ox, oy = ox * scale, oy * scale
        d.ellipse([cx + ox - rx, cy + oy - ry + 2, cx + ox + rx, cy + oy + ry + 2], fill=sh_col)
    for ox, oy, rx, ry in blobs:
        rx, ry = rx * scale, ry * scale
        ox, oy = ox * scale, oy * scale
        d.ellipse([cx + ox - rx, cy + oy - ry, cx + ox + rx, cy + oy + ry], fill=mid_col)
    for ox, oy, rx, ry in blobs:
        rx, ry = rx * scale * 0.8, ry * scale * 0.65
        ox, oy = ox * scale, oy * scale - 2 * scale
        d.ellipse([cx + ox - rx, cy + oy - ry, cx + ox + rx, cy + oy + ry], fill=top_col)


def draw_eroded_mesa(img, cx, base_y, width, height, pal, seed):
    """Draw an organic, stratified Dragon Ball canyon mesa/spire (no flat boxes!)."""
    rng = random.Random(seed)
    px = img.load()
    W, H = img.size
    lit, mid, sh, dark, rim = pal

    # Build irregular left & right cliff edge profiles from top to bottom
    top_y = base_y - height
    half_top = width * 0.34
    half_bot = width * 0.54
    for y in range(max(0, top_y), min(H, base_y)):
        prog = (y - top_y) / max(1, height)
        # Step ledges & organic jaggedness
        step = math.sin(prog * 14 + seed) * 3.5 + math.sin(prog * 31) * 1.5
        half_w = half_top + (half_bot - half_top) * (prog ** 0.85) + step
        lx = int(cx - half_w + rng.randint(-1, 1))
        rx = int(cx + half_w + rng.randint(-1, 1))

        # Horizontal sedimentary rock strata banding (organic ledges, no brick hatching)
        strata = ((y + seed * 3) // 11) % 3
        is_ledge = ((y + seed * 3) % 11) == 0
        for x in range(lx, rx + 1):
            wx = x % W  # wrap horizontally for seamless tiling!
            rel = (x - lx) / max(1, (rx - lx))
            if y - top_y <= 3:
                col = rim
            elif is_ledge and rel < 0.78:
                col = lit if rel < 0.35 else sh
            elif rel < 0.14 or (rel < 0.24 and strata == 0):
                col = lit
            elif rel > 0.72:
                col = dark if rel > 0.88 else sh
            else:
                col = mid
            # Broken irregular vertical erosion fissures
            crack_seed = ((x * 7 + seed * 13) ^ (y // 11)) & 31
            if crack_seed == 0 and prog > 0.14 and rel > 0.18 and rel < 0.85:
                col = dark
            px[wx, y] = col


def make_stage1_rocky_wasteland():
    W, H = 960, 270
    rng = random.Random(101)

    # 1. SKY LAYER (Bayer-dithered sunset + glowing sun + sculpted cumulus clouds)
    sky = Image.new("RGBA", (W, H), CLEAR)
    draw_dithered_sky(sky, [
        (0, (54, 92, 166)),
        (52, (94, 134, 196)),
        (104, (162, 162, 186)),
        (152, (224, 162, 118)),
        (206, (242, 178, 92)),
        (270, (216, 132, 68)),
    ])
    sd = ImageDraw.Draw(sky)
    # Sun halo + core
    sd.ellipse([712, 32, 774, 94], fill=(252, 206, 120, 140))
    sd.ellipse([722, 42, 764, 84], fill=(255, 232, 148, 255))
    sd.ellipse([728, 48, 756, 76], fill=(255, 248, 204, 255))
    # Sculpted pixel clouds
    for cx, cy, sc in [(110, 52, 1.1), (310, 78, 0.85), (520, 46, 1.25), (840, 70, 0.95)]:
        draw_pixel_cloud(sd, cx, cy, sc, (255, 246, 230, 255), (242, 214, 192, 255), (186, 142, 138, 255))

    # 2. FAR HORIZON LAYER (Atmospheric distant flat-top plateaus & misty haze)
    far = Image.new("RGBA", (W, H), CLEAR)
    fd = ImageDraw.Draw(far)
    far_poly = [(0, 224)]
    x = 0
    heights = [148, 132, 132, 162, 152, 122, 122, 158, 170, 138, 138, 165]
    for i, hx in enumerate(range(0, W + 80, 80)):
        y = heights[i % len(heights)]
        far_poly.append((hx, y))
    far_poly.append((W, 224))
    fd.polygon(far_poly, fill=(146, 86, 68, 255))
    # Subtle lit top rim on far plateaus
    for i in range(1, len(far_poly) - 2):
        x0, y0 = far_poly[i]
        x1, y1 = far_poly[i + 1]
        if abs(y1 - y0) <= 6:
            fd.line([(x0, y0), (x1, y1)], fill=(184, 114, 84, 255), width=2)
    # Atmospheric dust band
    fd.rectangle([0, 194, W, 225], fill=(176, 108, 76, 120))

    # 3. MIDGROUND LAYER (Iconic Dragon Ball sculpted mesas, rock arch, spires)
    mid = Image.new("RGBA", (W, H), CLEAR)
    mesa_pal = (
        (214, 128, 74, 255),   # lit
        (172, 92, 52, 255),    # mid
        (132, 66, 38, 255),    # shadow
        (94, 44, 28, 255),     # deep crack/shadow
        (238, 158, 96, 255),   # top rim
    )
    mesas = [
        (80, 218, 92, 118, 11),
        (230, 218, 64, 84, 22),
        (390, 218, 116, 134, 33),
        (560, 218, 74, 96, 44),
        (730, 218, 108, 128, 55),
        (890, 218, 68, 78, 66),
    ]
    for cx, by, mw, mh, seed in mesas:
        draw_eroded_mesa(mid, cx, by, mw, mh, mesa_pal, seed)

    # Natural sandstone arch near x=560..640
    md = ImageDraw.Draw(mid)
    md.arc([585, 146, 665, 232], 180, 360, fill=(172, 92, 52, 255), width=14)
    md.arc([585, 146, 665, 232], 195, 345, fill=(214, 128, 74, 255), width=4)

    # Continuous rocky foothills at base of mesas (wrapped seamlessly)
    hill_pts = [(0, 226)]
    for hx in range(0, W + 24, 24):
        idx = (hx % W) // 24
        hy = 192 + int(math.sin(idx * 0.7) * 9 + math.cos(idx * 1.5) * 6)
        hill_pts.append((hx, hy))
    hill_pts.append((W, 226))
    md.polygon(hill_pts, fill=(138, 72, 42, 255))
    for i in range(1, len(hill_pts) - 2):
        md.line([hill_pts[i], hill_pts[i + 1]], fill=(182, 102, 58, 255), width=2)

    # 4. FOREGROUND GROUND & TERRAIN DETAILS (y=204..270)
    gnd = Image.new("RGBA", (W, H), CLEAR)
    gd = ImageDraw.Draw(gnd)
    # Stratified canyon ground layers
    gd.rectangle([0, 212, W, 216], fill=(242, 182, 108, 255))  # bright sunlit ridge
    gd.rectangle([0, 216, W, 225], fill=(214, 138, 70, 255))   # upper dirt
    gd.rectangle([0, 225, W, 240], fill=(182, 104, 48, 255))   # mid earth
    gd.rectangle([0, 240, W, 270], fill=(142, 76, 36, 255))    # deep foreground soil

    # Dithered transition bands & organic soil texture
    gpx = gnd.load()
    for y in range(222, 244):
        for x in range(W):
            if y < 226 and (x + y * 3) % 4 == 0:
                gpx[x, y] = (182, 104, 48, 255)
            elif y >= 238 and (x * 2 + y) % 4 == 0:
                gpx[x, y] = (142, 76, 36, 255)

    # Organic canyon floor cracks, pebbles, boulders, and desert scrub
    for bx in range(12, W, 46):
        # Cracked stone slab
        sx = bx + rng.randint(-6, 8)
        sy = 224 + rng.randint(0, 18)
        gd.line([(sx, sy), (sx + 10, sy + 4), (sx + 18, sy + 2)], fill=(112, 56, 26, 255), width=1)
        gd.line([(sx + 10, sy + 4), (sx + 13, sy + 11)], fill=(112, 56, 26, 255), width=1)
        # Pebble clusters
        for _ in range(3):
            pxx = (bx + rng.randint(0, 38)) % W
            pyy = rng.randint(218, 262)
            pr = rng.randint(2, 4)
            gd.ellipse([pxx, pyy, pxx + pr + 1, pyy + pr], fill=(118, 62, 30, 255))
            gd.point((pxx + 1, pyy), fill=(224, 152, 86, 255))

    # Detailed boulders & dry desert scrub tufts along the upper ledge (y=200..215)
    for rx in [34, 148, 265, 378, 504, 612, 742, 858]:
        rw = rng.randint(14, 24)
        rh = rng.randint(9, 15)
        ry = 214 - rh
        gd.polygon([(rx, 214), (rx + 3, ry + 2), (rx + rw * 0.55, ry), (rx + rw, 214)], fill=(148, 82, 44, 255))
        gd.polygon([(rx + 3, ry + 2), (rx + rw * 0.55, ry), (rx + rw * 0.45, 214), (rx, 214)], fill=(196, 118, 66, 255))
        gd.line([(rx + 3, ry + 2), (rx + rw * 0.55, ry)], fill=(238, 168, 98, 255), width=1)

    for gx in [88, 210, 330, 445, 558, 688, 810, 922]:
        # Dry scrub grass tuft
        for ang in (-4, -1, 2, 5):
            gd.line([(gx, 213), (gx + ang, 205 + abs(ang) // 2)], fill=(156, 146, 68, 255), width=1)
            gd.point((gx + ang, 205 + abs(ang) // 2), fill=(208, 194, 96, 255))

    # 5. FOREGROUND SILHOUETTE LAYER (Parallax 1.18x along very bottom edge y=254..270)
    fg = Image.new("RGBA", (W, H), CLEAR)
    fgd = ImageDraw.Draw(fg)
    for fx in [60, 290, 520, 770]:
        fgd.polygon([(fx, 270), (fx + 10, 256), (fx + 26, 254), (fx + 38, 270)], fill=(72, 36, 20, 255))
        fgd.line([(fx + 10, 256), (fx + 26, 254)], fill=(116, 62, 32, 255), width=1)

    return sky, far, mid, gnd, fg


def make_other_stage_backgrounds(stage_id):
    W, H = 960, 270
    rng = random.Random(100 + stage_id * 77)
    sky = Image.new("RGBA", (W, H), CLEAR)
    mid = Image.new("RGBA", (W, H), CLEAR)
    gnd = Image.new("RGBA", (W, H), CLEAR)
    sd, md, gd = ImageDraw.Draw(sky), ImageDraw.Draw(mid), ImageDraw.Draw(gnd)

    if stage_id == 2:
        draw_dithered_sky(sky, [(0, (34, 46, 92)), (80, (58, 82, 138)), (160, (96, 128, 172)), (270, (138, 168, 192))])
        sd.ellipse([160, 30, 198, 68], fill=(238, 244, 255, 255))
        for x in range(0, W, 120):
            md.polygon([(x - 20, 218), (x + 50, 88 + (x % 29)), (x + 130, 218)], fill=(54, 72, 104, 255))
            md.polygon([(x + 50, 88 + (x % 29)), (x + 32, 124), (x + 68, 124)], fill=(208, 224, 238, 255))
        gd.rectangle([0, 212, W, 216], fill=(104, 176, 98, 255))
        gd.rectangle([0, 216, W, 224], fill=(72, 136, 78, 255))
        gd.rectangle([0, 224, W, 270], fill=(82, 88, 102, 255))
        for x in range(0, W, 32):
            gd.rectangle([x + 2, 228, x + 26, 238], fill=(104, 110, 126, 255))
    elif stage_id == 3:
        draw_dithered_sky(sky, [(0, (42, 152, 146)), (90, (82, 198, 168)), (180, (132, 224, 178)), (270, (160, 236, 194))])
        sd.ellipse([640, 32, 678, 70], fill=(255, 248, 168, 255))
        sd.ellipse([700, 56, 726, 82], fill=(255, 212, 120, 255))
        md.rectangle([0, 200, W, 224], fill=(44, 134, 144, 255))
        for x in range(-40, W + 40, 120):
            h = 72 + ((x * 7) % 34)
            md.ellipse([x, 212 - h, x + 130, 240], fill=(56, 148, 152, 255))
            md.ellipse([x + 14, 214 - h, x + 116, 236], fill=(74, 174, 172, 255))
        for x in [70, 260, 490, 720, 880]:
            md.rectangle([x + 12, 155, x + 22, 216], fill=(132, 102, 74, 255))
            md.ellipse([x - 4, 120, x + 38, 162], fill=(28, 108, 146, 255))
            md.ellipse([x + 4, 125, x + 24, 142], fill=(84, 202, 224, 255))
        gd.rectangle([0, 212, W, 216], fill=(82, 216, 164, 255))
        gd.rectangle([0, 216, W, 228], fill=(48, 168, 128, 255))
        gd.rectangle([0, 228, W, 270], fill=(34, 122, 102, 255))
    else:
        draw_dithered_sky(sky, [(0, (32, 16, 40)), (80, (74, 24, 54)), (160, (132, 38, 44)), (270, (186, 68, 36))])
        for x in range(0, W, 110):
            md.polygon([(x, 218), (x + 36, 108 + (x % 31)), (x + 74, 218)], fill=(44, 24, 38, 255))
        gd.rectangle([0, 212, W, 216], fill=(104, 78, 96, 255))
        gd.rectangle([0, 216, W, 226], fill=(66, 50, 64, 255))
        gd.rectangle([0, 226, W, 270], fill=(38, 28, 38, 255))
        for x in range(0, W, 48):
            gd.line([(x + 6, 226), (x + 18, 244), (x + 12, 266)], fill=(244, 108, 32, 255), width=2)
    return sky, mid, gnd


def write_wav(filename, samples, sr=22050):
    path = os.path.join(ASSETS, "audio", filename)
    with wave.open(path, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        buf = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            buf.extend(struct.pack("<h", val))
        wf.writeframes(bytes(buf))


def gen_sfx():
    sr = 22050
    rng = random.Random(42)
    specs = [
        ("punch.wav", 0.11, lambda t: (math.sin(2 * math.pi * max(40, 220 - 1400 * t) * t) * 0.55 + (rng.random() * 2 - 1) * 0.45) * max(0, 1 - t / 0.11) ** 1.5 * 0.6),
        ("kick.wav", 0.15, lambda t: ((1 if math.sin(2 * math.pi * 300 * math.exp(-t * 14) * t) > 0 else -1) * 0.4 + (rng.random() * 2 - 1) * 0.5) * max(0, 1 - t / 0.15) ** 1.4 * 0.65),
        ("hit.wav", 0.12, lambda t: ((rng.random() * 2 - 1) * 0.6 + math.sin(2 * math.pi * 120 * t) * 0.4) * max(0, 1 - t / 0.12) ** 1.8 * 0.65),
    ]
    for name, dur, fn in specs:
        write_wav(name, [fn(i / sr) for i in range(int(sr * dur))], sr)


def main():
    print("Generating detailed 64x64 Goku spritesheets...")
    build_sheet(build_goku_frames(ssj=False), PAL_GOKU_BASE, 64, 64).save(
        os.path.join(ASSETS, "sprites", "goku_base.png")
    )
    build_sheet(build_goku_frames(ssj=True), PAL_GOKU_SSJ, 64, 64).save(
        os.path.join(ASSETS, "sprites", "goku_ssj.png")
    )

    print("Generating detailed 64x64 enemy & boss spritesheets...")
    build_sheet(build_scout_frames(), PAL_SCOUT, 64, 64).save(
        os.path.join(ASSETS, "sprites", "enemy_scout.png")
    )
    build_sheet(build_gremlin_frames(), PAL_GREMLIN, 64, 64).save(
        os.path.join(ASSETS, "sprites", "enemy_gremlin.png")
    )
    build_sheet(build_blaster_frames(), PAL_BLASTER, 64, 64).save(
        os.path.join(ASSETS, "sprites", "enemy_blaster.png")
    )
    for kind, fname in [
        ("brute", "enemy_brute.png"),
        ("boss1", "boss_1.png"),
        ("boss2", "boss_2.png"),
        ("boss3", "boss_3.png"),
        ("boss4", "boss_4.png"),
    ]:
        build_heavy_or_boss(kind).save(os.path.join(ASSETS, "sprites", fname))

    print("Generating effects spritesheet...")
    build_effects_sheet().save(os.path.join(ASSETS, "effects", "effects.png"))

    print("Generating multi-layer Rocky Wasteland & stage backgrounds...")
    sky, far, mid, gnd, fg = make_stage1_rocky_wasteland()
    sky.save(os.path.join(ASSETS, "backgrounds", "stage1_sky.png"))
    far.save(os.path.join(ASSETS, "backgrounds", "stage1_far.png"))
    mid.save(os.path.join(ASSETS, "backgrounds", "stage1_mid.png"))
    gnd.save(os.path.join(ASSETS, "backgrounds", "stage1_ground.png"))
    fg.save(os.path.join(ASSETS, "backgrounds", "stage1_fg.png"))

    for st in (2, 3, 4):
        s, m, g = make_other_stage_backgrounds(st)
        s.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_sky.png"))
        m.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_mid.png"))
        g.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_ground.png"))

    print("Visual assets upgraded!")


if __name__ == "__main__":
    main()
