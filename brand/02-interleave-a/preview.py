from pathlib import Path
import xml.etree.ElementTree as E
p=Path(__file__).parent
E.register_namespace('','http://www.w3.org/2000/svg')
def inner(file):
 root=E.parse(file).getroot()
 return ''.join(E.tostring(e,encoding='unicode') for e in root if not e.tag.endswith('title'))
def label(x,y,text,size=18,color='#666'):
 return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{color}">{text}</text>'
s=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="910" viewBox="0 0 1200 910"><rect width="1200" height="910" fill="#f6f6f3"/>',label(50,60,'Ananke / Typography from the documentation',32,'#111'),label(50,100,'Same interleaved A. Actual local fonts, converted to vector outlines.')]
for i,(name,note) in enumerate([('anton','Anton Regular / heading font'),('inter','Inter 600 / body font, heavier weight'),('rubik','Rubik Regular / alternative in the font setup')]):
 y=140+i*240
 s.extend([f'<rect x="40" y="{y}" width="1120" height="216" rx="12" fill="white"/>',label(70,y+38,note,19,'#111')])
 root=E.parse(p/f'type-{name}.svg').getroot();width=float(root.get('viewBox').split()[2]);scale=min(800/width,.68)
 s.append(f'<g transform="translate(75 {y+46}) scale({scale})">{inner(p/f"type-{name}.svg")}</g>')
 s.append(label(880,y+160,'Aa / '+name,18))
s.append(label(50,890,'Exploratory lockups. Font sources: assets/webfonts. No font substitution.'))
s.append('</svg>');(p/'typography.svg').write_text(''.join(s))
s=['<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="700" viewBox="0 0 1100 700"><rect width="1100" height="700" fill="#f4f4f0"/>']
for i,name in enumerate(['b1-interleaved','b2-stepped','b3-condensed']):
 y=10+i*230;content=inner(p/f'{name}-v2.svg')
 s.append(f'<rect x="0" y="{y}" width="220" height="220" fill="#111"/><g transform="translate(14 {y+14}) scale(.75)">{content.replace("#111111","#ffffff")}</g>')
 s.append(f'<g transform="translate(450 {y+14}) scale(-.75 .75)">{content}</g><g transform="translate(680 {y+206}) rotate(180) scale(.75)">{content}</g>')
 for size,x in [(64,740),(32,850),(16,930)]:
  s.append(f'<g transform="translate({x} {y+80}) scale({size/256})">{content}</g>')
  s.append(label(x,y+180,str(size)+' px',14))
s.append('</svg>');(p/'checks.svg').write_text(''.join(s))
# Use the B numbering consistently within the selected concept family.
f=p/'shapes-v2.svg';v=f.read_text().replace('A · B1 /','B1 ·').replace('B · B2 /','B2 ·').replace('C · B3 /','B3 ·');f.write_text(v)
