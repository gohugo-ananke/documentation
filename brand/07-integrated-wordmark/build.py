from pathlib import Path
import json
import math
import subprocess
import xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

P = Path(__file__).resolve().parent
ROOT = P.parent.parent
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
for folder in ['masters', 'exports/colour', 'exports/horizontal', 'exports/stacked', 'exports/web', 'previews', 'licences']:
    (P / folder).mkdir(parents=True, exist_ok=True)

# Read normative site colours rather than copying superseded kit colours.
import re
css = (ROOT / 'assets/ananke/css/docs-colors.css').read_text()
def colour(token):
    L, C, h = map(float, re.search(r'--color-' + token + r': oklch\(([\d.]+)% ([\d.]+) ([\d.]+)\)', css).groups())
    L /= 100
    a, b = C * math.cos(math.radians(h)), C * math.sin(math.radians(h))
    l, m, s = (L + .3963377774*a + .2158037573*b)**3, (L - .1055613458*a - .0638541728*b)**3, (L - .0894841775*a - 1.291485548*b)**3
    linear = [4.0767416621*l-3.3077115913*m+.2309699292*s, -1.2684380046*l+2.6097574011*m-.3413193965*s, -.0041960863*l-.7034186147*m+1.707614701*s]
    def srgb(c):
        c = max(0, min(1, c))
        return round(255 * (12.92*c if c <= .0031308 else 1.055*c**(1/2.4)-.055))
    return '#' + ''.join(f'{srgb(c):02x}' for c in linear)
INK, PAPER, YELLOW, LIGHT_ACCENT, SURFACE = [colour(t) for t in ['olive-950', 'olive-100', 'yellow-400', 'yellow-800', 'olive-900']]
colours = dict(background=INK, text=PAPER, accent=YELLOW, light_accent=LIGHT_ACCENT, surface=SURFACE)
(P/'palette.json').write_text(json.dumps(colours, indent=2)+'\n')

# Preserve the A used in the current dark site logo, including its open counter.
old = ROOT/'brand/03-anton-kit/masters'
mark = ET.parse(old/'ananke-horizontal-dark.svg').find('.//{'+NS+'}path').get('d')
small = ET.parse(old/'ananke-symbol-small.svg').find('.//{'+NS+'}path').get('d')
font = TTFont(ROOT/'assets/webfonts/anton/anton-regular.ttf')
glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
def lettering(value):
    cursor, paths = 0, []
    for char in value:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs); glyphs[name].draw(pen)
        paths.append(f'<path transform="translate({cursor} 0)" d="{pen.getCommands()}"/>')
        cursor += font['hmtx'][name][0]
    return ''.join(paths)
letters, full_letters = lettering('NANKE'), lettering('ANANKE')
def symbol(c, tiny=False):
    return f'<path fill="{c}" fill-rule="evenodd" d="{small if tiny else mark}"/>'
def word(c, full=False):
    # Cap top 32, baseline 192. First N starts at x=232: eight units inside A's right extent.
    return f'<g fill="{c}" transform="translate(224.909091 192) scale(.090909091 -.090909091)">{full_letters if full else letters}</g>'
def horizontal(accent, ink):
    return symbol(accent)+word(ink)
def svg(title, body, w=256, h=256):
    return f'<svg xmlns="{NS}" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img"><title>{title}</title>{body}</svg>'
def save(name, body, w=256, h=256):
    (P/'masters'/f'ananke-{name}.svg').write_text(svg('Ananke '+name.replace('-', ' '), body, w, h)+'\n')
# A ends at 240; N starts at 232. At the N baseline, A ends at 224, leaving an eight-unit gap.
for suffix, a, t in [('',LIGHT_ACCENT,INK),('-dark',YELLOW,PAPER),('-mono',INK,INK),('-reversed','#ffffff','#ffffff')]:
    save('horizontal'+suffix, horizontal(a,t), 680,256)
    # The optional stacked lockup uses the symbol above the complete outlined name.
    full = f'<g fill="{t}" transform="translate(19 365) scale(.055 -.055)">{full_letters}</g>'
    save('stacked'+suffix, f'<g transform="translate(65 0)">{symbol(a)}</g>'+full,386,402)
save('symbol',symbol(INK))
save('symbol-dark',symbol(YELLOW))
save('symbol-reversed',symbol('#ffffff'))
save('symbol-small',symbol(INK,True))
save('symbol-small-dark',symbol(YELLOW,True))
save('wordmark',horizontal(LIGHT_ACCENT,INK),680,256)
save('wordmark-dark',horizontal(YELLOW,PAPER),680,256)
save('type-only',f'<g fill="{INK}" transform="translate(12 176) scale(.090909091 -.090909091)">{full_letters}</g>',550,208)
licence = (ROOT/'assets/webfonts/anton/OFL.txt').read_text()
(P/'licences/Anton-OFL.txt').write_text('\n'.join(line.rstrip() for line in licence.splitlines())+'\n')

