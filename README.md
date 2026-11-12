# Nova · plantilla de entregables para hackathon

Web de entregables del equipo **Nova** (Hackathon Talento Canario · Turismo). Pensada como plantilla: todo lo que cambia de un reto a otro está en archivos de datos, no en el código de las páginas.

## Qué editar el día del reto

| Quiero cambiar… | Archivo |
|---|---|
| Equipo (nombres, rol, estudios, LinkedIn, GitHub, foto) | `src/config/proyecto.ts` → `EQUIPO` |
| El reto (empresa, pregunta, criterios, entregables pedidos) | `src/config/proyecto.ts` → `RETO` (pon `definido: true`) |
| Estado o visibilidad de cada pestaña | `src/config/proyecto.ts` → `SECCIONES` (`estado`, `visible`) |
| Prototipo hecho en esta web | pantallas en `src/prototipo/pantallas.tsx` y `PROTOTIPO.url = '#/app'` |
| Prototipo externo (Figma, otra web) | `src/config/proyecto.ts` → `PROTOTIPO.url` |
| Colores del prototipo | variables `--app-*` de `:root` en `src/styles.css` |
| Vídeo de preview | guarda el vídeo como `public/video/preview.mp4` |
| Investigación previa y fuentes | `src/data/investigacion.ts` |
| Buyer personas y user journey | `src/data/usuarios.ts` |
| Diapositivas del pitch | `src/data/presentacion.ts` |
| Colores de marca | variables de `:root` al principio de `src/styles.css` |

Fotos del equipo: si el miembro tiene `github`, se usa su foto de GitHub. Si no, pon la imagen en `public/img/` y escribe `foto: 'img/nombre.jpg'`. Sin foto se muestran las iniciales.

## Añadir una pestaña

1. Copia `src/pages/_Plantilla.tsx` a `src/pages/Nombre.tsx` y cambia `ID` a `'nombre'`.
2. Añade en `SECCIONES` una entrada con `id: 'nombre'` y `ruta: '/nombre'`.

`App.tsx` registra la página sola (archivo en minúsculas = `id`). Los archivos que empiezan por `_` no se publican.

## Piezas reutilizables

| Pieza | Archivo | Para qué |
|---|---|---|
| `Barras`, `Linea` | `src/components/Grafico.tsx` | Comparar categorías y ver evolución, con fuente y «Por verificar» |
| `Tabla` | `src/components/Tabla.tsx` | Tablas con columnas tipadas; en el móvil se desplazan en horizontal |
| `Tarjeta`, `Rejilla`, `Cifra`, `EstadoTag` | `src/components/Tarjeta.tsx` | Tarjetas (también enlazadas) y cifras grandes con fuente |
| `Vacio`, `SoloLocal` | `src/components/Vacio.tsx` | Hueco para un entregable pendiente. Texto público en `children`; instrucciones al equipo en `interno` o `SoloLocal` (solo se ven con `npm run dev`) |
| `Refs`, `Verificado` | `src/components/Refs.tsx` | Referencias [n] a las fuentes y etiqueta «Por verificar» |
| `BarraApp`, `Cuerpo`, `TituloApp`, `BotonApp`, `BotonReinicio`, `ListaApp`, `TarjetaApp`, `CampoApp`, `ChipsApp`, `SelectorIdioma`, `SelectorPerfil`, `ContadorApp`, `Segmentos`, `TabBar` | `src/prototipo/piezas.tsx` | Piezas básicas del prototipo móvil |
| `Ficha`, `Mapa`, `Reserva`, `Confirmacion`, `Panel` | `src/prototipo/piezas-flujo.tsx` | Pantallas típicas: ficha, mapa de Canarias sin conexión, reserva, confirmación con QR, panel de gestión |
| `CargandoApp`, `VacioApp`, `ErrorApp`, `Simulado` | `src/prototipo/estados.tsx` | Estados de carga, vacío y error |
| `useT`, `useIdioma` | `src/prototipo/idioma.ts` | Textos en español e inglés: `t({ es: '…', en: '…' })` |
| `useNav`, `useDemo` | `src/prototipo/nav.ts` | Navegar entre pantallas y compartir lo elegido (perfil, reserva…) |

El prototipo se ve en la pestaña *Prototipo* (teléfono + QR) y a pantalla completa en `#/app`. Navegación entre pantallas: `ir="id"` en botones, listas y tarjetas, o `useNav()`. Ajustes de la demo (idioma inicial, segundos hasta el reinicio automático) en `DEMO`, dentro de `src/prototipo/pantallas.tsx`. Estilos en `prototipo.css` y `kit.css`.

## Antes de entregar

```bash
npx tsc --noEmit
npm run build
npm run revisar:entrega   # falla si el reto no está definido, si queda texto [entre corchetes] (en datos o en páginas), secciones «listo» vacías o pantallas de ejemplo
```

`npm run revisar` da el mismo informe sin fallar. Revisa además la web a 390 px y a 1280 px.

## Quién toca qué

Para no pisarnos sin git en local, cada archivo tiene un dueño:

- Coordinación: `src/config/`, `src/App.tsx`, `src/styles.css`, `src/components/`, `README.md`, `package.json`.
- Cada subagente: solo los archivos de su encargo (p. ej. `src/data/investigacion.ts`, `src/data/usuarios.ts`, `src/prototipo/`, `src/data/presentacion.ts`). El CSS propio va en `src/styles/<area>.css` o, para el prototipo, en `src/prototipo/prototipo.css`.
- Si necesitas cambiar un archivo de otro, pídeselo a su dueño.

## Probar en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # comprueba que compila antes de subir
```

## Subir a GitHub y publicar (GitHub Pages)

1. Crea un repositorio nuevo en GitHub (público, sin README).
2. Sube el contenido de esta carpeta **incluida la carpeta oculta `.github` y `package-lock.json`**, sin `node_modules` ni `dist`.
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Cada push a `main` lanza el workflow *Deploy* (pestaña **Actions**). En 1–2 minutos la web queda en `https://<usuario>.github.io/<repo>/`.

Si borras un archivo en local, bórralo también en el repositorio (`git rm ruta/archivo`); si no, el build puede fallar con un archivo antiguo.

## Presentación

Pestaña *Presentación*: flechas para avanzar, `F` pantalla completa, *Exportar PDF* imprime una diapositiva por página (en el diálogo de impresión elige «Guardar como PDF» y activa «Gráficos de fondo»).
