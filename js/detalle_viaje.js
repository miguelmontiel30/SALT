$(document).ready(function () {

    peticionDatos();
    peticionDatosPresupuesto();

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
            $(location).attr('href', 'index.html');
        })
    });


    function peticionDatos() {
        var opcion = "detalles viaje";
        $.ajax({
            method: 'POST',
            url: "php/detalle_viaje.php",
            data: {
                "opcion": opcion
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);            
            statusViaje(respuesta_json);
            cargarDatos(respuesta_json);
        });
    }

    function cargarDatos(data) {
        $("#fecha").val(data.fecha_salida);
        $("#conductor").val(data.nombre);
        $("#destino").val(data.destino);
        $("#marca").val(data.marca);
        $("#modelo").val(data.modelo);
        $("#placa").val(data.placa);
        $("#rendimiento").val(data.rendimiento);
        $("#vigencia").val(data.vigencia_tarjeta);
        $("#kilometros").val(data.kilometraje);
        $("#rendimiento").val(data.rendimiento);
        $("#motivo").val(data.motivo);
        $("#observaciones").val(data.observaciones);

    }

    function statusViaje(data) {
        if (data.estado_viaje == 'Iniciado') {
            $("#presupuesto_button").html('<a class="btn btn-sm btn-light-blue" href="presupuesto.html">Calcular Presupuesto</a>');
            $("#presupuesto:checkbox").attr('checked', true);
        } else if (data.estado_viaje == 'Presupuestado') {
            $("#revision_inicial_button").html('<a class="btn btn-sm btn-light-blue" href="revision_vehiculo.html">Revisión Inicial</a>');
            $("#presupuesto:checkbox").attr('checked', true);
            $("#primera_revision:checkbox").attr('checked', false);
        } else if (data.estado_viaje == 'Primera revision'){
            $("#revision_final_btn").html('<a class="btn btn-sm btn-light-blue" href="revision_final.html">Revisión Final</a>');
            $(".estado-revision").html('<h3 class="text-center mt-3 mb-3 title-section"> Estado de la revisión </h3>' +
            '<p>Visualiza el estado de las revisiones del vehículo (salida-llegada).</p>' +
            '<a class="btn btn-sm btn-light-blue" href="estado_revision.html">Estado de la revisión</a>');
            $("#presupuesto:checkbox").attr('checked', true);
            $("#primera_revision:checkbox").attr('checked', true);
            $("#segunda_revision:checkbox").attr('checked', false);
        }else{            
            $(".estado-revision").html('<h3 class="text-center mt-3 mb-3 title-section"> Estado de la revisión </h3>' +
            '<p>Visualiza el estado de las revisiones del vehículo (salida-llegada).</p>' +
            '<a class="btn btn-sm btn-light-blue" href="estado_revision.html">Estado de la revisión</a>');
            $("#presupuesto:checkbox").attr('checked', true);
            $("#primera_revision:checkbox").attr('checked', true);
            $("#segunda_revision:checkbox").attr('checked', true);
        }

    }

    function peticionDatosPresupuesto() {
        var opcion = "detalles presupuesto";
        $.ajax({
            method: 'POST',
            url: "php/detalle_viaje.php",
            data: {
                "opcion": opcion
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);
            cargarDatosPresupuesto(respuesta_json);
        });
    }

    function cargarDatosPresupuesto(data) {
        if (data) {
            var kilometros = data.distancia,
                presupuesto = data.total_presupuesto;
            $("#presupuesto_aprox").html('<strong>$' + presupuesto + '</strong>');
            $("#kilometros_pres").html('<strong>' + kilometros + ' KM</strong>');
        } else {
            $("#presupuesto_aprox").html('<strong>No asignado</strong>');
            $("#kilometros_pres").html('<strong>No asignado</strong>');
        }


    }

})