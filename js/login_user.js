$(document).ready(function () {

    $('.iniciar').on('click', function (event) {
        $('.loading-container').html('<p class="text-center">Cargando....<p><div class="loading"><img class="loading" src="img/loading.gif" alt="loading" /></div>').delay(6000);
    });

    $(".form").on("submit", function (event) {
        event.preventDefault();
        var data_form = $(this).serialize();
        $.ajax({
            method: "POST",
            url: "php/login.php",
            data: data_form            
        }).done(function (info) {                      
            var json_data_request = JSON.parse(info);
            validacionUser(json_data_request);
        })
    })

    var validacionUser = function (data) {
        if (data.Estado == "1") {
            var rol = data.Usuario["rol"];
            switch (rol) {
                case 'Administrador':
                    $(location).attr('href', 'principal.html');
                    break;
                case 'Supervisor':
                    $(location).attr('href', 'principal_supervisor.html');
                    break;
                case 'Conductor':
                    $(location).attr('href', 'principal_conductor.html');
                    break;
            }
        } else {
            $('.loading-container').html('');
            $('#mensaje-error').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><center><strong>¡Usuario o contraseña incorrectos!</strong> Revisa que los datos sean correctos</center></div>');
            $('#mensaje-error').hide();
            $('#mensaje-error').slideDown(3000);
            $('#mensaje-error').slideUp(3000);

        }
    }




})