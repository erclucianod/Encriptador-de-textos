const ingresoTexto = document.getElementById("texto");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const tituloMensaje = document.getElementById("tituloMensaje");
const muneco = document.getElementById("muneco");
const textoMensaje = document.getElementById("textoMensaje");
const containerResultado = document.getElementById("container-resultado");


// Función de encriptación
function encriptar(texto) {
    let newText = texto.toLowerCase();
    for (let [original, reemplazo] of remplazar) {
        newText = newText.replaceAll(original, reemplazo);
    }
    return newText;
}

// Evento click del botón "Encriptar"
btnEncriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value;
    const textoEncriptado = encriptar(texto);
    // console.log(textoEncriptado);

    tituloMensaje.innerHTML = textoEncriptado;
    muneco.style.display = "none";

    textoMensaje.style.display = "none";
    btnCopiar.style.display = "block"

    containerResultado.classList.add("ajustar");




});

//Tabla de reemplazo 
const remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
];

