"""Render social-card artwork using the chosen logo and local Inter glyphs.
Run with /usr/bin/python3 from the documentation repository root.
"""
from pathlib import Path
import xml.etree.ElementTree as E
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

E.register_namespace('', 'http://www.w3.org/2000/svg')
logo = E.parse('brand/03-anton-kit/masters/ananke-horizontal.svg').getroot()
for key,value in {'x':'180','y':'118','width':'840','height':'345'}.items():
    logo.set(key,value)
font = TTFont('assets/webfonts/inter/Inter-VariableFont_opsz,wght.ttf')
font = instantiateVariableFont(font, {'wght':400,'opsz':14}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
x = 0
paths = []
for ch in 'Documentation for the Hugo theme':
    name = cmap[ord(ch)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    if pen.getCommands():
        paths.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>')
    x += font['hmtx'].metrics[name][0]
scale = 30/font['head'].unitsPerEm
text = f'<g fill="#2a1104" transform="translate({600-x*scale/2:.2f} 493) scale({scale} {-scale})">'+''.join(paths)+'</g>'
svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><title>Ananke — documentation for the Hugo theme</title><rect width="1200" height="630" fill="#fffefb"/>'+E.tostring(logo,encoding='unicode')+text+'</svg>'
Path('brand/04-site-integration/social-card.svg').write_text(svg)
