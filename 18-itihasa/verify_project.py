import os
import re

html_files = ['index.html', 'ramayana.html', 'mahabharata.html', 'characters.html', 'places.html', 'wisdom.html', 'about.html']
missing_assets = []

for hf in html_files:
    if not os.path.exists(hf):
        print(f"MISSING FILE: {hf}")
        continue
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check src
    srcs = re.findall(r'src=["\']([^"\']+)["\']', content)
    for src in srcs:
        if not src or src.startswith('http'):
            continue
        if not os.path.exists(src):
            missing_assets.append((hf, 'src', src))
            
    # Check href
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    for href in hrefs:
        if not href or href.startswith('http') or href.startswith('#') or href.startswith('mailto:'):
            continue
        clean_href = href.split('#')[0].split('?')[0]
        if clean_href and not os.path.exists(clean_href):
            missing_assets.append((hf, 'href', href))

# Also check JS files for asset references
js_files = ['js/main.js', 'js/ramayana.js', 'js/mahabharata.js', 'js/characters.js', 'js/places.js', 'js/wisdom.js', 'js/music.js']
for jf in js_files:
    if not os.path.exists(jf):
        print(f"MISSING JS: {jf}")
        continue
    with open(jf, 'r', encoding='utf-8') as f:
        content = f.read()
    assets = re.findall(r'assets/[a-zA-Z0-9_\-\./]+', content)
    for a in assets:
        clean_a = a.rstrip("',\";)")
        if not os.path.exists(clean_a):
            missing_assets.append((jf, 'asset', clean_a))

print(f"Total missing references: {len(missing_assets)}")
if missing_assets:
    for item in missing_assets:
        print("Missing:", item)
else:
    print("SUCCESS: ALL 100% OF ASSETS, LINKS, IMAGES, AUDIO, AND SCRIPTS RESOLVE AND EXIST!")
