from pathlib import Path
import re

root = Path.cwd()
html_files = [p for p in sorted(root.rglob('*.html')) if 'dist' not in p.parts]
root_index = root / 'index.html'
missing_placeholder = []
missing_script = []
leftover_header = []
leftover_footer = []

for file_path in html_files:
    if file_path == root_index:
        continue
    text = file_path.read_text(encoding='utf-8')
    rel = file_path.relative_to(root).as_posix()
    header_ok = '<div id="global-header"></div>' in text
    footer_ok = '<div id="global-footer"></div>' in text
    if not (header_ok and footer_ok):
        missing_placeholder.append(rel)
    rel_dir = file_path.parent.relative_to(root)
    if str(rel_dir) == '.':
        script_src = 'js/header-footer-loader.js'
    else:
        script_src = '../' * len(rel_dir.parts) + 'js/header-footer-loader.js'
    script_tag = f'<script type="module" src="{script_src}"></script>'
    if script_tag not in text:
        missing_script.append(rel)
    if re.search(r'<header\s+class="header"\s+id="header"', text, re.I):
        leftover_header.append(rel)
    if re.search(r'<footer\s+class="footer"', text, re.I) or re.search(r'<footer\s+class="footer-section"', text, re.I):
        leftover_footer.append(rel)

print('TOTAL HTML', len(html_files)-1)
print('MISSING_PLACEHOLDER', len(missing_placeholder))
for p in missing_placeholder:
    print('  ', p)
print('MISSING_SCRIPT', len(missing_script))
for p in missing_script:
    print('  ', p)
print('LEFTOVER_HEADER', len(leftover_header))
for p in leftover_header:
    print('  ', p)
print('LEFTOVER_FOOTER', len(leftover_footer))
for p in leftover_footer:
    print('  ', p)
