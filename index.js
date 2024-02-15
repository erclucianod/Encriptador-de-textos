// Definición de constantes
const ingresoTexto = document.getElementById("ingresoTexto");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const muneco = document.getElementById("muneco");
const textoMensaje = document.getElementById("textoMensaje");
const containerResultado = document.getElementById("containerResultado");

// Tabla de reemplazo
const remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
];

// Función para validar el texto ingresado
function validarTexto(texto) {
    // Expresión regular que valida si el texto contiene solo letras minúsculas, espacios y signos de puntuación
    const regex = /^[a-z\s\p{P}]+$/u;
    return regex.test(texto);
}

//En esta expresión regular:
// regex = /^[a-z\s\p{P}]+$/u;
// ^ y $ indican el comienzo y el final de la cadena respectivamente.
// [a-z] permite cualquier letra minúscula del alfabeto inglés.
// \s permite espacios en blanco.
// \p{P} permite cualquier signo de puntuación Unicode.
// + indica que uno o más caracteres deben coincidir con la expresión regular.
// /u al final de la expresión regular indica que se debe usar el modo Unicode.
// }

// Función para procesar el texto
function procesarTexto(encriptar) {
    const texto = ingresoTexto.value;
    if (!validarTexto(texto)) {
        alert("Por favor, ingresa solo letras minúsculas y sin acentos.");
        return;
    }
    
    const newText = (encriptar ? encriptarTexto : desencriptarTexto)(texto);
    mostrarResultado(newText);
}

// Eventos encriptar y desencriptar
btnEncriptar.addEventListener("click", () => procesarTexto(true));
btnDesencriptar.addEventListener("click", () => procesarTexto(false));

// Funciones para encriptar y desencriptar el texto
const encriptarTexto = texto => procesar(texto, remplazar);
const desencriptarTexto = texto => procesar(texto, remplazar.map(([a, b]) => [b, a]));

// Genéricas para procesar el texto
const procesar = (texto, tabla) => tabla.reduce((str, [a, b]) => str.replaceAll(a, b), texto);

// Para mostrar el resultado y ajustar el DOM
const mostrarResultado = texto => {
    mensajeFinal.textContent = texto;
    [muneco, textoMensaje].forEach(elemento => elemento.style.display = "none");
    btnCopiar.style.display = "block";
    containerResultado.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");
};

// Función copiar el texto al portapapeles
btnCopiar.addEventListener("click", () => {
    const texto = mensajeFinal.textContent;
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado!");
            mensajeFinal.textContent = "";
            ingresoTexto.value = "";
            [muneco, textoMensaje].forEach(elemento => elemento.style.display = "block");
            btnCopiar.style.display = "none";
            containerResultado.classList.remove("ajustar");
            mensajeFinal.classList.remove("ajustar");
            ingresoTexto.focus();
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
            alert("Error al copiar el texto al portapapeles");
        });
});

