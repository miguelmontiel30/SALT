var id_vehiculo, id_usuario, data, fecha;

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

$("#nueva_verificacion").slideUp();

$(document).ready(function () {

    cargarVehiculo();
    $('#dt_verificaciones').DataTable();

    $("#cancelar").click(function (e) {
        e.preventDefault();
        $("#nueva_verificacion").slideUp();
    });

    $("#agregar_nueva").click(function (e) {
        e.preventDefault();
        $("#nueva_verificacion").slideDown();
        cargarUsuario();
    });

    $("#aceptar-insertar").click(function (e) {
        e.preventDefault();
        var formData = new FormData;
        var fecha_verificacion = $("#fecha").val(),
            proveedor = $("#proveedor").val(),
            importe = $("#importe").val(),
            descripcion = $("#descripcion").val(),
            proxima_fecha = $("#proxima").val();
        formData.append("opcion", "registrar");
        formData.append("fecha_verificacion", fecha_verificacion);
        formData.append("proveedor", proveedor);
        formData.append("importe", importe);
        formData.append("id_usuario", id_usuario);
        formData.append("descripcion", descripcion);
        formData.append("proxima_fecha", proxima_fecha);
        formData.append("id_vehiculo", id_vehiculo);
        formData.append("factura", $("input[name=factura]")[0].files[0]);
        $.ajax({
            method: 'POST',
            url: 'php/insertar_verificacion.php',
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
                location.reload();
            }, 2000);
        });
    });

    function mostrar_mensaje(informacion) {
        if (informacion.Resultado == "Guardado") {
            $(".alert_mensaje_exito").fadeIn();
            $(".alert_mensaje_exito").fadeOut(4000);
        }
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

            vehiculo.change(function () {
                var item = vehiculo.prop('selectedIndex');
                id_vehiculo = (respuesta_json.data[item - 1].id_vehiculo);
                $.ajax({
                    method: "POST",
                    url: "php/verificaciones.php",
                    data: {
                        "opcion": "cargar verificacion",
                        "id_vehiculo": id_vehiculo
                    }
                }).done(function (info) {
                    var datos = JSON.parse(info);
                    data = datos.data;
                    if (data != 'Vacio') {
                        cargarDataVerificaciones(data);
                        cargarDatosGenerales(id_vehiculo);   
                        cargarGasto(id_vehiculo);                     
                        cargarFecha(id_vehiculo);                                                           
                    } else {
                        cargarDatosGenerales(id_vehiculo);
                        cargarFecha (id_vehiculo);                     
                        cargarGasto(id_vehiculo);                        
                        var table = $('#dt_verificaciones');
                        var data = [
                            [
                                "",
                                "",
                                "",
                                "",
                                "",
                                ""
                            ],
                        ]
                        table.DataTable({
                            "destroy": true,
                            data: data,
                            "languaje": espaniol
                        });
                    }
                });
            });
        });
    }

    function cargarDataVerificaciones(data) {        
        var table = $('#dt_verificaciones').DataTable({
            "destroy": true,
            data: data,
            "columns": [
                {
                    data: "foto_factura",
                    render: function (data) {
                        var url = "https://salt-sys.000webhostapp.com";
                        return '<img class="mt-3" width="130" height="90"  src=' + url + '/img/Verificaciones/' + data + '>';
                    }
                },
                { data: "fecha_verificacion" },
                { data: "proveedor" },
                { data: "importe" },
                { data: "nombre" },
                { data: "descripcion" }
            ],
            "languaje": espaniol
        });
    }

    function cargarDatosGenerales(id_vehiculo){
        $.ajax({
            type: "POST",
            url: "php/detalles_verificacion.php",
            data: {
                "opcion": 'no_verificaciones',
                "id_vehiculo": id_vehiculo
            }
        }).done (function (info){
            var respuesta = JSON.parse(info);            
            if (respuesta.data[0].no_verificaciones == 0) {
                
                $("#presupuesto_aprox").html('<h5 class="text-center">No hay verificaciones registradas</h5>');
                
            }else{
                $("#presupuesto_aprox").html('<h2 class="text-center">' + respuesta.data[0].no_verificaciones + '</h2>');
            }
        })
    }
    
    function cargarGasto(id_vehiculo){
        $.ajax({
            type: "POST",
            url: "php/detalles_verificacion.php",
            data: {
                "opcion": 'gasto',
                "id_vehiculo": id_vehiculo
            }
        }).done (function (info){
            var respuesta = JSON.parse(info);            
            if (respuesta.data[0].gasto == null) {
                
                $("#gasto").html('<h5 class="text-center">No hay verificaciones registradas</h5>');
                
            }else{
                $("#gasto").html('<h2 class="text-center">$' + respuesta.data[0].gasto + '</h2>');
            }
        })
    }
    
    function cargarFecha(id_vehiculo){
        $.ajax({
            type: "POST",
            url: "php/detalles_verificacion.php",
            data: {
                "opcion": 'proxima_fecha',
                "id_vehiculo": id_vehiculo
            }
        }).done (function (info){
            var respuesta = JSON.parse(info);            
            if (respuesta.data[0].proxima_fecha == null) {
                
                $("#proxima_fecha").html('<h5 class="text-center">No hay verificaciones registradas</h5>');
                fecha = '';
                cargarDias(fecha);
            }else{
                $("#proxima_fecha").html('<h2 id="fecha_1" class="text-center">' + respuesta.data[0].proxima_fecha + '</h2>');
                fecha = respuesta.data[0].proxima_fecha;
                cargarDias(fecha);
            }
        })
    }
    
    function cargarDias(fecha){        
        $.ajax({
            type: "POST",
            url: "php/detalles_verificacion.php",
            data: {
                "opcion": 'dias',
                "id_vehiculo": id_vehiculo,
                "fecha": fecha
            }
        }).done (function (info){            
            var respuesta = JSON.parse(info);                
            if (respuesta.data == 'Vacio') {
                
                $("#dias").html('<h5 class="text-center">No hay verificaciones registradas</h5>');
                
            }else{
                $("#dias").html('<h2 class="text-center">' + respuesta.data[0].dias + ' días.</h2>');
            }
        })
    }

    function cargarUsuario() {
        var usuario = $("#usuario");
        $.ajax({
            url: "php/listar_conductores.php"
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            for (var i = 0; i < respuesta_json.data.length; i++) {
                usuario.append('<option>' + respuesta_json.data[i].nombre + ' ' + respuesta_json.data[i].apellido + ' | ' + respuesta_json.data[i].rol + '</option>');
            }

            usuario.change(function () {
                var item = usuario.prop('selectedIndex');
                id_usuario = (respuesta_json.data[item - 1].id_usuario);
            });
        });
    }

});