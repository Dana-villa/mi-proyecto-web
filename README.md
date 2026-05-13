# Portafolio Dana Villamizar — versión HTML / CSS / JSON

Versión estática del portafolio, sin frameworks. Todo el contenido vive en
`data.json` y se renderiza con un `script.js` mínimo (vanilla JS) sobre
`index.html` y `styles.css`.

## Estructura

```
portafolio-dana/
├── index.html      # Estructura semántica
├── styles.css      # Diseño Dark Editorial · paleta Sage
├── script.js       # Render desde data.json + filtros + validación form
├── data.json       # Todo el contenido editable (perfil, skills, proyectos…)
└── assets/         # Imágenes (hero, retrato, proyectos)
```

## Cómo abrirlo

Como `script.js` hace `fetch("data.json")`, no basta con abrir `index.html`
con doble clic — necesita un servidor local. Opciones:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Luego abre <http://localhost:8080>.

## Cómo editar contenido

Modifica `data.json`: textos, niveles de skills, proyectos, servicios y
timeline se actualizan sin tocar HTML ni JS.

## Paleta (en `styles.css`)

- Fondo: `#181b19` · Texto: `#f1f4f0`
- Acento sage: `#93a384`
- Tipografías: Playfair Display (display) + Inter (cuerpo)
