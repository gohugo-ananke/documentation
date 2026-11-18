"""Build exploratory Ananke marks and outline the repository's own fonts.
Run with /usr/bin/python3 from the documentation repository root.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import math

OUT = Path(__file__).parent
FONTS = Path('assets/webfonts')
NS = 'http://www.w3.org/2000/svg'
OUTER = [(112,32),(144,32),(240,224),(192,224),(170,180),(86,180),(64,224),(16,224)]
HOLE = [(128,96),(102,148),(154,148)]

def clip(poly, a, b, c):
    result = []
    for p, q in zip(poly, poly[1:]+poly[:1]):
        fp, fq = a*p[0]+b*p[1]-c, a*q[0]+b*q[1]-c
        if fp <= 0: result.append(p)
        if (fp < 0 and fq > 0) or (fp > 0 and fq < 0):
            t=fp/(fp-fq)
            result.append((p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])))
    return result

def contour(poly):
    if len(poly)<3:return ''
    return 'M'+'L'.join(f'{x:.2f} {y:.2f}' for x,y in poly)+'Z'

def mark(name, halves, narrow=False):
    d=''.join(contour(clip(poly,*half)) for half in halves for poly in [OUTER,HOLE])
    transform=' transform="translate(20.48 0) scale(.84 1)"' if narrow else ''
    content=f'<path fill="#111111" fill-rule="evenodd"{transform} d="{d}"/>'
    svg=f'<svg xmlns="{NS}" viewBox="0 0 256 256" role="img"><title>Ananke — {name}</title>{content}</svg>'
    return svg,content

marks = {
 'b1-interleaved':mark('Interleaved A',[(1,1,218),(-1,-1,-242)]),
 'b2-stepped':mark('Stepped A',[(0,1,128),(0,-1,-152)]),
 'b3-condensed':mark('Condensed weave',[(1,1,218),(-1,-1,-242)],True),
}

def wordmark(fontpath, weight=None):
    font=TTFont(fontpath)
    if 'fvar' in font:
        axes={a.axisTag:a.defaultValue for a in font['fvar'].axes}
        if weight:axes['wght']=weight
        font=instantiateVariableFont(font,axes,inplace=False)
    glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); hmtx=font['hmtx'].metrics
    pen=BoundsPen(glyphs); glyphs[cmap[ord('A')]].draw(pen)
    scale=104/pen.bounds[3]
    x=0; shapes=[]
    for ch in 'Ananke':
        g=cmap[ord(ch)];pen=SVGPathPen(glyphs);glyphs[g].draw(pen)
        shapes.append(f'<path transform="translate({x:.2f} 0)" d="{pen.getCommands()}"/>')
        x+=hmtx[g][0]-font['head'].unitsPerEm*.018
    return f'<g fill="#111111" transform="translate(300 180) scale({scale:.7f} {-scale:.7f})">'+''.join(shapes)+'</g>', x*scale

types={
 'anton':wordmark(FONTS/'anton/anton-regular.ttf'),
 'inter':wordmark(FONTS/'inter/Inter-VariableFont_opsz,wght.ttf',600),
 'rubik':wordmark(FONTS/'rubik/rubik-v31-latin_latin-ext-regular.woff2'),
}
for name,(svg,content) in marks.items():
    (OUT/f'{name}-v2.svg').write_text(svg)
    word,w=types['anton']
    (OUT/f'{name}-anton-v2.svg').write_text(f'<svg xmlns="{NS}" viewBox="0 0 {340+w:.2f} 256"><title>Ananke — Anton lockup</title>{content}{word}</svg>')
for name,(word,w) in types.items():
    (OUT/f'type-{name}.svg').write_text(f'<svg xmlns="{NS}" viewBox="0 0 {340+w:.2f} 256"><title>Ananke — {name} wordmark study</title>{marks["b1-interleaved"][1]}{word}</svg>')
