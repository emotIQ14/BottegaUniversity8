/* ═══════════════════════════════════════════════
   CheckPoint 8 — Ejercicio 3
   Función de flecha que devuelve "Hola mundo"
   Autor: Ander Bilbao Castejón
   ═══════════════════════════════════════════════ */

// Sintaxis más concisa de arrow function:
// - Sin parámetros → ()
// - Cuerpo de una sola expresión → retorno implícito (sin "return" ni llaves)
const saludar = () => "Hola mundo";

console.log("=== Ejercicio 3: ARROW FUNCTION ===");
console.log(saludar());

/* ─── Salida esperada en consola ──────────
=== Ejercicio 3: ARROW FUNCTION ===
Hola mundo
─────────────────────────────────────────── */

/* ─── Variantes equivalentes ───────────────
// Con llaves y return explícito (también funciona)
const saludar2 = () => {
  return "Hola mundo";
};

// Función tradicional (forma clásica, anterior a ES6)
function saludar3() {
  return "Hola mundo";
}
─────────────────────────────────────────── */
