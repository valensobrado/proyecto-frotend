let Captcha = document.getElementById("captcha");
Captcha.innerHTML = Math.round((Math.random()*100000));
let btnEnviar = document.getElementById("btn-enviar");
btnEnviar.addEventListener("click", validarCaptcha);

function validarCaptcha() {
    let NombreCompleto = document.getElementById("nombre");
    let Hamburguesa = document.getElementById("hamburguesa");
    let Guarnicion = document.getElementById("guarnicion");
    let Bebida = document.getElementById("bebida");
    let Domicilio = document.getElementById("domicilio");
    let InputCaptcha = document.getElementById("input-captcha");
    let ValueCaptcha = document.getElementById("value-captcha");
    let ValueForm = document.getElementById("value-form");

    let validCaptcha = false;
    let validInput = false;
    
    if (NombreCompleto.value == "" || Domicilio.value == "" || Hamburguesa.value == "Seleccione" || Guarnicion.value == "Seleccione" || Bebida.value == "Seleccione") {
        ValueForm.innerHTML = "Complete todos los campos para realizar el pedido"
        ValueCaptcha.innerHTML = ""
    }
    else {
        validInput = true;
        ValueForm.innerHTML= ""
    }
    if (InputCaptcha.value == Captcha.textContent) {
        validCaptcha = true;  
    }
    else if (InputCaptcha.value == "") {
        ValueCaptcha.innerHTML = "Complete el captcha";
    }
    else {
        ValueCaptcha.innerHTML = "Captcha Incorrecto";
    }
    if (validInput && validCaptcha) {
        ValueCaptcha.innerHTML = "Envio completado";
        NombreCompleto.value = "";
        Domicilio.value = "";
        Hamburguesa.value = "";
        Guarnicion.value = "";
        Bebida.value = "";
        InputCaptcha.value = "";   
        Captcha.innerHTML = Math.round((Math.random()*100000));     
    }
}