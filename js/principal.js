cargarNombre();
cargarVerificaciones();
cargarseguros();

$("#salir").on("click", function (event) {
    event.preventDefault();
    $("#opcion").val("salir");
    var vacio = "",
        opcion = opcion = 'salir';
    $.ajax({
        method: "POST",
        url: "php/editar_perfil.php",
        data: {
            "opcion": opcion,
            "id_usuario": vacio,
            "nombre": vacio,
            "apellido": vacio,
            "rol": vacio,
            "correo": vacio,
            "contrasenia": vacio
        }
    }).done(function (info) {
        var json_info = JSON.parse(info);
        $(location).attr('href', 'index.html');
    })
});


function cargarNombre() {
    $.ajax({
        url: "php/principal.php"
    }).done(function (info) {
        var respuesta_json = JSON.parse(info);

        $("h1.sms-bienvenida").html("Bienvenido al sistema " + respuesta_json.nombre);
    });
}

function cargarVerificaciones() {
    $.ajax({
        method: "POST",
        url: "php/fechas_proximas.php",
        data: {
            "opcion": "verificaciones"
        }
    }).done(function (info) {
        var respuesta = JSON.parse(info);
        console.log(respuesta.Resultado);
        if (respuesta.Resultado == 'Vacio') {
            $("#verificaciones-lista").html('<em class="text-center text-success">Por ahora no hay vehiculos próximos a verificar.</em>');
        } else {
            for (var i = 0; i < respuesta.Resultado.length; i++) {
                if (respuesta.Resultado[i].dias_restantes <= 30) {

                    $("#verificaciones-lista").append('<a href="verificaciones.html"><li class="list-group-item d-flex justify-content-between align-items-center">' +
                        respuesta.Resultado[i].marca + ' | ' + respuesta.Resultado[i].modelo +
                        '<span class="badge badge-danger badge-pill">' + respuesta.Resultado[i].dias_restantes + ' días</span>' +
                        '</li></a>');
                } else {
                    $("#verificaciones-lista").append('<a href="verificaciones.html"><li class="list-group-item d-flex justify-content-between align-items-center">' +
                        respuesta.Resultado[i].marca + ' | ' + respuesta.Resultado[i].modelo +
                        '<span class="badge badge-warning badge-pill">' + respuesta.Resultado[i].dias_restantes + ' días</span>' +
                        '</li></a>');
                }
            }
        }
    })
}

function cargarseguros() {
    $.ajax({
        method: "POST",
        url: "php/fechas_proximas.php",
        data: {
            "opcion": "seguro"
        }
    }).done(function (info) {
        var respuesta = JSON.parse(info);
        console.log(respuesta.Resultado);
        if (respuesta.Resultado == 'Vacio') {
            $("#lista_seguros").html('<em class="text-center text-success">Por ahora no hay vehiculos próximos a pago de seguro.</em>');
        } else {
            for (var i = 0; i < respuesta.Resultado.length; i++) {
                if (respuesta.Resultado[i].dias_restantes <= 30) {

                    $("#lista_seguros").append('<a href="seguros.html"><li class="list-group-item d-flex justify-content-between align-items-center">' +
                        respuesta.Resultado[i].marca + ' | ' + respuesta.Resultado[i].modelo +
                        '<span class="badge badge-danger badge-pill">' + respuesta.Resultado[i].dias_restantes + ' días</span>' +
                        '</li></a>');
                } else if (respuesta.Resultado[i].dias_restantes <= 40){
                    $("#lista_seguros").append('<a href="seguros.html"><li class="list-group-item d-flex justify-content-between align-items-center">' +
                        respuesta.Resultado[i].marca + ' | ' + respuesta.Resultado[i].modelo +
                        '<span class="badge badge-warning badge-pill">' + respuesta.Resultado[i].dias_restantes + ' días</span>' +
                        '</li></a>');
                }
            }
        }
    })
}