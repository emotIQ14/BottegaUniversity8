# 📤 5. El operador de extensión (Spread Operator)

> El operador de extensión, escrito con tres puntos `...`, es una de las herramientas más útiles que llegaron con ES6. Sirve para **expandir** elementos de un iterable (arrays, strings, objetos) donde se esperan múltiples elementos.

---

## 🤔 ¿Qué hace exactamente?

Imagina que tienes una caja con varios objetos dentro y quieres "vaciar" esa caja en otro sitio. El spread operator hace justo eso: **descompone** una colección y la expande elemento por elemento.

### Ejemplo introductorio

```javascript
const numeros = [1, 2, 3];

console.log(numeros);    // [1, 2, 3]   ← un array
console.log(...numeros); // 1 2 3       ← tres números separados
```

---

## 📋 Casos de uso principales

### 1. Copiar arrays

```javascript
const original = [1, 2, 3];
const copia = [...original];

copia.push(4);
console.log(original); // [1, 2, 3]      ← no se modifica
console.log(copia);    // [1, 2, 3, 4]
```

> 💡 **Importante**: hace una **copia superficial** (shallow copy). Para arrays anidados, los elementos internos siguen siendo referencias.

### 2. Combinar arrays

```javascript
const frutas = ["manzana", "pera"];
const verduras = ["lechuga", "tomate"];

const comida = [...frutas, ...verduras];
console.log(comida);
// ["manzana", "pera", "lechuga", "tomate"]
```

### 3. Insertar elementos en cualquier posición

```javascript
const lista = ["a", "b", "e"];
const completa = ["INICIO", ...lista, "c", "d", "FIN"];

console.log(completa);
// ["INICIO", "a", "b", "e", "c", "d", "FIN"]
```

### 4. Pasar arrays como argumentos a funciones

```javascript
function sumar(a, b, c) {
  return a + b + c;
}

const numeros = [1, 2, 3];
console.log(sumar(...numeros)); // 6

// Antes de ES6 había que hacer:
// sumar.apply(null, numeros);
```

### 5. Encontrar máximo/mínimo de un array

```javascript
const numeros = [10, 5, 8, 23, 1, 17];

console.log(Math.max(...numeros)); // 23
console.log(Math.min(...numeros)); // 1
```

---

## 🧱 Spread con objetos (ES2018)

A partir de ES2018, el spread también funciona con objetos.

### Copiar objetos

```javascript
const persona = { nombre: "Ander", edad: 28 };
const copia = { ...persona };

copia.edad = 29;
console.log(persona.edad); // 28  ← no se modifica
console.log(copia.edad);   // 29
```

### Combinar objetos

```javascript
const datosBasicos = { nombre: "Ander", edad: 28 };
const datosContacto = { email: "a@b.com", telefono: "123" };

const usuarioCompleto = { ...datosBasicos, ...datosContacto };
/*
{
  nombre: "Ander",
  edad: 28,
  email: "a@b.com",
  telefono: "123"
}
*/
```

### Sobrescribir propiedades

Si dos objetos tienen la misma clave, **gana la última**.

```javascript
const original = { nombre: "Ander", ciudad: "Madrid" };
const actualizado = { ...original, ciudad: "Bilbao" };

console.log(actualizado);
// { nombre: "Ander", ciudad: "Bilbao" }
```

Esto es **muy útil** para actualizar el estado de forma inmutable (Redux, React, etc.).

### Añadir propiedades

```javascript
const usuario = { nombre: "Ander" };
const usuarioConRol = { ...usuario, rol: "admin" };

console.log(usuarioConRol);
// { nombre: "Ander", rol: "admin" }
```

---

## 🔠 Spread con strings

Un string es iterable, así que también puede expandirse:

```javascript
const palabra = "Ander";
const letras = [...palabra];

console.log(letras); // ["A", "n", "d", "e", "r"]
```

---

## ⚠️ Spread vs. Rest: NO confundir

Aunque usan la misma sintaxis (`...`), tienen propósitos opuestos.

| | **Spread** | **Rest** |
|---|---|---|
| **Propósito** | **Expande** elementos | **Agrupa** elementos |
| **Dónde se usa** | Al pasar argumentos / construir arrays/objetos | En parámetros de función o destructuring |
| **Ejemplo** | `fn(...arr)` | `function fn(...args) {}` |

### Ejemplo de **spread** (expande)

```javascript
const arr = [1, 2, 3];
const nuevoArr = [...arr, 4]; // [1, 2, 3, 4]
```

### Ejemplo de **rest** (agrupa)

```javascript
function sumar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}

sumar(1, 2, 3, 4); // 10
```

> 🧠 **Truco mnemotécnico**: si los `...` están **a la derecha del igual** o dentro de una llamada → spread. Si están **a la izquierda del igual** o en parámetros → rest.

---

## 🎯 Casos de uso reales en proyectos

### React: actualizar estado de forma inmutable

```javascript
// Añadir un elemento a un array sin mutarlo
setItems([...items, nuevoItem]);

// Actualizar una propiedad de un objeto sin mutarlo
setUsuario({ ...usuario, edad: 29 });
```

### Eliminar duplicados de un array

```javascript
const array = [1, 2, 2, 3, 3, 3, 4];
const sinDuplicados = [...new Set(array)];
console.log(sinDuplicados); // [1, 2, 3, 4]
```

### Convertir un NodeList a array

```javascript
const elementos = document.querySelectorAll("div");
const array = [...elementos]; // ahora es un array real
array.forEach(...); // métodos de array disponibles
```

### Clonar y modificar configuración

```javascript
const configBase = {
  tema: "claro",
  idioma: "es",
  notificaciones: true
};

const configUsuario = {
  ...configBase,
  tema: "oscuro" // sobrescribe solo esto
};
```

---

## 📊 Tabla resumen

| Operación | Sintaxis | Resultado |
|-----------|----------|-----------|
| Copiar array | `[...arr]` | Nuevo array independiente |
| Combinar arrays | `[...a, ...b]` | Array combinado |
| Copiar objeto | `{ ...obj }` | Nuevo objeto independiente |
| Combinar objetos | `{ ...a, ...b }` | Objeto combinado |
| Pasar array como args | `fn(...arr)` | Argumentos individuales |
| Convertir iterable a array | `[...iter]` | Array desde el iterable |

---

## 💡 Buenas prácticas

✅ Usa spread para **inmutabilidad**: nunca modifiques arrays/objetos directamente, crea copias.
✅ Combínalo con destructuring para flujos elegantes: `const { a, ...resto } = obj`.
⚠️ Recuerda que es **copia superficial**. Para deep clone usa `structuredClone()` o librerías.
❌ No lo uses con objetos enormes; gasta memoria por la copia.

---

## ✅ Resumen

- El operador `...` **expande** elementos de un iterable.
- Sirve para **copiar, combinar y manipular** arrays y objetos sin mutarlos.
- Es **clave para la inmutabilidad**, fundamental en frameworks modernos como React.
- No lo confundas con **rest**, aunque la sintaxis sea idéntica.
