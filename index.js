let auth0 = null;

window.addEventListener("load", async () => {

    console.log("JS cargado");

    // 🔒 Verifica que Auth0 esté cargado
    if (typeof createAuth0Client === "undefined") {
        console.error("Auth0 NO se cargó. Revisa el script en el HTML.");
        return;
    }

    // 🔐 Inicializar Auth0
    auth0 = await createAuth0Client({
        domain: "TU_DOMINIO.auth0.com",
        clientId: "TU_CLIENT_ID",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });

    // 🔘 BOTÓN LOGIN
    document.getElementById("btn-login").addEventListener("click", () => {
        console.log("Click login");
        auth0.loginWithRedirect();
    });

    // 🔘 BOTÓN LOGOUT
    document.getElementById("btn-logout").addEventListener("click", () => {
        console.log("Click logout");
        sessionStorage.clear();
        auth0.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    });

    // 👤 SESIÓN
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0.getUser();

        document.getElementById("bienvenida").textContent =
            `Bienvenido ${user.name}`;

        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-logout").style.display = "block";
    }

    // 🛒 Inicializar carrito
    renderCarrito();
    activarBotones();
});


// 🛒 ACTIVAR BOTONES
function activarBotones() {
    const botones = document.querySelectorAll('.btn-add-cart');

    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log("Producto agregado");

            const producto = e.target.closest('.item');

            const infoProducto = {
                nombre: producto.querySelector('h2').textContent,
                precio: producto.querySelector('.precio').textContent,
                cantidad: 1
            };

            agregarProducto(infoProducto);
        });
    });
}


// 🛒 AGREGAR PRODUCTO
function agregarProducto(producto) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => p.nombre === producto.nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(producto);
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    renderCarrito();
}


// 🛒 MOSTRAR CARRITO
function renderCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (!lista || !totalElemento) return;

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        const precio = parseInt(prod.precio.replace("$", ""));
        total += precio * prod.cantidad;

        lista.innerHTML += `
            <div>
                ${prod.nombre} - ${prod.cantidad} x ${prod.precio}
            </div>
        `;
    });

    totalElemento.textContent = total;
}


// 💳 FORMULARIO
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-pago");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(correo)) {
            alert("Correo inválido");
            return;
        }

        const telefonoValido = /^[0-9]{8,15}$/;
        if (!telefonoValido.test(telefono)) {
            alert("Teléfono inválido");
            return;
        }

        const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

        let resumen = "";
        let total = 0;

        carrito.forEach(p => {
            const precio = parseInt(p.precio.replace("$", ""));
            total += precio * p.cantidad;

            resumen += `<p>${p.nombre} x${p.cantidad}</p>`;
        });

        document.getElementById("confirmacion").innerHTML = `
            <h2>Gracias por tu compra</h2>
            ${resumen}
            <p>Total: $${total}</p>
        `;

        sessionStorage.removeItem("carrito");
        renderCarrito();
    });
});