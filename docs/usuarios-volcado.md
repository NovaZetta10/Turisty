# Volcar las entrevistas en la web

Para pasar a la web, en 10 minutos, las entrevistas hechas con `docs/usuarios-guion-tenique.md`.
Archivo: `src/data/usuarios.ts`, lista `ENTREVISTAS`. En cuanto haya una, la sección «Lo que hemos contrastado» aparece sola en Diagnóstico. Muestra la tabla de hipótesis con su recuento, las emociones más elegidas y las citas.

## 1. Una entrada por entrevista

Copia este bloque dentro de `ENTREVISTAS = [ … ]`, uno por hoja de notas:

```ts
{
  codigo: 'V01',            // V01, V02… vecinos · T01, T02… turistas
  tipo: 'vecino',           // 'vecino' | 'turista'
  zona: 'turística',        // 'turística' | 'rural' | 'otra'
  edad: '30-60',            // '<30' | '30-60' | '>60'
  hipotesis: { H1: '+', H2: '+', H3: '-', H8: '+' },  // + apoya · - contradice · si no salió, no la pongas
  emociones: ['sabor', 'pertenencia'],                // ids: pertenencia, orgullo, raices, sabor, calma, asombro, adrenalina, celebracion
  falta: 'tranquilidad',    // opcional: la emoción que dijo que faltaba
  cita: 'Frase literal',    // SOLO si dio permiso para citarla. Sin nombre.
  precio: '20 €',           // solo turistas (T6), tal cual lo dijo
},
```

Copia de la hoja lo que la persona dijo. No interpretes ni redondees. Si dudas entre + y -, no pongas nada.

## 2. Hipótesis: la cuenta la hace la web

La regla es la del guion y está programada en `estadoHipotesis()`:

- Menos de 3 entrevistas en las que salió el tema: **sin datos**.
- Al menos la mitad a favor, y más a favor que en contra: **confirmada**.
- Al menos la mitad en contra, y más en contra que a favor: **caída**.
- Empate: **sin datos**.

H9 (rural) y H10 (jóvenes) se marcan igual, con + o -, pero solo en entrevistas de ese perfil (zona rural o menores de 30). Si hay menos de 3 de ese perfil, quedan como hipótesis de observación.

## 3. Cuándo poner `validado: true`

- **Persona** (`PERSONAS`): cuando H1 y H3 estén confirmadas con vecinos para la vecina, o H5 con turistas para el visitante. Si cae alguna, se cambia el texto de la persona; no se marca validada.
- **Frase de la persona:** sustituye «Hipótesis: …» por una cita real con permiso, con su código: `«…» (V03)`.
- **Emociones** (`EMOCIONES`, campo `validada`): `true` en las que elijan al menos 2 personas. Si nadie elige una, se quita o se cambia por la que dijeron que faltaba, si la repiten 2 o más personas.
- **Recorrido:** no se marca. Sigue siendo hipótesis salvo que las entrevistas hablen de un paso en concreto.

## 4. Qué contar en el pitch

- Siempre como «N de M personas»: «4 de 6 vecinos nos dijeron…». Nunca porcentajes: es una muestra pequeña y de conveniencia.
- Una o dos citas reales con permiso, con su código.
- Las hipótesis que cayeron también se cuentan. Demuestran que escuchamos.

## 5. Avisar

Al terminar, avisa al coordinador con:

- el número de entrevistas (vecinos y turistas);
- las hipótesis confirmadas y caídas;
- las emociones más elegidas;
- los precios de T6, para Negocio.

## Encuesta (formulario)

Una encuesta no es una entrevista. Va en `ENCUESTA`, no en `ENTREVISTAS`, y la web la presenta como «Encuesta a N personas el dd-mm-aaaa».

1. **Exporta y guarda fuera del repositorio.** Forms → Abrir en Excel → «Guardar como» CSV UTF-8, por ejemplo en `Descargas/`. Nunca dentro de la carpeta del proyecto.
2. **Resume sin datos personales:**
   ```bash
   node scripts/usuarios-encuesta.mjs ~/Downloads/encuesta.csv --grupo "vives"
   ```
   - El script quita las columnas de nombre, correo, teléfono e Id, y las horas de Forms. Al empezar dice cuáles ha quitado.
   - Da «N de M» por respuesta. Con `--grupo` separa por la columna que contenga ese texto (vecinos y turistas, o zona).
   - Lista las respuestas abiertas tapando correos y números. **Los nombres dentro del texto no los detecta: revísalo a mano.**
   - No guarda nada.
3. **Copia a `src/data/usuarios.ts`:**
   ```ts
   export const ENCUESTA: Encuesta | null = {
     fecha: '12-11-2026',
     respuestas: 23, vecinos: 17, turistas: 6,   // quita vecinos/turistas si la encuesta no lo pregunta
     resultados: [
       { pregunta: 'Qué le molesta más del turismo', respuesta: 'Vivienda', n: 11, de: 17, grupo: 'vecinos', hipotesis: ['H1'] },
     ],
     hipotesis: {
       H1: { estado: 'confirmada', apoyo: '11 de 17 vecinos señalan vivienda o movilidad, 2 al turista en sí' },
     },
     citas: [{ texto: 'Frase literal de una respuesta abierta', perfil: 'vecino, zona turística' }],
   }
   ```
4. **Reglas:**
   - Solo cuentas: «11 de 17». Nunca «el 65 % de los tinerfeños».
   - Separa vecinos y turistas, y zona turística y rural, solo si la encuesta lo pregunta. Si no, no lo supongas.
   - El veredicto de cada hipótesis sigue la misma regla que las entrevistas. Si la pregunta no la mide bien, «sin datos».
   - Citas solo de respuestas abiertas y sin nada que identifique: ni nombres, ni calles, ni negocios.
   - `validado: true` en personas y emociones solo con lo que la encuesta respalde de verdad (ver apartado 3).
