from pathlib import Path
p=Path('/tmp/ananke-logo-concepts')
shapes={
'a': '<path fill-rule="evenodd" d="M112 32H144L240 224H192L170 180H86L64 224H16ZM128 96L102 148H154Z"/><path fill="#fff" d="M148 128H208V152H148Z"/>',
'b': '<path d="M32 32H128L224 128H160L96 64H32ZM32 96H96L160 160H224V224H128L32 128Z"/>',
'c': '<path fill-rule="evenodd" d="M64 40H148C185.56 40 216 70.44 216 108V216H168V196C153 213 133 224 104 224C64.24 224 32 195.35 32 160S64.24 96 104 96H168C168 78.33 153.67 64 136 64H64ZM108 132C90.33 132 76 144.54 76 160S90.33 188 108 188C141.14 188 168 162.93 168 132Z"/>',
}
for k,shape in shapes.items():
 s=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img"><title>Ananke concept {k.upper()}</title><g fill="#111111">{shape}</g></svg>'
 (p/f'{k}-v1.svg').write_text(s)
