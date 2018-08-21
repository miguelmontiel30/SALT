var capacidad, aceite_motor, aceite_transmision, anticongelante, liquido_frenos, limpieza, estimacion, observaciones;

var llanta_refaccion = 0;
var llave_ruedas = 0;
var verificacion = 0;
var poliza_seguro = 0;
var gato = 0;
var t_circulacion = 0;

var cinchos = 0;
var matracas = 0;
var cobijas = 0;
var colchones = 0;
var rampas = 0;
var vacio = 'prueba';

$(document).ready(function () {

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

    cargarDatosVehiculo();
    cargarKilometraje();
    calcularKilometros();

    $("#adicion").on("click", function () {
        var formData = new FormData;
        var fecha_llegada = $("#fecha_llegada").val(),
            kilometros_entrada = $("#km_llegada").val(),
            total_km_recorridos = $("#km_total").val();
        formData.append("opcion", "registrar");
        formData.append("fecha_llegada", fecha_llegada);
        formData.append("kilometros_entrada", kilometros_entrada);
        formData.append("total_km_recorridos", total_km_recorridos);
        formData.append("aceite_motor", aceite_motor);
        formData.append("aceite_transmision", aceite_transmision);
        formData.append("anticongelante", anticongelante);
        formData.append("liquido_frenos", liquido_frenos);
        formData.append("llanta_refaccion", llanta_refaccion);
        formData.append("llave_ruedas", llave_ruedas);
        formData.append("verificacion", verificacion);
        formData.append("poliza_seguro", poliza_seguro);
        formData.append("gato", gato);
        formData.append("tarjeta_circulacion", t_circulacion);
        formData.append("cinchos", cinchos);
        formData.append("matracas", matracas);
        formData.append("cobijas", cobijas);
        formData.append("colchones", colchones);
        formData.append("rampas", rampas);
        formData.append("limpieza_vehiculo", limpieza);
        formData.append("nivel_gasolina_ida", estimacion);
        formData.append("observaciones", observaciones);
        formData.append("foto1", $("input[name=foto1]")[0].files[0]);
        formData.append("foto2", $("input[name=foto2]")[0].files[0]);
        formData.append("foto3", $("input[name=foto3]")[0].files[0]);
        formData.append("foto4", $("input[name=foto4]")[0].files[0]);
        $.ajax({
            method: 'POST',
            url: 'php/insertar_revision_final.php',
            data: formData,
            processData: false,
            contentType: false,
            cache: false
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            console.log(respuesta);
            $('.modal').modal('hide');
            mostrar_mensaje(respuesta);
            setTimeout(function () {
                actualizarViaje();
                actualizarKilometraje();
                $(location).attr('href', 'detalle_viaje.html');
            }, 3000);
        });
    });

    var mostrar_mensaje = function (informacion) {
        if (informacion.Resultado == "Guardado") {
            $(".alert_mensaje_exito").fadeIn();
            $(".alert_mensaje_exito").fadeOut(4000);
        }
    }

    function actualizarViaje() {
        var estado = "Finalizado";
        $.ajax({
            method: "POST",
            url: "php/actualizar_viaje.php",
            data: {
                "estado": estado
            }
        });
    }

    function actualizarKilometraje() {
        kilometros_entrada = $("#km_llegada").val(),
            $.ajax({
                method: "POST",
                url: "php/actualizar_km.php",
                data: {
                    'kilometraje': kilometros_entrada
                }
            });
    }

    $("#rango_gas").change(function () {
        var conversion = parseInt(capacidad) / 100;
        estimacion = conversion * parseInt($(this).val());
        $('#nivel_gas').html(estimacion.toFixed(1) + " Litros");
    });

    function cargarDatosVehiculo() {
        var opcion = 'cargar data vehiculo';
        $.ajax({
            method: 'POST',
            url: "php/revision_vehiculo.php",
            data: {
                "opcion": opcion
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            capacidad = respuesta_json.capacidad_tanque;
        });
    }

    function cargarKilometraje() {
        $.ajax({
            url: "php/kilometraje_salida.php",
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            $("#km_salida").val(respuesta_json.kilometraje);
        });
    }

    function calcularKilometros() {
        $("#km_llegada").keyup(function () {
            var salida = $("#km_salida").val();
            var llegada = $("#km_llegada").val();
            total = parseInt(llegada) - parseInt(salida);
            console.log(salida);
            $("#km_total").val(total);
        });
    }

    $("input[name=aceite_motor]").click(function () {
        aceite_motor = $(this).val();
    });

    $("input[name=aceite_transmision]").click(function () {
        aceite_transmision = $(this).val();
    });

    $("input[name=anticongelante]").click(function () {
        anticongelante = $(this).val();
    });

    $("input[name=liquido_frenos]").click(function () {
        liquido_frenos = $(this).val();
    });

    $("#llanta_refaccion").on("click", function () {
        if (($("#llanta_refaccion:checked").val()) != null) {
            llanta_refaccion = 1;
        } else {
            llanta_refaccion = 0;
        }
    });

    $("#llave_ruedas").on("click", function () {
        if (($("#llave_ruedas:checked").val()) != null) {
            llave_ruedas = 1;
        } else {
            llave_ruedas = 0;
        }
    });

    $("#verificacion").on("click", function () {
        if (($("#verificacion:checked").val()) != null) {
            verificacion = 1;
        } else {
            verificacion = 0;
        }
    });

    $("#poliza").on("click", function () {
        if (($("#poliza:checked").val()) != null) {
            poliza_seguro = 1;
        } else {
            poliza_seguro = 0;
        }
    });

    $("#gato").on("click", function () {
        if (($("#gato:checked").val()) != null) {
            gato = 1;
        } else {
            gato = 0;
        }
    });

    $("#t_circulacion").on("click", function () {
        if (($("#t_circulacion:checked").val()) != null) {
            t_circulacion = 1;
        } else {
            t_circulacion = 0;
        }
    });

    $("#cobijas").on("click", function () {
        if (($("#cobijas:checked").val()) != null) {
            $("#no_cobijas").attr("disabled", false);
            cobijas = $("#no_cobijas").val();
        } else {
            cobijas = 0;
            $("#no_cobijas").attr("disabled", true);
        }
    });

    $("#no_cobijas").keyup(function () {
        cobijas = $("#no_cobijas").val();
    });

    $("#cinchos").on("click", function () {
        if (($("#cinchos:checked").val()) != null) {
            $("#no_cinchos").attr("disabled", false);
            cinchos = $("#no_cinchos").val();
        } else {
            cinchos = 0;
            $("#no_cinchos").attr("disabled", true);
        }
    });

    $("#no_cinchos").keyup(function () {
        cinchos = $("#no_cinchos").val();
    });

    $("#rampas").on("click", function () {
        if (($("#rampas:checked").val()) != null) {
            $("#no_rampas").attr("disabled", false);
            rampas = $("#no_rampas").val();
        } else {
            rampas = 0;
            $("#no_rampas").attr("disabled", true);
        }
    });

    $("#no_rampas").keyup(function () {
        rampas = $("#no_rampas").val();
    });

    $("#matracas").on("click", function () {
        if (($("#matracas:checked").val()) != null) {
            $("#no_matracas").attr("disabled", false);
            matracas = $("#no_matracas").val();
        } else {
            matracas = 0;
            $("#no_matracas").attr("disabled", true);
        }
    });

    $("#no_matracas").keyup(function () {
        matracas = $("#no_matracas").val();
    });

    $("#colchones").on("click", function () {
        if (($("#colchones:checked").val()) != null) {
            $("#no_colchones").attr("disabled", false);
            colchones = $("#no_colchones").val();
        } else {
            colchones = 0;
            $("#no_colchones").attr("disabled", true);
        }
    });

    $("#no_colchones").keyup(function () {
        colchones = $("#no_colchones").val();
    });

    $("input[name=radioUnidad]").click(function () {
        limpieza = $(this).val();
    });

    $("#observaciones").keyup(function () {
        observaciones = $("#observaciones").val();
    });

});
