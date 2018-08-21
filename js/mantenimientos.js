var id_vehiculo, data_vehiculo, id_usuario, item, data_proveedor;
var aceites_filtros = 'NO';
var balatas = 'NO';
var otro_reemplazo = 'NO';
var trabajo_extra = 'NO';

var balatas_data = {
    trasera: '0',
    delantera: '0'
}

var aceites_filtros_data = {
    c_aceite: 0,
    c_filtro_aceite: 0,
    c_filtro_combustible: 0,
    c_filtro_aire: 0,
    importe: 0,
    proveedor: 0,
}


$(document).ready(function () {


    dataVehiculo();
    cargarProveedores();
    
    function dataVehiculo() {
        $.ajax({
            url: "php/listar_vehiculos.php",
        }).done(function (info) {                       
            var respuesta = JSON.parse(info);
            console.log(respuesta);            
            data_vehiculo = respuesta.data;
            
            llenarSelectVehiculos();
            cambiarKilometraje();
            cargarDataVehiculo();            
            
        });
    }    

    function llenarSelectVehiculos() {

        var vehiculo = $("#vehiculo");

        var data = data_vehiculo;

        for (var i = 0; i < data.length; i++) {
            vehiculo.append('<option>' + data[i].marca + ' ' + data[i].modelo + ' | ' + data[i].placa + '</option>');
        }

        vehiculo.change(function () {
            item = $("#vehiculo").prop('selectedIndex');
            item = item - 1;
            id_vehiculo = (data[item].id_vehiculo);
            cargarDataMantenimientos();
        });

    }

    function cambiarKilometraje() {
        $("#update_kilometraje").on("click", function (event) {
            event.preventDefault();
            var kilometraje = $("#kilometraje").val(),                
                n_kilometraje = $("#n_kilometraje").val();
            if (n_kilometraje.length == 0) {
                $(".alert_mensaje_kil").fadeIn();
                $(".alert_mensaje_kil").fadeOut(4000);
            } else {
                if (n_kilometraje > kilometraje) {
                    $.ajax({
                        method: "POST",
                        url: "php/mantenimientos.php",
                        data: {
                            "opcion": 'actualizar_kilometraje',
                            "id_vehiculo": id_vehiculo,
                            "kilometraje": n_kilometraje,
                        }
                    }).done(function (info) {
                        var respuesta_json = JSON.parse(info);
                        dataVehiculo();
                        $('.modal').modal('hide');                        
                        mostrar_mensaje(respuesta_json);                        
                    })
                } else {
                    $(".alert_mensaje_kil").fadeIn();
                    $(".alert_mensaje_kil").fadeOut(4000);
                }
            }
        });
    }

    function mostrar_mensaje(informacion) {
        if (informacion.Resultado == "Guardado") {
            $(".alert_mensaje_exito_proveedor").fadeIn();
            $(".alert_mensaje_exito_proveedor").fadeOut(4000);
        } else if (informacion.Resultado == "NO Guardado") {
            $(".alert_error_proveedor").fadeIn();
            $(".alert_error_proveedor").fadeOut(4000);
        } else if (informacion.Resultado == "Kilometraje") {
            swal({
                icon: "success",
                text: "El kilometraje se actualizó exitosamente",
            })
        }
    }

    function cargarDataVehiculo() {        
        
        kilometraje = $("#kilometraje");
        nombre_vehiculo = $("#marca_vehiculo");

        kilometraje.val(data_vehiculo[item].kilometraje);
        nombre_vehiculo.val(data_vehiculo[item].marca + ' | ' + data_vehiculo[item].modelo);

        proximo_servicio = parseInt(kilometraje.val()) + parseInt(data_vehiculo[item].periodo_mantenimiento);
        $("#proximo_servicio").val(proximo_servicio);
    }

    function cargarDataMantenimientos() {
        $("#periodo_matenimientos").html(data_vehiculo[item].periodo_mantenimiento + ' KM');
    }

    function cargarProveedores() {
        $.ajax({
            method: "POST",
            url: "php/mantenimientos.php",
            data: {
                "opcion": "cargar_proveedores"
            }
        }).done(function (info) {            
            var respuesta_json = JSON.parse(info);

            data_proveedor = respuesta_json.data;

            for (var i = 0; i < respuesta_json.data.length; i++) {
                $("#lista_proveedores").append('<li class="list-group-item">' + respuesta_json.data[i].nombre + '</li> ');
            }
            
            for (var i = 0; i < respuesta_json.data.length; i++) {
                $(".proveedores").append('<option>' + respuesta_json.data[i].nombre + '</option>');
                console.log(respuesta_json.data[item]);
                
            }

        })
    }

    function cargarConductores() {
        var conductor = $("#conductor");
        conductor.empty();
        conductor.append('<option selected>Encargado</option>');
        $.ajax({
            url: "php/listar_conductores.php"
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            for (var i = 0; i < respuesta_json.data.length; i++) {
                conductor.append('<option>' + respuesta_json.data[i].nombre + ' ' + respuesta_json.data[i].apellido + ' | ' + respuesta_json.data[i].rol + '</option>');
            }
            var item = conductor.prop('selectedIndex');
            id_usuario = (respuesta_json.data[item].id_usuario);
            conductor.change(function () {
                var item = conductor.prop('selectedIndex');
                id_usuario = (respuesta_json.data[item - 1].id_usuario);
            });
        });
    }

    $("#agregar-mantenimiento").click(function () {
        if (id_vehiculo == undefined) {

            swal({
                title: "¡Error!",
                text: "Primero debe seleccionar un vehículo",
                icon: "error",
            });

        } else {

            cargarDataVehiculo();
            cargarConductores();

        }

    });

    $("#button_proveedor").click(function (e) {
        e.preventDefault();
        var nombre = $("#proveedor_nombre").val(),
            direccion = $("#proveedor_direccion").val(),
            numero = $("#proveedor_numero").val();
        if (direccion == '') {
            direccion = 'NO';
        } if (numero == '') {
            numero = 'NO';
        }
        $.ajax({
            method: "POST",
            url: "php/mantenimientos.php",
            data: {
                "opcion": "registrar_proveedor",
                "proveedor_nombre": nombre,
                "proveedor_direccion": direccion,
                "proveedor_numero": numero
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            mostrar_mensaje(respuesta_json);
            $('.modal').modal('hide');
            $("#lista_proveedores").append('<li class="list-group-item">' + nombre + '</li>');
        })

    });

        
    // Eventos para BLOQUEAR Y DESBLOQUEAR CAMPOS

    $("input[name=desicion_cambios]").click(function () {

        aceites_filtros = $(this).val();

        if (aceites_filtros == 'SI') {
            

            $("#c_aceite_si").prop("disabled", false);
            $("#c_aceite_no").prop("disabled", false);

            $("#c_filtro_aceite_si").prop("disabled", false);
            $("#c_filtro_aceite_no").prop("disabled", false);

            $("#c_filtro_combustible_si").prop("disabled", false);
            $("#c_filtro_combustible_no").prop("disabled", false);

            $("#c_filtro_aire_si").prop("disabled", false);
            $("#c_filtro_aire_no").prop("disabled", false);

            $("#importe_cambios").prop("disabled", false);

            $("#proveedor_cambios").prop("disabled", false);

        } else {

            $("#c_aceite_si").prop("disabled", true);
            $("#c_aceite_no").prop("disabled", true);

            $("#c_filtro_aceite_si").prop("disabled", true);
            $("#c_filtro_aceite_no").prop("disabled", true);

            $("#c_filtro_combustible_si").prop("disabled", true);
            $("#c_filtro_combustible_no").prop("disabled", true);

            $("#c_filtro_aire_si").prop("disabled", true);
            $("#c_filtro_aire_no").prop("disabled", true);

            $("#importe_cambios").prop("disabled", true);
            $("#proveedor_cambios").prop("disabled", true);

        }

    });

    $("input[name=desicion_balatas]").click(function () {
        balatas = $(this).val();

        if (balatas == 'SI') {

            $("#c_balatas_trasera_si").prop("disabled", false);
            $("#c_balatas_trasera_no").prop("disabled", false);
            $("#c_balatas_delantera_si").prop("disabled", false);
            $("#c_balatas_delantera_no").prop("disabled", false);
            $("#importe_balatas").prop("disabled", false);
            $("#proveedor_balatas").prop("disabled", false);
        } else {
            $("#c_balatas_trasera_si").prop("disabled", true);
            $("#c_balatas_trasera_no").prop("disabled", true);
            $("#c_balatas_delantera_si").prop("disabled", true);
            $("#c_balatas_delantera_no").prop("disabled", true);
            $("#importe_balatas").prop("disabled", true);
            $("#proveedor_balatas").prop("disabled", true);

        }
    });

    $("input[name=desicion_bujias]").click(function () {
        balatas = $(this).val();

        if (balatas == 'SI') {

            $("#lavado_inyectores_si").prop("disabled", false);
            $("#lavado_inyectores_no").prop("disabled", false);
            $("#c_bujias_si").prop("disabled", false);
            $("#c_bujias_no").prop("disabled", false);
            $("#cable_bujia_si").prop("disabled", false);
            $("#cable_bujia_no").prop("disabled", false);
            $("#importe_bujias").prop("disabled", false);
            $("#proveedor_bujias").prop("disabled", false);
        } else {
            $("#lavado_inyectores_si").prop("disabled", true);
            $("#lavado_inyectores_no").prop("disabled", true);
            $("#c_bujias_si").prop("disabled", true);
            $("#c_bujias_no").prop("disabled", true);
            $("#cable_bujia_si").prop("disabled", true);
            $("#cable_bujia_no").prop("disabled", true);
            $("#importe_bujias").prop("disabled", true);
            $("#proveedor_bujias").prop("disabled", true);

        }
    });

    $("input[name=desicion_llantas]").click(function () {
        balatas = $(this).val();

        if (balatas == 'SI') {

            $("#c_llantas_traseras_si").prop("disabled", false);
            $("#c_llantas_traseras_no").prop("disabled", false);
            $("#c_llantas_del_si").prop("disabled", false);
            $("#c_llantas_del_no").prop("disabled", false);
            $("#importe_llantas").prop("disabled", false);
            $("#proveedor_llantas").prop("disabled", false);
        } else {
            $("#c_llantas_traseras_si").prop("disabled", true);
            $("#c_llantas_traseras_no").prop("disabled", true);
            $("#c_llantas_del_si").prop("disabled", true);
            $("#c_llantas_del_no").prop("disabled", true);
            $("#importe_llantas").prop("disabled", true);
            $("#proveedor_llantas").prop("disabled", true);

        }
    });

    $("input[name=desicion_alineacion]").click(function () {
        balatas = $(this).val();

        if (balatas == 'SI') {

            $("#alineacion_si").prop("disabled", false);
            $("#alineacion_no").prop("disabled", false);
            $("#balanceo_si").prop("disabled", false);
            $("#balanceo_no").prop("disabled", false);
            $("#importe_ali_bal").prop("disabled", false);
            $("#proveedor_ali_bal").prop("disabled", false);
        } else {
            $("#alineacion_si").prop("disabled", true);
            $("#alineacion_no").prop("disabled", true);
            $("#balanceo_si").prop("disabled", true);
            $("#balanceo_no").prop("disabled", true);
            $("#importe_ali_bal").prop("disabled", true);
            $("#proveedor_ali_bal").prop("disabled", true);

        }
    });

    $("input[name=desicion_reemplazo_amor]").click(function () {
        balatas = $(this).val();

        if (balatas == 'SI') {

            $("#c_amortiguador_trasero_si").prop("disabled", false);
            $("#c_amortiguador_trasero_no").prop("disabled", false);
            $("#c_amortiguadores_del_si").prop("disabled", false);
            $("#c_amortiguadores_del_no").prop("disabled", false);
            $("#importe_amortiguadores").prop("disabled", false);
            $("#proveedor_amortiguadores").prop("disabled", false);
        } else {
            $("#c_amortiguador_trasero_si").prop("disabled", true);
            $("#c_amortiguador_trasero_no").prop("disabled", true);
            $("#c_amortiguadores_del_si").prop("disabled", true);
            $("#c_amortiguadores_del_no").prop("disabled", true);
            $("#importe_amortiguadores").prop("disabled", true);
            $("#proveedor_amortiguadores").prop("disabled", true);

        }
    });

    $("input[name=desicion_reemplazo]").click(function () {
        otro_reemplazo = $(this).val();

        if (otro_reemplazo == 'SI' || trabajo_extra == 'SI') {
            $("#importe_otros").prop("disabled", false);
            $("#proveedor_otros").prop("disabled", false);
            if (otro_reemplazo == 'SI') {
                $("#otro_reemplazo").prop("disabled", false);
            } else {
                $("#otro_reemplazo").prop("disabled", true);
            }
        } else {
            $("#otro_reemplazo").prop("disabled", true);
            $("#importe_otros").prop("disabled", true);
            $("#proveedor_otros").prop("disabled", true);
        }
    });

    $("input[name=desicion_extra]").click(function () {
        trabajo_extra = $(this).val();

        if (otro_reemplazo == 'SI' || trabajo_extra == 'SI') {
            $("#importe_otros").prop("disabled", false);
            $("#proveedor_otros").prop("disabled", false);
            if (trabajo_extra == 'SI') {
                $("#especificaciones_extra").prop("disabled", false);
            } else {
                $("#especificaciones_extra").prop("disabled", true);
            }
        } else {
            $("#especificaciones_extra").prop("disabled", true);
            $("#importe_otros").prop("disabled", true);
            $("#proveedor_otros").prop("disabled", true);
        }

    });



    // METODODS PARA GUARDAR LOS VALORES DE LAS VARIABLES 

    $("#c_aceite_si").on("click", function () {
        if (($("#c_aceite_si:checked").val()) != null) {
            aceites_filtros_data.c_aceite = 1;
        }
    });

    $("#c_aceite_no").on("click", function () {
        if (($("#c_aceite_no:checked").val()) != null) {
            aceites_filtros_data.c_aceite = 0;
        }
    });

    $("#c_filtro_aceite_si").on("click", function () {
        if (($("#c_filtro_aceite_si:checked").val()) != null) {
            aceites_filtros_data.c_filtro_aceite = 1;
        }
    });

    $("#c_filtro_aceite_no").on("click", function () {
        if (($("#c_filtro_aceite_no:checked").val()) != null) {
            aceites_filtros_data.c_filtro_aceite = 0;
        }
    });

    $("#c_filtro_combustible_si").on("click", function () {
        if (($("#c_filtro_combustible_si:checked").val()) != null) {
            aceites_filtros_data.c_filtro_combustible = 1;
        }
    });

    $("#c_filtro_combustible_no").on("click", function () {
        if (($("#c_filtro_combustible_no:checked").val()) != null) {
            aceites_filtros_data.c_filtro_combustible = 0;
        }
    });

    $("#c_filtro_aire_si").on("click", function () {
        if (($("#c_filtro_aire_si:checked").val()) != null) {
            aceites_filtros_data.c_filtro_aire = 1;
        }
    });

    $("#c_filtro_aire_no").on("click", function () {
        if (($("#c_filtro_aire_no:checked").val()) != null) {
            aceites_filtros_data.c_filtro_aire = 0;
        }
    });

});