# 🏗️ 6. Programación Orientada a Objetos (POO)

> La **Programación Orientada a Objetos** (POO o OOP en inglés) es un paradigma de programación que organiza el código en torno a **objetos** que combinan datos y comportamiento. Es uno de los paradigmas más utilizados en el desarrollo de software.

---

## 🧠 ¿Qué es la POO?

En lugar de escribir el código como una secuencia de instrucciones (programación procedural), la POO modela el mundo real como **entidades** (objetos) que tienen:

- **Atributos** (datos / propiedades)
- **Métodos** (comportamientos / funciones)

### Analogía del mundo real

Imagina un **coche**:

```
🚗 Coche
├── Atributos:
│   ├── color: "rojo"
│   ├── marca: "Toyota"
│   └── velocidad: 0
└── Métodos:
    ├── acelerar()
    ├── frenar()
    └── encender()
```

En POO, "Coche" sería una **clase** (un molde) y un coche concreto sería un **objeto** (una instancia).

---

## 🧩 Los 4 pilares de la POO

### 1. 🔒 Encapsulamiento

Significa **proteger los datos** de un objeto, exponiendo solo lo necesario.

```javascript
class CuentaBancaria {
  #saldo; // propiedad privada (con #)

  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  consultarSaldo() {
    return this.#saldo;
  }

  ingresar(cantidad) {
    if (cantidad > 0) this.#saldo += cantidad;
  }
}

const cuenta = new CuentaBancaria(1000);
cuenta.ingresar(500);
console.log(cuenta.consultarSaldo()); // 1500
// console.log(cuenta.#saldo); ❌ Error: propiedad privada
```

### 2. 🧬 Herencia

Permite que una clase **herede atributos y métodos** de otra clase. Se evita duplicar código.

```javascript
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  comer() {
    console.log(`${this.nombre} está comiendo`);
  }
}

class Perro extends Animal {
  ladrar() {
    console.log(`${this.nombre} dice: ¡Guau!`);
  }
}

const rex = new Perro("Rex");
rex.comer();  // "Rex está comiendo"  (heredado)
rex.ladrar(); // "Rex dice: ¡Guau!"   (propio)
```

### 3. 🎭 Polimorfismo

Significa que distintos objetos pueden **responder al mismo método de formas diferentes**.

```javascript
class Animal {
  hacerSonido() {
    console.log("Sonido genérico");
  }
}

class Perro extends Animal {
  hacerSonido() {
    console.log("Guau guau");
  }
}

class Gato extends Animal {
  hacerSonido() {
    console.log("Miau");
  }
}

const animales = [new Perro(), new Gato(), new Animal()];
animales.forEach(a => a.hacerSonido());
// Guau guau
// Miau
// Sonido genérico
```

### 4. 🎯 Abstracción

Esconder los detalles complejos y exponer solo lo importante. Cuando usas `array.sort()`, no necesitas saber cómo está implementado el algoritmo de ordenación.

---

## 🛠️ Clases en JavaScript (ES6)

JavaScript introdujo la sintaxis de `class` en ES6, aunque por debajo sigue usando prototipos.

### Sintaxis básica

```javascript
class Persona {
  // Constructor: se ejecuta al crear una instancia
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  // Método
  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Crear una instancia
const ander = new Persona("Ander", 28);
ander.saludar(); // "Hola, soy Ander y tengo 28 años."
```

### Métodos estáticos

Pertenecen a la clase, no a las instancias.

```javascript
class Calculadora {
  static sumar(a, b) {
    return a + b;
  }
}

console.log(Calculadora.sumar(3, 4)); // 7
// No necesitas instanciar la clase
```

### Getters y Setters

Permiten controlar el acceso a propiedades.

```javascript
class Producto {
  constructor(precio) {
    this._precio = precio;
  }

  get precio() {
    return `${this._precio}€`;
  }

  set precio(nuevoPrecio) {
    if (nuevoPrecio < 0) throw new Error("Precio no válido");
    this._precio = nuevoPrecio;
  }
}

const p = new Producto(100);
console.log(p.precio); // "100€"
p.precio = 150;
console.log(p.precio); // "150€"
```

---

## 🌳 Herencia con `extends` y `super`

```javascript
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
  describir() {
    console.log(`Vehículo de marca ${this.marca}`);
  }
}

class Coche extends Vehiculo {
  constructor(marca, modelo) {
    super(marca); // llama al constructor del padre
    this.modelo = modelo;
  }
  describir() {
    super.describir(); // llama al método del padre
    console.log(`Modelo: ${this.modelo}`);
  }
}

const miCoche = new Coche("Toyota", "Corolla");
miCoche.describir();
// "Vehículo de marca Toyota"
// "Modelo: Corolla"
```

---

## 🎨 Ejemplo completo: sistema de usuarios

```javascript
class Usuario {
  #password; // privada

  constructor(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.#password = password;
    this.fechaRegistro = new Date();
  }

  saludar() {
    return `Hola, soy ${this.nombre}`;
  }

  validarPassword(intento) {
    return intento === this.#password;
  }
}

class Admin extends Usuario {
  constructor(nombre, email, password, permisos = []) {
    super(nombre, email, password);
    this.permisos = permisos;
  }

  saludar() {
    return `${super.saludar()} y soy administrador`;
  }

  añadirPermiso(permiso) {
    this.permisos.push(permiso);
  }
}

const ander = new Admin("Ander", "a@b.com", "secret123", ["leer"]);
console.log(ander.saludar());
// "Hola, soy Ander y soy administrador"

ander.añadirPermiso("escribir");
console.log(ander.permisos); // ["leer", "escribir"]
console.log(ander.validarPassword("secret123")); // true
```

---

## 📊 Tabla de conceptos clave

| Concepto | Qué es | Palabra clave |
|----------|--------|---------------|
| **Clase** | Plantilla / molde | `class` |
| **Objeto / Instancia** | Producto creado a partir de una clase | `new` |
| **Constructor** | Función que inicializa la instancia | `constructor()` |
| **Método** | Función dentro de una clase | (función) |
| **Atributo** | Variable dentro de una clase | `this.x` |
| **Herencia** | Una clase deriva de otra | `extends` |
| **Llamar al padre** | Acceder a la clase padre | `super` |
| **Estático** | Pertenece a la clase, no a instancias | `static` |
| **Privado** | Solo accesible dentro de la clase | `#` |

---

## 🆚 POO vs. Programación funcional

| | **POO** | **Funcional** |
|---|---------|---------------|
| **Centro** | Objetos con estado | Funciones puras |
| **Estado** | Mutable | Inmutable |
| **Reutilización** | Herencia | Composición |
| **Frameworks** | Java, C#, Angular | React (en parte), Elm |

JavaScript permite **ambos paradigmas** y combinarlos. ¡No es excluyente!

---

## 💡 Cuándo usar POO

✅ Cuando modelas entidades con **estado y comportamiento** complejo (usuarios, productos, pedidos...).
✅ Cuando quieres **reutilizar código** mediante herencia o composición.
✅ En aplicaciones grandes con muchas entidades relacionadas.

❌ Para tareas simples y procedimentales puede ser excesivo.
❌ Cuando lo que necesitas son funciones puras de transformación de datos.

---

## ✅ Resumen

- La POO organiza el código en **objetos** que combinan **datos y comportamiento**.
- Sus 4 pilares son: **encapsulamiento, herencia, polimorfismo y abstracción**.
- En JavaScript, las clases (`class`) son la sintaxis moderna para implementar POO.
- Es ideal para modelar entidades complejas y construir aplicaciones escalables.
