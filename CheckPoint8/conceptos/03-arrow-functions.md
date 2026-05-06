# 🏹 3. Funciones de flecha (Arrow Functions)

> Las **funciones de flecha** o *arrow functions* son una forma más corta y moderna de escribir funciones en JavaScript. Llegaron con ES6 (2015) y se han convertido en una de las características más usadas del lenguaje.

---

## 🤔 ¿Qué es una función de flecha?

Es una sintaxis alternativa para crear funciones, que utiliza el operador `=>` (la "flecha"). Permite escribir el mismo código de forma **más concisa, elegante y expresiva**.

### Comparación rápida

```javascript
// Función tradicional
function saludar(nombre) {
  return "Hola " + nombre;
}

// Función de flecha equivalente
const saludar = (nombre) => "Hola " + nombre;
```

Ambas hacen exactamente lo mismo, pero la segunda ocupa una sola línea y es mucho más limpia.

---

## ✏️ Sintaxis paso a paso

### 1. Sin parámetros

```javascript
const saludar = () => "¡Hola mundo!";
console.log(saludar()); // "¡Hola mundo!"
```

### 2. Con un solo parámetro (los paréntesis son opcionales)

```javascript
const cuadrado = x => x * x;
console.log(cuadrado(5)); // 25
```

### 3. Con varios parámetros

```javascript
const sumar = (a, b) => a + b;
console.log(sumar(3, 4)); // 7
```

### 4. Con cuerpo de varias líneas (necesitas `{}` y `return`)

```javascript
const calcularPrecio = (precio, iva) => {
  const total = precio * (1 + iva);
  return total.toFixed(2);
};

console.log(calcularPrecio(100, 0.21)); // "121.00"
```

### 5. Devolviendo un objeto literal (¡cuidado!)

Cuando quieres devolver un objeto literal directamente, debes envolverlo en paréntesis para que no se confunda con un bloque de código.

```javascript
// ❌ Error: las llaves se interpretan como bloque
const crearUsuario = (nombre) => { nombre: nombre };

// ✅ Correcto
const crearUsuario = (nombre) => ({ nombre: nombre });
```

---

## 🎯 Características distintivas

### 1. Retorno implícito

Si el cuerpo es **una sola expresión**, puedes omitir las llaves y la palabra `return`. La expresión se devuelve automáticamente.

```javascript
const doble = n => n * 2;
// equivalente a:
// const doble = function(n) { return n * 2; };
```

### 2. No tienen su propio `this`

Esta es **la diferencia más importante** entre las funciones tradicionales y las de flecha. Las arrow functions **heredan el `this`** del contexto donde se definen.

```javascript
// Problema clásico con función tradicional
function Contador() {
  this.numero = 0;
  setInterval(function() {
    this.numero++; // ❌ "this" aquí es window, no el Contador
    console.log(this.numero); // NaN
  }, 1000);
}

// Solución con función de flecha
function Contador() {
  this.numero = 0;
  setInterval(() => {
    this.numero++; // ✅ "this" es el Contador
    console.log(this.numero); // 1, 2, 3...
  }, 1000);
}
```

### 3. No pueden usarse como constructores

```javascript
const Persona = (nombre) => { this.nombre = nombre; };
const ander = new Persona("Ander"); // ❌ TypeError
```

### 4. No tienen el objeto `arguments`

```javascript
const funcion = () => {
  console.log(arguments); // ❌ Error
};

// Si necesitas argumentos variables, usa rest
const funcion = (...args) => console.log(args);
```

---

## 🆚 Función tradicional vs. Función de flecha

| Característica | Tradicional `function` | Arrow function `=>` |
|----------------|------------------------|---------------------|
| **Sintaxis** | Más larga | Más corta |
| **`this` propio** | ✅ Sí | ❌ Hereda del scope |
| **`arguments`** | ✅ Sí | ❌ No |
| **Hoisting** | ✅ Sí | ❌ No (es expresión) |
| **¿Constructor con `new`?** | ✅ Sí | ❌ No |
| **Retorno implícito** | ❌ No | ✅ Sí (una sola expresión) |

---

## 💼 Casos de uso reales

### Métodos de array (super común)

Las arrow functions brillan al usarlas en `map`, `filter`, `reduce`...

```javascript
const numeros = [1, 2, 3, 4, 5];

// Duplicar cada número
const duplicados = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filtrar pares
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4]

// Sumar todos
const suma = numeros.reduce((acc, n) => acc + n, 0);
// 15
```

### Callbacks

```javascript
document.querySelector("button").addEventListener("click", () => {
  console.log("Clic detectado");
});
```

### Promesas

```javascript
fetch("/api/usuarios")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## ⚠️ Cuándo NO usar arrow functions

### 1. Métodos de un objeto

```javascript
// ❌ Mal: this no apunta al objeto
const persona = {
  nombre: "Ander",
  saludar: () => console.log(`Hola, soy ${this.nombre}`)
};
persona.saludar(); // "Hola, soy undefined"

// ✅ Bien: usa función tradicional o método abreviado
const persona = {
  nombre: "Ander",
  saludar() { console.log(`Hola, soy ${this.nombre}`); }
};
persona.saludar(); // "Hola, soy Ander"
```

### 2. Métodos de prototipo

### 3. Cuando necesitas `arguments` o el objeto `this`

---

## 📐 Diagrama mental

```
   FUNCIÓN TRADICIONAL              ARROW FUNCTION
   ┌───────────────────┐           ┌─────────────────┐
   │ function fn(x) {  │           │ const fn = x => │
   │   return x * 2;   │     →     │   x * 2;        │
   │ }                 │           │                 │
   └───────────────────┘           └─────────────────┘
        4 líneas                        1 línea
```

---

## 🧪 Ejemplo práctico del CheckPoint

```javascript
// Función de flecha que devuelve "Hola mundo"
const saludar = () => "Hola mundo";

console.log(saludar()); // "Hola mundo"
```

Esta es la versión más concisa posible: sin parámetros, una sola expresión, retorno implícito.

---

## ✅ Resumen

- Las arrow functions son una sintaxis **más corta y moderna** para crear funciones.
- Heredan el `this` del contexto, lo que evita muchos bugs en callbacks.
- Son ideales para **callbacks, métodos de array y funciones cortas**.
- Evítalas como **métodos de objeto** o cuando necesites `this` propio.
- Permiten **retorno implícito** si el cuerpo es una sola expresión.
