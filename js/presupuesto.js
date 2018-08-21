var total_litros, vale, total_presupuesto, total_viaticos, no_vale;
var precio_combustible = 0;
var caseta = 0;
var hotel = 0;
var comidas = 0;

$(document).ready(function () {

    $("#cancelar").click(function (e) {
        e.preventDefault();
        $("#opcion2").val("cancelar");
        var opcion = $("#opcion2").val();
        $.ajax({
            method: "POST",
            url: "php/presupuesto_funciones.php",
            data: {
                "opcion": opcion
            }
        }).done(function () {
            $("#opcion2").val("cancelar");
            $(location).attr('href', 'viajes.html');
        });
    });

    $("#no_vale").keyup(function () {
        no_vale = $("#no_vale").val();
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
    cargarRendimiento();
    calcularCombustible();
    validarVale();
    calcularViaticos();
    calcularTotalPresupuesto();
    insertarPresupuesto();

    function cargarRendimiento() {
        var rendimiento = $("#rendimiento"),
            opcion = $("#opcion2").val(),
            vacio = "";
        $.ajax({
            method: "POST",
            url: "php/presupuesto_funciones.php",
            data: {
                "distancia": vacio,
                "precio_comb": vacio,
                "total_comb": vacio,
                "litros_comb": vacio,
                "vale_combustible": vacio,
                "no_vale": vacio,
                "total_casetas": vacio,
                "gasto_casetas": vacio,
                "n_personas": vacio,
                "total_hotel": vacio,
                "total_comida": vacio,
                "total_viaticos": vacio,
                "total_presupuesto": vacio,
                "opcion": opcion
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            rendimiento.val(respuesta_json.data[0].rendimiento);
        });
    }

    function calcularCombustible() {
        $("#distancia").keyup(function () {
            var distancia = $("#distancia").val(),
                rendimiento = $("#rendimiento").val();
            total_litros = (distancia / rendimiento);
            $("h3#total_litros").html("Litros " + total_litros.toFixed(2));
        });
        $("#precio_combustible").keyup(function () {
            precio_combustible = total_litros.toFixed(2) * $("#precio_combustible").val();
            $("h3#total_combustible").html("$" + precio_combustible.toFixed(2));
        });
    }

    function validarVale() {

        $("#vale_si").on("click", function () {
            if (($("#vale_si:checked").val()) != null) {
                $("#vale_no").attr("disabled", true);
                $("#no_vale").attr("disabled", false);
                vale = 1;
            } else {
                $("#vale_no").attr("disabled", false);
            }
        });

        $("#vale_no").on("click", function () {
            if (($("#vale_no:checked").val()) != null) {
                $("#vale_si").attr("disabled", true);
                $("#no_vale").attr("disabled", true);
                vale = 0;
                no_vale = "NA"
                console.log(no_vale);
            } else {
                $("#vale_si").attr("disabled", false);
            }
        })
    }

    function calcularTotalPresupuesto() {
        $("#presupuesto_form").keyup(function () {
            caseta = $("#g_casetas").val();
            hotel = $("#hotel").val();
            comidas = $("#comidas").val();
            total_presupuesto = parseFloat(precio_combustible.toFixed(2)) + parseFloat(caseta) + parseFloat(hotel) + parseFloat(comidas);
            $("h3#total_presupuesto").html("$" + total_presupuesto);

        });


    }

    function calcularViaticos() {
        $("#presupuesto_form").keyup(function () {
            var hotel = $("#hotel").val(),
                comidas = $("#comidas").val();
            total_viaticos = parseFloat(hotel) + parseFloat(comidas);
            $("h3#total_viaticos").html("$" + total_viaticos);
        });
    }

    function insertarPresupuesto() {
        $("#agregar-modal-btn").click(function (e) {
            e.preventDefault();
            var distancia = $("#distancia").val(),
                precio_comb = $("#precio_combustible").val(),
                total_comb = precio_combustible,
                litros_comb = total_litros,
                vale_combustible = vale,
                total_casetas = $("#t_casetas").val(),
                gasto_casetas = $("#g_casetas").val(),
                n_personas = $("#no_personas").val(),
                total_hotel = $("#hotel").val(),
                total_comida = $("#comidas").val(),
                opcion = $("#opcion").val();
            $.ajax({
                method: "POST",
                url: "php/presupuesto_funciones.php",
                data: {
                    "distancia": distancia,
                    "precio_comb": precio_comb,
                    "total_comb": total_comb,
                    "litros_comb": litros_comb,
                    "vale_combustible": vale_combustible,
                    "no_vale": no_vale,
                    "total_casetas": total_casetas,
                    "gasto_casetas": gasto_casetas,
                    "n_personas": n_personas,
                    "total_hotel": total_hotel,
                    "total_comida": total_comida,
                    "total_viaticos": total_viaticos,
                    "total_presupuesto": total_presupuesto,
                    "opcion": opcion,
                }
            }).done(function (info) {
                var respuesta_json = JSON.parse(info);
                $('.modal').modal('hide');
                mostrar_mensaje(respuesta_json);
                setTimeout(function () {
                    actualizarViaje();
                    $(location).attr('href', 'detalle_viaje.html');
                }, 1000);
            });
        });
    }

    function actualizarViaje() {
        var estado = "Presupuestado";
        $.ajax({
            method: "POST",
            url: "php/actualizar_viaje.php",
            data: {
                "estado": estado
            }
        });
    }

    var mostrar_mensaje = function (informacion) {
        if (informacion.Resultado == "Exito") {
            $(".alert_mensaje_exito").fadeIn();
            $(".alert_mensaje_exito").fadeOut(4000);
        }
    }

});