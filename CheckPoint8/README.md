# 📘 CheckPoint 8 — Documentación de JavaScript

> Documentación completa, didáctica y profesional sobre los conceptos fundamentales de JavaScript moderno.

[![Hecho con HTML5](https://img.shields.io/badge/Hecho_con-HTML5-orange?logo=html5)](docs/index.html)
[![Hecho con Markdown](https://img.shields.io/badge/Hecho_con-Markdown-black?logo=markdown)](conceptos/)
[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black)](ejercicios/)

---

## 🎯 Objetivo de este CheckPoint

Crear una documentación **clara, completa y diferente** sobre los conceptos clave de JavaScript dirigida a personas que **recién inician en el mundo del desarrollo**. La documentación está pensada para ser **interactiva, visual y didáctica**, con explicaciones detalladas, sintaxis, ejemplos prácticos y casos de uso.

A diferencia de un PDF o Word tradicional, esta documentación está construida en **dos formatos complementarios**:

1. 🌐 **Página web HTML moderna** — con sidebar de navegación, sintaxis resaltada y diseño responsive.
2. 📝 **Archivos Markdown individuales** — uno por cada concepto, perfectos para leer en GitHub.

---

## 🗂️ Estructura del proyecto

```
CheckPoint8/
├── README.md                    ← Estás aquí
├── docs/
│   ├── index.html              ← 🌐 Documentación web interactiva
│   ├── styles.css              ← Estilos modernos
│   └── script.js               ← Funcionalidad de navegación
├── conceptos/
│   ├── 01-bucles.md            ← Tipos de bucles en JS
│   ├── 02-const-let-var.md     ← Diferencias entre const, let y var
│   ├── 03-arrow-functions.md   ← Funciones de flecha
│   ├── 04-destructuring.md     ← Deconstrucción de variables
│   ├── 05-spread-operator.md   ← Operador de extensión
│   ├── 06-poo.md               ← Programación orientada a objetos
│   ├── 07-promesas.md          ← Promesas en JS
│   └── 08-async-await.md       ← Async / Await
└── ejercicios/
    ├── ejercicio1-for.js       ← Bucle for
    ├── ejercicio2-while.js     ← Bucle while
    ├── ejercicio3-arrow.js     ← Función de flecha
    └── ejercicios.html         ← Visualización interactiva
```

---

## 📚 Índice de conceptos

| # | Concepto | Documentación Markdown | Vista web |
|---|----------|------------------------|-----------|
| 1 | Tipos de bucles | [01-bucles.md](conceptos/01-bucles.md) | [Ver](docs/index.html#bucles) |
| 2 | const, let y var | [02-const-let-var.md](conceptos/02-const-let-var.md) | [Ver](docs/index.html#variables) |
| 3 | Funciones de flecha | [03-arrow-functions.md](conceptos/03-arrow-functions.md) | [Ver](docs/index.html#arrow) |
| 4 | Deconstrucción | [04-destructuring.md](conceptos/04-destructuring.md) | [Ver](docs/index.html#destructuring) |
| 5 | Operador spread | [05-spread-operator.md](conceptos/05-spread-operator.md) | [Ver](docs/index.html#spread) |
| 6 | POO | [06-poo.md](conceptos/06-poo.md) | [Ver](docs/index.html#poo) |
| 7 | Promesas | [07-promesas.md](conceptos/07-promesas.md) | [Ver](docs/index.html#promesas) |
| 8 | Async / Await | [08-async-await.md](conceptos/08-async-await.md) | [Ver](docs/index.html#async) |

---

## 💻 Ejercicios prácticos

### 1️⃣ Bucle `for` que imprime los nombres de una lista

```javascript
const miLista = ["velma", "exploradora", "jane", "john", "harry"];

for (let i = 0; i < miLista.length; i++) {
  console.log(miLista[i]);
}
```

📄 [Ver ejercicio completo](ejercicios/ejercicio1-for.js)

---

### 2️⃣ Bucle `while` que recorre la misma lista

```javascript
const miLista = ["velma", "exploradora", "jane", "john", "harry"];
let contador = 0;

while (contador < miLista.length) {
  console.log(miLista[contador]);
  contador++;
}
```

📄 [Ver ejercicio completo](ejercicios/ejercicio2-while.js)

---

### 3️⃣ Función de flecha que devuelve `"Hola mundo"`

```javascript
const saludar = () => "Hola mundo";

console.log(saludar()); // "Hola mundo"
```

📄 [Ver ejercicio completo](ejercicios/ejercicio3-arrow.js)

---

## 🌐 Cómo ver la documentación web

### Opción 1 — GitHub Pages (recomendado)

Una vez activado GitHub Pages en este repositorio:
👉 **https://emotiq14.github.io/BottegaUniversity8/CheckPoint8/docs/**

### Opción 2 — Localmente

Clona el repositorio y abre el archivo `docs/index.html` con tu navegador:

```bash
git clone https://github.com/emotIQ14/BottegaUniversity8.git
cd BottegaUniversity/CheckPoint8/docs
open index.html   # macOS
xdg-open index.html # Linux
start index.html  # Windows
```

---

## 👤 Autor

**Ander Bilbao Castejón**
📧 anderbilbaocastejon@gmail.com
🐙 [@emotIQ14](https://github.com/emotIQ14)

---

## 📜 Licencia

Este proyecto es material educativo creado para Bottega University. Su uso es libre con fines de estudio.
