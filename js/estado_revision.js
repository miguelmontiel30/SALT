$(document).ready(function () {

    PeticionDataPrimera();    

    function PeticionDataPrimera() {
        var opcion = 'primera';
        $.ajax({
            method: "POST",
            url: "php/listar_primera_revision.php",
            data: {
                "opcion": opcion
            }
        }).done(function (info) {
            var respuesta_json = JSON.parse(info);  
            console.log(respuesta_json);            
            setDataPrimera(respuesta_json);
        });
    }

    function setDataPrimera(data) {
        setImages(data);
        revisionNivelesAceiteMotor(data);
        revisionNivelesAceiteTransmision(data);
        revisionNivelesAnticongenlante(data);
        revisionNivelesLiquidoFrenos(data);
        revisionNivelesLlanta(data);
        revisionNivelesLlave(data);
        revisionNivelesVerificacion(data);
        revisionNivelesPoliza(data);
        revisionNivelesGato(data);
        revisionNivelesTarjeta(data);
        revisionEquipamientoCobijas(data);
        revisionEquipamientoCinchos(data);
        revisionEquipamientoRampas(data);
        revisionEquipamientoMatracas(data);
        revisionEquipamientoColchones(data);
        revisionLimpieza(data);            
        $("#nivel_gas_ida").html('<h2 class="white-text mb-0">' + data.data[0].nivel_gasolina_ida + ' Litros</h2>');
        $("#observaciones_salida").val(data.data[0].observaciones);
    }

    function setImages(data){
        var ruta_frontal = "img/Revision_Salida/Frontal/" + data.data[0].foto_frontal;        
        var ruta_trasera = "img/Revision_Salida/Trasera/" + data.data[0].foto_trasera;        
        var ruta_izquierda = "img/Revision_Salida/Izquierda/" + data.data[0].foto_izquierda;        
        var ruta_derecha = "img/Revision_Salida/Derecha/" + data.data[0].foto_derecha;        
        $("#foto1").attr("src", ruta_frontal);
        $("#foto2").attr("src", ruta_trasera);
        $("#foto3").attr("src", ruta_izquierda);
        $("#foto4").attr("src", ruta_derecha);        
    }

    var revisionNivelesAceiteMotor = function (data) {

        //Niveles de salida
        if (data.data[0].aceite_motor == 'En condición') {
            $("#a_condicion_salida").attr('checked', 'checked');
        } else if (data.data[0].aceite_motor == 'Cambio') {
            $("#a_viaje_salida").attr('checked', 'checked');
        } else {
            $("#a_cambio_salida").attr('checked', 'checked');
        }        

    }

    var revisionNivelesAceiteTransmision = function (data) {

        //Niveles de salida
        if (data.data[0].aceite_transmision == 'En condición') {
            $("#t_condicion_salida").attr('checked', 'checked');
        } else if (data.data[0].aceite_transmision == 'Cambio') {
            $("#t_cambio_salida").attr('checked', 'checked');
        } else {
            $("#t_viaje_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesAnticongenlante = function (data) {

        //Niveles de salida
        if (data.data[0].anticongelante == 'En condición') {
            $("#c_condicion_salida").attr('checked', 'checked');
        } else if (data.data[0].anticongelante == 'Cambio') {
            $("#c_cambio_salida").attr('checked', 'checked');
        } else {
            $("#c_viaje_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesLiquidoFrenos = function (data) {

        //Niveles de salida
        if (data.data[0].liquido_frenos == 'En condición') {
            $("#f_condicion_salida").attr('checked', 'checked');
        } else if (data.data[0].liquido_frenos == 'Cambio') {
            $("#f_cambio_salida").attr('checked', 'checked');
        } else {
            $("#f_viaje_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesLlanta = function (data) {

        //Niveles de salida
        if (data.data[0].llanta_refaccion == '1') {
            $("#llanta_refaccion_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesLlave = function (data) {

        //Niveles de salida
        if (data.data[0].llave_ruedas == '1') {
            $("#llave_ruedas_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesVerificacion = function (data) {

        //Niveles de salida
        if (data.data[0].verificacion == '1') {
            $("#verificacion_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesPoliza = function (data) {

        //Niveles de salida
        if (data.data[0].poliza_seguro == '1') {
            $("#poliza_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesGato = function (data) {

        //Niveles de salida
        if (data.data[0].gato == '1') {
            $("#gato_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionNivelesTarjeta = function (data) {

        //Niveles de salida
        if (data.data[0].tarjeta_circulacion == '1') {
            $("#t_circulacion_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

    var revisionEquipamientoCobijas = function (data) {

        //Niveles de salida
        if (data.data[0].cobijas > 0) {
            $("#cobijas_salida").attr('checked', 'checked');
            $("#no_cobijas_salida").val(data.data[0].cobijas);
        }

        //Niveles de llegada

    }

    var revisionEquipamientoCinchos = function (data) {

        //Niveles de salida
        if (data.data[0].cinchos > 0) {
            $("#cinchos_salida").attr('checked', 'checked');
            $("#no_cinchos_salida").val(data.data[0].cinchos);
        }

        //Niveles de llegada

    }

    var revisionEquipamientoRampas = function (data) {

        //Niveles de salida
        if (data.data[0].rampas > 0) {
            $("#rampas_salida").attr('checked', 'checked');
            $("#no_rampas_salida").val(data.data[0].rampas);
        }

        //Niveles de llegada

    }

    var revisionEquipamientoMatracas = function (data) {

        //Niveles de salida
        if (data.data[0].matracas > 0) {
            $("#matracas_salida").attr('checked', 'checked');
            $("#no_matracas_salida").val(data.data[0].matracas);
        }

        //Niveles de llegada

    }

    var revisionEquipamientoColchones = function (data) {

        //Niveles de salida
        if (data.data[0].colchones > 0) {
            $("#colchones_salida").attr('checked', 'checked');
            $("#no_colchones_salida").val(data.data[0].colchones);
        }

        //Niveles de llegada

    }
    
    var revisionLimpieza = function (data) {

        //Niveles de salida
        if (data.data[0].limpieza_vehiculo == 'Limpia') {
            $("#radioLimpia_salida").attr('checked', 'checked');            
        }else if (data.data[0].limpieza_vehiculo == 'Sucia') {
            $("#radioSucia_salida").attr('checked', 'checked');
        }else{
            $("#radioLavada_salida").attr('checked', 'checked');
        }

        //Niveles de llegada

    }

});