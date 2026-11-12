# Referencias de costes · negocio y viabilidad

Consultado el **11-11-2026**. Precios sin impuestos (IVA/IGIC). Casi todo está en **USD**: convierte a euros con el cambio del día que lo uses y di qué cambio aplicas.

- **Verificado:** leído en la página oficial del proveedor ese día.
- **Por verificar:** solo lo confirman terceros, o la tabla oficial no se leía bien. No entra en la web ni en la presentación hasta comprobarlo.

Para usar una referencia en la web, pide al coordinador que investigación le asigne un id en `FUENTES`. Con ese id va en `fuentes` de `src/data/viabilidad.ts`.

## Alojamiento web y backend

| Servicio | Plan | Precio | Qué incluye / límites | Estado | Fuente |
|---|---|---|---|---|---|
| GitHub Pages | Único | No se publica precio (incluido en GitHub) | Sitio ≤ 1 GB; 100 GB/mes de ancho de banda (límite blando). No está pensado para un negocio o SaaS comercial sin coste, ni para datos sensibles. | Verificado | [GitHub Docs · GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) |
| Vercel | Hobby | 0 $/mes | Solo uso personal no comercial. 100 GB/mes de transferencia. | Verificado | [vercel.com/pricing](https://vercel.com/pricing) |
| Vercel | Pro | 20 $/mes | Uso comercial. 1 TB/mes de transferencia y 10 M peticiones CDN; después, desde 0,15 $/GB. | Verificado | [vercel.com/pricing](https://vercel.com/pricing) |
| Netlify | Free / Personal / Pro | 0 $ / 9 $ / 20 $ al mes | 300 / 1.000 / 3.000 créditos al mes; el ancho de banda cuesta 20 créditos por GB. La página no aclara si el plan gratuito admite uso comercial. | Verificado | [netlify.com/pricing](https://www.netlify.com/pricing/) |
| Supabase (base de datos, autenticación) | Free | 0 $/mes | 500 MB de base de datos, 50.000 usuarios activos al mes, 5 GB de salida. Se pausa tras 1 semana sin actividad. | Verificado | [supabase.com/pricing](https://supabase.com/pricing) |
| Supabase | Pro | 25 $/mes | 8 GB de disco por proyecto, 100.000 usuarios activos al mes, 250 GB de salida. No se pausa. | Verificado | [supabase.com/pricing](https://supabase.com/pricing) |

## Mapas

| Servicio | Producto | Gratis al mes | Precio después | Estado | Fuente |
|---|---|---|---|---|---|
| Google Maps Platform | Dynamic Maps | 10.000 llamadas | 7,00 $ / 1.000 | Verificado | [Lista de precios de Google Maps Platform](https://developers.google.com/maps/billing-and-pricing/pricing) |
| Google Maps Platform | Static Maps | 10.000 | 2,00 $ / 1.000 | Verificado | ídem |
| Google Maps Platform | Geocoding | 10.000 | 5,00 $ / 1.000 | Verificado | ídem |
| Google Maps Platform | Place Details Essentials | 10.000 | 5,00 $ / 1.000 | Verificado | ídem |
| Google Maps Platform | Text Search Pro | 5.000 | 32,00 $ / 1.000 | Verificado | ídem |
| Google Maps Platform | Compute Routes Essentials | 10.000 | 5,00 $ / 1.000 | Verificado | ídem |
| Google Maps Platform | Planes de suscripción | — | Starter: 100 $/mes por 50.000 llamadas. Essentials: 275 $/mes por 100.000. Clientes nuevos: 300 $ de crédito de prueba. Ya no hay crédito mensual de 200 $. | Verificado | [mapsplatform.google.com/pricing](https://mapsplatform.google.com/pricing/) |
| Mapbox | Cargas de mapa web (GL JS) | 50.000 | 5,00 $ / 1.000 (de 50.001 a 100.000) | Verificado | [mapbox.com/pricing](https://www.mapbox.com/pricing) |
| Mapbox | Usuarios activos al mes en SDK móvil | 25.000 | 4,00 $ / 1.000 (de 25.001 a 125.000) | Verificado | ídem |
| Mapbox | Geocoding (temporal) | 100.000 | 0,75 $ / 1.000 (de 100.001 a 500.000) | Verificado | ídem |
| Mapbox | Directions | 100.000 | 2,00 $ / 1.000 (de 100.001 a 500.000) | Verificado | ídem |
| OpenStreetMap | Teselas de tile.openstreetmap.org | Sin precio | Sin garantía de servicio y el acceso puede retirarse. La política desaconseja usarlo en producción y obliga a citar «© OpenStreetMap contributors». Para producción: proveedor comercial o servidor propio. | Verificado | [OSMF · Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/) |

**Para la demo del hackathon:** OpenStreetMap o el nivel gratuito de Mapbox o Google bastan. **En el piloto** hay que presupuestar un proveedor con garantía de servicio.

## Inteligencia artificial (API)

| Proveedor | Modelo | Entrada / salida por millón de tokens | Estado | Fuente |
|---|---|---|---|---|
| Anthropic | Claude Opus 5.5 | 4 $ / 20 $ | Verificado | [Claude Docs · Pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| Anthropic | Claude Sonnet 5.5 | 2 $ / 10 $ | Verificado | ídem |
| Anthropic | Claude Haiku 5.5 (prompts de hasta 100.000 tokens) | 0,10 $ / 0,50 $ | Verificado | ídem |
| Anthropic | Claude Fable 5.2 | 8 $ / 40 $ | Verificado | ídem |
| OpenAI | gpt-6-astra (contexto de hasta 272.000 tokens) | 10 $ / 50 $ | Verificado | [OpenAI · API pricing](https://developers.openai.com/api/docs/pricing) |
| OpenAI | gpt-6-luna | 0,10 $ / 0,50 $ | Verificado | ídem |

**Cómo estimar:** tokens por interacción × interacciones al mes × precio. Cada supuesto va a la vista: por ejemplo, «1.500 tokens de entrada y 300 de salida por consulta» se marca como **supuesto** hasta medirlo en el prototipo.

## Herramientas de desarrollo (incluidas IAs)

| Herramienta | Plan | Precio | Estado | Fuente |
|---|---|---|---|---|
| Claude (app) | Pro | 20 $/mes con pago mensual (17 $/mes con pago anual de 200 $) | Verificado | [claude.com/pricing](https://claude.com/pricing) |
| Claude (app) | Max | Desde 100 $/mes | Verificado | ídem |
| GitHub Copilot | Free / Pro / Pro+ | 0 $ / 10 $ / 39 $ por usuario y mes | Verificado | [GitHub Copilot · Plans](https://github.com/features/copilot/plans) |
| GitHub Copilot | Business / Enterprise | Sin precio público («Contact sales») | Verificado | ídem |

## Mensajería

| Servicio | Concepto | Precio | Estado | Fuente |
|---|---|---|---|---|
| WhatsApp Business Platform (Meta) | Modelo de cobro | Por mensaje entregado desde el 01-07-2025. Los mensajes del usuario a la empresa no se cobran. Cada número tiene 1.000 mensajes de servicio gratis al mes. Desde el 01-10-2026 se cobran los mensajes de utilidad dentro de la ventana de atención. | Verificado | [Meta · Pricing on the WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing) |
| WhatsApp Business Platform | España: marketing / utilidad / autenticación | 0,0585 € / 0,0166 € / 0,0166 € por mensaje, sin IVA | **Por verificar** (cifras de terceros; la tarifa oficial está en CSV/PDF en la página de Meta) | [ChatMaxima](https://chatmaxima.com/whatsapp-api-pricing/spain/), [Agencia Reinicia](https://www.agenciareinicia.com/en/blog/whatsapp-business-api-price-changes-in-october-2026-what-this-means-for-your-bill/) |
| Twilio | SMS saliente a España | 0,0875 $ por segmento | **Por verificar** (la tabla oficial se leía mal; comprobar en el CSV de la página) | [Twilio · SMS pricing Spain](https://www.twilio.com/en-us/sms/pricing/es) |

Si se usa un intermediario (BSP), cobra encima de la tarifa de Meta. Por ejemplo, [Infobip](https://www.infobip.com/whatsapp-business/pricing) lista tarifas más altas para España.

## Personas (pendiente)

No hay ninguna referencia salarial verificada. Antes de poner horas × €/h en la web:
- Buscar una fuente primaria: tablas del convenio colectivo estatal de consultoría y TIC, o la Encuesta de Estructura Salarial del INE por ocupación y comunidad autónoma.
- Mientras tanto, cada coste de personas va como **supuesto** y con el cálculo visible (horas × €/h).

## Avisos
- Los precios cambian a menudo, sobre todo los de IA y mapas. Vuelve a comprobarlos el día del reto antes de publicarlos.
- La demo en GitHub Pages es gratis, pero un servicio comercial en producción necesita otro alojamiento: los límites de GitHub Pages lo dejan fuera.
