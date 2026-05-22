from pathlib import Path
import re

root = Path.cwd()
html_files = [p for p in root.rglob('*.html') if 'dist' not in p.parts]
header_or_nav_pattern = re.compile(r'(<header\b[^>]*>.*?</header>|<nav\b[^>]*>.*?</nav>)', re.S|re.I)
footer_pattern = re.compile(r'<footer\b[^>]*>.*?</footer>', re.S|re.I)
footer2_pattern = re.compile(r'<!--\s*Footer\s*-->.*?</footer>', re.S|re.I)
script_template = '<script type="module" src="{src}"></script>'

updated = []
for file_path in html_files:
    # Skip the root index.html source page only.
    if file_path == root / 'index.html':
        continue

    text = file_path.read_text(encoding='utf-8')
    original = text

    # Replace header/navigation after <body>
    body_match = re.search(r'<body[^>]*>', text, re.I)
    if body_match:
        body_start = body_match.end()
        after_body = text[body_start:]

        replaced_after_body, count = header_or_nav_pattern.subn('<div id="global-header"></div>', after_body, 1)
        if count > 0:
            text = text[:body_start] + replaced_after_body

    # Replace footer
    replaced_text, count = footer_pattern.subn('<div id="global-footer"></div>', text, 1)
    if count == 0:
        replaced_text, count = footer2_pattern.subn('<div id="global-footer"></div>', text, 1)
    text = replaced_text

    # Add loader script tag once at the end of body
    if '<div id="global-header"></div>' in text or '<div id="global-footer"></div>' in text:
        rel_dir = file_path.parent.relative_to(root)
        if str(rel_dir) == '.':
            script_src = 'js/header-footer-loader.js'
        else:
            script_src = '../' * len(rel_dir.parts) + 'js/header-footer-loader.js'
        script_tag = script_template.format(src=script_src)
        if script_tag not in text:
            text = re.sub(r'</body>', f'    {script_tag}\n</body>', text, count=1, flags=re.I)

    if text != original:
        file_path.write_text(text, encoding='utf-8')
        updated.append(str(file_path.relative_to(root)).replace('\\', '/'))

print('UPDATED', len(updated))
for u in sorted(updated):
    print(u)
