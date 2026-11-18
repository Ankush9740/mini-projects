import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_svg_icons():
    os.makedirs('assets/icons', exist_ok=True)
    os.makedirs('assets/images/decorative', exist_ok=True)

    icons = {
        'om.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M38 25 C30 25 24 31 24 39 C24 47 31 52 38 52 C45 52 52 47 52 39 C52 31 46 25 38 25 Z" stroke="#E6C77A" stroke-width="4" fill="#C99A45" fill-opacity="0.2"/>
  <path d="M38 52 C28 52 20 60 20 71 C20 82 30 90 42 90 C54 90 64 80 64 68 C64 54 52 52 52 52" stroke="#E6C77A" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M52 52 C62 52 72 58 76 68 C80 78 76 88 68 90" stroke="#C99A45" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M68 35 C76 35 84 32 88 28" stroke="#E6C77A" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="78" cy="22" r="4" fill="#E6C77A"/>
</svg>''',

        'lotus.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M50 15 C45 35 30 55 50 85 C70 55 55 35 50 15 Z" fill="#C99A45" fill-opacity="0.4" stroke="#E6C77A" stroke-width="3"/>
  <path d="M50 85 C25 80 15 55 25 40 C35 50 42 68 50 85 Z" fill="#8E3037" fill-opacity="0.35" stroke="#E6C77A" stroke-width="2.5"/>
  <path d="M50 85 C75 80 85 55 75 40 C65 50 58 68 50 85 Z" fill="#8E3037" fill-opacity="0.35" stroke="#E6C77A" stroke-width="2.5"/>
  <path d="M50 85 C15 90 5 70 12 55 C22 62 38 74 50 85 Z" fill="#C99A45" fill-opacity="0.2" stroke="#E6C77A" stroke-width="2"/>
  <path d="M50 85 C85 90 95 70 88 55 C78 62 62 74 50 85 Z" fill="#C99A45" fill-opacity="0.2" stroke="#E6C77A" stroke-width="2"/>
  <circle cx="50" cy="82" r="5" fill="#E6C77A"/>
</svg>''',

        'bow.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M20 15 C55 25 65 50 65 50 C65 50 55 75 20 85" stroke="#E6C77A" stroke-width="5" stroke-linecap="round"/>
  <path d="M20 15 L20 85" stroke="#F3E7D0" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M10 50 L85 50" stroke="#C99A45" stroke-width="4" stroke-linecap="round"/>
  <polygon points="85,50 72,43 75,50 72,57" fill="#E6C77A"/>
  <path d="M15 45 L10 50 L15 55" stroke="#E6C77A" stroke-width="3" fill="none"/>
  <circle cx="45" cy="50" r="3" fill="#E6C77A"/>
</svg>''',

        'chakra.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="42" stroke="#E6C77A" stroke-width="4" stroke-dasharray="6 4"/>
  <circle cx="50" cy="50" r="35" stroke="#C99A45" stroke-width="3"/>
  <circle cx="50" cy="50" r="10" fill="#E6C77A" stroke="#571F27" stroke-width="2"/>
  <g stroke="#E6C77A" stroke-width="2.5">
    <line x1="50" y1="15" x2="50" y2="85"/>
    <line x1="15" y1="50" x2="85" y2="50"/>
    <line x1="25" y1="25" x2="75" y2="75"/>
    <line x1="25" y1="75" x2="75" y2="25"/>
  </g>
  <path d="M50 5 L53 15 L47 15 Z M50 95 L53 85 L47 85 Z M5 50 L15 53 L15 47 Z M95 50 L85 53 L85 47 Z" fill="#E6C77A"/>
</svg>''',

        'chariot.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="35" cy="70" r="20" stroke="#E6C77A" stroke-width="4"/>
  <circle cx="35" cy="70" r="6" fill="#C99A45"/>
  <g stroke="#E6C77A" stroke-width="2">
    <line x1="35" y1="50" x2="35" y2="90"/>
    <line x1="15" y1="70" x2="55" y2="70"/>
    <line x1="21" y1="56" x2="49" y2="84"/>
    <line x1="21" y1="84" x2="49" y2="56"/>
  </g>
  <path d="M25 65 L25 35 Q30 20 45 20 L55 35 L60 65 Z" fill="#8E3037" fill-opacity="0.4" stroke="#E6C77A" stroke-width="3"/>
  <path d="M45 20 L45 5 L60 12 L45 18" fill="#C99A45" stroke="#E6C77A" stroke-width="1.5"/>
  <line x1="55" y1="65" x2="88" y2="65" stroke="#E6C77A" stroke-width="4"/>
</svg>''',

        'conch.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M30 20 C50 15 75 30 70 55 C65 75 45 85 30 80 C20 75 18 60 24 45 C28 35 25 25 30 20 Z" fill="#F3E7D0" stroke="#E6C77A" stroke-width="3"/>
  <path d="M35 30 C50 32 60 45 55 65 C52 75 40 76 35 70" stroke="#C99A45" stroke-width="2" fill="none"/>
  <path d="M30 80 C22 84 15 80 18 72" stroke="#E6C77A" stroke-width="3" fill="none"/>
  <circle cx="42" cy="45" r="3" fill="#C99A45"/>
</svg>''',

        'feather.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M20 85 C35 65 50 45 75 15" stroke="#E6C77A" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="65" cy="30" rx="22" ry="16" transform="rotate(-45 65 30)" fill="#172B43" stroke="#688BA7" stroke-width="2"/>
  <ellipse cx="65" cy="30" rx="14" ry="10" transform="rotate(-45 65 30)" fill="#344E3D" stroke="#E6C77A" stroke-width="2"/>
  <circle cx="65" cy="30" r="5" fill="#C99A45"/>
  <path d="M50 45 Q40 50 30 65 M55 40 Q65 42 75 50 M40 55 Q30 62 25 75" stroke="#688BA7" stroke-width="1.5" stroke-linecap="round"/>
</svg>''',

        'temple.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <polygon points="50,10 40,25 60,25" fill="#C99A45" stroke="#E6C77A" stroke-width="2"/>
  <path d="M50 5 L50 10" stroke="#E6C77A" stroke-width="3"/>
  <path d="M35 25 L65 25 L60 45 L40 45 Z" fill="#571F27" fill-opacity="0.6" stroke="#E6C77A" stroke-width="2"/>
  <path d="M25 45 L75 45 L70 70 L30 70 Z" fill="#382A25" fill-opacity="0.6" stroke="#E6C77A" stroke-width="2.5"/>
  <rect x="15" y="70" width="70" height="20" fill="#571F27" stroke="#E6C77A" stroke-width="3"/>
  <path d="M42 90 L42 75 Q50 70 58 75 L58 90 Z" fill="#E6C77A"/>
  <circle cx="50" cy="35" r="3" fill="#E6C77A"/>
</svg>''',

        'diya.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M20 60 Q50 85 80 60 Q70 50 50 52 Q30 50 20 60 Z" fill="#C99A45" stroke="#E6C77A" stroke-width="3"/>
  <ellipse cx="50" cy="55" rx="25" ry="6" fill="#571F27"/>
  <path d="M50 52 Q42 35 50 20 Q58 35 50 52 Z" fill="#E6C77A" stroke="#8E3037" stroke-width="1.5"/>
  <circle cx="50" cy="32" r="4" fill="#F3E7D0"/>
</svg>'''
    }

    for name, content in icons.items():
        with open(os.path.join('assets/icons', name), 'w', encoding='utf-8') as f:
            f.write(content)

    # Decorative ornamental borders & mandalas
    mandala_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none">
  <defs>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E6C77A" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#C99A45" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#C99A45" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="300" cy="300" r="280" fill="url(#goldGlow)"/>
  <circle cx="300" cy="300" r="260" stroke="#E6C77A" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="300" cy="300" r="240" stroke="#C99A45" stroke-width="3"/>
  <circle cx="300" cy="300" r="180" stroke="#E6C77A" stroke-width="2"/>
  <circle cx="300" cy="300" r="120" stroke="#C99A45" stroke-width="2.5" stroke-dasharray="4 4"/>
  <circle cx="300" cy="300" r="60" stroke="#E6C77A" stroke-width="3" fill="#571F27" fill-opacity="0.4"/>
  <!-- 16 Petals -->
'''
    for i in range(16):
        deg = i * 22.5
        mandala_svg += f'  <g transform="rotate({deg} 300 300)"><path d="M300 120 C280 180 290 230 300 240 C310 230 320 180 300 120 Z" fill="#C99A45" fill-opacity="0.25" stroke="#E6C77A" stroke-width="1.5"/></g>\n'
    for i in range(8):
        deg = i * 45
        mandala_svg += f'  <g transform="rotate({deg} 300 300)"><path d="M300 50 C270 120 285 180 300 180 C315 180 330 120 300 50 Z" fill="#8E3037" fill-opacity="0.2" stroke="#E6C77A" stroke-width="2"/></g>\n'
    mandala_svg += '</svg>'
    with open('assets/images/decorative/mandala-gold.svg', 'w', encoding='utf-8') as f:
        f.write(mandala_svg)

    # Traditional Indian Top Border Ribbon
    border_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 40" fill="none">
  <line x1="0" y1="20" x2="1200" y2="20" stroke="#C99A45" stroke-width="1"/>
  <line x1="0" y1="26" x2="1200" y2="26" stroke="#E6C77A" stroke-width="2"/>
  <line x1="0" y1="32" x2="1200" y2="32" stroke="#C99A45" stroke-width="1"/>
  <g fill="#E6C77A">
'''
    for x in range(20, 1200, 40):
        border_svg += f'    <polygon points="{x},14 {x+8},26 {x-8},26" fill="#C99A45" stroke="#E6C77A" stroke-width="1"/>\n'
        border_svg += f'    <circle cx="{x}" cy="8" r="3" fill="#E6C77A"/>\n'
    border_svg += '''  </g>
  <circle cx="600" cy="20" r="14" fill="#571F27" stroke="#E6C77A" stroke-width="2"/>
  <circle cx="600" cy="20" r="7" fill="#E6C77A"/>
</svg>'''
    with open('assets/images/decorative/indian-border-top.svg', 'w', encoding='utf-8') as f:
        f.write(border_svg)

    # Traditional Corner Motif
    corner_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M0 0 L100 0 L100 15 L20 15 Q15 15 15 20 L15 100 L0 100 Z" fill="#C99A45" fill-opacity="0.15"/>
  <path d="M5 5 L95 5 L95 10 L10 10 L10 95 L5 95 Z" fill="#E6C77A"/>
  <path d="M12 12 L70 12 Q70 30 50 50 Q30 70 12 70 Z" fill="#8E3037" fill-opacity="0.3" stroke="#E6C77A" stroke-width="1.5"/>
  <circle cx="35" cy="35" r="8" fill="#571F27" stroke="#E6C77A" stroke-width="1.5"/>
  <circle cx="35" cy="35" r="3" fill="#E6C77A"/>
</svg>'''
    with open('assets/images/decorative/indian-corner.svg', 'w', encoding='utf-8') as f:
        f.write(corner_svg)

    print("SVG icons and decorative elements created successfully!")

if __name__ == '__main__':
    create_svg_icons()
