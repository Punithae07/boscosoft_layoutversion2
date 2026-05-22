from pathlib import Path
import re

root = Path.cwd()
header_pattern = re.compile(r'<header\b[^>]*>.*?</header>', re.S | re.I)
footer_pattern = re.compile(r'<footer\b[^>]*>.*?</footer>', re.S | re.I)

for path in sorted(root.rglob('*.html')):
    if 'dist' in path.parts:
        continue
    if path.name == 'index.html' and path.parent == root:
        continue
    text = path.read_text('utf-8')
    has_header = bool(header_pattern.search(text))
    has_footer = bool(footer_pattern.search(text))
    if has_header and has_footer:
        print(path.relative_to(root))
