"""Build the chosen B1 + Anton artwork. Run from the documentation root."""
from pathlib import Path
import xml.etree.ElementTree as E
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import json

P=Path(__file__).parent
NS='http://www.w3.org/2000/svg'
E.register_namespace('',NS)
INK='#2a1104'; COPPER='#ab5512'; CREAM='#fffefb'; AMBER='#f0bc2f'
# Refine the counter where it meets the seam, removing the previous tiny spur.
UP='M112 32H144L158 60L38 180Z'
LOW='M166 76L240 224H192L170 180H86L64 224H18Z'
COUNTER='M136 106L96 146H156Z'
SMALL='M136 106L92 150H158Z'
# Keep reversed artwork identical in shape, with no shared counter edge.
REV_LOWER='M166 76L240 224H192L170 180H86L64 224H18L96 146H156L136 106Z'

def symbol(color=INK,small=False,reverse=False):
    upper=UP
    lower=LOW if not reverse else REV_LOWER
    hole='' if reverse else SMALL if small else COUNTER
    return f'<path fill="{color}" fill-rule="evenodd" d="{upper}{lower}{hole}"/>'

font=TTFont('assets/webfonts/anton/anton-regular.ttf')
glyphs=font.getGlyphSet();cmap=font.getBestCmap()
b=BoundsPen(glyphs);glyphs[cmap[ord('A')]].draw(b)
scale=104/b.bounds[3]
letters=[];x=0
for ch in 'Ananke':
    glyph=cmap[ord(ch)];pen=SVGPathPen(glyphs);glyphs[glyph].draw(pen)
    letters.append(f'<path transform="translate({x:.2f} 0)" d="{pen.getCommands()}"/>')
    x+=font['hmtx'].metrics[glyph][0]-font['head'].unitsPerEm*.018
word_width=x*scale

def word(color=INK,x=240,y=180):
    return f'<g fill="{color}" transform="translate({x} {y}) scale({scale:.7f} {-scale:.7f})">'+''.join(letters)+'</g>'

def svg(title,body,w=256,h=256):
    return f'<svg xmlns="{NS}" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img"><title>{title}</title>{body}</svg>'

def save(name,title,body,w=256,h=256):
    (P/'masters'/name).write_text(svg(title,body,w,h))

save('ananke-symbol.svg','Ananke symbol',symbol())
save('ananke-symbol-small.svg','Ananke small symbol',symbol(small=True))
save('ananke-symbol-reversed.svg','Ananke reversed symbol',symbol(CREAM,reverse=True))
save('ananke-horizontal.svg','Ananke logo',f'<g transform="translate(0 28) scale(.78)">{symbol(COPPER)}</g>'+word(),624,256)
save('ananke-horizontal-mono.svg','Ananke one-colour logo',f'<g transform="translate(0 28) scale(.78)">{symbol()}</g>'+word(),624,256)
save('ananke-horizontal-dark.svg','Ananke logo for dark backgrounds',f'<g transform="translate(0 28) scale(.78)">{symbol(AMBER,reverse=True)}</g>'+word(CREAM),624,256)
save('ananke-horizontal-reversed.svg','Ananke reversed logo',f'<g transform="translate(0 28) scale(.78)">{symbol(CREAM,reverse=True)}</g>'+word(CREAM),624,256)
save('ananke-stacked.svg','Ananke stacked logo',f'<g transform="translate(64 0)">{symbol(COPPER)}</g>'+word(x=round((384-word_width)/2,2),y=390),384,430)
save('ananke-wordmark.svg','Ananke wordmark',word(x=20,y=124),384,144)

# Standalone SVG review board: no font installation or browser needed for logo artwork.
def embed(name,x,y,w,h):
    root=E.parse(P/'masters'/name).getroot();vb=root.get('viewBox');body=''.join(E.tostring(c,encoding='unicode') for c in root if not c.tag.endswith('title'))
    return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{vb}">{body}</svg>'
def text(x,y,value,size=18,fill=INK):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{fill}">{value}</text>'
parts=[f'<rect width="1440" height="1120" fill="{CREAM}"/>',text(56,65,'Ananke / B1 + Anton',36),text(56,103,'Refined interleaved A. Palette taken from the documentation theme.')]
parts+=[f'<rect x="40" y="140" width="680" height="330" rx="16" fill="#fbf1c7"/>',embed('ananke-horizontal.svg',75,170,600,246),text(70,445,'Primary / copper + ink')]
parts+=[f'<rect x="744" y="140" width="656" height="330" rx="16" fill="{INK}"/>',embed('ananke-horizontal-dark.svg',770,170,600,246),text(774,445,'Dark / amber + warm white',18,CREAM)]
parts += [text(56,520,'Document header / illustrative mockup',22),f'<rect x="40" y="542" width="1360" height="160" rx="12" fill="#fbf1c7"/>',embed('ananke-horizontal.svg',66,557,292,120),text(880,627,'Documentation     Cookbook     GitHub',19)]
parts += [text(56,756,'Monochrome',22),embed('ananke-horizontal-mono.svg',40,780,450,185),text(560,756,'Symbol + small-size cut',22)]
parts.append(embed('ananke-symbol.svg',550,790,150,150))
for size,x in [(64,730),(32,840),(16,915)]:
 parts.append(embed('ananke-symbol-small.svg',x,830,size,size));parts.append(text(x,930,f'{size} px',14))
parts += [text(1040,756,'Stacked lockup',22),embed('ananke-stacked.svg',1040,780,190,212)]
for i,(name,color) in enumerate([('Ink',INK),('Copper',COPPER),('Amber',AMBER),('Paper',CREAM)]):
 x=56+i*344;parts += [f'<rect x="{x}" y="1028" width="44" height="44" fill="{color}" stroke="#ddd"/>',text(x+58,1057,f'{name} / {color}',17)]
(P/'previews'/'overview.svg').write_text(svg('Ananke logo kit overview',''.join(parts),1440,1120))

spec={'brand':'Ananke','tagline':'A theme for Hugo','brief':'A clear, content-led identity for the Hugo theme, using the documentation typeface and palette.','adjectives':['clear','dependable','editorial'],'criteria':'Recognisable A; Anton wordmark; one-colour and small-size use.','industry':'software','mockups':['readme','website','favicon-tab','app-icon','sticker','social'],'nav':['Documentation','Cookbook','GitHub'],'brand_color':INK,'greyscale':False,'round':3,'concepts':[{'name':'Interleaved A + Anton','symbol':'masters/ananke-symbol.svg','lockup':'masters/ananke-horizontal.svg','symbol_on_tile':'masters/ananke-symbol-reversed.svg','lockup_on_dark':'masters/ananke-horizontal-dark.svg','tile_color':INK,'idea':'Two interleaved bands form the initial A.','rationale':['Preserves the chosen split-band direction','Uses Anton from the documentation font files','Uses the existing warm documentation palette']}],'recommendation':'B1 with Anton, as selected.','next_steps':['Review the kit','Install approved files into the site as a separate change']}
(P/'presentation.json').write_text(json.dumps(spec,indent=2)+'\n')
