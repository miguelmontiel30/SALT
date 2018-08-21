verificar_sesion();

function verificar_sesion() {
    $.ajax({        
        url: "php/verificar_sesion.php",
    }).done(function (info) {
        var json = JSON.parse(info);                
        if (json.sesion == false) {            
            $(location).attr('href', 'index.html');
        }
    });
}