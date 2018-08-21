var id_usuario, id_vehiculo;

$("#add_container").slideUp();
$("#update_container").slideUp();

var espaniol = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};

$(document).ready(function () {

    cargarDatos();
    cargarConductor();
    cargarVehiculo();
    cambiarKilometraje();
    insertarViaje();
    eliminar();

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

    $("#cambiar_k").on("click", function () {
        $("#opcion4").val("actualizar kilometraje");
    });

    $("#add_travel").on("click", function () {
        $("#add_container").slideDown();
    });

    $("#cancelar").on("click", function (event) {
        event.preventDefault();
        $("#add_container").slideUp();
    });

    $("#editar_cancelar").on("click", function (event) {
        event.preventDefault();
        $("#update_container").slideUp();
    });

    function cargarDatos() {
        var table = $('#dt_viajes').DataTable({
            "destroy": true,
            "ajax": {
                url: "php/viajes.php",
                dataSrc: 'data'
            },
            "columns": [
                { "data": "DESTINO" },
                { "data": "FECHA_SALIDA" },
                { "data": "MODELO_VEHICULO" },
                { "data": "CONDUCTOR" },
                { "data": "OBSERVACIONES" },
                { "data": "MOTIVO" },
                { "data": "ESTADO_VIAJE" },
                {
                    "defaultContent": "<a href='detalle_viaje.html' class='detalle btn btn-sm btn-blue-grey'><i style = 'margin-right: 5px;' class='fa fa-file-text-o'></i>Detalle del viaje</a>" + "<br>" +
                        "<a class='mt-2 eliminar btn btn-sm btn-danger' data-toggle='modal' data-target='#eliminar-viaje' ><i style = 'margin-right: 5px;' class='fa fa-trash-o'></i> Borrar</a>" + "<br>"                        
                }
            ],
            "language": espaniol
        });
        cargar_datos_editar("#dt_viajes tbody", table);
        cargar_datos_eliminar("#dt_viajes tbody", table);
        cargar_datos_detalle("#dt_viajes tbody", table);
    }

    function cargarConductor() {
        var conductor = $("#conductor");
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
                id_usuario = (respuesta_json.data[item].id_usuario);
            });
        });
    }

    function cargarVehiculo() { 
        var vehiculo = $("#vehiculo");
        $.ajax({
            url: "php/listar_vehiculos.php"
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            for (var i = 0; i < respuesta_json.data.length; i++) {
                vehiculo.append('<option>' + respuesta_json.data[i].marca + ' ' + respuesta_json.data[i].modelo + ' | ' + respuesta_json.data[i].placa + '</option>');
            }
            var item = vehiculo.prop('selectedIndex');
            id_vehiculo = (respuesta_json.data[item].id_vehiculo);
            $("#kilometraje").val(respuesta_json.data[item].kilometraje);
            
            vehiculo.change(function () {
                var item = vehiculo.prop('selectedIndex');
                id_vehiculo = (respuesta_json.data[item].id_vehiculo);
                $("#kilometraje").val(respuesta_json.data[item].kilometraje);
            });
        });
    }

    function cambiarKilometraje() {
        $("#update_kilometraje").on("click", function (event) {
            event.preventDefault();
            var kilometraje = $("#kilometraje").val(),
                opcion = $("#opcion4").val(),
                vacio = "",
                id_vehiculo2 = id_vehiculo,
                n_kilometraje = $("#n_kilometraje").val();
            if (n_kilometraje.length == 0) {
                $(".alert_mensaje_kil").fadeIn();
                $(".alert_mensaje_kil").fadeOut(4000);
            } else {
                if (n_kilometraje > kilometraje) {
                    $.ajax({
                        method: "POST",
                        url: "php/viajes_funciones.php",
                        data: {
                            "opcion": opcion,
                            "id_vehiculo": id_vehiculo2,
                            "id_viaje": vacio,
                            "kilometraje": n_kilometraje,
                            "fecha_salida": vacio,
                            "destino": vacio,
                            "motivo": vacio,
                            "observaciones": vacio,
                            "id_usuario": vacio,
                            "estado": vacio
                        }
                    }).done(function (info) {
                        var respuesta_json = JSON.parse(info);
                        $('.modal').modal('hide');
                        mostrar_mensaje(respuesta_json);
                        cargarVehiculo();
                    })
                } else {
                    $(".alert_mensaje_kil").fadeIn();
                    $(".alert_mensaje_kil").fadeOut(4000);
                }
            }
        });
    }

    var mostrar_mensaje = function (informacion) {
        if (informacion.Resultado == "Exito") {
            $(".alert_mensaje_exito").fadeIn();
            $(".alert_mensaje_exito").fadeOut(5000);
        } else if (informacion.Resultado == "Guardado") {
            $(".alert_mensaje_guardado").fadeIn();
            $(".alert_mensaje_guardado").fadeOut(5000);
        } else if (informacion.Resultado == "Eliminado") {
            $(".alert_mensaje_eliminado").fadeIn();
            $(".alert_mensaje_eliminado").fadeOut(5000);
        }
    }

    function insertarViaje() {
        $("#agregar_viaje").on("click", function (event) {
            event.preventDefault();
            var fecha_salida = $("#fecha_s").val(),
                destino = $("#destino").val(),
                motivo = $("#motivo").val(),
                opcion = $("#opcion").val(),
                observaciones = $("#observaciones").val(),
                vacio = "";
            $.ajax({
                method: "POST",
                url: "php/viajes_funciones.php",
                data: {
                    "id_vehiculo": id_vehiculo,
                    "id_viaje": vacio,
                    "opcion": opcion,
                    "kilometraje": vacio,
                    "fecha_salida": fecha_salida,
                    "destino": destino,
                    "motivo": motivo,
                    "observaciones": observaciones,
                    "id_usuario": id_usuario,
                    "estado": vacio
                }
            }).done(function (info) {
                var json_response = JSON.parse(info);
                mostrar_mensaje(json_response);
                limpiar_datos_agregar();
                $("#add_container").slideUp();
                cargarDatos();
                location.reload();

            });
        })
    }

    var limpiar_datos_agregar = function () {
        $("#fecha_s").val("").focus();
        $("#destino").val("");
        $("#motivo").val("");
        $("#observaciones").val("");
    };

    function cargar_datos_editar(tbody, table) {
        $(tbody).on("click", "a.editar", function () {
            $("#update_container").slideDown();
            var data = table.row($(this).parents("tr")).data();
            var id_viaje = $("#id_viaje").val(data.ID),
                fecha = $("#e_fecha_s").val(data.FECHA_SALIDA),
                conductor = $("#e_conductor").val(data.CONDUCTOR),
                destino = $("#e_destino").val(data.DESTINO),
                vehiculo = $("#e_vehiculo").val(data.MODELO_VEHICULO),
                motivo = $("#e_motivo").val(data.MOTIVO),
                observaciones = $("#e_observaciones").val(data.OBSERVACIONES),
                opcion = $("#opcion3").val("editar viaje");
        });
    };

    function cargar_datos_detalle(tbody, table) {
        $(tbody).on("click", "a.detalle", function (event) {
            event.preventDefault();
            var data = table.row($(this).parents("tr")).data();
            var id_viaje = data.ID,
                id_vehiculo = data.ID_VEHICULO,
                opcion = $("#opcion6").val(),
                vacio = "";
            $.ajax({
                method: "POST",
                url: "php/viaje_detalle.php",
                data: {
                    "id_viaje": id_viaje,
                    "id_vehiculo": id_vehiculo,
                    "opcion": opcion,
                }
            }).done(function () {
                $(location).attr('href', 'detalle_viaje.html');
            })
        });
    };

    function cargar_datos_eliminar(tbody, table) {
        $(tbody).on("click", "a.eliminar", function () {
            var data = table.row($(this).parents("tr")).data();
            var id_viaje = $("#del_id_viaje").val(data.ID);
            var opcion = $("#opcion2").val("eliminar");
        });
    };

    function eliminar() {
        $("#eliminar-btn").on("click", function (event) {
            event.preventDefault();
            var id_viaje = $("#del_id_viaje").val(),
                opcion = $("#opcion2").val(),
                vacio = "";
            $.ajax({
                method: "POST",
                url: "php/viajes_funciones.php",
                data: {
                    "id_viaje": id_viaje,
                    "id_vehiculo": vacio,
                    "opcion": opcion,
                    "kilometraje": vacio,
                    "fecha_salida": vacio,
                    "destino": vacio,
                    "motivo": vacio,
                    "estado": vacio,
                    "observaciones": vacio,
                    "id_usuario": vacio,
                }
            }).done(function (info) {
                var json_respuesta = JSON.parse(info);
                $('.modal').modal('hide');
                mostrar_mensaje(json_respuesta);
                limpiar_datos_eliminar();
                setTimeout(function () {
                    location.reload();
                }, 500);
            });
        });
    };

    function limpiar_datos_eliminar() {
        $("#opcion2").val("eliminar");
        $("#del_id_viaje").val("");
    };
})