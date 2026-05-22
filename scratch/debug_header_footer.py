from pathlib import Path
import re

path = Path('about-us/index.html')
text = path.read_text('utf-8')
print('header_match=', bool(re.search(r'<header\b[^>]*>.*?</header>', text, re.S | re.I)))
print('footer_match=', bool(re.search(r'<footer\b[^>]*>.*?</footer>', text, re.S | re.I)))
print('body_match=', bool(re.search(r'<body[^>]*>', text, re.I)))
print('header_count=', len(re.findall(r'<header\b[^>]*>.*?</header>', text, re.S | re.I)))
print('footer_count=', len(re.findall(r'<footer\b[^>]*>.*?</footer>', text, re.S | re.I)))
