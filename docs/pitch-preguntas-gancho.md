# Pitch de Tenique · propuestas de pregunta-gancho

La pregunta de la diapositiva 2. El equipo elige una; se cambia en `src/data/presentacion.ts`, en los campos `antes`, `destacado` (sale en rojo) y `despues`.

**En la diapositiva hoy (decisión de Esther, 12-11-2026):** «¿Y si os dijéramos que **en menos de 30 segundos** podéis sentir orgullo de ser tinerfeños?». Es la de la sección F (la 16). Las secciones A–E son el patrón largo anterior; quedan por si el equipo prefiere otra.

## El modelo: la pregunta de Fred. Olsen Express

Es la pregunta del reto de Fred. Olsen Express en este mismo hackathon (su presentación, página 12):

> ¿Cómo podemos diseñar un nuevo modelo de pedido a bordo que permita a los pasajeros comprar más, esperar menos y disfrutar del viaje, sin aumentar la plantilla ni la carga operativa del barco?

El patrón:
1. **«¿Cómo podemos…?»**
2. **Para quién.**
3. **Tres beneficios cortos y en paralelo** (verbo + idea).
4. **«sin…»**, con una restricción honesta.

Además, separa a quién beneficia (pasajero y tripulación), como nuestras cuatro parejas problema → solución.

**Favorita del patrón largo:** la 7. Usa el patrón, nombra por separado al vecino y al visitante y su «sin…» responde a lo que pidió Turismo de Tenerife: nada de otra campaña. Ya no está en la diapositiva: el pitch abre con una pregunta osada y corta (sección F), al estilo de la de Shiro para Fred. Olsen.

**Remate:** la diapositiva 2 no lleva remate. La pregunta va seguida de «Os lo demostramos. Sacad el móvil y escanead» (diapositiva 3).

Reglas:
- Se dice despacio, mirando al jurado, con una pausa de 2 segundos antes del remate.
- Las del grupo D llevan cifra: solo verificadas. La fuente va en el guion, no en voz alta.

## A · El patrón tal cual

1. ¿Cómo podemos hacer que vecinos y visitantes de Tenerife **compartan más, se conozcan mejor y sientan la isla como suya**, sin otra campaña ni más presión sobre los barrios?
2. ¿Cómo podemos diseñar un nuevo modelo de convivencia que permita a los vecinos **ver lo que deja el turismo, a los visitantes conocer la isla de verdad y a todos sentirse orgullosos**, sin otra campaña ni más presión sobre los barrios?
3. ¿Cómo podemos hacer que el turismo **se note en cada barrio, se viva con quien vive aquí y se cuente con orgullo**, sin otra campaña ni más presión sobre los barrios?
4. ¿Cómo podemos hacer que los visitantes **conozcan a quien vive aquí, gasten en el barrio y vuelvan contándolo**, sin más turistas ni más carga para los vecinos?
5. ¿Cómo podemos hacer que empresas, vecinos e instituciones **aporten, decidan y vean el resultado**, sin crear otra administración ni otra campaña?

## B · Separando a quién beneficia (como pasajero y tripulación)

6. ¿Cómo podemos hacer que el vecino **vea el retorno**, el visitante **viva la isla de verdad** y Turismo de Tenerife **lo pueda medir**, sin otra campaña ni más presión sobre los barrios?
7. **(Favorita)** ¿Cómo podemos hacer que el vecino **note lo que deja el turismo, el visitante viva la isla de verdad y todos sintamos orgullo**, sin otra campaña ni más presión sobre los barrios?
8. ¿Cómo podemos conseguir que vecinos, visitantes e instituciones **sostengan juntos la convivencia, cada uno con su parte y su beneficio**, sin que ninguno cargue solo con ella?

## C · Más emocionales

9. ¿Cómo podemos hacer que **enseñar el barrio vuelva a ser un orgullo, recibir vuelva a ser un placer y visitarnos sea conocernos**, sin perder lo que nos hace de aquí?
10. ¿Cómo podemos hacer que quien llega **se siente a nuestra mesa, conozca a nuestra gente y se lleve la isla dentro**, sin que el barrio deje de ser nuestro?

