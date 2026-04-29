let auth0ClientInstance = null;

window.addEventListener("load", async () => {

    console.log("JS cargado");

    // auth0
    if (typeof auth0 === "undefined") {
        console.error("Auth0 no cargó");
        return;
    }

    // 🔐 Crear cliente
    auth0ClientInstance = await auth0.createAuth0Client({
        domain: "dev-sdbaeve179970a.us.auth0.com",
        clientId: "bYtcJXiwFHQbcwScBf0xpoG5Jcqg63Ul",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });

    //  Botones
    document.getElementById("btn-login").addEventListener("click", () => {
        auth0ClientInstance.loginWithRedirect();
    });

    document.getElementById("btn-logout").addEventListener("click", () => {
        sessionStorage.clear();
        auth0ClientInstance.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    });

    if (window.location.search.includes("code=")) {
        await auth0ClientInstance.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    // Sesión
    const isAuthenticated = await auth0ClientInstance.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0ClientInstance.getUser();

        document.getElementById("bienvenida").textContent =
            `Bienvenido ${user.name || user.email}`;

        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-logout").style.display = "block";
    }

    activarBotones();
    renderCarrito();
});


// Botones
function activarBotones() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {

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


// Agregar al carrito
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


// Render del carrito
function renderCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

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
