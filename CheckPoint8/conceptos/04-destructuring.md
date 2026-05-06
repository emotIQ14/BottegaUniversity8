# 📦 4. Deconstrucción de variables (Destructuring)

> El **destructuring** o "deconstrucción" es una característica de ES6 que nos permite **extraer valores de arrays u objetos** y asignarlos a variables de forma rápida y elegante, todo en una sola línea.

---

## 🎬 Antes y después: el cambio de paradigma

### Sin destructuring (forma antigua)

```javascript
const persona = { nombre: "Ander", edad: 28, ciudad: "Bilbao" };

const nombre = persona.nombre;
const edad = persona.edad;
const ciudad = persona.ciudad;

console.log(nombre, edad, ciudad);
```

### Con destructuring (forma moderna)

```javascript
const persona = { nombre: "Ander", edad: 28, ciudad: "Bilbao" };

const { nombre, edad, ciudad } = persona;

console.log(nombre, edad, ciudad);
```

¡De **3 líneas a 1**! Más limpio, más legible.

---

## 📦 Destructuring de objetos

### Básico

```javascript
const usuario = {
  nombre: "Ander",
  email: "ander@email.com"
};

const { nombre, email } = usuario;
console.log(nombre); // "Ander"
console.log(email);  // "ander@email.com"
```

### Renombrar variables

Si quieres usar otro nombre, usa `:` para asignar un alias.

```javascript
const usuario = { nombre: "Ander" };

const { nombre: nombreUsuario } = usuario;
console.log(nombreUsuario); // "Ander"
```

### Valores por defecto

Si la propiedad no existe, puedes asignar un valor por defecto.

```javascript
const config = { tema: "oscuro" };

const { tema, idioma = "español" } = config;
console.log(tema);   // "oscuro"
console.log(idioma); // "español" (valor por defecto)
```

### Destructuring anidado

Si tienes objetos dentro de objetos, puedes extraerlos en profundidad.

```javascript
const empresa = {
  nombre: "Bidaiatzen",
  direccion: {
    ciudad: "Bilbao",
    pais: "España"
  }
};

const { direccion: { ciudad, pais } } = empresa;
console.log(ciudad); // "Bilbao"
console.log(pais);   // "España"
```

### Combinarlo todo

```javascript
const datos = {
  user: {
    name: "Ander",
    settings: { theme: "dark" }
  }
};

const {
  user: {
    name: nombreUsuario,
    settings: { theme: tema = "claro" }
  }
} = datos;

console.log(nombreUsuario); // "Ander"
console.log(tema);          // "dark"
```

---

## 🧮 Destructuring de arrays

A diferencia de los objetos, los arrays se destructuran **por posición**.

### Básico

```javascript
const colores = ["rojo", "verde", "azul"];

const [primero, segundo, tercero] = colores;
console.log(primero); // "rojo"
console.log(segundo); // "verde"
console.log(tercero); // "azul"
```

### Saltar elementos

Usa comas vacías para ignorar posiciones.

```javascript
const numeros = [1, 2, 3, 4, 5];

const [primero, , tercero, , quinto] = numeros;
console.log(primero, tercero, quinto); // 1 3 5
```

### Valores por defecto

```javascript
const lista = ["uno"];

const [a = "X", b = "Y"] = lista;
console.log(a); // "uno"
console.log(b); // "Y"
```

### Combinado con el operador rest (`...`)

Captura el resto de elementos en un nuevo array.

```javascript
const numeros = [1, 2, 3, 4, 5];

const [primero, segundo, ...resto] = numeros;
console.log(primero); // 1
console.log(segundo); // 2
console.log(resto);   // [3, 4, 5]
```

### Intercambio de variables (truco famoso)

```javascript
let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a); // 2
console.log(b); // 1
```

¡Sin variables temporales! 🎉

---

## 🎯 Casos de uso reales

### En parámetros de función

Una de las aplicaciones más útiles. Permite recibir objetos y extraer solo lo que necesitas.

```javascript
// Sin destructuring
function crearUsuario(opciones) {
  const nombre = opciones.nombre;
  const email = opciones.email;
  const edad = opciones.edad || 18;
  // ...
}

// Con destructuring
function crearUsuario({ nombre, email, edad = 18 }) {
  console.log(nombre, email, edad);
}

crearUsuario({ nombre: "Ander", email: "a@b.com" });
// "Ander" "a@b.com" 18
```

### Devolver múltiples valores de una función

JavaScript no tiene retornos múltiples, pero el destructuring lo simula muy bien.

```javascript
function dimensiones() {
  return { ancho: 1920, alto: 1080 };
}

const { ancho, alto } = dimensiones();
console.log(ancho, alto); // 1920 1080
```

### Importaciones de módulos

```javascript
import { useState, useEffect } from "react";
```

Esto en sí mismo es destructuring de los exports del módulo.

### Iterar arrays de pares (como `Object.entries`)

```javascript
const persona = { nombre: "Ander", edad: 28 };

for (const [clave, valor] of Object.entries(persona)) {
  console.log(`${clave}: ${valor}`);
}
// nombre: Ander
// edad: 28
```

---

## 📊 Tabla resumen

| Tipo | Sintaxis | Característica clave |
|------|----------|---------------------|
| Objeto | `const { a, b } = obj;` | Por nombre de propiedad |
| Array | `const [a, b] = arr;` | Por posición |
| Renombrar | `const { a: x } = obj;` | Usa otro nombre |
| Por defecto | `const { a = 1 } = obj;` | Valor si es `undefined` |
| Rest | `const [a, ...resto] = arr;` | Captura el resto |
| Anidado | `const { a: { b } } = obj;` | Profundidad arbitraria |

---

## 💡 Buenas prácticas

✅ **Usa destructuring en parámetros de función** cuando recibas un objeto con varias propiedades.
✅ **Usa nombres descriptivos** o renombra cuando el original no aporta claridad.
✅ **Combínalo con valores por defecto** para hacer tu código más robusto.
❌ **No abuses de la profundidad**. Si algo tiene 4 niveles, mejor extrae paso a paso.

---

## ✅ Resumen

- El destructuring permite **extraer valores de arrays/objetos** en una sola línea.
- Para objetos se usa **por nombre**, para arrays **por posición**.
- Soporta **valores por defecto, alias, anidamiento y combinación con rest**.
- Es **fundamental** en el JavaScript moderno; lo verás en React, Node.js y prácticamente cualquier framework.
