$(document).ready(function () {

    cargarViajesTranscurso();
    cargarViajesMes();
    cargarNoViajes();
    cargarNoUsers();
    cargarNoVehiculos();
    cargarTotalMantenimientos();
    cargarTotalVerificaciones();
    cargartotalSeguro();


    function cargarViajesTranscurso() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'viajes_transcurso'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            $("#viajes_transcurso").append('<h2 class="text-center"><span class="badge badge-pill badge-primary">' + respuesta.data[0].viajes + '</span></h2>');
        });
    }

    function cargarViajesMes() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'viajes_mes'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            $("#total_viajes").append('<h2 class="text-center"><span class="badge badge-pill badge-primary">' + respuesta.data[0].no_viajes + '</span></h2>');
        });
    }

    function cargarNoViajes() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_viajes'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            $("#no_viajes").html(respuesta.data[0].no_viajes);
        });
    }

    function cargarNoUsers() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_usuarios'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            $("#no_usuarios").html(respuesta.data[0].no_usuarios);
        });
    }

    function cargarNoVehiculos() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_vehiculos'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            $("#no_vehiculos").html(respuesta.data[0].no_vehiculos);
        });
    }

    function cargarTotalMantenimientos() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_mantenimientos'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            if (respuesta.data[0].gasto == null) {
                $("#gasto_mantenimientos").html('NA');    
            }else{
                $("#gasto_mantenimientos").html('$ ' + respuesta.data[0].gasto);
            }
        });
    }

    function cargarTotalVerificaciones() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_verificaciones'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            if (respuesta.data[0].gasto == null) {
                $("#gasto_verificacion").html('NA');
            }else{
                $("#gasto_verificacion").html('$ ' + respuesta.data[0].gasto);
            }
        });
    }

    function cargartotalSeguro() {
        $.ajax({
            method: "POST",
            url: "php/estadisticas_rapidas.php",
            data: {
                "opcion": 'total_seguro'
            }
        }).done(function (info) {
            var respuesta = JSON.parse(info);
            if (respuesta.data[0].gasto == null) {
                $("#gasto_seguros").html('NA');                
            }else{
                $("#gasto_seguros").html('$ ' + respuesta.data[0].gasto);                
            }
        });
    }







});