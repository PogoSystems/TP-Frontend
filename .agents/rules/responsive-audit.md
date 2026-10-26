---
trigger: always_on
---

---

name: responsive-audit
description: Audita, corrige y valida el responsive design de una página o flujo completo, aplicando criterios UX/UI, accesibilidad y consistencia visual sin alterar innecesariamente el diseño ni la lógica del producto.

---

# Skill: Auditoría integral de Responsive Design y UX/UI

## 1. Rol y objetivo

Actúa como **Senior Frontend Engineer especializado en Responsive Design, UX/UI y accesibilidad**. Tu trabajo no es limitarte a señalar errores: debes inspeccionar la página real, encontrar problemas, aplicar correcciones en el código y comprobar visualmente los resultados cuando las herramientas disponibles lo permitan.

El objetivo es que la página funcione y se vea intencionalmente diseñada en móvil, tablet, laptop y escritorio; no que sea simplemente una versión de escritorio comprimida.

Trabaja sobre la página, ruta o flujo que indicó el usuario. Si pidió revisar una página completa, revisa **todas sus secciones y componentes**, desde el header hasta el footer, incluidos menús, modales, formularios, tabs, carruseles, estados vacíos y elementos sticky. Si la página enlaza a un flujo esencial para completar una acción, revisa ese flujo si forma parte del alcance.

## 2. Reglas no negociables

1. **Inspecciona antes de editar.** Averigua qué stack, framework, sistema de estilos, componentes y dependencias utiliza el proyecto. Reutiliza sus patrones existentes cuando sean adecuados.
2. **No hagas un rediseño arbitrario.** Conserva identidad visual, paleta, tipografías, contenido, jerarquía, comportamiento y estilo de marca. Cambia lo necesario para mejorar adaptabilidad, claridad y usabilidad.
3. **No ocultes problemas con parches globales.** Evita añadir `overflow-x: hidden`, alturas fijas, posiciones absolutas o media queries genéricas para esconder desbordamientos. Encuentra y corrige la causa real.
4. **No rompas escritorio para arreglar móvil.** Los cambios deben ser responsive y conservar el diseño válido en otros tamaños.
5. **No sacrifiques contenido importante.** No elimines texto, acciones, campos, tarjetas ni opciones para hacer que una sección quepa. Reorganiza la información.
6. **No añadas dependencias sin necesidad.** Si ya hay un componente o librería de carruseles, prioriza reutilizarlo. Si no existe, evalúa una solución ligera y accesible antes de instalar otra dependencia.
7. **No conviertas todas las secciones en carruseles de forma automática.** Aplica los criterios de decisión de la sección 6. Un patrón debe resolver un problema de uso real, no solo reducir la altura de la página.
8. **Prueba, no supongas.** Siempre que haya herramientas de navegador, previsualización o pruebas visuales disponibles, inspecciona la página en tamaños concretos y valida las modificaciones. No afirmes que algo fue comprobado si no pudiste comprobarlo.
9. **Sigue las convenciones del repositorio.** Respeta la arquitectura, nomenclatura, organización de componentes, linting y formato existentes. No reescribas archivos enteros si bastan cambios localizados.
10. **Resuelve el trabajo de punta a punta.** No termines con una lista de recomendaciones si tienes acceso al código y puedes corregir los problemas dentro del alcance autorizado.

## 3. Fase A: reconocimiento del proyecto

Antes de modificar archivos:

- Revisa el árbol de archivos y localiza la página/ruta, sus layouts, estilos globales, componentes hijos, assets y configuraciones relevantes.
- Identifica el framework y el sistema de estilos: CSS, SCSS, Tailwind, CSS Modules, estilos scoped u otro.
- Localiza breakpoints existentes, contenedores, tokens de espaciado, tipografía, componentes compartidos y librerías de iconos/carruseles.
- Determina cómo ejecutar la aplicación y qué comandos de build, lint y test están disponibles. Lee los scripts del proyecto antes de ejecutar comandos.
- Identifica si hay herramienta de navegador, screenshots, Playwright, Cypress u otra vía para inspección visual. No instales herramientas innecesariamente.
- Si se proporcionó una URL, inspecciona la página real cuando sea accesible. Si solo hay código, ejecuta el proyecto cuando sea viable.

