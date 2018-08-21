$(document).ready(function () {

    cargarDatos();
    editar();
    cambiarPass();
    
    
    $("#actualizar-contra").on("click", function (event) {
        event.preventDefault();
        $("#opcion").val("contrasenia");
    });

    $("#salir").on("click", function (event) {
        event.preventDefault();
        $("#opcion").val("salir");
        var vacio = "",
            opcion = opcion = $("#opcion").val();
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
            console.log(json_info);
            $(location).attr('href', 'index.html');
        })
    });

    function cambiarPass() {
        $("#button_contrasenia").on("click", function (event) {
            event.preventDefault();
            var contrasenia = $("#contrasenia").val(),
                contrasenia2 = $("#contrasenia2").val(),
                id_usuario = $("#id_usuario").val(),
                opcion = $("#opcion").val(),
                vacio = "";
            if (contrasenia.length == 0) {
                $(".alert_mensaje_contrasenias2").fadeIn();
                $(".alert_mensaje_contrasenias2").fadeOut(4000);
            } else {
                if (contrasenia == contrasenia2) {                    
                    $.ajax({
                        method: "POST",
                        url: "php/editar_perfil.php",
                        data: {
                            "opcion": opcion,
                            "id_usuario": id_usuario,
                            "nombre": vacio,
                            "apellido": vacio,
                            "rol": vacio,
                            "correo": vacio,
                            "contrasenia": contrasenia
                        }
                    }).done(function (info) {
                        var json_info = JSON.parse(info);
                        $('.modal').modal('hide');
                        mostrar_mensaje(json_info);
                        limpiar_datos();
                        limpiarFormularioContra();
                        cargarDatos();
                    })
                } else {
                    $(".alert_mensaje_contrasenias").fadeIn();
                    $(".alert_mensaje_contrasenias").fadeOut(4000);
                }
            }
        })
    }

    function cargarDatos() {
        $.ajax({
            url: "php/perfil.php"
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            var nombre = $("#nombre").val(respuesta_json.nombre),
                id_usuario = $("#id_usuario").val(respuesta_json.id_usuario),
                apellido = $("#apellido").val(respuesta_json.apellido),
                correo = $("#correo").val(respuesta_json.correo),
                rol = $("#rol").val(respuesta_json.rol),
                opcion = $("#opcion").val("editar");
        });
    }

    function editar() {
        $("#usuario_form").on("submit", function (event) {
            event.preventDefault();
            var opcion = $("#usuario_form #opcion").val(),
                nombre = $("#usuario_form #nombre").val(),
                apellido = $("#usuario_form #apellido").val(),
                rol = $("#usuario_form #rol").val(),
                correo = $("#usuario_form #correo").val(),
                id_usuario = $("#usuario_form #id_usuario").val(),
                vacio = "";
            $.ajax({
                method: "POST",
                url: "php/editar_perfil.php",
                data: {
                    "id_usuario": id_usuario,
                    "nombre": nombre,
                    "apellido": apellido,
                    "rol": rol,
                    "correo": correo,
                    "contrasenia": vacio,
                    "opcion": opcion
                }
            }).done(function (info) {
                var json_info = JSON.parse(info);
                console.log(json_info);
                mostrar_mensaje(json_info);
                limpiar_datos();
                cargarDatos();
            });
        });
    }

    var limpiar_datos = function () {
        $("#opcion").val("");
        $("id_usuario").val("");
        $("#nombre").val("").focus();
        $("#apellido").val("");
        $("#rol").val("");
        $("#correo").val("");
    }

    var limpiarFormularioContra = function () {
        $("#opcion").val("");
        $("#contrasenia").val("");
        $("#contrasenia2").val("");
    }

    var mostrar_mensaje = function (informacion) {
        if (informacion.Resultado == "Exito") {
            $(".alert_mensaje_exito").fadeIn();
            $(".alert_mensaje_exito").fadeOut(4000);
        } else if (informacion.Resultado == "Cambiada") {
            $(".alert_mensaje_contrac").fadeIn();
            $(".alert_mensaje_contrac").fadeOut(4000);
        }
    }

});