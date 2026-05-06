# 🤝 7. Promesas en JavaScript

> Las **promesas** (Promises) son objetos especiales que representan el **resultado eventual** de una operación asíncrona. Es decir, una operación que **tarda en completarse** (como una llamada a un servidor, leer un archivo, etc.).

---

## 🤔 ¿Por qué necesitamos promesas?

JavaScript es **single-thread**: solo puede hacer una cosa a la vez. Si tuviera que esperar a que termine una operación lenta (descargar un archivo, consultar una base de datos), bloquearía todo el programa.

Las promesas son la forma moderna de manejar **operaciones asíncronas** sin caer en el famoso *"callback hell"*.

### El problema antes de las promesas: Callback Hell

```javascript
pedirDatos(usuario, function(datos) {
  procesarDatos(datos, function(procesados) {
    guardarDatos(procesados, function(guardados) {
      enviarEmail(guardados, function(email) {
        console.log("¡Listo!");
        // 😱 indentación infinita y código difícil de mantener
      });
    });
  });
});
```

### La solución con promesas

```javascript
pedirDatos(usuario)
  .then(procesarDatos)
  .then(guardarDatos)
  .then(enviarEmail)
  .then(() => console.log("¡Listo!"))
  .catch(error => console.error(error));
```

¡Mucho más legible! 🎉

---

## 📐 ¿Qué es una promesa exactamente?

Una promesa es un objeto que puede estar en **uno de tres estados**:

```
┌─────────────────────────────────────┐
│           PROMESA                   │
│             │                       │
│      ┌──────┴──────┐                │
│      │  pending    │ (pendiente)    │
│      └──────┬──────┘                │
│             │                       │
│   ┌─────────┴──────────┐            │
│   │                    │            │
│   ▼                    ▼            │
│ fulfilled           rejected        │
│ (cumplida)         (rechazada)      │
│   │                    │            │
│   ▼                    ▼            │
│ .then()             .catch()        │
└─────────────────────────────────────┘
```

| Estado | Significado |
|--------|-------------|
| **pending** | La operación todavía no ha terminado |
| **fulfilled** | La operación se completó con éxito |
| **rejected** | La operación falló |

Una vez que una promesa cambia de `pending` a `fulfilled` o `rejected`, **ya no puede cambiar más**. Por eso se llaman "promesas": prometen un resultado y se cumplen o no.

---

## ✏️ Crear una promesa

```javascript
const miPromesa = new Promise((resolve, reject) => {
  // Operación asíncrona
  const exito = true;

  if (exito) {
    resolve("¡Todo bien!"); // se cumple
  } else {
    reject("Algo falló"); // se rechaza
  }
});
```

### Ejemplo realista

```javascript
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("¡Tiempo cumplido!"), ms);
  });
}

esperar(2000).then(mensaje => console.log(mensaje));
// Tras 2 segundos: "¡Tiempo cumplido!"
```

---

## 🔗 Consumir promesas: `.then()`, `.catch()`, `.finally()`

### `.then()` — cuando la promesa se cumple

```javascript
fetch("https://api.example.com/datos")
  .then(respuesta => respuesta.json())
  .then(datos => console.log(datos));
```

### `.catch()` — cuando la promesa falla

```javascript
fetch("https://api.example.com/datos")
  .then(respuesta => respuesta.json())
  .catch(error => console.error("Hubo un error:", error));
```

### `.finally()` — siempre se ejecuta (cumpla o falle)

```javascript
mostrarLoader();

fetch("https://api.example.com/datos")
  .then(respuesta => respuesta.json())
  .then(datos => mostrarDatos(datos))
  .catch(error => mostrarError(error))
  .finally(() => ocultarLoader());
```

---

## 🔄 Encadenar promesas

Cada `.then()` devuelve una nueva promesa, lo que permite encadenarlas.