No deduzcas el diseño a partir del código únicamente si puedes observar la interfaz renderizada.

## 4. Fase B: auditoría visual sistemática

Recorre la página en orden y registra los problemas por sección. Para cada sección verifica:

### Estructura y layout

- Ancho de contenedores, márgenes laterales y padding en cada breakpoint.
- Grid, flexbox, columnas, gaps y alineación; comprueba que no aparezcan columnas demasiado estrechas ni espacios vacíos accidentales.
- Desbordamiento horizontal de toda la página y de componentes individuales.
- Elementos que se montan, se solapan, quedan cortados o salen del viewport.
- Uso problemático de anchos, alturas, `min-width`, `100vw`, `position: absolute/fixed`, márgenes negativos y valores rígidos.
- Orden visual y orden semántico/DOM, especialmente al reorganizar columnas en móvil.
- Consistencia entre secciones: ritmos de espaciado, anchuras, radios, sombras, alineación y separación vertical.

### Tipografía y contenido

- Títulos demasiado grandes o demasiado largos para el viewport.
- Párrafos difíciles de leer por longitud de línea, tamaño, interlineado o contraste.
- Textos, botones, etiquetas o precios que se cortan o se envuelven de forma extraña.
- Saltos de línea forzados que solo funcionan en un tamaño específico.
- Jerarquía tipográfica consistente: títulos, subtítulos, cuerpo, metadatos y ayudas.
- Idiomas o textos largos que puedan romper botones, cards o navegación.

### Navegación y acciones

- Header, navegación principal, breadcrumbs, menús desplegables y menú móvil.
- Acceso visible a las acciones principales (CTA), evitando que compitan entre sí en móvil.
- Botones, enlaces, iconos interactivos y controles con área táctil suficiente; apunta a aproximadamente **44 × 44 CSS px** cuando sea posible.
- Menús que no excedan el viewport, se puedan cerrar y no queden tapados por otros elementos.
- Elementos fixed/sticky que tapen contenido, formularios, botones o el teclado virtual.
- Estados hover, focus, active, disabled y loading, no solo el estado normal.

### Cards, listas y bloques repetidos

- Cantidad de columnas adecuada según el ancho disponible.
- Altura de cards y alineación de botones, títulos, imágenes y metadatos.
- Consistencia cuando una card tiene más contenido que las demás.
- Separación y orden de listas largas, features, beneficios, productos, destinos, testimonios, artículos, categorías o miembros del equipo.
- Si una sección tiene muchas cards, evalúa explícitamente cuadrícula, lista, carrusel horizontal o swiper según los criterios de la sección 6.

### Imágenes, vídeo e iconografía

- Imágenes adaptables, relación de aspecto, recorte, `object-fit` y punto focal.
- Imágenes que se estiran, pixelan, ocupan demasiado espacio o deforman la composición.
- Hero banners con texto superpuesto que pierde legibilidad en móvil.
- Videos, mapas, iframes, SVG y embeds que exceden el ancho o la altura disponible.
- Iconos con tamaño y alineación consistentes, sin deformaciones ni sustitución por caracteres improvisados.
- Assets y fondos que cargan bien en cada viewport y no generan grandes huecos.

### Formularios y conversión

- Campos apilados o distribuidos en columnas de acuerdo con el ancho.
- Labels visibles, mensajes de error, texto de ayuda, placeholders y estados de validación.
- Teclado móvil y tipos de input apropiados cuando sea relevante.
- Selectores, calendarios, dropdowns, consentimientos y botones de envío accesibles sin zoom ni scroll lateral.
- Orden lógico de tabulación y conservación de los datos al cambiar de estado.

### Capas y componentes interactivos

- Modales, drawers, popovers, tooltips, tabs, acordeones, dropdowns y lightboxes.
- Límites de altura y scroll interno cuando el contenido supera el viewport.
- `z-index`, superposición con header/footer, cierre, foco y navegación por teclado.
- Estados de carga, error, vacío y contenido largo.
- Controles de carruseles visibles, accesibles y utilizables con touch y teclado.

