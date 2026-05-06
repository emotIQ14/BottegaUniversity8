# 🔁 1. Tipos de bucles en JavaScript

> Los bucles son una de las herramientas más utilizadas en cualquier lenguaje de programación. Sirven para **repetir un bloque de código** varias veces sin tener que escribirlo manualmente.

---

## 📌 ¿Qué es un bucle?

Un **bucle** (o *loop* en inglés) es una estructura de control que ejecuta repetidamente un bloque de código mientras se cumpla una condición. Imagina que tienes que saludar a 100 personas: en lugar de escribir `console.log("Hola")` cien veces, puedes usar un bucle.

```
┌────────────────────────────────────┐
│  ¿La condición se cumple?          │
│           │                        │
│      ┌────┴────┐                   │
│      │ SÍ      │ NO                │
│      ▼         ▼                   │
│   Ejecuta    Sale del              │
│   el código  bucle                 │
│      │                             │
│      └──── vuelve a comprobar      │
└────────────────────────────────────┘
```

---

## 🧰 Tipos de bucles en JavaScript

JavaScript ofrece **6 tipos principales** de bucles. Cada uno tiene su caso de uso ideal.

### 1. Bucle `for`

Es el bucle más clásico y versátil. Se usa cuando **conoces de antemano cuántas veces** quieres iterar.

#### Sintaxis

```javascript
for (inicialización; condición; actualización) {
  // código a repetir
}
```

#### Ejemplo

```javascript
// Imprimir los números del 1 al 5
for (let i = 1; i <= 5; i++) {
  console.log("Número:", i);
}

// Salida:
// Número: 1
// Número: 2
// Número: 3
// Número: 4
// Número: 5
```

#### ¿Cuándo usarlo?
- Cuando sabes el número exacto de iteraciones
- Para recorrer arrays con índice numérico
- Cuando necesitas control total sobre el contador

---

### 2. Bucle `while`

Repite un bloque **mientras la condición sea verdadera**. Útil cuando NO sabes cuántas veces iterarás.

#### Sintaxis

```javascript
while (condición) {
  // código a repetir
}
```

#### Ejemplo

```javascript
let energia = 100;

while (energia > 0) {
  console.log("Energía restante:", energia);
  energia -= 25;
}

// Salida:
// Energía restante: 100
// Energía restante: 75
// Energía restante: 50
// Energía restante: 25
```

> ⚠️ **Cuidado con los bucles infinitos**: si la condición nunca se vuelve falsa, el bucle se ejecutará para siempre y bloqueará el navegador. Asegúrate siempre de modificar la variable de control dentro del bucle.

---

### 3. Bucle `do...while`

Similar a `while`, pero **siempre se ejecuta al menos una vez**, porque la condición se evalúa al final.

#### Sintaxis

```javascript
do {
  // código a repetir
} while (condición);
```

#### Ejemplo

```javascript
let intento = 0;

do {
  console.log("Intento número:", intento);
  intento++;
} while (intento < 3);

// Salida:
// Intento número: 0
// Intento número: 1
// Intento número: 2
```

#### ¿Cuándo usarlo?
- Cuando quieres garantizar que el bloque se ejecute al menos una vez
- Validaciones de entrada de usuario (pedir datos hasta que sean correctos)

---

### 4. Bucle `for...of`

Recorre los **valores** de objetos iterables (arrays, strings, Map, Set...). Introducido en ES6.

#### Sintaxis

```javascript
for (const elemento of iterable) {
  // código
}
```

#### Ejemplo

```javascript
const frutas = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
  console.log(fruta);
}

// Salida:
// manzana
// pera
// uva
```

#### Ventajas
- Sintaxis muy limpia y legible
- No necesitas gestionar el índice manualmente
- Funciona con cualquier iterable

---

### 5. Bucle `for...in`

Recorre las **propiedades enumerables** de un objeto. Devuelve las **claves**, no los valores.

#### Sintaxis

```javascript
for (const clave in objeto) {
  // código
}
```

#### Ejemplo

```javascript
const persona = {
  nombre: "Ander",
  edad: 28,
  ciudad: "Bilbao"
};

for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}

// Salida:
// nombre: Ander
// edad: 28
// ciudad: Bilbao
```

> 💡 **Importante**: `for...in` está pensado para objetos, NO para arrays. Para arrays usa siempre `for...of` o métodos como `forEach`.

---

### 6. Método `forEach()`

No es un bucle como tal, pero es una forma muy común de iterar arrays. Recibe una función que se ejecuta una vez por cada elemento.

#### Sintaxis

```javascript
array.forEach((elemento, índice, array) => {
  // código
});
```

#### Ejemplo

```javascript
const colores = ["rojo", "verde", "azul"];

colores.forEach((color, indice) => {
  console.log(`${indice}: ${color}`);
});

// Salida:
// 0: rojo
// 1: verde
// 2: azul
```

#### Limitaciones
- No se puede usar `break` ni `continue`
- No retorna valor (a diferencia de `map`, `filter`, etc.)

---

## 📊 Tabla comparativa

| Bucle | Cuándo usarlo | Permite `break`/`continue` | Trabaja con |
|-------|---------------|----------------------------|-------------|
| `for` | Sabes el número de iteraciones | ✅ | Cualquier cosa |
| `while` | Iteras hasta que algo cambie | ✅ | Cualquier cosa |
| `do...while` | Necesitas mínimo una iteración | ✅ | Cualquier cosa |
| `for...of` | Recorres valores de iterables | ✅ | Arrays, strings, Set, Map |
| `for...in` | Recorres claves de objetos | ✅ | Objetos |
| `forEach` | Iteras un array de forma funcional | ❌ | Solo Arrays |

---

## 🛡️ Palabras clave útiles dentro de bucles

| Palabra | Función |
|---------|---------|
| `break` | Sale del bucle inmediatamente |
| `continue` | Salta a la siguiente iteración |

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;       // sale del bucle al llegar a 5
  if (i % 2 === 0) continue; // salta los pares
  console.log(i); // imprime 1, 3
}
```

---

## ✅ Resumen

- Los bucles ahorran código y automatizan tareas repetitivas.
- `for` y `while` son los más universales.
- `for...of` es el más recomendado para arrays modernos.
- `for...in` es para objetos, no para arrays.
- Siempre asegúrate de que la condición de salida se va a cumplir, ¡o tendrás un bucle infinito!