def embed(name,x,y,w,h):
    root=ET.parse(P/'masters'/f'ananke-{name}.svg').getroot()
    body=''.join(ET.tostring(c,encoding='unicode') for c in root if not c.tag.endswith('title'))
    return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{root.get("viewBox")}">{body}</svg>'
def text(x,y,value,size=18,c=PAPER):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{c}">{value}</text>'
board=[f'<rect width="1200" height="1260" fill="{INK}"/>',text(48,54,'Ananke / integrated wordmark',30),text(48,85,'Approved B spacing · original A · outlined Anton uppercase · documentation palette',16)]
board += [embed('horizontal-dark',65,110,1000,376),text(48,485,'Dark olive + yellow-400 + pale olive',18)]
board += [f'<rect x="32" y="520" width="1136" height="290" rx="12" fill="{PAPER}"/>',embed('horizontal',65,525,700,264),text(790,602,'Light alternative',19,INK),text(790,634,'Yellow-800 + olive-950',16,INK)]
board += [text(48,854,'Header size / 208 px',16),embed('horizontal-dark',48,870,208,78),text(352,854,'One-colour',16),embed('horizontal-reversed',352,870,300,113),text(814,854,'Stacked alternative',16),embed('stacked-dark',855,864,156,162)]
board += [text(48,1020,'Symbol / 64, 32, and 16 px',16)]
for size,x in [(64,48),(32,145),(16,215)]: board.append(embed('symbol-small-dark',x,1040,size,size))
for i,(label,c) in enumerate(colours.items()):
    x=48+i*228
    board += [f'<rect x="{x}" y="1154" width="34" height="34" fill="{c}" stroke="{PAPER}"/>',text(x,1213,label.replace('_',' '),14),text(x+45,1177,c,16)]
(P/'previews/overview.svg').write_text(svg('Ananke integrated logo kit', ''.join(board),1200,1260))
# Social preview is an export, not an installed site asset.
(P/'exports/colour/ananke-social.svg').write_text(svg('Ananke Hugo theme',f'<rect width="1200" height="630" fill="{INK}"/>'+embed('horizontal-dark',100,115,1000,376),1200,630))
for source,dest in [(P/'previews/overview.svg',P/'previews/overview.png'),(P/'exports/colour/ananke-social.svg',P/'exports/colour/ananke-social.png')]:
    subprocess.run(['rsvg-convert',str(source),'-o',str(dest)],check=True)
for name in ['horizontal','horizontal-dark','wordmark','stacked','stacked-dark']:
    subprocess.run(['rsvg-convert','-w','1200',str(P/'masters'/f'ananke-{name}.svg'),'-o',str(P/'exports/colour'/f'ananke-{name}-1200.png')],check=True)
subprocess.run(['inkscape',str(P/'masters/ananke-horizontal-dark.svg'),'--export-type=pdf',f'--export-filename={P}/exports/colour/ananke-horizontal-dark.pdf'],check=True,stdout=subprocess.DEVNULL)
spec=dict(brand='Ananke',tagline='A theme for Hugo',title='Integrated wordmark',final=True,brief='The original interleaved A becomes the first letter of ANANKE.',adjectives=['clear','dependable','editorial'],criteria='Keep the A; use Anton uppercase; tuck the first N into the right-hand whitespace.',industry='software',mockups=['readme','website','favicon-tab','app-icon','sticker','social'],nav=['Documentation','Cookbook','GitHub'],brand_color=INK,greyscale=False,concepts=[dict(name='Integrated A + NANKE',symbol='masters/ananke-symbol.svg',lockup='masters/ananke-horizontal.svg',symbol_on_tile='masters/ananke-symbol-dark.svg',symbol_on_dark='masters/ananke-symbol-dark.svg',lockup_on_dark='masters/ananke-horizontal-dark.svg',tile_color=INK,idea='One A, one name: the symbol starts the word.',rationale=['Approved tucked spacing','Actual local Anton outlines','Colours derived from current documentation tokens'])],recommendation='Use the dark integrated wordmark for documentation; keep the standalone A for icons.',next_steps=['Kit prepared for review; site installation is a separate step.'])
(P/'presentation.json').write_text(json.dumps(spec,indent=2)+'\n')
print(json.dumps(colours))
