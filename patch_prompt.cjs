const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `INSTRUCCIONES CRÍTICAS DE PRECISIÓN Y NO ALUCINACIÓN (ESTRICTAMENTE PROHIBIDO INVENTAR):
1. FIDELIDAD TOTAL: Extrae ÚNICAMENTE los ingredientes y pasos que el creador realmente menciona, muestra, escribe o utiliza en el contenido original.
2. DATOS INSUFICIENTES: Si el texto provisto consiste únicamente en una URL y un título, y NO contiene detalles de ingredientes o pasos (porque no se pudo extraer la transcripción), NO INVENTES LA RECETA. En su lugar, devuelve la lista de "ingredients" completamente vacía, y en "instructions" pon un único paso que diga: "No se pudo extraer la información del video automáticamente. Por favor, edita e ingresa los pasos a mano."
3. PROHIBIDO INVENTAR INGREDIENTES O PASOS:
   - NO agregues ingredientes que el creador no haya usado (no inventes especias, hierbas, caldos, salsas, quesos ni guarniciones no mostradas).
   - Si la receta es sencilla o minimalista (por ejemplo de 2, 3 o 4 ingredientes), mantén ÚNICAMENTE esos ingredientes. NO inventes ingredientes adicionales "tradicionales".
   - Los pasos de preparación ("instructions") deben ser EXTREMADAMENTE PRECISOS Y DETALLADOS. Divide las acciones lógicamente. Incluye tiempos exactos, temperaturas, herramientas mencionadas (sartenes, batidoras), texturas, colores o señales visuales descritas por el creador (ej: "hasta que esté dorado y crujiente"). NO resumas múltiples acciones complejas en un solo paso. Mantén el orden cronológico estricto.`;

const newPrompt = `INSTRUCCIONES DE EXTRACCIÓN Y RECONSTRUCCIÓN INTELIGENTE:
1. FIDELIDAD SI HAY DATOS: Si el texto provisto contiene la receta detallada (transcripción o texto), extrae ÚNICAMENTE los ingredientes y pasos mencionados, con total fidelidad al creador.
2. RECONSTRUCCIÓN CULINARIA (SI FALTAN DATOS): Si el contenido provisto consiste únicamente en una URL o un título (muy común en videos de Instagram o TikTok donde no hay transcripción), ACTIVA TU MODO EXPERTO CULINARIO. Analiza el título, las palabras clave del enlace y genera una receta ESTÁNDAR, REALISTA Y DELICIOSA para ese plato. Es imperativo que devuelvas una lista de ingredientes completa y pasos de preparación lógicos, en lugar de un resultado vacío.
3. DETALLE Y PRECISIÓN:
   - Las cantidades de los ingredientes deben ser lógicas y proporcionales para el número de raciones.
   - Los pasos de preparación ("instructions") deben ser detallados y profesionales. Divide las acciones lógicamente. Incluye tiempos exactos, temperaturas y técnicas culinarias adecuadas (ej: "hasta que esté dorado y crujiente").`;

if (code.includes(oldPrompt)) {
  code = code.replace(oldPrompt, newPrompt);
  fs.writeFileSync('server.ts', code);
  console.log("Prompt patched successfully.");
} else {
  console.log("Old prompt not found.");
}
