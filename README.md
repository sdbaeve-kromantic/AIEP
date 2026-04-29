# AIEP
Proyecto miniapp "SportyStyle"

1. Catálogo de Productos

La tienda incluye productos en diferentes categorías:

Camisetas deportivas
Pantalones deportivos
Zapatillas deportivas

Cada producto contiene:

Imagen
Nombre
Descripción
Precio
Botón "Agregar al carrito"

2. Carrito de Compras
Permite agregar productos
Actualiza cantidades automáticamente
Calcula el total de la compra
Muestra:
Nombre del producto
Precio
Cantidad
Total

3. Persistencia con Session Storage
Los productos se almacenan usando sessionStorage
El carrito se mantiene durante la sesión del navegador
Se limpia al cerrar sesión o finalizar compra

4. Autenticación de Usuario

Se implementó una autenticación por medio de plataforma Auth0.

Funcionalidades:

Inicio de sesión
Mensaje de bienvenida
Persistencia de sesión
Cierre de sesión

5. Simulación de Pago

El usuario debe completar un formulario con:

Nombre completo
Dirección
Correo electrónico
Teléfono
✔ Validaciones:
Email con formato válido
Teléfono solo números

6. Confirmación de Compra

Después del pago:

Se muestra un resumen del pedido
Se calcula el total
Se limpia el carrito

Tecnologías Utilizadas
HTML5
CSS3
JavaScript
Imágenes desde: https://heroicons.com y https://unsplash.com/es

Estructura del Proyecto
AIEP/
│── index.html
│── styles.css
│── index.js
