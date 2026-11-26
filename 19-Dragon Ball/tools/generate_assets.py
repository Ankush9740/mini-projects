"""
Generate refined 16-bit SNES/GBA-quality pixel-art spritesheets for Goku,
enemies, bosses, multi-layer Rocky Wasteland backgrounds, and living-world
props/obstacles for DRAGON BALL: SAIYAN LEGACY.
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
OUTLINE = (22, 16, 30, 255)

# ---------------------------------------------------------------------------
# 16-BIT PALETTES
# ---------------------------------------------------------------------------
PAL_GOKU_BASE = {
    ".": CLEAR,
    "K": OUTLINE,
    "H": (26, 26, 40, 255),      # Hair dark base
    "h": (58, 62, 92, 255),      # Hair sheen
    "d": (14, 14, 24, 255),      # Hair deep shadow
    "S": (246, 204, 160, 255),   # Warm peach skin (matches ref)
    "L": (255, 228, 196, 255),   # Skin highlight
    "s": (206, 148, 104, 255),   # Skin shadow
    "W": (248, 248, 255, 255),   # Eye white
    "E": (20, 22, 34, 255),      # Base black pupil
    "O": (240, 118, 16, 255),    # Iconic Goku orange gi
    "G": (255, 162, 52, 255),    # Gi highlight
    "o": (192, 74, 10, 255),     # Gi crease/shadow
    "B": (24, 112, 200, 255),    # Royal blue undershirt/belt/boots (matches ref)
    "C": (60, 160, 240, 255),    # Blue highlight
    "b": (14, 72, 142, 255),     # Blue shadow
    "R": (224, 40, 40, 255),     # Red boot center stripe (matches ref)
    "Y": (248, 216, 48, 255),    # Gold boot lace/energy (matches ref)
    "M": (255, 248, 216, 255),   # Bright white-gold energy
}

PAL_GOKU_SSJ = {
    **PAL_GOKU_BASE,
    "H": (248, 208, 28, 255),    # Rich SSJ gold hair (matches main-character.jpg)
    "h": (255, 244, 112, 255),   # Bright gold highlights
    "d": (212, 148, 12, 255),    # Warm amber hair shadow
    "E": (32, 196, 92, 255),     # Iconic emerald-green SSJ eyes (matches ref!)
    "S": (250, 210, 164, 255),
    "L": (255, 234, 202, 255),
    "O": (248, 128, 20, 255),
    "G": (255, 184, 68, 255),
    "B": (32, 126, 218, 255),
}

PAL_SCOUT = {
    ".": CLEAR,
    "K": OUTLINE,
    "W": (232, 234, 246, 255),
    "L": (252, 252, 255, 255),
    "w": (160, 166, 194, 255),
    "P": (108, 54, 152, 255),
    "p": (64, 28, 96, 255),
    "V": (148, 88, 196, 255),
    "S": (140, 186, 224, 255),
    "s": (92, 132, 174, 255),
    "T": (184, 220, 248, 255),
    "G": (82, 242, 116, 255),
    "g": (36, 154, 68, 255),
    "R": (224, 58, 66, 255),
    "E": (248, 248, 255, 255),
    "Y": (236, 188, 60, 255),
}

PAL_GREMLIN = {
    ".": CLEAR,
    "K": OUTLINE,
    "G": (88, 180, 64, 255),
    "L": (148, 228, 94, 255),
    "g": (46, 114, 36, 255),
    "B": (144, 102, 62, 255),
    "b": (92, 60, 34, 255),
    "T": (188, 142, 92, 255),
    "R": (238, 48, 52, 255),
    "W": (246, 242, 220, 255),
}

PAL_BLASTER = {
    ".": CLEAR,
    "K": OUTLINE,
    "A": (54, 62, 96, 255),
    "L": (90, 100, 146, 255),
    "a": (30, 34, 58, 255),
    "C": (196, 56, 148, 255),
    "c": (122, 28, 90, 255),
    "M": (244, 116, 200, 255),
    "S": (196, 158, 220, 255),
    "s": (140, 102, 166, 255),
    "R": (255, 76, 84, 255),
    "Y": (255, 218, 78, 255),
}

PAL_BRUTE = {
    ".": CLEAR,
    "K": OUTLINE,
    "S": (224, 162, 116, 255),
    "L": (248, 198, 154, 255),
    "s": (162, 104, 70, 255),
    "A": (42, 46, 70, 255),
    "a": (24, 26, 42, 255),
    "Y": (236, 184, 42, 255),
    "G": (255, 224, 96, 255),
    "y": (162, 116, 20, 255),
    "W": (244, 244, 248, 255),
    "R": (228, 48, 52, 255),
    "H": (28, 24, 34, 255),
}

PAL_BOSS1 = {
    ".": CLEAR,
    "K": OUTLINE,
    "H": (24, 22, 38, 255),
    "h": (64, 62, 100, 255),
    "d": (14, 12, 22, 255),
    "S": (236, 178, 134, 255),
    "L": (252, 212, 172, 255),
    "s": (176, 120, 82, 255),
    "A": (40, 38, 58, 255),
    "a": (22, 20, 34, 255),
    "Y": (214, 164, 64, 255),
    "G": (248, 206, 106, 255),
    "y": (144, 104, 34, 255),
    "R": (216, 46, 62, 255),
    "W": (248, 248, 255, 255),
}

PAL_BOSS2 = {
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

PAL_BOSS3 = {
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

PAL_BOSS4 = {
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
# PIXEL ART DRAWING PRIMITIVES
# ---------------------------------------------------------------------------
def new_frame(w=64, h=64):
    return [[None for _ in range(w)] for _ in range(h)]


def put(grid, x, y, ch):
    h, w = len(grid), len(grid[0])
    xi, yi = int(round(x)), int(round(y))
    if 0 <= xi < w and 0 <= yi < h and ch is not None:
        grid[yi][xi] = ch


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
# REFINED GOKU SPRITESHEET (64x64, 38 frames, feet at y=58)
#  0- 3: idle (4)
#  4- 7: walk (4)
#  8-11: run  (4)
# 12-15: jump (takeoff, rise, fall, land)
# 16-19: punch (windup, straight, cross windup, uppercut)
# 20-23: kick (chamber, extend, recover, air kick)
# 24-25: ki_blast (gather, fire)
# 26-28: kamehameha (cup1, cup2, fire)
# 29-30: charge (2)
# 31-33: hit & knockback (hit stagger, airborne knockback, recover)
# 34-35: transform (crouch, burst roar)
# 36-37: ko (airborne tumble, ground defeated)
# ---------------------------------------------------------------------------
def draw_goku_head(g, cx, cy, ssj=False, mouth="neutral", look_up=0):
    # Reference-inspired (main-character.jpg) 16-bit Goku head & iconic hair!
    # Head / jaw silhouette (~11px wide x 10px tall)
    ellipse(g, cx, cy + 1, 5.2, 4.8, "S")
    rect(g, cx - 3, cy + 4, 7, 2, "S")
    rect(g, cx - 5, cy, 2, 4, "s")        # ear & temple shadow
    put(g, cx - 4, cy + 1, "S")
    put(g, cx + 4, cy + 4, "s")           # chin shadow
    put(g, cx + 3, cy + 2, "L")           # cheek highlight

    if ssj:
        # Lush flame-like SSJ golden locks matching main-character.jpg!
        ellipse(g, cx - 1, cy - 5, 6.8, 4.4, "H")
        tri(g, cx - 7, cy + 1, cx - 12, cy - 5, cx - 3, cy - 5, "H")
        tri(g, cx - 6, cy - 2, cx - 13, cy - 10, cx - 1, cy - 7, "H")
        tri(g, cx - 5, cy - 5, cx - 7, cy - 16, cx + 1, cy - 7, "H")
        tri(g, cx - 2, cy - 5, cx, cy - 17, cx + 4, cy - 7, "H")
        tri(g, cx + 1, cy - 5, cx + 6, cy - 15, cx + 6, cy - 5, "H")
        tri(g, cx + 3, cy - 3, cx + 10, cy - 9, cx + 6, cy, "H")
        line(g, cx - 6, cy - 13, cx - 3, cy - 7, "h")
        line(g, cx, cy - 15, cx + 1, cy - 7, "h")
        line(g, cx + 5, cy - 12, cx + 5, cy - 6, "h")
        line(g, cx - 10, cy - 8, cx - 5, cy - 4, "d")
        line(g, cx + 7, cy - 7, cx + 5, cy - 2, "d")
        tri(g, cx - 5, cy - 4, cx - 7, cy + 1, cx - 3, cy - 1, "H")
        tri(g, cx - 2, cy - 5, cx - 1, cy - 0.5, cx + 1, cy - 3, "H")
        tri(g, cx + 2, cy - 5, cx + 5, cy + 1, cx + 5, cy - 3, "H")
    else:
        # Unmistakable Goku lush spiky black hair
        ellipse(g, cx - 1, cy - 4, 6.4, 4.0, "H")
        tri(g, cx - 5, cy + 1, cx - 14, cy + 1, cx - 4, cy - 4, "H")
        tri(g, cx - 5, cy - 1, cx - 15, cy - 6, cx - 2, cy - 6, "H")
        tri(g, cx - 5, cy - 3, cx - 12, cy - 12, cx, cy - 6, "H")
        tri(g, cx - 3, cy - 5, cx - 1, cy - 15, cx + 4, cy - 6, "H")
        tri(g, cx + 1, cy - 4, cx + 9, cy - 11, cx + 6, cy - 2, "H")
        tri(g, cx + 3, cy - 1, cx + 10, cy - 3, cx + 5, cy + 1, "H")
        line(g, cx - 9, cy - 9, cx - 3, cy - 5, "h")
        line(g, cx, cy - 12, cx + 2, cy - 6, "h")
        line(g, cx + 6, cy - 8, cx + 4, cy - 3, "h")
        line(g, cx - 12, cy - 5, cx - 6, cy - 2, "d")
        tri(g, cx - 5, cy - 4, cx - 6, cy + 1, cx - 3, cy - 1, "H")
        tri(g, cx - 1, cy - 5, cx, cy, cx + 2, cy - 3, "H")
        tri(g, cx + 3, cy - 4, cx + 5, cy, cx + 5, cy - 2, "H")

    # Sharp 16-bit Anime Eye & Diagonal Brow (mirrors main-character.jpg)
    ey = cy - look_up
    put(g, cx + 1, ey, "W")
    put(g, cx + 2, ey, "W")
    put(g, cx + 3, ey, "E")
    put(g, cx + 1, ey + 1, "W")
    put(g, cx + 2, ey + 1, "E")
    put(g, cx + 3, ey + 1, "E")
    # Slanted fierce eyebrow
    put(g, cx, ey - 2, "K")
    put(g, cx + 1, ey - 1, "K")
    put(g, cx + 2, ey - 1, "K")
    put(g, cx + 3, ey - 1, "K")

    # Confident smirk / shout mouth
    if mouth == "shout":
        rect(g, cx + 1, cy + 3, 3, 2, "K")
        put(g, cx + 2, cy + 3, "W")
    elif mouth == "grit":
        line(g, cx, cy + 3, cx + 4, cy + 3, "W")
    else:
        line(g, cx + 1, cy + 3, cx + 4, cy + 3, "K")


def draw_goku_torso(g, cx, cy, lean=0, sash_swing=0):
    # Solid muscular neck connecting head and shoulders seamlessly
    rect(g, cx - 2 + lean, cy - 2, 5, 4, "s")
    put(g, cx + lean, cy - 1, "S")
    # Orange Gi body with prominent shoulders + centered blue V-neck (matches main-character.jpg!)
    tri(g, cx - 6 + lean, cy + 1, cx + 6 + lean, cy + 1, cx + 5 + lean, cy + 12, "O")
    tri(g, cx - 6 + lean, cy + 1, cx - 5 + lean, cy + 12, cx + 5 + lean, cy + 12, "O")
    rect(g, cx - 6 + lean, cy + 1, 13, 3, "O")
    rect(g, cx - 5 + lean, cy + 2, 2, 10, "o")
    line(g, cx + 3 + lean, cy + 3, cx + 5 + lean, cy + 9, "G")
    # Blue undershirt V-neck opening
    tri(g, cx - 1 + lean, cy + 1, cx + 4 + lean, cy + 1, cx + 2 + lean, cy + 6, "B")
    put(g, cx + 1 + lean, cy + 2, "C")
    line(g, cx - 2 + lean, cy + 1, cx + 1 + lean, cy + 7, "o")
    line(g, cx + 4 + lean, cy + 1, cx + 2 + lean, cy + 7, "o")
    # Blue Obi Belt + knotted sash tails
    rect(g, cx - 5 + lean, cy + 11, 11, 2, "B")
    rect(g, cx - 5 + lean, cy + 12, 4, 1, "b")
    rect(g, cx - 1 + lean, cy + 11, 4, 1, "C")
    line(g, cx - 4 + lean, cy + 12, cx - 9 + lean - sash_swing, cy + 18, "B", 2)
    line(g, cx - 3 + lean, cy + 12, cx - 7 + lean - sash_swing, cy + 16, "C", 1)
    # Gi waist skirt flare
    rect(g, cx - 5 + lean, cy + 13, 11, 2, "O")
    rect(g, cx - 5 + lean, cy + 14, 3, 1, "o")


def draw_goku_arm(g, sx, sy, ex, ey, hx, hy, fist_size=2.3):
    # Blue undershirt sleeve starting just outside the orange gi shoulder
    s_start_x = sx + (ex - sx) * 0.14
    s_start_y = sy + (ey - sy) * 0.14
    capsule(g, s_start_x, s_start_y, sx + (ex - sx) * 0.45, sy + (ey - sy) * 0.45, 2.6, 2.3, "B", "C", "b")
    capsule(g, sx + (ex - sx) * 0.38, sy + (ey - sy) * 0.38, ex, ey, 2.3, 2.1, "S", "L", "s")
    mx = ex + (hx - ex) * 0.52
    my = ey + (hy - ey) * 0.52
    capsule(g, ex, ey, mx, my, 2.1, 1.9, "S", "L", "s")
    capsule(g, mx, my, hx, hy, 2.1, 2.0, "B", "C", "b")
    ellipse(g, hx, hy, fist_size, fist_size, "S")
    put(g, hx + 0.6, hy - 0.6, "L")
    put(g, hx - 0.5, hy + 0.6, "s")


def draw_goku_leg(g, hx, hy, kx, ky, fx, fy):
    # Baggy orange gi pants with crease fold & iconic blue/yellow/red boots (matches ref!)
    capsule(g, hx, hy, kx, ky, 3.5, 3.0, "O", "G", "o")
    capsule(g, kx, ky, fx, fy - 4, 3.0, 2.3, "O", "G", "o")
    put(g, kx, ky + 1, "o")
    # Blue boot body
    capsule(g, fx, fy - 4, fx, fy, 2.5, 2.5, "B", "C", "b")
    rect(g, fx - 2, fy - 1, 6, 3, "B")
    # Bright yellow collar stripe across top of boot + vertical red center stripe!
    line(g, fx - 2, fy - 3, fx + 2, fy - 3, "Y")
    line(g, fx, fy - 2, fx, fy + 1, "R")


def build_goku_frames(ssj=False):
    frames = []

    # 0-3: Idle (4 frames smooth breathing & guard sway)
    for dy, gx, sw in [(0, 0, 0), (1, 0, 1), (1, 1, 1), (0, 0, 0)]:
        g = new_frame()
        draw_goku_leg(g, 26, 43, 24, 50, 23, 57)
        draw_goku_leg(g, 33, 43, 36, 50, 37, 57)
        draw_goku_torso(g, 29, 28 + dy, sash_swing=sw)
        draw_goku_arm(g, 25, 31 + dy, 23, 36 + dy, 29, 36 + dy)
        draw_goku_arm(g, 34, 31 + dy, 37, 36 + dy, 41 + gx, 33 + dy)
        draw_goku_head(g, 30, 20 + dy, ssj=ssj)
        frames.append(g)

    # 4-7: Walk (4 frames)
    walk_poses = [
        (-1, 25, 50, 22, 57, 35, 49, 39, 57, 22, 36, 39, 34),
        (0, 28, 50, 29, 57, 33, 46, 34, 53, 27, 37, 35, 35),
        (-1, 34, 49, 38, 57, 26, 50, 23, 57, 36, 36, 24, 36),
        (0, 32, 47, 31, 54, 28, 50, 29, 57, 33, 37, 27, 36),
    ]
    for dy, klx, kly, flx, fly, krx, kry, frx, fry, a1x, a1y, a2x, a2y in walk_poses:
        g = new_frame()
        draw_goku_leg(g, 28, 43 + dy, klx, kly, flx, fly)
        draw_goku_leg(g, 33, 43 + dy, krx, kry, frx, fry)
        draw_goku_torso(g, 30, 28 + dy, lean=1, sash_swing=2)
        draw_goku_arm(g, 26, 31 + dy, 24, 36 + dy, a1x, a1y)
        draw_goku_arm(g, 35, 31 + dy, 36, 36 + dy, a2x, a2y)
        draw_goku_head(g, 32, 20 + dy, ssj=ssj)
        frames.append(g)

    # 8-11: Run (4 frames dynamic low-leaning Dragon Ball dash)
    run_poses = [
        (-1, 23, 50, 17, 57, 38, 48, 44, 55, 18, 35, 42, 34),
        (1, 28, 49, 26, 57, 35, 45, 32, 52, 22, 37, 38, 36),
        (-1, 37, 48, 43, 56, 24, 50, 18, 57, 40, 35, 20, 36),
        (1, 34, 46, 31, 53, 29, 49, 27, 57, 35, 37, 24, 36),
    ]
    for dy, klx, kly, flx, fly, krx, kry, frx, fry, a1x, a1y, a2x, a2y in run_poses:
        g = new_frame()
        draw_goku_leg(g, 28, 43 + dy, klx, kly, flx, fly)
        draw_goku_leg(g, 32, 43 + dy, krx, kry, frx, fry)
        draw_goku_torso(g, 30, 29 + dy, lean=3, sash_swing=5)
        draw_goku_arm(g, 27, 32 + dy, 23, 36 + dy, a1x, a1y)
        draw_goku_arm(g, 36, 32 + dy, 39, 35 + dy, a2x, a2y)
        draw_goku_head(g, 35, 21 + dy, ssj=ssj, mouth="grit")
        frames.append(g)

    # 12-15: Jump (takeoff, rise, fall, landing squash)
    # 12: takeoff
    g = new_frame()
    draw_goku_leg(g, 26, 44, 22, 51, 24, 57)
    draw_goku_leg(g, 33, 44, 37, 50, 36, 57)
    draw_goku_torso(g, 29, 30, lean=2)
    draw_goku_arm(g, 25, 33, 21, 38, 19, 39)
    draw_goku_arm(g, 34, 33, 38, 37, 41, 35)
    draw_goku_head(g, 32, 22, ssj=ssj)
    frames.append(g)
    # 13: rise
    g = new_frame()
    draw_goku_leg(g, 27, 41, 24, 49, 22, 55)
    draw_goku_leg(g, 33, 40, 39, 42, 37, 49)
    draw_goku_torso(g, 29, 26, lean=1, sash_swing=3)
    draw_goku_arm(g, 25, 29, 20, 27, 18, 23)
    draw_goku_arm(g, 34, 29, 39, 27, 42, 24)
    draw_goku_head(g, 31, 18, ssj=ssj, look_up=1)
    frames.append(g)
    # 14: fall
    g = new_frame()
    draw_goku_leg(g, 27, 41, 23, 48, 20, 55)
    draw_goku_leg(g, 33, 41, 37, 48, 40, 54)
    draw_goku_torso(g, 29, 27, lean=0, sash_swing=2)
    draw_goku_arm(g, 25, 30, 19, 26, 17, 22)
    draw_goku_arm(g, 34, 30, 40, 26, 43, 23)
    draw_goku_head(g, 30, 19, ssj=ssj)
    frames.append(g)
    # 15: land squash
    g = new_frame()
    draw_goku_leg(g, 25, 45, 20, 51, 21, 57)
    draw_goku_leg(g, 34, 45, 39, 51, 39, 57)
    draw_goku_torso(g, 29, 32, lean=2, sash_swing=1)
    draw_goku_arm(g, 24, 35, 19, 39, 17, 42)
    draw_goku_arm(g, 34, 35, 40, 39, 42, 42)
    draw_goku_head(g, 31, 24, ssj=ssj, mouth="grit")
    frames.append(g)

    # 16-19: Punch Combo (windup, straight, cross windup, rising uppercut)
    g = new_frame()
    draw_goku_leg(g, 26, 43, 23, 50, 22, 57)
    draw_goku_leg(g, 33, 43, 36, 50, 37, 57)
    draw_goku_torso(g, 28, 28, lean=-1)
    draw_goku_arm(g, 33, 31, 38, 35, 42, 34)
    draw_goku_arm(g, 24, 31, 20, 35, 18, 33)
    draw_goku_head(g, 29, 20, ssj=ssj)
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 26, 43, 22, 50, 19, 57)
    draw_goku_leg(g, 34, 43, 39, 49, 42, 57)
    draw_goku_torso(g, 31, 29, lean=3, sash_swing=4)
    draw_goku_arm(g, 27, 32, 22, 36, 19, 35)
    draw_goku_arm(g, 36, 31, 45, 31, 54, 30, fist_size=2.6)
    line(g, 44, 28, 50, 28, "M")
    line(g, 43, 33, 51, 33, "Y")
    draw_goku_head(g, 34, 21, ssj=ssj, mouth="shout")
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 26, 43, 24, 50, 23, 57)
    draw_goku_leg(g, 34, 43, 38, 50, 39, 57)
    draw_goku_torso(g, 30, 29, lean=1)
    draw_goku_arm(g, 26, 32, 24, 39, 21, 41)
    draw_goku_arm(g, 35, 32, 40, 35, 44, 33)
    draw_goku_head(g, 32, 21, ssj=ssj, mouth="grit")
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 27, 43, 23, 50, 20, 57)
    draw_goku_leg(g, 34, 42, 38, 49, 40, 57)
    draw_goku_torso(g, 31, 27, lean=2, sash_swing=4)
    draw_goku_arm(g, 26, 30, 22, 36, 20, 37)
    draw_goku_arm(g, 35, 29, 42, 24, 49, 16, fist_size=2.6)
    line(g, 46, 23, 51, 17, "M")
    draw_goku_head(g, 33, 19, ssj=ssj, mouth="shout", look_up=1)
    frames.append(g)

    # 20-23: Kick (chamber, extended roundhouse, recover, flying air kick)
    g = new_frame()
    draw_goku_leg(g, 26, 43, 24, 50, 23, 57)
    draw_goku_leg(g, 32, 42, 38, 38, 36, 45)
    draw_goku_torso(g, 28, 28, lean=-1)
    draw_goku_arm(g, 24, 31, 20, 29, 22, 25)
    draw_goku_arm(g, 33, 31, 37, 30, 39, 27)
    draw_goku_head(g, 28, 20, ssj=ssj)
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 25, 43, 23, 50, 21, 57)
    draw_goku_leg(g, 31, 41, 43, 34, 55, 27)
    line(g, 45, 26, 53, 23, "M")
    draw_goku_torso(g, 26, 29, lean=-2, sash_swing=4)
    draw_goku_arm(g, 22, 32, 17, 28, 16, 24)
    draw_goku_arm(g, 30, 32, 35, 30, 37, 28)
    draw_goku_head(g, 26, 21, ssj=ssj, mouth="shout")
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 26, 43, 24, 50, 23, 57)
    draw_goku_leg(g, 33, 43, 37, 46, 41, 52)
    draw_goku_torso(g, 28, 28)
    draw_goku_arm(g, 24, 31, 21, 35, 25, 34)
    draw_goku_arm(g, 33, 31, 37, 34, 40, 31)
    draw_goku_head(g, 29, 20, ssj=ssj)
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 25, 41, 21, 45, 17, 49)
    draw_goku_leg(g, 31, 40, 43, 38, 55, 35)
    line(g, 44, 33, 54, 31, "M")
    draw_goku_torso(g, 26, 27, lean=-2, sash_swing=5)
    draw_goku_arm(g, 22, 30, 16, 27, 15, 23)
    draw_goku_arm(g, 31, 30, 36, 28, 39, 26)
    draw_goku_head(g, 26, 19, ssj=ssj, mouth="shout")
    frames.append(g)

    # 24-25: Ki Blast (gather, fire)
    for step, hx in [(0, 41), (1, 51)]:
        g = new_frame()
        draw_goku_leg(g, 26, 43, 24, 50, 22, 57)
        draw_goku_leg(g, 33, 43, 37, 50, 39, 57)
        draw_goku_torso(g, 30, 28, lean=1 + step)
        draw_goku_arm(g, 26, 31, 22, 36, 20, 35)
        draw_goku_arm(g, 35, 31, 41, 31, hx, 30)
        if step == 1:
            ellipse(g, hx + 2, 30, 2.2, 2.2, "Y")
            put(g, hx + 2, 30, "M")
        draw_goku_head(g, 32 + step, 20, ssj=ssj, mouth="shout" if step else "grit")
        frames.append(g)

    # 26-28: Kamehameha (cup1, cup2, fire)
    for step in range(3):
        g = new_frame()
        if step < 2:
            draw_goku_leg(g, 25, 44, 21, 51, 19, 57)
            draw_goku_leg(g, 34, 44, 38, 51, 40, 57)
            draw_goku_torso(g, 29, 30, lean=-1)
            draw_goku_arm(g, 25, 33, 21, 39, 17, 39 + step)
            draw_goku_arm(g, 33, 33, 26, 40, 19, 41 + step)
            draw_goku_head(g, 30, 22, ssj=ssj, mouth="grit")
        else:
            draw_goku_leg(g, 25, 43, 21, 50, 18, 57)
            draw_goku_leg(g, 35, 43, 41, 49, 44, 57)
            draw_goku_torso(g, 32, 29, lean=3, sash_swing=5)
            draw_goku_arm(g, 28, 31, 38, 31, 49, 30)
            draw_goku_arm(g, 37, 32, 44, 32, 51, 32)
            draw_goku_head(g, 35, 21, ssj=ssj, mouth="shout")
        frames.append(g)

    # 29-30: Charge Ki (2 frames)
    for dy in (0, 1):
        g = new_frame()
        draw_goku_leg(g, 25, 44, 21, 51, 19, 57)
        draw_goku_leg(g, 34, 44, 38, 51, 40, 57)
        draw_goku_torso(g, 29, 30 + dy, sash_swing=4 + dy)
        draw_goku_arm(g, 24, 33 + dy, 19, 38 + dy, 17, 42 + dy)
        draw_goku_arm(g, 34, 33 + dy, 40, 38 + dy, 42, 42 + dy)
        draw_goku_head(g, 29, 22 + dy, ssj=ssj, mouth="shout")
        frames.append(g)

    # 31-33: Hit stagger, Airborne knockback, Recovery
    for lean, airborne in [(-3, False), (-5, True), (-1, False)]:
        g = new_frame()
        if airborne:
            draw_goku_leg(g, 26, 41, 21, 45, 16, 48)
            draw_goku_leg(g, 32, 42, 34, 49, 33, 55)
            draw_goku_torso(g, 27, 29, lean=lean, sash_swing=4)
            draw_goku_arm(g, 22, 31, 16, 27, 13, 22)
            draw_goku_arm(g, 31, 32, 37, 29, 41, 24)
            draw_goku_head(g, 24, 22, ssj=ssj, mouth="shout")
        else:
            draw_goku_leg(g, 26, 43, 23, 50, 21, 57)
            draw_goku_leg(g, 33, 43, 37, 50, 39, 56)
            draw_goku_torso(g, 28, 29, lean=lean, sash_swing=2)
            draw_goku_arm(g, 23, 31, 18, 28, 15, 24)
            draw_goku_arm(g, 32, 32, 38, 30, 41, 27)
            draw_goku_head(g, 27, 21, ssj=ssj, mouth="grit")
        frames.append(g)

    # 34-35: Transform (crouch, burst roar)
    g = new_frame()
    draw_goku_leg(g, 25, 44, 21, 51, 19, 57)
    draw_goku_leg(g, 34, 44, 38, 51, 40, 57)
    draw_goku_torso(g, 29, 31)
    draw_goku_arm(g, 25, 34, 22, 40, 25, 43)
    draw_goku_arm(g, 34, 34, 37, 40, 34, 43)
    draw_goku_head(g, 29, 23, ssj=ssj, mouth="grit")
    frames.append(g)

    g = new_frame()
    draw_goku_leg(g, 25, 44, 21, 51, 19, 57)
    draw_goku_leg(g, 34, 44, 38, 51, 40, 57)
    draw_goku_torso(g, 29, 28, sash_swing=6)
    draw_goku_arm(g, 24, 31, 17, 26, 13, 20)
    draw_goku_arm(g, 34, 31, 41, 26, 45, 20)
    draw_goku_head(g, 29, 20, ssj=True, mouth="shout", look_up=1)
    frames.append(g)

    # 36-37: KO (airborne tumble, flat defeated)
    g = new_frame()
    draw_goku_leg(g, 26, 41, 20, 44, 14, 46)
    draw_goku_leg(g, 30, 43, 26, 49, 22, 54)
    draw_goku_torso(g, 31, 31, lean=-4)
    draw_goku_arm(g, 27, 32, 22, 27, 18, 23)
    draw_goku_arm(g, 35, 34, 40, 32, 44, 30)
    draw_goku_head(g, 27, 24, ssj=ssj, mouth="grit")
    frames.append(g)

    g = new_frame()
    capsule(g, 11, 53, 24, 53, 3.2, 3.0, "O", "G", "o")
    rect(g, 10, 50, 5, 6, "B")
    capsule(g, 25, 52, 38, 52, 4.2, 4.0, "O", "G", "o")
    rect(g, 25, 48, 3, 8, "B")
    ellipse(g, 43, 52, 4.5, 4.0, "S")
    tri(g, 46, 50, 55, 45, 51, 54, "H")
    tri(g, 44, 48, 52, 43, 49, 50, "H")
    frames.append(g)

    return frames


# ---------------------------------------------------------------------------
# ENEMY SPRITES (64x64, 12 frames each, distinct Dragon Ball silhouettes!)
# ---------------------------------------------------------------------------
def build_scout_frames():
    frames = []
    poses = [
        (0, 0, (26, 50, 24, 57), (34, 50, 36, 57), (22, 36, 27, 36), (37, 36, 41, 33), "idle"),
        (1, 0, (26, 50, 24, 57), (34, 50, 36, 57), (22, 37, 27, 37), (37, 37, 41, 34), "idle"),
        (-1, 1, (24, 50, 21, 57), (36, 49, 39, 57), (21, 36, 20, 35), (37, 36, 41, 34), "walk"),
        (0, 1, (28, 50, 29, 57), (34, 46, 34, 53), (24, 37, 27, 37), (35, 36, 37, 35), "walk"),
        (-1, 1, (35, 49, 38, 57), (25, 50, 22, 57), (26, 36, 36, 36), (35, 37, 24, 36), "walk"),
        (0, 1, (32, 47, 31, 54), (28, 50, 29, 57), (27, 37, 32, 36), (34, 37, 27, 37), "walk"),
        (0, -1, (25, 50, 23, 57), (34, 50, 37, 57), (21, 34, 19, 31), (37, 34, 40, 33), "windup"),
        (0, 3, (24, 50, 20, 57), (37, 49, 42, 57), (22, 36, 19, 35), (41, 32, 53, 31), "attack"),
        (0, 2, (25, 50, 22, 57), (35, 50, 39, 57), (22, 36, 19, 36), (40, 32, 49, 31), "special"),
        (0, -3, (25, 50, 22, 57), (35, 50, 38, 56), (19, 30, 16, 25), (37, 30, 41, 26), "hit"),
        (0, -4, (22, 45, 17, 49), (28, 49, 24, 54), (20, 29, 16, 24), (39, 32, 44, 30), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            capsule(g, 12, 53, 24, 53, 3.0, 2.6, "P", "V", "p")
            rect(g, 10, 50, 5, 6, "W")
            capsule(g, 25, 52, 38, 52, 4.2, 4.0, "W", "L", "w")
            rect(g, 26, 48, 3, 8, "P")
            ellipse(g, 43, 52, 4.5, 4.0, "S")
            rect(g, 43, 49, 3, 2, "G")
            frames.append(g)
            continue

        cx = 30 + lean
        capsule(g, cx - 3, 42 + dy, legL[0], legL[1], 3.0, 2.5, "P", "V", "p")
        capsule(g, legL[0], legL[1], legL[2], legL[3] - 2, 2.5, 2.1, "P", "V", "p")
        rect(g, legL[2] - 2, legL[3] - 2, 6, 4, "W")
        capsule(g, cx + 2, 42 + dy, legR[0], legR[1], 3.0, 2.5, "P", "V", "p")
        capsule(g, legR[0], legR[1], legR[2], legR[3] - 2, 2.5, 2.1, "P", "V", "p")
        rect(g, legR[2] - 2, legR[3] - 2, 6, 4, "W")

        # Frieza-force battle armor + sweeping horned shoulder fins
        capsule(g, cx, 30 + dy, cx, 40 + dy, 5.5, 4.8, "W", "L", "w")
        rect(g, cx - 5, 38 + dy, 11, 2, "P")
        tri(g, cx - 7, 40 + dy, cx - 2, 40 + dy, cx - 6, 46 + dy, "W")
        tri(g, cx + 2, 40 + dy, cx + 7, 40 + dy, cx + 6, 46 + dy, "W")
        rect(g, cx - 2, 31 + dy, 5, 5, "P")
        tri(g, cx - 10, 27 + dy, cx - 4, 29 + dy, cx - 5, 32 + dy, "W")
        tri(g, cx + 4, 29 + dy, cx + 10, 27 + dy, cx + 5, 32 + dy, "W")

        capsule(g, cx - 5, 32 + dy, armB[0], armB[1], 2.0, 1.8, "P", "V", "p")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.8, "S", "T", "s")
        capsule(g, cx + 5, 32 + dy, armF[0], armF[1], 2.2, 2.0, "P", "V", "p")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.0, 2.0, "S", "T", "s")
        ellipse(g, armF[2], armF[3], 2.2, 2.2, "S")

        # Alien head with twin back-swept ear fins & glowing green scouter
        hx, hy = cx + 1, 21 + dy
        ellipse(g, hx, hy + 1, 4.5, 4.7, "S")
        tri(g, hx - 4, hy - 2, hx - 9, hy - 6, hx - 2, hy - 4, "P")
        ellipse(g, hx - 1, hy - 3, 4.8, 2.4, "P")
        rect(g, hx - 3, hy - 1, 2, 3, "W")
        rect(g, hx, hy - 1, 5, 2, "G")
        put(g, hx + 4, hy - 1, "g")
        line(g, hx + 1, hy + 3, hx + 3, hy + 3, "K")
        frames.append(g)
    return frames


def build_gremlin_frames():
    frames = []
    # Hunched, low predatory Saibaman silhouette
    poses = [
        (0, 2, (24, 51, 21, 57), (35, 51, 38, 57), (22, 41, 29, 43), (38, 40, 44, 41), "idle"),
        (1, 2, (24, 52, 21, 57), (35, 52, 38, 57), (22, 42, 29, 44), (38, 41, 44, 42), "idle"),
        (-1, 3, (22, 51, 18, 57), (37, 49, 40, 56), (21, 41, 19, 42), (39, 40, 45, 39), "walk"),
        (-3, 3, (25, 48, 22, 53), (36, 47, 39, 52), (22, 38, 27, 39), (39, 37, 46, 36), "walk"),
        (-1, 3, (37, 50, 40, 57), (23, 51, 19, 57), (24, 41, 34, 42), (37, 41, 27, 42), "walk"),
        (0, 3, (31, 49, 30, 55), (27, 51, 27, 57), (24, 41, 30, 41), (37, 40, 43, 41), "walk"),
        (2, 0, (23, 52, 20, 57), (36, 52, 39, 57), (18, 38, 15, 33), (37, 38, 40, 35), "windup"),
        (-2, 5, (21, 49, 16, 55), (38, 48, 44, 54), (20, 39, 17, 38), (43, 35, 54, 33), "attack"),
        (-2, 4, (22, 50, 18, 56), (37, 49, 42, 55), (21, 39, 18, 37), (42, 36, 51, 35), "special"),
        (0, -2, (23, 51, 20, 57), (36, 51, 39, 56), (18, 35, 15, 30), (38, 35, 42, 31), "hit"),
        (0, -3, (20, 46, 15, 50), (28, 50, 24, 54), (19, 34, 15, 29), (39, 36, 44, 34), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            ellipse(g, 24, 53, 9, 4.5, "G")
            ellipse(g, 24, 52, 5, 2.5, "L")
            ellipse(g, 36, 52, 5, 4.5, "B")
            frames.append(g)
            continue

        cx = 28 + lean
        capsule(g, cx - 4, 46 + dy, legL[0], legL[1], 3.0, 2.3, "G", "L", "g")
        capsule(g, legL[0], legL[1], legL[2], legL[3], 2.3, 1.9, "G", "L", "g")
        put(g, legL[2] + 2, legL[3], "W")
        capsule(g, cx + 3, 46 + dy, legR[0], legR[1], 3.0, 2.3, "G", "L", "g")
        capsule(g, legR[0], legR[1], legR[2], legR[3], 2.3, 1.9, "G", "L", "g")
        put(g, legR[2] + 3, legR[3], "W")

        # Deeply hunched bio-torso
        ellipse(g, cx, 40 + dy, 6.8, 6.2, "G")
        ellipse(g, cx + 1, 38 + dy, 3.6, 3.6, "L")
        capsule(g, cx - 5, 37 + dy, armB[0], armB[1], 2.1, 1.8, "G", "L", "g")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.6, "G", "L", "g")
        put(g, armB[2] + 2, armB[3], "W")
        capsule(g, cx + 5, 37 + dy, armF[0], armF[1], 2.2, 1.9, "G", "L", "g")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 1.9, 1.7, "G", "L", "g")
        line(g, armF[2] + 1, armF[3] - 1, armF[2] + 4, armF[3] - 2, "W")
        line(g, armF[2] + 1, armF[3] + 1, armF[2] + 4, armF[3] + 1, "W")

        # Forward-thrust bulbous cranium
        hx, hy = cx + 4, 30 + dy
        ellipse(g, hx, hy + 1, 5.8, 5.0, "G")
        ellipse(g, hx, hy - 3, 5.4, 3.4, "B")
        line(g, hx - 3, hy - 4, hx + 3, hy - 4, "T")
        line(g, hx, hy - 5, hx, hy - 1, "b")
        put(g, hx + 2, hy, "R")
        put(g, hx + 4, hy, "R")
        line(g, hx + 1, hy + 3, hx + 5, hy + 3, "W")
        frames.append(g)
    return frames


def build_blaster_frames():
    frames = []
    poses = [
        (0, 0, (26, 50, 24, 57), (34, 50, 36, 57), (22, 36, 26, 36), (37, 36, 42, 34), "idle"),
        (1, 0, (26, 50, 24, 57), (34, 50, 36, 57), (22, 37, 26, 37), (37, 37, 42, 35), "idle"),
        (-1, 1, (24, 50, 21, 57), (36, 49, 39, 57), (21, 36, 20, 35), (37, 35, 42, 34), "walk"),
        (0, 1, (28, 50, 29, 57), (34, 46, 34, 53), (24, 37, 27, 37), (36, 36, 40, 35), "walk"),
        (-1, 1, (35, 49, 38, 57), (25, 50, 22, 57), (26, 36, 34, 36), (36, 36, 41, 35), "walk"),
        (0, 1, (32, 47, 31, 54), (28, 50, 29, 57), (26, 37, 30, 36), (36, 36, 41, 35), "walk"),
        (0, -1, (25, 50, 23, 57), (34, 50, 37, 57), (21, 35, 19, 34), (37, 34, 43, 33), "windup"),
        (0, 1, (24, 50, 21, 57), (35, 50, 38, 57), (22, 36, 20, 35), (41, 33, 50, 32), "attack"),
        (0, 1, (24, 50, 21, 57), (35, 50, 38, 57), (22, 36, 20, 35), (41, 33, 50, 32), "special"),
        (0, -3, (25, 50, 22, 57), (35, 50, 38, 56), (19, 30, 16, 26), (37, 30, 41, 27), "hit"),
        (0, -4, (22, 45, 17, 49), (28, 49, 24, 54), (20, 29, 16, 24), (39, 32, 44, 30), "ko1"),
        (0, 0, None, None, None, None, "ko2"),
    ]
    for dy, lean, legL, legR, armB, armF, mode in poses:
        g = new_frame()
        if mode == "ko2":
            capsule(g, 12, 53, 24, 53, 3.0, 2.6, "A", "L", "a")
            capsule(g, 25, 52, 38, 52, 4.2, 4.0, "C", "M", "c")
            ellipse(g, 43, 52, 4.5, 4.0, "S")
            frames.append(g)
            continue

        cx = 30 + lean
        capsule(g, cx - 3, 42 + dy, legL[0], legL[1], 3.0, 2.5, "A", "L", "a")
        capsule(g, legL[0], legL[1], legL[2], legL[3], 2.5, 2.2, "A", "L", "a")
        rect(g, legL[2] - 2, legL[3] - 2, 5, 3, "C")
        capsule(g, cx + 2, 42 + dy, legR[0], legR[1], 3.0, 2.5, "A", "L", "a")
        capsule(g, legR[0], legR[1], legR[2], legR[3], 2.5, 2.2, "A", "L", "a")
        rect(g, legR[2] - 2, legR[3] - 2, 5, 3, "C")

        # Flowing sniper cape + dark armor + Ki cannon
        tri(g, cx - 5, 29 + dy, cx - 12, 46 + dy, cx - 2, 43 + dy, "c")
        capsule(g, cx, 30 + dy, cx, 40 + dy, 5.5, 4.8, "A", "L", "a")
        rect(g, cx - 4, 31 + dy, 8, 5, "C")
        rect(g, cx - 5, 38 + dy, 10, 2, "Y")
        capsule(g, cx - 5, 32 + dy, armB[0], armB[1], 2.0, 1.8, "A", "L", "a")
        capsule(g, armB[0], armB[1], armB[2], armB[3], 1.8, 1.8, "S", None, "s")
        capsule(g, cx + 5, 32 + dy, armF[0], armF[1], 2.2, 2.2, "C", "M", "c")
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.8, 2.5, "C", "M", "c")
        if mode == "windup":
            ellipse(g, armF[2] + 2, armF[3], 2.5, 2.5, "Y")
        elif mode in ("attack", "special"):
            ellipse(g, armF[2] + 2, armF[3], 3.2, 3.2, "R")
            put(g, armF[2] + 2, armF[3], "Y")

        hx, hy = cx + 1, 21 + dy
        ellipse(g, hx, hy + 1, 4.5, 4.6, "S")
        tri(g, hx - 6, hy - 2, hx - 9, hy - 9, hx + 4, hy - 3, "A")
        rect(g, hx - 4, hy - 4, 9, 3, "A")
        line(g, hx - 6, hy - 7, hx + 3, hy - 4, "L")
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
                capsule(g, 11, 53, 24, 53, 3.2, 2.8, "W", "L", "w")
                capsule(g, 25, 52, 39, 52, 4.5, 4.2, "P", "C", "p")
                ellipse(g, 45, 52, 5, 4.2, "W")
            else:
                capsule(g, 10, 53, 24, 53, 3.8, 3.2, "A", None, "a")
                capsule(g, 25, 52, 41, 52, 5.2, 4.8, "Y" if "Y" in pal else "W", None, "y" if "y" in pal else "w")
                ellipse(g, 47, 52, 5, 4.5, "S" if "S" in pal else "W")
            frames.append(g)
            continue

        cx = 30 + lean
        leg_c = "W" if kind == "boss4" else ("A" if "A" in pal else "W")
        leg_hi = "L" if kind == "boss4" else None
        leg_sh = "w" if kind == "boss4" else "a"
        boot_c = "w" if kind == "boss4" else ("Y" if kind in ("brute", "boss2") else "W")

        capsule(g, cx - 4, 40 + dy, legL[0], legL[1], 3.6, 3.0, leg_c, leg_hi, leg_sh)
        capsule(g, legL[0], legL[1], legL[2], legL[3] - 2, 3.0, 2.5, leg_c, leg_hi, leg_sh)
        rect(g, legL[2] - 3, legL[3] - 3, 7, 4, boot_c)
        capsule(g, cx + 4, 40 + dy, legR[0], legR[1], 3.6, 3.0, leg_c, leg_hi, leg_sh)
        capsule(g, legR[0], legR[1], legR[2], legR[3] - 2, 3.0, 2.5, leg_c, leg_hi, leg_sh)
        rect(g, legR[2] - 3, legR[3] - 3, 7, 4, boot_c)

        if kind == "boss4":
            capsule(g, cx - 5, 38 + dy, cx - 15, 33 + dy, 2.2, 1.8, "W", "L", "w")
            capsule(g, cx - 15, 33 + dy, cx - 19, 40 + dy, 1.8, 1.3, "W", None, "w")

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
            tri(g, cx - 13, 24 + dy, cx - 4, 24 + dy, cx - 5, 30 + dy, plate_c)
            tri(g, cx + 4, 24 + dy, cx + 13, 24 + dy, cx + 5, 30 + dy, plate_c)
            line(g, cx - 12, 24 + dy, cx - 5, 24 + dy, plate_hi)
            line(g, cx + 5, 24 + dy, cx + 12, 24 + dy, plate_hi)
            rect(g, cx - 7, 37 + dy, 14, 3, "R" if kind == "boss1" else plate_sh)

        arm_c = "W" if kind == "boss4" else "S"
        arm_hi = "L"
        arm_sh = "w" if kind == "boss4" else "s"
        capsule(g, cx - 7, 27 + dy, armB[0], armB[1], 2.8, 2.3, arm_c, arm_hi, arm_sh)
        capsule(g, armB[0], armB[1], armB[2], armB[3], 2.3, 2.2, arm_c, arm_hi, arm_sh)
        capsule(g, cx + 7, 27 + dy, armF[0], armF[1], 3.0, 2.5, arm_c, arm_hi, arm_sh)
        capsule(g, armF[0], armF[1], armF[2], armF[3], 2.5, 2.4, arm_c, arm_hi, arm_sh)
        fist_c = "P" if kind == "boss4" else ("R" if mode == "special" else arm_c)
        ellipse(g, armF[2], armF[3], 2.8, 2.8, fist_c)

        hx, hy = cx + 1, 18 + dy
        skin_c = "W" if kind == "boss4" else "S"
        ellipse(g, hx, hy + 1, 5.2, 5.2, skin_c)
        if kind != "boss4":
            rect(g, hx - 4, hy + 2, 2, 3, "s")
            put(g, hx + 3, hy + 1, "L")
        if kind == "boss1":
            tri(g, hx - 4, hy - 2, hx - 17, hy + 11, hx - 4, hy + 15, "H")
            tri(g, hx - 5, hy - 3, hx - 15, hy + 2, hx - 3, hy + 7, "H")
            tri(g, hx - 4, hy - 4, hx - 12, hy - 12, hx, hy - 5, "H")
            tri(g, hx + 1, hy - 4, hx + 8, hy - 11, hx + 5, hy - 2, "H")
            line(g, hx - 12, hy + 4, hx - 6, hy + 9, "h")
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
# WORLD PROPS & LIVING-ENVIRONMENT SPRITESHEET (assets/effects/world_props.png)
# Structured 64x64 cells (8 cells -> 512x64):
#  0: Large Pixel Cloud (for dynamic sky drift)
#  1: Small Pixel Cloud
#  2: Birds Frame 0 (wings up) & Frame 1 (wings down) stacked inside 64x64
#  3: Twisted Desert Tree (canopy + trunk, drawn separately or swayed)
#  4: Solid Boulder Obstacle (unbreakable cover rock)
#  5: Destructible Cracked Boulder (intact vs cracked halves? Let's make 5=intact, 6=cracked!)
#  6: Destructible Cracked Boulder (damaged state with deep glowing cracks)
#  7: Fallen Ancient Log / Ruined Stone Pillar Obstacle
# ---------------------------------------------------------------------------
def build_world_props():
    cell = 64
    sheet = Image.new("RGBA", (cell * 8, cell), CLEAR)

    # 0: Large Sculpted Cloud
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    blobs = [(32, 34, 22, 9), (16, 37, 13, 6), (48, 38, 14, 6), (25, 28, 13, 8), (39, 30, 11, 7)]
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx, cy - ry + 2, cx + rx, cy + ry + 2], fill=(182, 136, 134, 235))
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(244, 216, 192, 245))
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx * 0.8, cy - ry * 0.7 - 1, cx + rx * 0.8, cy + ry * 0.5 - 1], fill=(255, 248, 234, 255))
    sheet.paste(im, (0, 0))

    # 1: Small Sculpted Cloud
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    blobs = [(32, 34, 15, 6), (21, 36, 9, 4), (42, 36, 10, 4), (30, 30, 9, 5)]
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx, cy - ry + 2, cx + rx, cy + ry + 2], fill=(182, 136, 134, 215))
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(244, 216, 192, 230))
    for cx, cy, rx, ry in blobs:
        d.ellipse([cx - rx * 0.75, cy - ry * 0.65 - 1, cx + rx * 0.75, cy + ry * 0.45 - 1], fill=(255, 248, 234, 245))
    sheet.paste(im, (cell * 1, 0))

    # 2: Animated Bird Frames (top half y=0..32 wings up, bottom half y=32..64 wings down)
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    # Frame 0 (wings up) at (32, 16)
    d.line([(24, 12), (28, 10), (32, 16), (36, 10), (40, 12)], fill=(48, 34, 46, 255), width=2)
    d.point((32, 17), fill=(92, 62, 68, 255))
    # Frame 1 (wings down) at (32, 48)
    d.line([(24, 50), (28, 48), (32, 46), (36, 48), (40, 50)], fill=(48, 34, 46, 255), width=2)
    d.point((32, 45), fill=(92, 62, 68, 255))
    sheet.paste(im, (cell * 2, 0))

    # 3: Twisted Desert Tree (top=canopy y=6..36, trunk y=32..62)
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    # Gnarled trunk
    d.polygon([(27, 62), (29, 34), (35, 34), (38, 62)], fill=(104, 62, 38, 255))
    d.polygon([(29, 34), (32, 34), (33, 62), (27, 62)], fill=(138, 86, 52, 255))
    d.line([(31, 36), (22, 28)], fill=(104, 62, 38, 255), width=3)
    d.line([(33, 36), (43, 29)], fill=(104, 62, 38, 255), width=3)
    # Layered olive-green desert foliage clusters
    for cx, cy, rx, ry, col in [
        (32, 22, 18, 10, (54, 96, 44, 255)),
        (20, 25, 11, 7, (54, 96, 44, 255)),
        (44, 25, 11, 7, (54, 96, 44, 255)),
        (32, 19, 15, 8, (86, 138, 58, 255)),
        (21, 22, 9, 5, (86, 138, 58, 255)),
        (43, 23, 8, 5, (86, 138, 58, 255)),
        (30, 15, 10, 5, (124, 178, 78, 255)),
    ]:
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=col)
    sheet.paste(im, (cell * 3, 0))

    # 4: Solid Large Boulder Obstacle (44x34 grounded at y=62)
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    poly = [(10, 62), (12, 42), (20, 30), (35, 28), (48, 36), (54, 62)]
    d.polygon(poly, fill=(122, 66, 40, 255), outline=OUTLINE)
    d.polygon([(12, 42), (20, 30), (35, 28), (32, 62), (10, 62)], fill=(166, 94, 54, 255))
    d.polygon([(20, 30), (35, 28), (38, 36), (17, 39)], fill=(214, 134, 78, 255))
    d.line([(20, 30), (35, 28)], fill=(242, 176, 110, 255), width=2)
    d.line([(30, 38), (36, 49), (33, 59)], fill=OUTLINE, width=1)
    sheet.paste(im, (cell * 4, 0))

    # 5 & 6: Destructible Cracked Boulder (5=intact, 6=heavy cracks)
    for idx, damaged in [(5, False), (6, True)]:
        im = Image.new("RGBA", (cell, cell), CLEAR)
        d = ImageDraw.Draw(im)
        poly = [(14, 62), (16, 40), (24, 28), (40, 29), (49, 43), (50, 62)]
        d.polygon(poly, fill=(144, 82, 52, 255), outline=OUTLINE)
        d.polygon([(16, 40), (24, 28), (36, 30), (32, 62), (14, 62)], fill=(192, 118, 72, 255))
        d.line([(24, 28), (39, 29)], fill=(246, 188, 120, 255), width=2)
        # Cracks
        crack_col = (255, 212, 92, 255) if damaged else (52, 28, 22, 255)
        d.line([(28, 31), (32, 42), (26, 52), (31, 60)], fill=OUTLINE, width=2 if damaged else 1)
        d.line([(32, 42), (42, 45), (46, 52)], fill=crack_col, width=1)
        if damaged:
            d.line([(21, 41), (29, 44), (24, 54)], fill=crack_col, width=1)
        sheet.paste(im, (cell * idx, 0))

    # 7: Fallen Ancient Desert Tree Trunk / Broken Ruin Obstacle
    im = Image.new("RGBA", (cell, cell), CLEAR)
    d = ImageDraw.Draw(im)
    d.polygon([(6, 62), (8, 44), (52, 42), (58, 52), (56, 62)], fill=(94, 56, 36, 255), outline=OUTLINE)
    d.polygon([(8, 44), (52, 42), (50, 50), (8, 52)], fill=(138, 86, 52, 255))
    d.line([(12, 47), (46, 46)], fill=(172, 114, 72, 255), width=1)
    d.ellipse([50, 43, 58, 60], fill=(178, 128, 84, 255), outline=OUTLINE)
    sheet.paste(im, (cell * 7, 0))

    return sheet


# ---------------------------------------------------------------------------
# REDESIGNED ROCKY WASTELAND BACKGROUNDS (No flat blocks, organic irregular
# Dragon Ball canyon spires, arches, mountain silhouettes & dithered sky)
# ---------------------------------------------------------------------------
BAYER4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
]


def draw_dithered_sky(img, stops):
    W, H = img.size
    px = img.load()
    for y in range(H):
        c0, c1, t = stops[0][1], stops[-1][1], 0.0
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


def draw_organic_spire(img, cx, base_y, base_w, height, pal, seed):
    """Draw an irregular, tapered craggy rock spire/butte (not a rectangle!)."""
    px = img.load()
    W, H = img.size
    lit, mid, sh, dark, rim = pal
    top_y = base_y - height

    for y in range(max(0, top_y), min(H, base_y)):
        p = (y - top_y) / max(1, height)
        # Tapered irregular spire/butte profile with natural ledges
        if p < 0.08:
            half_w = base_w * (0.14 + p * 2.2)
        else:
            wobble = math.sin(p * 11 + seed) * 4.5 + math.cos(p * 23 + seed * 2) * 2.2
            half_w = base_w * (0.28 + 0.34 * (p ** 0.75)) + wobble
        tilt = math.sin(seed) * (1 - p) * 6
        lx = int(cx + tilt - half_w)
        rx = int(cx + tilt + half_w)

        strata = ((y + seed * 5) // 13)
        is_ledge = ((y + seed * 5) % 13) == 0
        for x in range(lx, rx + 1):
            wx = x % W
            rel = (x - lx) / max(1, (rx - lx))
            if y - top_y <= 3:
                col = rim
            elif is_ledge and rel < 0.74:
                col = lit if rel < 0.36 else sh
            elif rel < 0.16 or (rel < 0.28 and strata % 2 == 0):
                col = lit
            elif rel > 0.70:
                col = dark if rel > 0.86 else sh
            else:
                col = mid
            # Organic broken fissures
            hsh = ((x * 11 + seed * 17) ^ (y // 9)) & 31
            if hsh == 0 and 0.14 < p < 0.9 and 0.18 < rel < 0.82:
                col = dark
            px[wx, y] = col


def make_stage1_rocky_wasteland():
    W, H = 960, 270
    rng = random.Random(2026)

    # 1. SKY LAYER (Pure atmospheric Bayer-dithered sunset + glowing sun; clouds animated in JS!)
    sky = Image.new("RGBA", (W, H), CLEAR)
    draw_dithered_sky(sky, [
        (0, (48, 86, 162)),
        (48, (88, 128, 194)),
        (98, (156, 158, 184)),
        (146, (222, 158, 114)),
        (198, (242, 178, 92)),
        (270, (214, 130, 68)),
    ])
    sd = ImageDraw.Draw(sky)
    sd.ellipse([708, 30, 778, 100], fill=(252, 206, 120, 120))
    sd.ellipse([720, 42, 766, 88], fill=(255, 232, 152, 255))
    sd.ellipse([728, 50, 758, 80], fill=(255, 248, 208, 255))

    # 2. FAR LAYER: Detailed jagged distant mountain range + atmospheric valley haze
    far = Image.new("RGBA", (W, H), CLEAR)
    fd = ImageDraw.Draw(far)
    # Back silhouette range
    pts1 = [(0, 226)]
    for x in range(0, W + 20, 20):
        idx = (x % W) // 20
        y = 136 + int(math.sin(idx * 0.45) * 26 + math.cos(idx * 1.15) * 14 + math.sin(idx * 2.3) * 7)
        pts1.append((x, y))
    pts1.append((W, 226))
    fd.polygon(pts1, fill=(138, 84, 74, 255))
    # Sunlit ridge highlight on left-facing mountain slopes
    for i in range(1, len(pts1) - 2):
        x0, y0 = pts1[i]
        x1, y1 = pts1[i + 1]
        if y1 < y0:
            fd.line([(x0, y0), (x1, y1)], fill=(178, 112, 88, 255), width=2)

    # Secondary closer ridge for layered mountain depth
    pts2 = [(0, 228)]
    for x in range(0, W + 16, 16):
        idx = (x % W) // 16
        y = 166 + int(math.sin(idx * 0.52 + 1.2) * 16 + math.cos(idx * 1.4) * 9)
        pts2.append((x, y))
    pts2.append((W, 228))
    fd.polygon(pts2, fill=(122, 68, 56, 255))
    fd.rectangle([0, 198, W, 228], fill=(184, 118, 84, 90))

    # 3. MIDGROUND LAYER: Eroded Dragon Ball rock spires, natural rock arch, craggy foothills
    mid = Image.new("RGBA", (W, H), CLEAR)
    spire_pal = (
        (214, 128, 74, 255),
        (170, 90, 50, 255),
        (130, 64, 38, 255),
        (90, 42, 26, 255),
        (240, 162, 100, 255),
    )
    spires = [
        (72, 222, 74, 116, 3),
        (210, 222, 52, 86, 17),
        (365, 222, 92, 134, 29),
        (540, 222, 62, 94, 41),
        (715, 222, 86, 128, 53),
        (875, 222, 58, 82, 67),
    ]
    for cx, by, bw, bh, seed in spires:
        draw_organic_spire(mid, cx, by, bw, bh, spire_pal, seed)

    # Natural weathered sandstone arch at x=575..665
    md = ImageDraw.Draw(mid)
    md.arc([582, 152, 668, 232], 182, 358, fill=(166, 88, 50, 255), width=13)
    md.arc([582, 152, 668, 232], 195, 340, fill=(214, 128, 74, 255), width=4)

    # Craggy continuous canyon foothills
    hill_pts = [(0, 230)]
    for hx in range(0, W + 20, 20):
        idx = (hx % W) // 20
        hy = 194 + int(math.sin(idx * 0.65) * 10 + math.cos(idx * 1.35) * 6)
        hill_pts.append((hx, hy))
    hill_pts.append((W, 230))
    md.polygon(hill_pts, fill=(136, 70, 40, 255))
    for i in range(1, len(hill_pts) - 2):
        md.line([hill_pts[i], hill_pts[i + 1]], fill=(182, 102, 58, 255), width=2)

    # 4. BASE BACKDROP GROUND (y=210..270 — dynamic terrain segments render cleanly over this!)
    gnd = Image.new("RGBA", (W, H), CLEAR)
    gd = ImageDraw.Draw(gnd)
    gd.rectangle([0, 212, W, 270], fill=(104, 52, 28, 255))
    gd.rectangle([0, 212, W, 222], fill=(148, 82, 42, 255))
    for x in range(0, W, 32):
        gd.line([(x + 4, 224), (x + 16, 236)], fill=(78, 38, 20, 255), width=1)
        gd.ellipse([x + 12, 240 + (x % 17), x + 16, 243 + (x % 17)], fill=(78, 38, 20, 255))

    # 5. FOREGROUND SILHOUETTE LAYER (1.18x parallax)
    fg = Image.new("RGBA", (W, H), CLEAR)
    fgd = ImageDraw.Draw(fg)
    for fx in [65, 310, 545, 800]:
        fgd.polygon([(fx, 270), (fx + 10, 257), (fx + 26, 255), (fx + 38, 270)], fill=(66, 32, 18, 255))
        fgd.line([(fx + 10, 257), (fx + 26, 255)], fill=(108, 56, 30, 255), width=1)

    return sky, far, mid, gnd, fg


def make_other_stage_backgrounds(stage_id):
    W, H = 960, 270
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


def main():
    print("Generating refined 64x64 Goku spritesheets (38 frames)...")
    build_sheet(build_goku_frames(ssj=False), PAL_GOKU_BASE, 64, 64).save(
        os.path.join(ASSETS, "sprites", "goku_base.png")
    )
    build_sheet(build_goku_frames(ssj=True), PAL_GOKU_SSJ, 64, 64).save(
        os.path.join(ASSETS, "sprites", "goku_ssj.png")
    )

    print("Generating refined enemy & boss spritesheets...")
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

    print("Generating effects & world props sheets...")
    build_effects_sheet().save(os.path.join(ASSETS, "effects", "effects.png"))
    build_world_props().save(os.path.join(ASSETS, "effects", "world_props.png"))

    print("Generating Rocky Wasteland & stage backgrounds...")
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

    print("All assets generated successfully!")


if __name__ == "__main__":
    main()
