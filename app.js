let giftCards = [];

const formGift = document.getElementById("form-gift");
const tabla = document.getElementById("cuerpo-tabla");
const btnSubmit = document.getElementById("btn-submit");
const btnCancelar = document.getElementById("btn-cancelar");

document.addEventListener("DOMContentLoaded", cargarDatos);
formGift.addEventListener("submit", guardarGift);
btnCancelar.addEventListener("click", limpiarFormulario);


function cargarDatos() {
    const datos = localStorage.getItem("giftCards");

    if (datos) {
        giftCards = JSON.parse(datos);
    } else {
        // Datos iniciales simples
        giftCards = [
            { id: 1, nombre: "Anual Pro", tipo: "Suscripción", tiempo: "1 año", precio: 120 },
            { id: 2, nombre: "Crédito 25", tipo: "Compra", tiempo: "N/A", precio: 25 }
        ];
        guardarLocal();
    }

    mostrarTabla();
}


function guardarLocal() {
    localStorage.setItem("giftCards", JSON.stringify(giftCards));
}


function guardarGift(e) {
    e.preventDefault();

    const id = document.getElementById("gift-id").value;
    const nombre = document.getElementById("gift").value;
    const tipo = document.getElementById("tipo").value;
    const tiempo = document.getElementById("tiempo").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !tipo || !tiempo || !precio) {
        alert("Completa todos los campos");
        return;
    }

    if (id) {
        // EDITAR
        const pos = giftCards.findIndex(g => g.id == id);
        giftCards[pos] = { id: Number(id), nombre, tipo, tiempo, precio: Number(precio) };
    } else {
        // CREAR
        giftCards.push({
            id: Date.now(),
            nombre,
            tipo,
            tiempo,
            precio: Number(precio)
        });
    }

    guardarLocal();
    mostrarTabla();
    limpiarFormulario();
}


function mostrarTabla() {
    tabla.innerHTML = "";

    giftCards.forEach(g => {
        let fila = `
            <tr>
                <td>${g.nombre}</td>
                <td>${g.tipo}</td>
                <td>${g.tiempo}</td>
                <td>$${g.precio}</td>
                <td>
                    <button class="btn btn-sm btn-outline-dark" onclick="editar(${g.id})">Editar</button>
                    <button class="btn btn-sm btn-outline-dark" onclick="eliminarGift(${g.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}


function editar(id) {
    const g = giftCards.find(x => x.id === id);

    document.getElementById("gift-id").value = g.id;
    document.getElementById("gift").value = g.nombre;
    document.getElementById("tipo").value = g.tipo;
    document.getElementById("tiempo").value = g.tiempo;
    document.getElementById("precio").value = g.precio;

    btnSubmit.textContent = "Guardar";
    btnCancelar.style.display = "inline-block";
}


function eliminarGift(id) {
    if (!confirm("¿Eliminar?")) return;

    giftCards = giftCards.filter(g => g.id !== id);
    guardarLocal();
    mostrarTabla();
}


function limpiarFormulario() {
    formGift.reset();
    document.getElementById("gift-id").value = "";

    btnSubmit.textContent = "Agregar";
    btnCancelar.style.display = "none";
}
