/* ═══════════════════════════════════════════════
   CheckPoint 8 — Ejercicio 2
   Bucle WHILE que recorre la misma lista
   Autor: Ander Bilbao Castejón
   ═══════════════════════════════════════════════ */

// Misma lista que el ejercicio anterior
const miLista = ["velma", "exploradora", "jane", "john", "harry"];

console.log("=== Ejercicio 2: bucle WHILE ===");

// IMPORTANTE: creamos un contador que se incrementa en cada vuelta.
// Sin esto, la condición sería siempre verdadera y el bucle nunca terminaría
// (bucle infinito → bloqueo del navegador o del proceso de Node).
let contador = 0;

while (contador < miLista.length) {
  console.log(miLista[contador]);
  contador++; // incremento manual: clave para no caer en bucle infinito
}

/* ─── Salida esperada en consola ──────────
=== Ejercicio 2: bucle WHILE ===
velma
exploradora
jane
john
harry
─────────────────────────────────────────── */
