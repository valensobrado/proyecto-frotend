let btnCon = document.querySelector("#contacto-btn");
btnCon.addEventListener("click", enviarConsulta);

function enviarConsulta() {
	let nombreCon = document.querySelector("#contacto-nombre");
	let apellidoCon = document.querySelector("#contacto-apellido");
	let emailCon = document.querySelector("#contacto-email");
	let telefonoCon = document.querySelector("#contacto-telefono");
	let selectCon = document.querySelector("#contacto-select");
	let textCon = document.querySelector("#contacto-textarea");
	let comentCon = document.querySelector("#contacto-comentario");

	if (nombreCon.value != "" && apellidoCon.value != "" && emailCon.value != "" && telefonoCon.value != "" && selectCon.value != "Motivo de su consulta" && textCon.value != "") {
		comentCon.innerHTML = "Gracias! Su consulta ha sido enviada";
		nombreCon.value = "";
		apellidoCon.value = "";
		emailCon.value = "";
		telefonoCon.value = "";
		selectCon.value = "Motivo de su consulta";
		textCon.value = "";
	}
	else if (selectCon.value == "Motivo de su consulta") {
		comentCon.innerHTML = "Seleccione el motivo de su consulta";
	}
	else {
		comentCon.innerHTML = "Complete todos los campos para enviar";
	}
}