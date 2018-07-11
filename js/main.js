jQuery(document).on('submit','#formlg',function(event){
    event.preventDefault();

    jQuery.ajax({
        url: 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function(){

        }
    })
    .done(function(respuesta){
        console.log(respuesta);
        if(!respuesta.error){
            if(respuesta.tipo == 'Administrador'){
                location.href =  'ventana_admin.html';
            }else if(respuesta.tipo == 'Tutor'){
                location.href = 'ventana_tutor.html';
            }else if(respuesta.tipo = 'Profesor'){
                location.href = 'ventana_profe.html';
            }
        }else{
            $('.error').slideDown('slow');
            setTimeout(function(){
                $('.error').slideUp('slow');  
            },3000);
        }
    })
    .fail(function(resp){
        console.log(resp.responseText);        
    })
    .always(function(){
        console.log("complete");    

    }); 
});