"""
Generate authentic 16-bit pixel-art spritesheets, parallax backgrounds,
combat effects, and retro WAV audio files for DRAGON BALL: SAIYAN LEGACY.
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


# ---------------------------------------------------------------------------
# Color Palettes (16-bit SNES/GBA inspired)
# ---------------------------------------------------------------------------
OUTLINE = (20, 16, 28, 255)
CLEAR = (0, 0, 0, 0)

PAL_GOKU_BASE = {
    ".": CLEAR,
    "K": OUTLINE,
    "H": (24, 24, 38, 255),      # Hair dark
    "h": (52, 54, 82, 255),      # Hair highlight
    "S": (244, 194, 148, 255),   # Skin main
    "s": (208, 146, 100, 255),   # Skin shadow
    "W": (248, 248, 255, 255),   # Eye white / bright
    "E": (24, 24, 36, 255),      # Eye pupil
    "O": (242, 108, 24, 255),    # Gi orange main
    "o": (192, 66, 14, 255),     # Gi orange shadow
    "L": (255, 152, 56, 255),    # Gi highlight
    "B": (32, 74, 184, 255),     # Blue undershirt / belt / boots
    "b": (18, 44, 122, 255),     # Blue shadow
    "R": (208, 44, 44, 255),     # Red boot stripe
    "Y": (248, 212, 64, 255),    # Gold accent / energy
}

PAL_GOKU_SSJ = {
    **PAL_GOKU_BASE,
    "H": (248, 216, 48, 255),    # Golden hair
    "h": (255, 248, 152, 255),   # Bright gold highlight
    "E": (42, 216, 198, 255),    # Teal SSJ eyes
    "S": (252, 208, 160, 255),   # Slightly brighter skin glow
    "O": (252, 132, 32, 255),    # Brighter golden-orange gi
    "L": (255, 196, 88, 255),
    "B": (46, 98, 214, 255),
}

PAL_SCOUT = {
    ".": CLEAR,
    "K": OUTLINE,
    "W": (236, 236, 244, 255),   # White armor
    "w": (176, 178, 198, 255),   # Armor shadow
    "P": (106, 56, 146, 255),    # Purple under-suit / plates
    "p": (68, 32, 98, 255),      # Purple shadow
    "S": (146, 188, 224, 255),   # Alien blue-grey skin
    "s": (102, 140, 176, 255),
    "G": (84, 236, 112, 255),    # Scouter green lens
    "R": (224, 60, 68, 255),     # Red visor/accent
    "E": (248, 248, 255, 255),
}

PAL_GREMLIN = {
    ".": CLEAR,
    "K": OUTLINE,
    "G": (92, 184, 68, 255),     # Green body
    "g": (56, 128, 42, 255),     # Green shadow
    "L": (148, 228, 96, 255),    # Green highlight
    "B": (144, 108, 72, 255),    # Head shell / armor ridges
    "R": (232, 56, 56, 255),     # Red eyes
    "W": (244, 240, 220, 255),   # Claws/teeth
}

PAL_BLASTER = {
    ".": CLEAR,
    "K": OUTLINE,
    "A": (56, 62, 92, 255),      # Dark slate armor
    "a": (36, 38, 60, 255),
    "C": (196, 64, 152, 255),    # Magenta energy trim
    "c": (132, 36, 102, 255),
    "S": (204, 168, 224, 255),   # Pale violet alien skin
    "s": (152, 118, 174, 255),
    "R": (255, 92, 92, 255),     # Visor/eyes
    "Y": (255, 220, 88, 255),    # Gold trim
}

PAL_BRUTE = {
    ".": CLEAR,
    "K": OUTLINE,
    "S": (228, 168, 124, 255),   # Muscular tan skin
    "s": (176, 118, 82, 255),
    "A": (42, 46, 68, 255),      # Black/navy Saiyan armor
    "a": (26, 28, 44, 255),
    "Y": (236, 188, 44, 255),    # Gold shoulder pads
    "y": (172, 128, 24, 255),
    "W": (244, 244, 248, 255),
    "R": (224, 52, 52, 255),     # Red scouter / eyes
    "H": (30, 26, 34, 255),
}

PAL_BOSS1 = {  # Saiyan Vanguard (Raditz-inspired)
    ".": CLEAR,
    "K": OUTLINE,
    "H": (26, 24, 38, 255),
    "h": (64, 62, 96, 255),
    "S": (236, 182, 138, 255),
    "s": (188, 132, 92, 255),
    "A": (44, 42, 62, 255),
    "a": (26, 24, 38, 255),
    "Y": (212, 164, 68, 255),    # Tan/gold armor plates
    "y": (152, 110, 40, 255),
    "R": (212, 48, 64, 255),     # Red armband / scouter
    "W": (248, 248, 255, 255),
}

PAL_BOSS2 = {  # Berserker Titan
    ".": CLEAR,
    "K": OUTLINE,
    "S": (178, 110, 84, 255),    # Ruddy bronze warrior skin
    "s": (130, 74, 56, 255),
    "H": (228, 224, 236, 255),   # Silver crest/mohawk
    "A": (56, 36, 48, 255),      # Crimson-dark armor
    "Y": (244, 184, 48, 255),    # Gold trim
    "y": (178, 124, 22, 255),
    "R": (255, 72, 56, 255),     # Glowing eyes
    "W": (248, 248, 255, 255),
}

PAL_BOSS3 = {  # Crimson Commander (Ginyu-inspired)
    ".": CLEAR,
    "K": OUTLINE,
    "S": (164, 72, 168, 255),    # Purple alien skin
    "s": (118, 44, 124, 255),
    "W": (240, 240, 248, 255),   # White armor
    "w": (180, 182, 200, 255),
    "A": (32, 32, 48, 255),      # Dark undersuit
    "Y": (236, 188, 56, 255),    # Gold trim
    "R": (248, 64, 64, 255),     # Red eyes
    "B": (64, 212, 236, 255),    # Cyan scouter/gems
}

PAL_BOSS4 = {  # Emperor Frost (Final Boss - Frieza Final Form inspired)
    ".": CLEAR,
    "K": OUTLINE,
    "W": (242, 242, 250, 255),   # Sleek porcelain white
    "w": (196, 198, 218, 255),   # Cool lavender-grey shadow
    "P": (132, 48, 176, 255),    # Royal purple bio-gems
    "p": (86, 26, 124, 255),
    "R": (244, 52, 72, 255),     # Fierce crimson eyes
    "C": (224, 140, 255, 255),   # Energy glow
}


# ---------------------------------------------------------------------------
# Pixel Drawing Helpers (with automatic 1px outline pass!)
# ---------------------------------------------------------------------------
def new_frame(w=48, h=48):
    return [[None for _ in range(w)] for _ in range(h)]


def put(grid, x, y, ch):
    h = len(grid)
    w = len(grid[0])
    if 0 <= x < w and 0 <= y < h and ch is not None:
        grid[y][x] = ch


def rect(grid, x, y, w, h, ch):
    for yy in range(y, y + h):
        for xx in range(x, x + w):
            put(grid, xx, yy, ch)


def ellipse(grid, cx, cy, rx, ry, ch):
    for yy in range(int(cy - ry - 1), int(cy + ry + 2)):
        for xx in range(int(cx - rx - 1), int(cx + rx + 2)):
            if rx > 0 and ry > 0:
                if ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2 <= 1.0:
                    put(grid, xx, yy, ch)


def line(grid, x0, y0, x1, y1, ch, thick=1):
    steps = max(abs(x1 - x0), abs(y1 - y0), 1)
    for i in range(steps + 1):
        t = i / steps
        x = round(x0 + (x1 - x0) * t)
        y = round(y0 + (y1 - y0) * t)
        if thick <= 1:
            put(grid, x, y, ch)
        else:
            rect(grid, x - thick // 2, y - thick // 2, thick, thick, ch)


def tri(grid, x0, y0, x1, y1, x2, y2, ch):
    minx = max(0, min(x0, x1, x2))
    maxx = min(len(grid[0]) - 1, max(x0, x1, x2))
    miny = max(0, min(y0, y1, y2))
    maxy = min(len(grid) - 1, max(y0, y1, y2))

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
    h = len(grid)
    w = len(grid[0])
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


def render_grid(grid, palette, scale=1):
    h = len(grid)
    w = len(grid[0])
    img = Image.new("RGBA", (w, h), CLEAR)
    px = img.load()
    for y in range(h):
        for x in range(w):
            ch = grid[y][x]
            if ch is not None and ch in palette:
                px[x, y] = palette[ch]
    if scale != 1:
        img = img.resize((w * scale, h * scale), Image.NEAREST)
    return img


def build_sheet(frames, palette, cell_w=48, cell_h=48):
    sheet = Image.new("RGBA", (cell_w * len(frames), cell_h), CLEAR)
    for i, g in enumerate(frames):
        framed = add_outline(g)
        img = render_grid(framed, palette)
        sheet.paste(img, (i * cell_w, 0))
    return sheet


# ---------------------------------------------------------------------------
# GOKU SPRITE GENERATOR (48x48, facing RIGHT)
# Frame indices (26 frames):
# 0-2: idle (3)
# 3-6: walk (4)
# 7-8: jump (up, down)
# 9-11: punch (windup, extend, uppercut)
# 12-14: kick (chamber, extend, recover)
# 15-16: ki_blast (charge, fire)
# 17-19: kamehameha (cup1, cup2, fire)
# 20-21: charge (2)
# 22: hit (1)
# 23-24: transform (crouch, burst)
# 25: ko (1)
# ---------------------------------------------------------------------------
def draw_goku_head(g, cx, cy, ssj=False, mouth_open=False, grimace=False):
    # Hair spikes (facing right)
    if ssj:
        # Swept-up spiky Super Saiyan hair (filled base cap so no forehead gap)
        ellipse(g, cx, cy - 3, 5, 3, "H")
        tri(g, cx - 7, cy - 2, cx - 12, cy - 11, cx - 1, cy - 6, "H")
        tri(g, cx - 5, cy - 4, cx - 6, cy - 15, cx + 1, cy - 7, "H")
        tri(g, cx - 2, cy - 5, cx + 1, cy - 16, cx + 4, cy - 6, "H")
        tri(g, cx + 2, cy - 4, cx + 8, cy - 13, cx + 6, cy - 3, "H")
        tri(g, cx + 4, cy - 2, cx + 9, cy - 7, cx + 5, cy - 1, "H")
        # Bright gold highlights
        line(g, cx - 5, cy - 13, cx - 3, cy - 7, "h")
        line(g, cx + 1, cy - 14, cx + 1, cy - 8, "h")
        line(g, cx + 6, cy - 11, cx + 4, cy - 6, "h")
    else:
        # Iconic Goku messy spiky hair
        tri(g, cx - 6, cy - 2, cx - 12, cy - 5, cx - 4, cy - 5, "H")
        tri(g, cx - 5, cy - 4, cx - 11, cy - 10, cx - 2, cy - 7, "H")
        tri(g, cx - 3, cy - 6, cx - 5, cy - 13, cx + 1, cy - 7, "H")
        tri(g, cx + 0, cy - 6, cx + 3, cy - 13, cx + 4, cy - 6, "H")
        tri(g, cx + 3, cy - 4, cx + 9, cy - 8, cx + 5, cy - 2, "H")
        tri(g, cx + 4, cy - 2, cx + 8, cy - 2, cx + 4, cy, "H")
        put(g, cx - 4, cy - 9, "h")
        put(g, cx + 2, cy - 9, "h")

    # Face
    ellipse(g, cx, cy + 1, 4.5, 4.5, "S")
    rect(g, cx - 4, cy + 2, 2, 3, "s")  # cheek shadow
    # Bangs on forehead
    tri(g, cx + 1, cy - 5, cx + 4, cy - 1, cx - 1, cy - 2, "H")
    # Eye (facing right)
    put(g, cx + 2, cy, "W")
    put(g, cx + 3, cy, "E")
    put(g, cx + 2, cy - 1, "H" if ssj else "K")  # fierce brow
    # Mouth
    if mouth_open:
        rect(g, cx + 1, cy + 3, 2, 2, "K")
    elif grimace:
        line(g, cx + 1, cy + 3, cx + 3, cy + 3, "K")
    else:
        put(g, cx + 2, cy + 3, "s")


def draw_goku_torso(g, cx, cy, lean=0, arms="guard"):
    # Blue undershirt collar
    rect(g, cx - 3 + lean, cy, 7, 3, "B")
    # Orange Gi chest
    rect(g, cx - 4 + lean, cy + 2, 9, 8, "O")
    rect(g, cx - 4 + lean, cy + 3, 2, 7, "o")  # shadow back
    put(g, cx + 3 + lean, cy + 3, "L")
    put(g, cx + 3 + lean, cy + 4, "L")
    # V-neck opening showing blue undershirt
    tri(g, cx, cy + 1, cx + 3, cy + 1, cx + 2, cy + 5, "B")
    # Blue belt sash
    rect(g, cx - 4 + lean, cy + 9, 9, 2, "B")
    rect(g, cx - 4 + lean, cy + 10, 3, 1, "b")
    # Flowing sash tail
    line(g, cx - 4 + lean, cy + 10, cx - 6 + lean, cy + 14, "B")


def draw_goku_legs(g, cx, cy, pose="idle"):
    if pose == "idle":
        # Back leg
        rect(g, cx - 5, cy, 4, 7, "O")
        rect(g, cx - 5, cy + 1, 1, 5, "o")
        rect(g, cx - 6, cy + 7, 4, 4, "B")  # boot
        rect(g, cx - 6, cy + 8, 1, 2, "R")
        # Front leg
        rect(g, cx + 1, cy, 4, 7, "O")
        rect(g, cx + 2, cy + 7, 5, 4, "B")
        rect(g, cx + 2, cy + 8, 2, 2, "R")
    elif pose == "walk0":
        line(g, cx - 2, cy, cx - 7, cy + 7, "O", 3)
        rect(g, cx - 9, cy + 7, 4, 3, "B")
        line(g, cx + 2, cy, cx + 7, cy + 7, "O", 3)
        rect(g, cx + 6, cy + 7, 5, 3, "B")
    elif pose == "walk1":
        rect(g, cx - 2, cy, 4, 7, "O")
        rect(g, cx - 2, cy + 7, 5, 4, "B")
        rect(g, cx + 1, cy, 4, 5, "O")
        rect(g, cx + 3, cy + 4, 4, 3, "B")
    elif pose == "walk2":
        line(g, cx - 1, cy, cx + 6, cy + 7, "O", 3)
        rect(g, cx + 5, cy + 7, 5, 3, "B")
        line(g, cx + 1, cy, cx - 6, cy + 7, "O", 3)
        rect(g, cx - 8, cy + 7, 4, 3, "B")
    elif pose == "walk3":
        rect(g, cx - 3, cy, 4, 6, "O")
        rect(g, cx - 5, cy + 6, 4, 3, "B")
        rect(g, cx + 1, cy, 4, 7, "O")
        rect(g, cx + 2, cy + 7, 5, 4, "B")
    elif pose == "jump_up":
        rect(g, cx - 4, cy, 4, 6, "O")
        rect(g, cx - 5, cy + 6, 4, 3, "B")
        rect(g, cx + 2, cy - 2, 4, 5, "O")
        rect(g, cx + 3, cy + 3, 4, 3, "B")
    elif pose == "jump_down":
        line(g, cx - 2, cy, cx - 6, cy + 8, "O", 3)
        rect(g, cx - 8, cy + 8, 4, 3, "B")
        line(g, cx + 2, cy, cx + 5, cy + 7, "O", 3)
        rect(g, cx + 4, cy + 7, 4, 3, "B")
    elif pose == "kick_chamber":
        rect(g, cx - 4, cy, 4, 7, "O")
        rect(g, cx - 5, cy + 7, 5, 4, "B")
        rect(g, cx + 2, cy - 3, 4, 5, "O")
        rect(g, cx + 3, cy + 1, 4, 3, "B")
    elif pose == "kick_ext":
        # Planting leg
        rect(g, cx - 5, cy, 4, 7, "O")
        rect(g, cx - 6, cy + 7, 5, 4, "B")
        # High extended kick!
        line(g, cx + 1, cy + 1, cx + 13, cy - 5, "O", 3)
        rect(g, cx + 12, cy - 7, 5, 4, "B")
        put(g, cx + 13, cy - 6, "R")
    elif pose == "crouch":
        rect(g, cx - 6, cy + 2, 5, 5, "O")
        rect(g, cx - 7, cy + 7, 5, 3, "B")
        rect(g, cx + 2, cy + 2, 5, 5, "O")
        rect(g, cx + 3, cy + 7, 5, 3, "B")


def draw_arm(g, x0, y0, x1, y1, skin="S"):
    # Blue wristband near hand + bare forearm/fist
    mx = round(x0 + (x1 - x0) * 0.65)
    my = round(y0 + (y1 - y0) * 0.65)
    line(g, x0, y0, mx, my, skin, 2)
    line(g, mx, my, x1, y1, "B", 2)
    rect(g, x1 - 1, y1 - 1, 3, 3, skin)


def build_goku_frames(ssj=False):
    frames = []

    # 0-2: Idle (3 frames, subtle martial-arts bob)
    for i, dy in enumerate([0, 1, 0]):
        g = new_frame()
        draw_goku_legs(g, 22, 34, "idle")
        draw_goku_torso(g, 22, 23 + dy)
        draw_arm(g, 19, 26 + dy, 17, 30 + dy)
        draw_arm(g, 25, 26 + dy, 31, 27 + dy)
        draw_goku_head(g, 23, 17 + dy, ssj=ssj)
        frames.append(g)

    # 3-6: Walk / Run (4 frames, leaning forward)
    for i in range(4):
        g = new_frame()
        dy = -1 if i in (1, 3) else 0
        draw_goku_legs(g, 22, 34 + dy, f"walk{i}")
        draw_goku_torso(g, 23, 23 + dy, lean=1)
        if i % 2 == 0:
            draw_arm(g, 20, 26 + dy, 15, 29 + dy)
            draw_arm(g, 26, 26 + dy, 31, 25 + dy)
        else:
            draw_arm(g, 20, 26 + dy, 28, 28 + dy)
            draw_arm(g, 25, 26 + dy, 18, 28 + dy)
        draw_goku_head(g, 26, 17 + dy, ssj=ssj)
        frames.append(g)

    # 7-8: Jump up / Jump down
    for pose in ("jump_up", "jump_down"):
        g = new_frame()
        draw_goku_legs(g, 22, 33, pose)
        draw_goku_torso(g, 22, 22)
        draw_arm(g, 19, 25, 15, 21)
        draw_arm(g, 26, 25, 31, 22)
        draw_goku_head(g, 24, 16, ssj=ssj)
        frames.append(g)

    # 9-11: Punch combo (windup, snap straight, rising uppercut)
    # 9: windup
    g = new_frame()
    draw_goku_legs(g, 22, 34, "idle")
    draw_goku_torso(g, 22, 23)
    draw_arm(g, 19, 26, 15, 26)
    draw_arm(g, 25, 26, 28, 28)
    draw_goku_head(g, 24, 17, ssj=ssj)
    frames.append(g)
    # 10: straight punch extend
    g = new_frame()
    draw_goku_legs(g, 22, 34, "walk0")
    draw_goku_torso(g, 24, 24, lean=1)
    draw_arm(g, 20, 27, 15, 28)
    draw_arm(g, 27, 26, 41, 25)
    rect(g, 40, 23, 4, 4, "S")  # big punch fist
    draw_goku_head(g, 27, 18, ssj=ssj, mouth_open=True)
    frames.append(g)
    # 11: uppercut / cross finisher
    g = new_frame()
    draw_goku_legs(g, 22, 34, "walk2")
    draw_goku_torso(g, 23, 22, lean=1)
    draw_arm(g, 20, 26, 16, 29)
    draw_arm(g, 26, 25, 38, 17)
    rect(g, 37, 15, 4, 4, "S")
    draw_goku_head(g, 26, 16, ssj=ssj, mouth_open=True)
    frames.append(g)

    # 12-14: Kick (chamber, full roundhouse kick, recover)
    # 12: chamber
    g = new_frame()
    draw_goku_legs(g, 22, 34, "kick_chamber")
    draw_goku_torso(g, 21, 23)
    draw_arm(g, 18, 26, 15, 23)
    draw_arm(g, 24, 26, 28, 23)
    draw_goku_head(g, 22, 17, ssj=ssj)
    frames.append(g)
    # 13: extended high kick
    g = new_frame()
    draw_goku_legs(g, 22, 34, "kick_ext")
    draw_goku_torso(g, 20, 24, lean=-1)
    draw_arm(g, 17, 27, 13, 23)
    draw_arm(g, 23, 27, 27, 25)
    draw_goku_head(g, 21, 18, ssj=ssj, mouth_open=True)
    frames.append(g)
    # 14: recover
    g = new_frame()
    draw_goku_legs(g, 22, 34, "idle")
    draw_goku_torso(g, 22, 23)
    draw_arm(g, 19, 26, 16, 28)
    draw_arm(g, 25, 26, 30, 26)
    draw_goku_head(g, 23, 17, ssj=ssj)
    frames.append(g)

    # 15-16: Ki Blast (aim palm, thrust palm)
    for ext in (33, 39):
        g = new_frame()
        draw_goku_legs(g, 22, 34, "idle")
        draw_goku_torso(g, 23, 23, lean=1)
        draw_arm(g, 20, 26, 16, 28)
        draw_arm(g, 26, 26, ext, 25)
        if ext == 39:
            rect(g, 38, 24, 3, 3, "Y")
        draw_goku_head(g, 25, 17, ssj=ssj, mouth_open=(ext == 39))
        frames.append(g)

    # 17-19: Kamehameha (cup hands back x2, double palm thrust forward)
    for step in range(3):
        g = new_frame()
        if step < 2:
            draw_goku_legs(g, 22, 34, "crouch")
            draw_goku_torso(g, 22, 25, lean=-1)
            # Both hands cupped behind left hip
            draw_arm(g, 19, 28, 13, 31 + step)
            draw_arm(g, 24, 28, 15, 32 + step)
            draw_goku_head(g, 23, 19, ssj=ssj, grimace=True)
        else:
            draw_goku_legs(g, 22, 34, "walk0")
            draw_goku_torso(g, 24, 24, lean=1)
            draw_arm(g, 21, 27, 38, 25)
            draw_arm(g, 26, 26, 39, 27)
            draw_goku_head(g, 26, 18, ssj=ssj, mouth_open=True)
        frames.append(g)

    # 20-21: Charge Ki (2 frames intense stance)
    for dy in (0, 1):
        g = new_frame()
        draw_goku_legs(g, 22, 34, "crouch")
        draw_goku_torso(g, 22, 24 + dy)
        draw_arm(g, 18, 27 + dy, 13, 31 + dy)
        draw_arm(g, 26, 27 + dy, 31, 31 + dy)
        draw_goku_head(g, 22, 18 + dy, ssj=ssj, mouth_open=True)
        frames.append(g)

    # 22: Hit / Damage recoil
    g = new_frame()
    draw_goku_legs(g, 23, 34, "jump_down")
    draw_goku_torso(g, 20, 23, lean=-1)
    draw_arm(g, 17, 25, 13, 21)
    draw_arm(g, 23, 26, 29, 23)
    draw_goku_head(g, 19, 17, ssj=ssj, grimace=True)
    frames.append(g)

    # 23-24: Transform (crouch gather, explosive scream)
    g = new_frame()
    draw_goku_legs(g, 22, 34, "crouch")
    draw_goku_torso(g, 22, 26)
    draw_arm(g, 18, 29, 15, 33)
    draw_arm(g, 26, 29, 29, 33)
    draw_goku_head(g, 22, 20, ssj=ssj, grimace=True)
    frames.append(g)

    g = new_frame()
    draw_goku_legs(g, 22, 34, "crouch")
    draw_goku_torso(g, 22, 23)
    draw_arm(g, 18, 26, 11, 20)
    draw_arm(g, 26, 26, 33, 20)
    draw_goku_head(g, 22, 16, ssj=True, mouth_open=True)
    frames.append(g)

    # 25: KO / Defeated on ground
    g = new_frame()
    rect(g, 8, 38, 12, 6, "B")
    rect(g, 18, 37, 13, 7, "O")
    rect(g, 20, 38, 2, 6, "B")
    ellipse(g, 35, 39, 4.5, 4, "S")
    tri(g, 38, 37, 44, 34, 41, 41, "H")
    tri(g, 36, 35, 42, 32, 39, 38, "H")
    frames.append(g)

    return frames


# ---------------------------------------------------------------------------
# ENEMY SPRITE GENERATORS
# Frames (8 frames for standard enemies 48x48):
# 0-1: idle (2)
# 2-3: walk (2)
# 4-5: attack windup, attack strike (2)
# 6: hit (1)
# 7: ko (1)
# ---------------------------------------------------------------------------
def build_scout_frames():
    frames = []
    # 0-1 idle, 2-3 walk, 4 windup, 5 strike, 6 hit, 7 ko
    configs = [
        ("idle", 0, "guard"),
        ("idle", 1, "guard"),
        ("walk0", 0, "swing"),
        ("walk1", -1, "swing2"),
        ("idle", 0, "windup"),
        ("walk0", 0, "punch"),
        ("hit", 0, "hit"),
        ("ko", 0, "ko"),
    ]
    for leg_mode, dy, arm_mode in configs:
        g = new_frame()
        if leg_mode == "ko":
            rect(g, 9, 38, 11, 5, "P")
            rect(g, 19, 37, 13, 7, "W")
            ellipse(g, 35, 39, 4, 4, "S")
            rect(g, 35, 36, 3, 2, "G")
            frames.append(g)
            continue

        # Legs (purple undersuit + white boots)
        if leg_mode == "idle":
            rect(g, 17, 34, 4, 6, "P")
            rect(g, 16, 40, 5, 4, "W")
            rect(g, 24, 34, 4, 6, "P")
            rect(g, 24, 40, 5, 4, "W")
        elif leg_mode == "walk0":
            line(g, 20, 34, 15, 41, "P", 3)
            rect(g, 13, 41, 4, 3, "W")
            line(g, 24, 34, 29, 41, "P", 3)
            rect(g, 28, 41, 5, 3, "W")
        elif leg_mode == "walk1":
            rect(g, 20, 34, 4, 7, "P")
            rect(g, 20, 41, 5, 3, "W")
            rect(g, 23, 33, 4, 5, "P")
            rect(g, 25, 38, 4, 3, "W")
        elif leg_mode == "hit":
            line(g, 21, 34, 17, 41, "P", 3)
            rect(g, 16, 41, 4, 3, "W")
            line(g, 25, 34, 28, 40, "P", 3)
            rect(g, 27, 40, 4, 3, "W")

        cx = 21 if arm_mode == "hit" else 23
        # Saiyan/Frieza-Force Armor torso
        rect(g, cx - 4, 23 + dy, 9, 10, "W")
        rect(g, cx - 5, 23 + dy, 3, 3, "W")  # shoulder pad L
        rect(g, cx + 3, 23 + dy, 4, 3, "W")  # shoulder pad R
        rect(g, cx - 4, 29 + dy, 9, 2, "P")  # armor trim
        rect(g, cx - 4, 31 + dy, 9, 3, "w")

        # Head + Scouter
        ellipse(g, cx + 1, 17 + dy, 4.5, 4.5, "S")
        rect(g, cx - 3, 12 + dy, 7, 2, "P")  # helmet/crest
        put(g, cx + 3, 17 + dy, "E")
        rect(g, cx + 1, 16 + dy, 4, 2, "G")  # green scouter

        # Arms
        if arm_mode == "guard":
            line(g, cx - 4, 25 + dy, cx - 7, 29 + dy, "P", 2)
            line(g, cx + 5, 25 + dy, cx + 9, 28 + dy, "P", 2)
            rect(g, cx + 8, 27 + dy, 3, 3, "S")
        elif arm_mode == "swing":
            line(g, cx - 4, 25 + dy, cx - 8, 28 + dy, "P", 2)
            line(g, cx + 5, 25 + dy, cx + 9, 24 + dy, "P", 2)
        elif arm_mode == "swing2":
            line(g, cx - 4, 25 + dy, cx + 3, 29 + dy, "P", 2)
            line(g, cx + 5, 25 + dy, cx + 2, 29 + dy, "P", 2)
        elif arm_mode == "windup":
            line(g, cx + 4, 25, cx - 2, 23, "P", 2)
            rect(g, cx - 4, 22, 3, 3, "S")
        elif arm_mode == "punch":
            line(g, cx + 4, 25, cx + 17, 24, "P", 2)
            rect(g, cx + 16, 23, 4, 4, "S")
        elif arm_mode == "hit":
            line(g, cx - 4, 25, cx - 9, 21, "P", 2)
            line(g, cx + 4, 25, cx + 9, 22, "P", 2)
        frames.append(g)
    return frames


def build_gremlin_frames():
    # Bio-fighter (Saibaman-inspired crouched agile creature)
    frames = []
    for mode in ["idle0", "idle1", "hop0", "hop1", "windup", "lunge", "hit", "ko"]:
        g = new_frame()
        if mode == "ko":
            ellipse(g, 24, 39, 8, 4, "G")
            ellipse(g, 33, 38, 4, 4, "B")
            frames.append(g)
            continue
        dy = 1 if mode == "idle1" else (-3 if mode == "hop1" else 0)
        cx = 25 if mode == "lunge" else (19 if mode == "hit" else 22)
        # Crouched legs
        if mode == "hop1":
            line(g, cx - 3, 34 + dy, cx - 8, 40 + dy, "G", 2)
            line(g, cx + 3, 34 + dy, cx + 8, 39 + dy, "G", 2)
        else:
            rect(g, cx - 6, 35 + dy, 4, 8, "G")
            rect(g, cx + 2, 35 + dy, 4, 8, "G")
            put(g, cx + 6, 42 + dy, "W")
            put(g, cx - 7, 42 + dy, "W")
        # Torso
        ellipse(g, cx, 30 + dy, 6, 6, "G")
        ellipse(g, cx + 1, 29 + dy, 3, 3, "L")
        # Bulbous alien head with brown ridges
        ellipse(g, cx + 1, 21 + dy, 5.5, 5, "G")
        rect(g, cx - 3, 15 + dy, 8, 3, "B")
        put(g, cx + 4, 21 + dy, "R")
        put(g, cx + 1, 21 + dy, "R")
        line(g, cx + 2, 24 + dy, cx + 5, 24 + dy, "W")
        # Claws
        if mode == "windup":
            line(g, cx - 3, 28, cx - 9, 23, "G", 2)
            rect(g, cx - 11, 21, 3, 3, "W")
        elif mode == "lunge":
            line(g, cx + 4, 28, cx + 16, 25, "G", 2)
            line(g, cx + 15, 24, cx + 19, 23, "W")
            line(g, cx + 15, 27, cx + 19, 27, "W")
        else:
            line(g, cx + 4, 29 + dy, cx + 10, 31 + dy, "G", 2)
            put(g, cx + 11, 31 + dy, "W")
        frames.append(g)
    return frames


def build_blaster_frames():
    # Ranged Ki Trooper
    frames = []
    for mode in ["idle0", "idle1", "walk0", "walk1", "charge", "fire", "hit", "ko"]:
        g = new_frame()
        if mode == "ko":
            rect(g, 10, 38, 12, 5, "A")
            rect(g, 21, 37, 11, 6, "C")
            ellipse(g, 35, 39, 4, 4, "S")
            frames.append(g)
            continue
        dy = 1 if mode == "idle1" else 0
        cx = 20 if mode == "hit" else 22
        # Legs
        if mode == "walk0":
            line(g, cx - 2, 34, cx - 6, 42, "A", 3)
            line(g, cx + 2, 34, cx + 6, 42, "A", 3)
        elif mode == "walk1":
            rect(g, cx - 3, 34, 4, 9, "A")
            rect(g, cx + 2, 33, 4, 8, "A")
        else:
            rect(g, cx - 4, 34, 4, 9, "A")
            rect(g, cx + 2, 34, 4, 9, "A")
        # Armor body + cape/trim
        rect(g, cx - 5, 23 + dy, 10, 11, "A")
        rect(g, cx - 4, 24 + dy, 8, 4, "C")
        rect(g, cx - 5, 31 + dy, 10, 2, "Y")
        # Head + Visor
        ellipse(g, cx + 1, 17 + dy, 4.5, 4.5, "S")
        rect(g, cx - 3, 12 + dy, 8, 3, "A")
        rect(g, cx + 1, 16 + dy, 5, 2, "R")
        # Arm / Blaster cannon
        if mode == "charge":
            line(g, cx + 4, 26, cx + 12, 26, "C", 3)
            rect(g, cx + 12, 24, 4, 4, "Y")
        elif mode == "fire":
            line(g, cx + 4, 26, cx + 16, 25, "C", 3)
            rect(g, cx + 16, 23, 5, 5, "R")
        else:
            line(g, cx + 4, 26 + dy, cx + 10, 28 + dy, "C", 2)
        frames.append(g)
    return frames


# ---------------------------------------------------------------------------
# 64x64 HEAVY / BOSS SPRITE GENERATORS
# ---------------------------------------------------------------------------
def build_heavy_or_boss(kind):
    pal = {
        "brute": PAL_BRUTE,
        "boss1": PAL_BOSS1,
        "boss2": PAL_BOSS2,
        "boss3": PAL_BOSS3,
        "boss4": PAL_BOSS4,
    }[kind]
    frames = []
    # 8 frames: idle0, idle1, walk0, walk1, windup, strike, special, hit, ko (9 frames!)
    modes = ["idle0", "idle1", "walk0", "walk1", "windup", "strike", "special", "hit", "ko"]
    for mode in modes:
        g = new_frame(64, 64)
        if mode == "ko":
            if kind == "boss4":
                rect(g, 12, 50, 16, 7, "W")
                rect(g, 26, 49, 16, 8, "P")
                ellipse(g, 46, 52, 6, 5, "W")
            else:
                rect(g, 10, 49, 16, 8, "A")
                rect(g, 25, 48, 18, 9, "Y" if "Y" in pal else "W")
                ellipse(g, 47, 51, 6, 5, "S" if "S" in pal else "W")
            frames.append(g)
            continue

        dy = 1 if mode == "idle1" else (-2 if mode == "special" and kind == "boss4" else 0)
        cx = 28 if mode == "hit" else (34 if mode == "strike" else 31)

        # Legs (tall muscular stance, ground at y=58)
        leg_ch = "W" if kind == "boss4" else ("A" if "A" in pal else "P")
        boot_ch = "w" if kind == "boss4" else ("Y" if kind in ("brute", "boss2") else "W")
        if mode == "walk0":
            line(g, cx - 4, 42 + dy, cx - 10, 54 + dy, leg_ch, 5)
            rect(g, cx - 13, 53 + dy, 7, 5, boot_ch)
            line(g, cx + 4, 42 + dy, cx + 11, 54 + dy, leg_ch, 5)
            rect(g, cx + 9, 53 + dy, 7, 5, boot_ch)
        elif mode == "walk1":
            rect(g, cx - 5, 42 + dy, 6, 12, leg_ch)
            rect(g, cx - 6, 53 + dy, 7, 5, boot_ch)
            rect(g, cx + 3, 40 + dy, 6, 10, leg_ch)
            rect(g, cx + 4, 49 + dy, 7, 5, boot_ch)
        else:
            rect(g, cx - 8, 42 + dy, 6, 11, leg_ch)
            rect(g, cx - 9, 53 + dy, 7, 5, boot_ch)
            rect(g, cx + 3, 42 + dy, 6, 11, leg_ch)
            rect(g, cx + 3, 53 + dy, 8, 5, boot_ch)

        # Tail for Boss4 or Saiyan Boss1
        if kind == "boss4":
            line(g, cx - 6, 41 + dy, cx - 18, 36 + dy, "W", 3)
            line(g, cx - 18, 36 + dy, cx - 22, 43 + dy, "w", 2)

        # Torso
        if kind == "boss4":
            # Sleek bio-form Emperor Frost
            rect(g, cx - 7, 26 + dy, 14, 16, "W")
            rect(g, cx - 7, 27 + dy, 3, 14, "w")  # left-side shading
            ellipse(g, cx, 32 + dy, 4, 3.5, "P")   # rounded purple chest bio-gem
            put(g, cx + 1, 31 + dy, "C")
            rect(g, cx - 5, 24 + dy, 3, 2, "P")    # shoulder bio-gems
            rect(g, cx + 3, 24 + dy, 3, 2, "P")
            rect(g, cx - 7, 38 + dy, 14, 3, "w")
            ellipse(g, cx + 1, 18 + dy, 6, 6, "W")
            ellipse(g, cx + 1, 14 + dy, 5, 2.5, "P")  # sleek purple head dome
            put(g, cx + 3, 18 + dy, "R")
            put(g, cx + 4, 18 + dy, "R")
        else:
            # Hulking armored warrior
            armor_main = "W" if kind == "boss3" else "A"
            plate_ch = "Y" if "Y" in pal else "W"
            skin_ch = "S"
            rect(g, cx - 9, 25 + dy, 18, 17, armor_main)
            rect(g, cx - 11, 24 + dy, 6, 5, plate_ch)  # big left pauldron
            rect(g, cx + 6, 24 + dy, 7, 5, plate_ch)   # big right pauldron
            rect(g, cx - 7, 28 + dy, 14, 8, plate_ch)  # chest plate
            rect(g, cx - 9, 38 + dy, 18, 3, "R" if kind == "boss1" else plate_ch)

            # Head
            ellipse(g, cx + 1, 18 + dy, 6, 6, skin_ch)
            if kind == "boss1":
                # Wild long spiky Saiyan mane!
                tri(g, cx - 5, 14 + dy, cx - 17, 22 + dy, cx - 4, 28 + dy, "H")
                tri(g, cx - 4, 12 + dy, cx - 12, 8 + dy, cx, 13 + dy, "H")
                tri(g, cx + 1, 12 + dy, cx + 7, 6 + dy, cx + 6, 14 + dy, "H")
                rect(g, cx + 2, 16 + dy, 5, 3, "R")  # red scouter
            elif kind == "boss2":
                # Silver mohawk + glowing eyes
                tri(g, cx - 2, 12 + dy, cx + 2, 5 + dy, cx + 5, 13 + dy, "H")
                put(g, cx + 4, 17 + dy, "R")
            elif kind == "boss3":
                # Horned commander head + cyan scouter
                tri(g, cx - 4, 14 + dy, cx - 10, 7 + dy, cx - 1, 13 + dy, "S")
                tri(g, cx + 3, 14 + dy, cx + 10, 7 + dy, cx + 6, 14 + dy, "S")
                rect(g, cx + 2, 16 + dy, 5, 2, "B")
                put(g, cx + 4, 18 + dy, "R")
            elif kind == "brute":
                rect(g, cx + 2, 16 + dy, 5, 2, "R")  # red scouter

        # Arms
        arm_ch = "W" if kind == "boss4" else "S"
        fist_ch = "P" if kind == "boss4" else "S"
        if mode == "windup":
            line(g, cx + 6, 28, cx - 2, 23, arm_ch, 4)
            rect(g, cx - 5, 20, 5, 5, fist_ch)
        elif mode == "strike":
            line(g, cx + 6, 28, cx + 24, 26, arm_ch, 4)
            rect(g, cx + 22, 24, 6, 6, fist_ch)
        elif mode == "special":
            line(g, cx - 7, 28 + dy, cx - 14, 21 + dy, arm_ch, 3)
            line(g, cx + 7, 28 + dy, cx + 20, 22 + dy, arm_ch, 3)
            rect(g, cx + 19, 20 + dy, 5, 5, "C" if kind == "boss4" else "R")
        elif mode == "hit":
            line(g, cx - 7, 28, cx - 13, 21, arm_ch, 3)
            line(g, cx + 7, 28, cx + 14, 23, arm_ch, 3)
        else:
            line(g, cx - 8, 28 + dy, cx - 11, 35 + dy, arm_ch, 3)
            line(g, cx + 7, 28 + dy, cx + 14, 32 + dy, arm_ch, 3)
            rect(g, cx + 12, 30 + dy, 4, 4, fist_ch)

        frames.append(g)
    return build_sheet(frames, pal, 64, 64)


# ---------------------------------------------------------------------------
# EFFECTS SPRITESHEET (32x32 cells)
# 0: Blue Ki Ball
# 1: Gold Ki Ball
# 2: Enemy Crimson Ki Bolt
# 3: Hit Spark 1 (white/yellow)
# 4: Hit Spark 2 (orange burst)
# 5: Aura Frame 1 (cyan)
# 6: Aura Frame 2 (gold)
# 7: Energy Orb Pickup (cyan)
# 8: Health / Senzu Orb Pickup (green/gold)
# ---------------------------------------------------------------------------
def build_effects_sheet():
    cell = 32
    n = 9
    sheet = Image.new("RGBA", (cell * n, cell), CLEAR)

    def put_px(img, x, y, col):
        if 0 <= x < cell and 0 <= y < cell:
            img.putpixel((x, y), col)

    def circle_cell(idx, rings):
        im = Image.new("RGBA", (cell, cell), CLEAR)
        for r, col in rings:
            for y in range(cell):
                for x in range(cell):
                    if (x - 16) ** 2 + (y - 16) ** 2 <= r ** 2:
                        put_px(im, x, y, col)
        sheet.paste(im, (idx * cell, 0))

    # 0: Blue Ki Blast
    circle_cell(0, [(10, (42, 138, 240, 220)), (7, (112, 224, 255, 255)), (4, (248, 252, 255, 255))])
    # 1: Gold SSJ Ki Blast
    circle_cell(1, [(10, (240, 152, 24, 220)), (7, (255, 232, 72, 255)), (4, (255, 252, 224, 255))])
    # 2: Enemy Crimson Ki Bolt
    circle_cell(2, [(9, (186, 28, 86, 220)), (6, (255, 84, 112, 255)), (3, (255, 228, 232, 255))])

    # 3-4: Hit Sparks
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

    # 5-6: Pixel Flame Aura
    for idx, c1, c2 in [
        (5, (64, 196, 255, 190), (212, 248, 255, 220)),
        (6, (248, 204, 48, 195), (255, 248, 168, 225)),
    ]:
        im = Image.new("RGBA", (cell, cell), CLEAR)
        d = ImageDraw.Draw(im)
        d.polygon([(4, 30), (8, 10), (13, 18), (16, 4), (20, 17), (25, 9), (28, 30)], fill=c1)
        d.polygon([(8, 30), (11, 16), (16, 10), (21, 16), (24, 30)], fill=c2)
        sheet.paste(im, (idx * cell, 0))

    # 7: Energy Orb Pickup (Cyan)
    circle_cell(7, [(7, OUTLINE), (6, (44, 192, 248, 255)), (3, (224, 252, 255, 255))])
    # 8: Health / Senzu Orb Pickup (Emerald)
    circle_cell(8, [(7, OUTLINE), (6, (64, 212, 92, 255)), (3, (218, 255, 212, 255))])

    return sheet


# ---------------------------------------------------------------------------
# PARALLAX PIXEL-ART BACKGROUNDS (4 stages x 3 layers: sky, mid, ground)
# Resolution: 960 x 270 (tiles seamlessly horizontally)
# Ground level in game will be y = 232 (leaving 38px foreground floor)
# ---------------------------------------------------------------------------
def make_stage_backgrounds(stage_id):
    W, H = 960, 270
    rng = random.Random(100 + stage_id * 77)

    sky = Image.new("RGBA", (W, H), CLEAR)
    mid = Image.new("RGBA", (W, H), CLEAR)
    gnd = Image.new("RGBA", (W, H), CLEAR)
    sd = ImageDraw.Draw(sky)
    md = ImageDraw.Draw(mid)
    gd = ImageDraw.Draw(gnd)

    if stage_id == 1:
        # Stage 1: Rocky Wasteland (Warm Sunset Desert + Classic DB Mesas)
        bands = [
            (0, 48, (74, 118, 188, 255)),
            (48, 96, (124, 156, 206, 255)),
            (96, 148, (206, 172, 144, 255)),
            (148, 200, (238, 168, 96, 255)),
            (200, 270, (214, 132, 72, 255)),
        ]
        for y0, y1, col in bands:
            sd.rectangle([0, y0, W, y1], fill=col)
        # Pixel sun
        sd.ellipse([720, 38, 764, 82], fill=(255, 224, 128, 255))
        # Pixel clouds
        for cx in [110, 340, 580, 840]:
            cy = rng.randint(36, 90)
            sd.rectangle([cx, cy, cx + 64, cy + 12], fill=(248, 232, 212, 255))
            sd.rectangle([cx + 12, cy - 8, cx + 48, cy + 2], fill=(255, 246, 236, 255))

        # Midground tall Dragon Ball canyon mesas
        for mx in range(0, W, 160):
            mw = rng.randint(58, 92)
            mh = rng.randint(75, 135)
            top_y = 205 - mh
            md.rectangle([mx + 20, top_y, mx + 20 + mw, 220], fill=(168, 92, 56, 255))
            md.rectangle([mx + 20, top_y, mx + 36, 220], fill=(128, 66, 40, 255))
            md.rectangle([mx + 20, top_y, mx + 20 + mw, top_y + 8], fill=(208, 124, 76, 255))
        # Distant ridge
        pts = [(0, 215)]
        for x in range(0, W + 40, 40):
            pts.append((x, 185 + rng.randint(-12, 16)))
        pts.append((W, 225))
        pts.append((0, 225))
        md.polygon(pts, fill=(144, 78, 46, 255))

        # Ground (y=212..270)
        gd.rectangle([0, 212, W, 224], fill=(214, 142, 74, 255))
        gd.rectangle([0, 224, W, 270], fill=(176, 102, 48, 255))
        gd.rectangle([0, 212, W, 215], fill=(238, 174, 102, 255))
        for x in range(0, W, 24):
            gd.rectangle([x + 4, 230 + (x % 13), x + 14, 234 + (x % 13)], fill=(138, 76, 34, 255))
            if x % 72 == 0:
                # Desert rock / scrub
                gd.rectangle([x + 6, 206, x + 18, 214], fill=(134, 78, 44, 255))
                gd.rectangle([x + 8, 204, x + 15, 208], fill=(172, 108, 64, 255))

    elif stage_id == 2:
        # Stage 2: Mountain Battlefield (Cool Twilight + Jagged Peaks + Stone Ruins)
        bands = [
            (0, 56, (36, 48, 92, 255)),
            (56, 112, (56, 78, 134, 255)),
            (112, 168, (88, 122, 164, 255)),
            (168, 270, (124, 158, 182, 255)),
        ]
        for y0, y1, col in bands:
            sd.rectangle([0, y0, W, y1], fill=col)
        # Pixel moon
        sd.ellipse([160, 30, 198, 68], fill=(236, 242, 255, 255))
        # Distant mountain range
        for x in range(0, W, 120):
            md.polygon([(x - 20, 218), (x + 50, 88 + (x % 29)), (x + 130, 218)], fill=(54, 72, 104, 255))
            md.polygon([(x + 50, 88 + (x % 29)), (x + 32, 124), (x + 68, 124)], fill=(208, 224, 238, 255))
        # Closer pine/rock ridge
        for x in range(0, W, 80):
            md.polygon([(x, 218), (x + 40, 152 + (x % 17)), (x + 80, 218)], fill=(42, 68, 72, 255))

        # Ground (rocky mountain path + grass edge)
        gd.rectangle([0, 212, W, 220], fill=(72, 136, 78, 255))
        gd.rectangle([0, 212, W, 215], fill=(104, 176, 98, 255))
        gd.rectangle([0, 220, W, 270], fill=(86, 92, 106, 255))
        for x in range(0, W, 32):
            gd.rectangle([x + 2, 226, x + 28, 238], fill=(108, 114, 130, 255))
            gd.rectangle([x + 2, 226, x + 28, 229], fill=(134, 142, 158, 255))
            if x % 128 == 0:
                # Broken stone pillar stump
                gd.rectangle([x + 8, 194, x + 22, 214], fill=(116, 122, 138, 255))
                gd.rectangle([x + 8, 194, x + 14, 214], fill=(82, 86, 102, 255))

    elif stage_id == 3:
        # Stage 3: Alien Battlefield (Namek-inspired Teal Sky, Twin Suns, Blue-Green Grass & Ajissa Trees)
        bands = [
            (0, 60, (44, 158, 148, 255)),
            (60, 125, (82, 198, 168, 255)),
            (125, 200, (132, 224, 178, 255)),
            (200, 270, (158, 236, 192, 255)),
        ]
        for y0, y1, col in bands:
            sd.rectangle([0, y0, W, y1], fill=col)
        # Twin alien suns
        sd.ellipse([640, 32, 678, 70], fill=(255, 248, 168, 255))
        sd.ellipse([700, 56, 726, 82], fill=(255, 212, 120, 255))
        # Alien islands & round-top Ajissa trees (layered continuous hills + shaded canopies)
        # Continuous alien water/mist horizon band
        md.rectangle([0, 200, W, 224], fill=(44, 134, 144, 255))
        # Rounded Namekian mesa-hills (overlapping seamlessly across W)
        for x in range(-40, W + 40, 120):
            h = 72 + ((x * 7) % 34)
            md.ellipse([x, 212 - h, x + 130, 240], fill=(56, 148, 152, 255))
            md.ellipse([x + 14, 214 - h, x + 116, 236], fill=(74, 174, 172, 255))
        for x in [70, 260, 490, 720, 880]:
            md.rectangle([x + 12, 155, x + 22, 216], fill=(132, 102, 74, 255))
            md.rectangle([x + 12, 155, x + 15, 216], fill=(96, 72, 50, 255))
            md.ellipse([x - 4, 120, x + 38, 162], fill=(28, 108, 146, 255))
            md.ellipse([x - 1, 122, x + 34, 156], fill=(44, 148, 188, 255))
            md.ellipse([x + 4, 125, x + 24, 142], fill=(84, 202, 224, 255))

        # Alien blue-green ground + crystalline rocks
        gd.rectangle([0, 212, W, 226], fill=(48, 168, 128, 255))
        gd.rectangle([0, 212, W, 215], fill=(82, 216, 164, 255))
        gd.rectangle([0, 226, W, 270], fill=(34, 122, 102, 255))
        for x in range(0, W, 40):
            gd.rectangle([x + 8, 234, x + 20, 240], fill=(26, 92, 82, 255))
            if x % 120 == 0:
                gd.polygon([(x + 10, 214), (x + 16, 198), (x + 22, 214)], fill=(124, 216, 248, 255))

    else:
        # Stage 4: Final Showdown (Volcanic Ruined Arena + Crimson Storm Sky + Magma Fissures)
        bands = [
            (0, 60, (34, 18, 42, 255)),
            (60, 120, (74, 26, 56, 255)),
            (120, 180, (128, 38, 44, 255)),
            (180, 270, (182, 68, 36, 255)),
        ]
        for y0, y1, col in bands:
            sd.rectangle([0, y0, W, y1], fill=col)
        # Floating shattered rock debris in sky
        for x in [120, 310, 560, 790]:
            sd.polygon([(x, 70), (x + 22, 56), (x + 36, 78), (x + 12, 88)], fill=(48, 28, 44, 255))
        # Distant ruined temple pillars & jagged obsidian spires
        for x in range(0, W, 110):
            md.polygon([(x, 218), (x + 36, 108 + (x % 31)), (x + 74, 218)], fill=(44, 24, 38, 255))
            if x % 220 == 0:
                md.rectangle([x + 68, 128, x + 86, 218], fill=(64, 40, 54, 255))
                md.rectangle([x + 64, 124, x + 90, 134], fill=(88, 56, 72, 255))

        # Ground (scorched obsidian tiles + glowing magma cracks)
        gd.rectangle([0, 212, W, 224], fill=(66, 50, 64, 255))
        gd.rectangle([0, 212, W, 215], fill=(104, 78, 96, 255))
        gd.rectangle([0, 224, W, 270], fill=(38, 28, 38, 255))
        for x in range(0, W, 48):
            gd.line([(x + 6, 226), (x + 18, 244), (x + 12, 266)], fill=(244, 108, 32, 255), width=2)
            gd.line([(x + 7, 227), (x + 18, 244)], fill=(255, 208, 84, 255), width=1)

    return sky, mid, gnd


# ---------------------------------------------------------------------------
# RETRO 16-BIT WAV SOUND EFFECTS (assets/audio/*.wav)
# ---------------------------------------------------------------------------
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

    # 1. Punch (short noisy thud + pitch drop)
    s = []
    for i in range(int(sr * 0.11)):
        t = i / sr
        env = max(0, 1 - t / 0.11) ** 1.5
        freq = 220 - 1400 * t
        tone = math.sin(2 * math.pi * max(40, freq) * t) * 0.55 + (rng.random() * 2 - 1) * 0.45
        s.append(tone * env * 0.6)
    write_wav("punch.wav", s)

    # 2. Kick (heavier sweep + snap)
    s = []
    for i in range(int(sr * 0.15)):
        t = i / sr
        env = max(0, 1 - t / 0.15) ** 1.4
        freq = 300 * math.exp(-t * 14)
        tone = (1 if math.sin(2 * math.pi * freq * t) > 0 else -1) * 0.4 + (rng.random() * 2 - 1) * 0.5
        s.append(tone * env * 0.65)
    write_wav("kick.wav", s)

    # 3. Jump (rising square sweep)
    s = []
    phase = 0.0
    for i in range(int(sr * 0.16)):
        t = i / sr
        env = max(0, 1 - t / 0.16)
        freq = 220 + 480 * (t / 0.16)
        phase += 2 * math.pi * freq / sr
        val = (1 if math.sin(phase) > 0 else -1) * 0.35
        s.append(val * env)
    write_wav("jump.wav", s)

    # 4. Ki Blast (pew laser sweep)
    s = []
    phase = 0.0
    for i in range(int(sr * 0.2)):
        t = i / sr
        env = max(0, 1 - t / 0.2) ** 1.2
        freq = 920 * math.exp(-t * 8) + 180
        phase += 2 * math.pi * freq / sr
        val = math.sin(phase) * 0.45 + (1 if math.sin(phase * 2) > 0 else -1) * 0.2
        s.append(val * env * 0.6)
    write_wav("ki_blast.wav", s)

    # 5. Kamehameha (deep charge + roaring beam)
    s = []
    phase = 0.0
    for i in range(int(sr * 0.75)):
        t = i / sr
        if t < 0.25:
            env = t / 0.25
            freq = 160 + 400 * (t / 0.25)
        else:
            env = max(0, 1 - (t - 0.25) / 0.5) ** 0.7
            freq = 320 + 60 * math.sin(t * 50)
        phase += 2 * math.pi * freq / sr
        noise = (rng.random() * 2 - 1) * 0.4
        val = (math.sin(phase) * 0.45 + noise) * env
        s.append(val * 0.7)
    write_wav("kamehameha.wav", s)

    # 6. Hit / Enemy damage
    s = []
    for i in range(int(sr * 0.12)):
        t = i / sr
        env = max(0, 1 - t / 0.12) ** 1.8
        val = ((rng.random() * 2 - 1) * 0.6 + math.sin(2 * math.pi * 120 * t) * 0.4) * env
        s.append(val * 0.65)
    write_wav("hit.wav", s)

    # 7. Transform (golden power surge!)
    s = []
    phase = 0.0
    for i in range(int(sr * 0.6)):
        t = i / sr
        env = min(1.0, t / 0.05) * max(0, 1 - t / 0.6) ** 0.6
        freq = 220 + 660 * (t / 0.6) + 25 * math.sin(t * 70)
        phase += 2 * math.pi * freq / sr
        val = (math.sin(phase) * 0.4 + math.sin(phase * 1.5) * 0.3 + (rng.random() * 2 - 1) * 0.2) * env
        s.append(val * 0.7)
    write_wav("transform.wav", s)

    # 8. Level Complete fanfare
    notes = [523.25, 659.25, 783.99, 1046.50]
    s = []
    for idx, f in enumerate(notes):
        dur = 0.11 if idx < 3 else 0.32
        for i in range(int(sr * dur)):
            t = i / sr
            env = max(0, 1 - t / dur)
            val = (1 if math.sin(2 * math.pi * f * t) > 0 else -1) * 0.35 * env
            s.append(val)
    write_wav("level_clear.wav", s)


def main():
    print("Generating Goku spritesheets...")
    build_sheet(build_goku_frames(ssj=False), PAL_GOKU_BASE, 48, 48).save(
        os.path.join(ASSETS, "sprites", "goku_base.png")
    )
    build_sheet(build_goku_frames(ssj=True), PAL_GOKU_SSJ, 48, 48).save(
        os.path.join(ASSETS, "sprites", "goku_ssj.png")
    )

    print("Generating enemy spritesheets...")
    build_sheet(build_scout_frames(), PAL_SCOUT, 48, 48).save(
        os.path.join(ASSETS, "sprites", "enemy_scout.png")
    )
    build_sheet(build_gremlin_frames(), PAL_GREMLIN, 48, 48).save(
        os.path.join(ASSETS, "sprites", "enemy_gremlin.png")
    )
    build_sheet(build_blaster_frames(), PAL_BLASTER, 48, 48).save(
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

    print("Generating parallax backgrounds...")
    for st in range(1, 5):
        sky, mid, gnd = make_stage_backgrounds(st)
        sky.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_sky.png"))
        mid.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_mid.png"))
        gnd.save(os.path.join(ASSETS, "backgrounds", f"stage{st}_ground.png"))

    print("Generating retro WAV SFX...")
    gen_sfx()
    print("All assets generated successfully!")


if __name__ == "__main__":
    main()
