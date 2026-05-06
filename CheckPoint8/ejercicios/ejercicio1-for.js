/* ═══════════════════════════════════════════════
   CheckPoint 8 — Ejercicio 1
   Bucle FOR que imprime cada nombre de una lista
   Autor: Ander Bilbao Castejón
   ═══════════════════════════════════════════════ */

// Lista con los nombres a recorrer
const miLista = ["velma", "exploradora", "jane", "john", "harry"];

console.log("=== Ejercicio 1: bucle FOR ===");

// Recorremos la lista usando un bucle for clásico.
// - "let i = 0" → arrancamos en la posición 0 del array.
// - "i < miLista.length" → seguimos mientras no lleguemos al final.
// - "i++" → en cada vuelta, incrementamos el índice.
for (let i = 0; i < miLista.length; i++) {
  console.log(miLista[i]);
}

/* ─── Salida esperada en consola ──────────
=== Ejercicio 1: bucle FOR ===
velma
exploradora
jane
john
harry
─────────────────────────────────────────── */
