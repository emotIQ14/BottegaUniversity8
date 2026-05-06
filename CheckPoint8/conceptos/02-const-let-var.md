# 🔠 2. Diferencias entre `const`, `let` y `var`

> Para declarar variables en JavaScript existen tres palabras clave: `var`, `let` y `const`. Aunque parezcan similares, tienen comportamientos muy distintos y elegir la correcta es **fundamental** para escribir código limpio y sin errores.

---

## 🧠 ¿Qué es declarar una variable?

Declarar una variable significa **reservar un espacio en memoria** para guardar un valor que podremos usar más adelante.

```javascript
let nombre = "Ander";
console.log(nombre); // "Ander"
```

---

## 🔍 Las tres formas de declarar variables

### 1. `var` — La forma antigua (ES5 y anteriores)

`var` es la forma original de declarar variables en JavaScript. **Hoy en día se considera obsoleta** y se recomienda evitarla.

```javascript
var saludo = "Hola";
saludo = "Adiós"; // Se puede reasignar
var saludo = "Buenos días"; // Incluso se puede redeclarar (¡peligroso!)
```

**Características:**
- 🌍 Tiene **scope de función** (no respeta los bloques `{}`)
- 🔄 Se puede **reasignar** y **redeclarar**
- ⬆️ Sufre **hoisting** (se eleva al inicio del scope, pero queda como `undefined`)

---

### 2. `let` — La forma moderna (ES6/2015)

`let` es la palabra clave moderna para declarar variables que **van a cambiar de valor**.

```javascript
let edad = 28;
edad = 29; // ✅ Se puede reasignar
// let edad = 30; ❌ Error: ya está declarada en este scope
```

**Características:**
- 📦 Tiene **scope de bloque** (respeta los `{}`)
- 🔄 Se puede **reasignar**, pero **NO redeclarar** en el mismo scope
- ⏸️ Sufre hoisting, pero NO se puede usar antes de la declaración (Temporal Dead Zone)

---

### 3. `const` — Para constantes (ES6/2015)

`const` se usa para declarar variables cuyo valor **no va a cambiar**.

```javascript
const PI = 3.14159;
// PI = 3.14; ❌ Error: no se puede reasignar
```

**Características:**
- 📦 Tiene **scope de bloque**
- 🔒 **NO se puede reasignar** ni redeclarar
- ⚠️ **Debe inicializarse en la declaración**
- 🤔 **Atención**: si guardas un objeto o array, sus contenidos **sí pueden cambiar** (solo la referencia es constante)

```javascript
const persona = { nombre: "Ander" };
persona.nombre = "Pablo"; // ✅ Funciona (modificas la propiedad)
persona.edad = 28;        // ✅ Funciona
// persona = { nombre: "Otro" }; ❌ Error (cambias la referencia)
```

---

## 🎯 Concepto clave: el **scope** (alcance)

El scope determina **dónde es accesible** una variable. Aquí está la mayor diferencia entre `var`, `let` y `const`.

### Ejemplo visual

```javascript
function ejemplo() {
  if (true) {
    var a = 1;   // scope de función
    let b = 2;   // scope de bloque
    const c = 3; // scope de bloque
  }
  console.log(a); // ✅ 1
  console.log(b); // ❌ ReferenceError
  console.log(c); // ❌ ReferenceError
}
```

```
┌──────────────────────────────────────┐
│ FUNCIÓN ejemplo()                    │
│                                      │
│   ┌─────────────────────────────┐   │
│   │ BLOQUE if {}                │   │
│   │                             │   │
│   │   var a = 1   ←┐            │   │
│   │   let b = 2     │           │   │
│   │   const c = 3   │           │   │
│   │                 │           │   │
│   └─────────────────│───────────┘   │
│                     │               │
│   "a" se escapa ────┘               │
│   "b" y "c" se quedan dentro        │
└──────────────────────────────────────┘
```

---

## 🚀 Hoisting (elevación)

JavaScript **eleva** las declaraciones al inicio del scope, pero se comporta diferente con cada palabra clave.

### Con `var`

```javascript
console.log(x); // undefined (no da error)
var x = 5;
```

### Con `let` y `const`

```javascript
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 5;
```

Esto se debe a la **Temporal Dead Zone (TDZ)**: la variable existe, pero no se puede usar hasta que se declare.

---

## 📊 Tabla comparativa completa

| Característica | `var` | `let` | `const` |
|----------------|-------|-------|---------|
| **Año de introducción** | ES1 (1997) | ES6 (2015) | ES6 (2015) |
| **Scope** | Función | Bloque | Bloque |
| **¿Se puede reasignar?** | ✅ Sí | ✅ Sí | ❌ No |
| **¿Se puede redeclarar?** | ✅ Sí | ❌ No | ❌ No |
| **Hoisting** | ✅ (como `undefined`) | ✅ (con TDZ) | ✅ (con TDZ) |
| **Debe inicializarse** | ❌ No | ❌ No | ✅ Sí |
| **¿Se añade a `window`?** | ✅ Sí | ❌ No | ❌ No |
| **Recomendado en 2026** | ❌ Evitar | ✅ Sí | ✅ Sí (preferir) |

---

## 💡 Buenas prácticas

### Regla de oro

> **Usa `const` por defecto. Usa `let` cuando sepas que la variable va a cambiar. Olvídate de `var`.**

```javascript
// ✅ Bien
const NOMBRE_APP = "Bidaiatzen";
const usuarios = [];
let contador = 0;

// ❌ Mal
var algo = "no uses var";
```

### ¿Por qué evitar `var`?

1. Su scope confuso provoca bugs difíciles de detectar
2. Permite redeclaraciones que pueden sobrescribir variables sin avisar
3. El hoisting con `undefined` puede ocultar errores
4. Modifica el objeto global, contaminando el namespace

---

## 🧪 Ejemplo práctico de bug clásico con `var`

```javascript
// Con var (problema)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 3, 3, 3 (¡no 0, 1, 2!)

// Con let (correcto)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2 ✅
```

---

## ✅ Resumen

- 🥇 **`const`** → tu primera opción, para valores que no cambian.
- 🥈 **`let`** → cuando vayas a reasignar la variable.
- 🚫 **`var`** → no la uses; está obsoleta.
- Respetar el scope de bloque te ahorrará muchos errores.
