# Nova · plantilla de entregables para hackathon

Web de entregables del equipo **Nova** (Hackathon Talento Canario · Turismo). Pensada como plantilla: todo lo que cambia de un reto a otro está en archivos de datos, no en el código de las páginas.

## Qué editar el día del reto

| Quiero cambiar… | Archivo |
|---|---|
| Equipo (nombres, rol, estudios, LinkedIn, GitHub, foto) | `src/config/proyecto.ts` → `EQUIPO` |
| El reto (empresa, pregunta, criterios, entregables pedidos) | `src/config/proyecto.ts` → `RETO` (pon `definido: true`) |
| Estado o visibilidad de cada pestaña | `src/config/proyecto.ts` → `SECCIONES` (`estado`, `visible`) |
| Enlace al prototipo | `src/config/proyecto.ts` → `PROTOTIPO.url` |
| Vídeo de preview | guarda el vídeo como `public/video/preview.mp4` |
| Investigación previa y fuentes | `src/data/investigacion.ts` |
| Buyer personas y user journey | `src/data/usuarios.ts` |
| Diapositivas del pitch | `src/data/presentacion.ts` |
| Colores de marca | variables de `:root` al principio de `src/styles.css` |

Fotos del equipo: si el miembro tiene `github`, se usa su foto de GitHub. Si no, pon la imagen en `public/img/` y escribe `foto: 'img/nombre.jpg'`. Sin foto se muestran las iniciales.

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
