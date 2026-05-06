# ⏳ 8. `async` y `await`

> `async` y `await` son palabras clave introducidas en ES2017 que **simplifican enormemente** el trabajo con promesas. Permiten escribir código asíncrono que **parece síncrono**, mucho más fácil de leer y mantener.

---

## 🤔 ¿Qué hacen async y await?

En esencia: te permiten **esperar** a que una promesa se resuelva antes de continuar, sin usar `.then()`. El código asíncrono pasa a leerse de arriba abajo, como si fuera secuencial.

### Comparación visual

```javascript
// Con .then() (promesas tradicionales)
function obtenerDatos() {
  return fetch("/api/usuarios")
    .then(res => res.json())
    .then(datos => {
      console.log(datos);
      return datos;
    });
}

// Con async/await (forma moderna)
async function obtenerDatos() {
  const res = await fetch("/api/usuarios");
  const datos = await res.json();
  console.log(datos);
  return datos;
}
```

¡Mismo resultado, pero el segundo se lee como una receta paso a paso! 🎉

---

## 🔑 La palabra clave `async`

`async` se pone **delante de una función** para marcarla como asíncrona. Esto hace dos cosas:

1. La función **siempre devuelve una promesa**, aunque tú devuelvas un valor normal.
2. Habilita el uso de `await` dentro de ella.

```javascript
async function saludar() {
  return "Hola";
}

saludar(); // Promise { "Hola" }

saludar().then(v => console.log(v)); // "Hola"
```

### Sintaxis con arrow functions

```javascript
const saludar = async () => "Hola";
const sumar = async (a, b) => a + b;
```

---

## ⏸️ La palabra clave `await`

`await` solo funciona **dentro de funciones `async`**. Pausa la ejecución de la función hasta que la promesa se resuelva, devolviendo el valor.

```javascript
async function ejemplo() {
  console.log("1");
  const resultado = await new Promise(r => {
    setTimeout(() => r("listo"), 2000);
  });
  console.log("2", resultado);
  console.log("3");
}

ejemplo();
// 1
// (espera 2 segundos)
// 2 listo
// 3
```

> 💡 **Importante**: `await` solo pausa la función `async` donde está, **no bloquea** todo el programa. JavaScript sigue ejecutando otras tareas en paralelo.

---

## 🛡️ Manejo de errores con `try/catch`

Con `.then()` se usa `.catch()`. Con `async/await` puedes usar el clásico `try/catch`, lo cual unifica el manejo de errores síncronos y asíncronos.

```javascript
async function obtenerUsuario(id) {
  try {
    const res = await fetch(`/api/usuarios/${id}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const datos = await res.json();
    return datos;
  } catch (error) {
    console.error("Algo falló:", error.message);
    return null;
  }
}
```

---

## 🔄 Llamadas en paralelo

`await` por defecto es **secuencial**: cada `await` espera a que termine el anterior. Si quieres que varias promesas corran **en paralelo**, usa `Promise.all`.

### Secuencial (lento)

```javascript
async function lento() {
  const a = await fetch("/a"); // 2s
  const b = await fetch("/b"); // 2s más
  const c = await fetch("/c"); // 2s más
  // Total: 6 segundos ⏱
}
```

### Paralelo (rápido)

```javascript
async function rapido() {
  const [a, b, c] = await Promise.all([
    fetch("/a"),
    fetch("/b"),
    fetch("/c")
  ]);
  // Total: 2 segundos ⚡
}
```

---

## 🎯 Caso de uso real

```javascript
async function obtenerInfoCompleta(usuarioId) {
  try {
    // 1. Obtener el usuario
    const usuario = await fetch(`/api/usuarios/${usuarioId}`).then(r => r.json());

    // 2. Obtener sus pedidos y favoritos en paralelo
    const [pedidos, favoritos] = await Promise.all([
      fetch(`/api/pedidos?user=${usuarioId}`).then(r => r.json()),
      fetch(`/api/favoritos?user=${usuarioId}`).then(r => r.json())
    ]);

    return { usuario, pedidos, favoritos };
  } catch (err) {
    console.error("Error obteniendo datos:", err);
    throw err; // re-lanzamos para que el llamador también se entere
  }
}

obtenerInfoCompleta(1)
  .then(info => console.log("Datos:", info))
  .catch(err => console.error("Falló:", err));
```

---

## 🆚 `.then()` vs `async/await`

| Aspecto | `.then()` | `async/await` |
|---------|-----------|---------------|
| **Legibilidad** | Encadenamiento | Lineal, secuencial |
| **Manejo de errores** | `.catch()` | `try/catch` |
| **Variables intermedias** | Difícil | Fácil |
| **Curva de aprendizaje** | Media | Baja (parece síncrono) |
| **Cuándo usar** | Pipelines simples | Lógica compleja con condicionales |

---

## 💡 Buenas prácticas

### ✅ Usa try/catch para errores

```javascript
async function safe() {
  try {
    return await operacionRiesgosa();
  } catch (e) {
    console.error(e);
  }
}
```

### ✅ Devuelve siempre que puedas

```javascript
async function obtener() {
  const datos = await fetch("/api").then(r => r.json());
  return datos; // así el llamador puede recibir el valor
}
```

### ⚠️ No uses await innecesariamente

```javascript
// ❌ Innecesario
async function f() {
  return await fetch("/api"); // el await es redundante
}

// ✅ Mejor
async function f() {
  return fetch("/api"); // la promesa se devuelve directamente
}
```

### ⚠️ No olvides que `await` es secuencial

Si las llamadas son independientes, ejecútalas en paralelo con `Promise.all`.

### ✅ `async` en arrow functions y métodos

```javascript
// Arrow async
const obtener = async () => { ... };

// Método de clase async
class API {
  async fetchUsuarios() { ... }
}

// Método de objeto
const api = {
  async fetchUsuarios() { ... }
};
```

---

## 🚀 Ejemplo completo: descarga de archivos con feedback

```javascript
async function descargarArchivos(urls) {
  console.log(`Descargando ${urls.length} archivos...`);

  const resultados = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.blob()))
  );

  resultados.forEach((res, i) => {
    if (res.status === "fulfilled") {
      console.log(`✅ ${urls[i]} descargado (${res.value.size} bytes)`);
    } else {
      console.error(`❌ ${urls[i]} falló: ${res.reason.message}`);
    }
  });

  console.log("Proceso terminado.");
}

descargarArchivos([
  "https://example.com/foto1.jpg",
  "https://example.com/foto2.jpg",
  "https://example.com/inexistente.jpg"
]);
```

---

## 🧠 Cosas a recordar

1. `async` convierte una función para que **siempre devuelva una promesa**.
2. `await` solo funciona **dentro de funciones `async`**.
3. `await` **no bloquea** el hilo principal — solo pausa la función `async` donde está.
4. Para errores, **`try/catch`** es tu amigo.
5. Para llamadas independientes, **`Promise.all`** es mucho más rápido.

---

## 🔮 Top-level await (ES2022)

Desde ES2022, en módulos ES, puedes usar `await` directamente en el nivel superior, sin necesidad de envolverlo en una función `async`.

```javascript
// archivo.mjs
const datos = await fetch("/api/datos").then(r => r.json());
console.log(datos);
```

---

## ✅ Resumen

- `async` y `await` son **azúcar sintáctico** sobre las promesas.
- Hacen que el código asíncrono **parezca síncrono** y sea más fácil de leer.
- `async` convierte una función en asíncrona; `await` espera una promesa.
- Para manejar errores, usa `try/catch`.
- Para paralelismo, combínalos con `Promise.all`.