## D · Con un dato del ISTAC

11. El 62,2 % de quienes viven en Tenerife cree que el turismo ha sido muy beneficioso para la isla, pero solo el 35,9 % nota que mejora su vida. ¿Cómo podemos hacer que **se note en cada barrio, se decida entre todos y se cuente con orgullo**, sin otra campaña?
    Fuente: ISTAC, ECOSOC, segundo trimestre de 2026 (fuente 49 de `investigacion.ts`). Ojo: repite el dato de la diapositiva 5.
12. Más de la mitad de quienes viven en Tenerife ve tensiones con los turistas. ¿Cómo podemos convertirlas en **encuentro, retorno visible y orgullo compartido**, sin separar a nadie?
    Fuente: 53,9 %, ISTAC, ECOSOC, segundo trimestre de 2026 (fuente 49). Ojo: repite el dato de la diapositiva 8.

## E · Con «¿Y si…?»

13. ¿Y si vecinos y visitantes **compartieran más, se conocieran mejor y sintieran la isla como suya**, sin otra campaña ni más presión sobre los barrios?
14. ¿Y si quien llega **se sentara a vuestra mesa**, y no solo pasara por delante? (la provisional anterior)
15. ¿Y si cada visita dejara algo que **vuestro barrio pudiera ver, tocar y decidir**, sin pedir más turistas?

## F · ¿Y si os dijéramos…? (preguntas osadas, con demostración)

Patrón: «¿Y si os dijéramos que…?» + una promesa corta y medible + «Os lo demostramos». Sin remate largo. Solo vale una promesa que la demo pueda cumplir en el momento: se comprueba contra el catálogo y los toques de `#/app`.

16. **(En la diapositiva)** ¿Y si os dijéramos que **en menos de 30 segundos** podéis sentir orgullo de ser tinerfeños?
    Comprobado: la emoción «Orgullo» tiene 8 experiencias verificadas en `src/data/experiencias.ts` (`porEmocion('orgullo')`). Camino: escanear → «Vivo en Tenerife» → «Orgullo» → lista. Son 2 toques tras el QR. Cronometrar en el ensayo, con la conexión del evento.
17. Variante para el visitante: ¿Y si os dijéramos que **en menos de 30 segundos** podéis sentir orgullo de lo que Tenerife os ofrece?
    Mismo camino con «Estoy de visita» → «Orgullo» (2 toques).
18. Alternativa de adrenalina: ¿Y si os dijéramos que podéis encontrar una experiencia de adrenalina con gente de aquí en menos de 30 segundos?
    **No es demostrable hoy:** «Adrenalina» tiene solo 1 experiencia verificada (el Carnaval de Santa Cruz de Tenerife 2027). Se usa solo si el catálogo crece; si no, la demo se queda corta.
19. ¿Y si os dijéramos que **podéis vivir Tenerife con un vecino en menos de un minuto**?
    Camino: «Estoy de visita» → emoción → lista → ficha de una experiencia con anfitrión vecino. Son 3 toques; vale en menos de un minuto.
20. ¿Y si os dijéramos que **en tres toques podéis saber qué deja el turismo en vuestro municipio**?
    Camino comprobado en `pantallas.tsx`: «Vivo en Tenerife» → pestaña «Mi barrio» → datos públicos con su fuente y fondo del municipio. Son 2 toques tras el QR (el municipio de partida es Puerto de la Cruz; «Cambiar» abre otro). Vale la promesa de tres toques.

## Cómo elegir

- **Las del patrón (A y B)** son las más cercanas al modelo que conoce el jurado, porque es el formato de los retos de este hackathon. Son largas: en la diapositiva salen con letra más pequeña, que el código ajusta solo.
- **Las de C** son las más emocionales, pero prometen menos cosas concretas.
- **Las de D** repiten un dato que ya sale después. Si se elige una, conviene cambiar la cifra de esa pareja.
- **Las de E** son las más cortas. Se leen mejor en el proyector y cuestan menos tiempo.
- **Las de F** son las más cortas y llevan demostración: el jurado comprueba la promesa con su móvil. La 16 es la que va en la diapositiva.