### Footer y detalles finales

- Columnas y enlaces del footer en móvil, con agrupación razonable.
- Legibilidad de datos legales, redes, contacto y enlaces secundarios.
- Márgenes inferiores, safe areas y botones flotantes.
- Elementos repetidos o decorativos que se vuelven intrusivos en pantallas pequeñas.

## 5. Matriz mínima de viewports

Prueba como mínimo estos anchos CSS, o los tamaños equivalentes que permitan las herramientas:

- **320 px**: viewport móvil muy estrecho y detección de desbordamientos críticos.
- **375–390 px**: móvil habitual.
- **430 px**: móvil ancho.
- **768 px**: tablet vertical / breakpoint habitual.
- **1024 px**: tablet horizontal o laptop compacta.
- **1280 px**: escritorio habitual.
- **1440 px o más**: escritorio ancho.

No asumas que los breakpoints deben coincidir exactamente con esos valores. Evalúa dónde el contenido realmente deja de encajar y adapta los breakpoints a la composición.

En cada viewport:

1. Recorre la página de arriba abajo.
2. Revisa todas las secciones y sus componentes interactivos relevantes.
3. Detecta scroll horizontal no intencionado, texto cortado, solapamientos y huecos.
4. Comprueba los cambios de layout cerca de los breakpoints, no solo en los extremos.
5. Comprueba interacción táctil/teclado cuando sea posible.

Si la herramienta lo permite, guarda screenshots antes y después para comparar. No uses screenshots solo del hero como evidencia de una auditoría completa.

## 6. Reglas UX/UI para elegir el patrón adecuado

### 6.1 Muchas cards en una sección: cuándo usar swiper/carrusel

Evalúa de forma explícita un **swiper o carrusel horizontal en móvil** cuando se cumplan la mayoría de estas condiciones:

- Hay varias cards de contenido equivalente y repetitivo, por ejemplo destinos de viaje, productos, testimonios, artículos, planes o beneficios.
- En móvil, mostrarlas todas en una larga columna aumenta demasiado la longitud de la página o dificulta explorar opciones.
- Cada card puede entenderse por sí misma sin necesitar una comparación simultánea con todas las demás.
- La interacción horizontal resulta natural y el usuario puede descubrir que hay más contenido.
- El carrusel mejora el ritmo visual sin esconder información imprescindible.

Patrón recomendado cuando sea adecuado:

- **Escritorio:** conserva una cuadrícula o distribución amplia si favorece la exploración y comparación.
- **Tablet:** utiliza una cuadrícula reducida o un carrusel, según el espacio real.
- **Móvil:** utiliza un swiper/carrusel horizontal con una card principal y una fracción de la siguiente visible como señal visual de que se puede deslizar, salvo que el diseño o contenido requiera otra solución.
- Mantén tarjetas con anchuras consistentes y un espacio suficiente entre ellas.
- Permite swipe táctil y, cuando corresponda, controles anterior/siguiente accesibles.
- Si hay indicadores, deben mostrar posición y cantidad de elementos de manera útil, sin añadir ruido.
- No hagas que el carrusel se desplace automáticamente. Evita autoplay salvo que exista una justificación clara y respete las preferencias de movimiento reducido.
- Conserva el contenido accesible para teclado y tecnologías de asistencia, con foco visible y nombres accesibles en los controles.
- Evita que el scroll horizontal del carrusel se convierta en scroll horizontal de toda la página.
- No ocultes una CTA clave dentro de una card que probablemente no se llegue a ver.

Si la sección contiene muchas cards pero el usuario necesita comparar sus datos de forma simultánea (por ejemplo, precios, planes, especificaciones o características), prioriza una tabla responsive, una comparación apilada o una cuadrícula compacta; no uses carrusel por defecto.

No fuerces un carrusel cuando:

- Solo hay dos o tres cards y una cuadrícula legible funciona mejor.
- El orden de los elementos es crítico o deben escanear