```javascript
obtenerUsuario(1)
  .then(usuario => obtenerPedidos(usuario.id))
  .then(pedidos => calcularTotal(pedidos))
  .then(total => console.log(`Total: ${total}€`))
  .catch(error => console.error("Algo falló:", error));
```

> 💡 **Truco**: si en un `.then()` devuelves otra promesa, el siguiente `.then()` espera a que esa también se cumpla.

---

## 🛠️ Métodos estáticos útiles de `Promise`

### `Promise.all()` — espera a que **todas** se cumplan

```javascript
const p1 = fetch("/api/usuarios");
const p2 = fetch("/api/productos");
const p3 = fetch("/api/pedidos");

Promise.all([p1, p2, p3])
  .then(([usuarios, productos, pedidos]) => {
    console.log("Todo cargado");
  })
  .catch(err => console.error("Una falló, todo aborta"));
```

### `Promise.allSettled()` — espera a todas, sin importar si fallan

```javascript
Promise.allSettled([p1, p2, p3])
  .then(resultados => {
    resultados.forEach(r => {
      if (r.status === "fulfilled") console.log("OK:", r.value);
      else console.log("Error:", r.reason);
    });
  });
```

### `Promise.race()` — devuelve la **primera** que se resuelva

```javascript
const lento = new Promise(r => setTimeout(() => r("lento"), 3000));
const rapido = new Promise(r => setTimeout(() => r("rápido"), 1000));

Promise.race([lento, rapido]).then(r => console.log(r));
// "rápido"
```

### `Promise.any()` — devuelve la primera que **se cumpla** (ignora rechazos)

```javascript
Promise.any([promesaQueFalla, promesaQueFunciona])
  .then(valor => console.log(valor));
```

---

## 📊 Tabla resumen de métodos

| Método | Espera a... | Si una falla... |
|--------|-------------|-----------------|
| `Promise.all()` | Todas | Falla todo |
| `Promise.allSettled()` | Todas | Devuelve resultados de todas |
| `Promise.race()` | La primera (cumpla o falle) | Depende de cuál llegue antes |
| `Promise.any()` | La primera que cumpla | Solo falla si todas fallan |

---

## 🎯 Caso de uso real: llamada a una API

```javascript
function obtenerUsuario(id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      return respuesta.json();
    });
}

obtenerUsuario(1)
  .then(usuario => {
    console.log("Usuario:", usuario.name);
    console.log("Email:", usuario.email);
  })
  .catch(error => {
    console.error("Algo salió mal:", error.message);
  });
```

---

## 💡 Buenas prácticas

✅ **Siempre maneja los errores** con `.catch()`. Las promesas no manejadas pueden tirar el proceso.
✅ **Devuelve valores en cada `.then()`** para que el siguiente `.then()` los reciba.
✅ **No anides `.then()` dentro de otros `.then()`** — encadena en lugar de anidar.
✅ Usa **`async/await`** cuando puedas (lo ves en el siguiente concepto), es aún más legible.

---

## ⚠️ Errores comunes

### Olvidar `return`

```javascript
// ❌ Mal
fetch("/api")
  .then(res => {
    res.json(); // sin return → el siguiente then recibe undefined
  })
  .then(datos => console.log(datos)); // undefined

// ✅ Bien
fetch("/api")
  .then(res => res.json())
  .then(datos => console.log(datos));
```

### No manejar errores

```javascript
// ❌ Si esto falla, no te enteras
fetch("/api").then(r => r.json());

// ✅ Captura siempre los errores
fetch("/api")
  .then(r => r.json())
  .catch(err => console.error(err));
```

---

## ✅ Resumen

- Una **promesa** es un objeto que representa el resultado **futuro** de una operación asíncrona.
- Tiene tres estados: **pending**, **fulfilled** y **rejected**.
- Se consumen con `.then()`, `.catch()` y `.finally()`.
- Permiten **encadenar** operaciones asíncronas y evitar el callback hell.
- `Promise.all`, `race`, `any` y `allSettled` permiten **combinar** varias promesas.
