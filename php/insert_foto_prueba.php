<?php

    session_start();    
    require 'Conexion.php';

    $id_viaje = $_SESSION['id_viaje'];

    //Declaración nombre de imagenes

    $imagen_frontal = $_FILES['foto1']['name'];
    $imagen_trasera = $_FILES['foto2']['name'];
    $imagen_izquierda = $_FILES['foto3']['name'];
    $imagen_derecha = $_FILES['foto4']['name'];

    //Extension de imagenes
    $extension_imagen_frontal = explode('.',$imagen_frontal);
    $extension_frontal = end($extension_imagen_frontal);

    $extension_imagen_trasera = explode('.',$imagen_trasera);
    $extension_trasera = end($extension_imagen_trasera);

    $extension_imagen_izquierda = explode('.',$imagen_izquierda);
    $extension_izquierda = end($extension_imagen_izquierda);

    $extension_imagen_derecha = explode('.',$imagen_derecha);
    $extension_derecha = end($extension_imagen_derecha);

    //Cambio de nombre a imagenes
    //Cambio de nombre a imagenes
    $nombre_frontal = $id_viaje.'-frontal-salida'.".".$extension_frontal;                    
    $nombre_trasera = $id_viaje.'-trasera-salida'.".".$extension_trasera;                    
    $nombre_izquierda = $id_viaje.'-izquierda-salida'.".".$extension_izquierda;                    
    $nombre_derecha = $id_viaje.'-derecha-salida'.".".$extension_derecha;                    

    //Declaración ruta a guardar
    $ruta_frontal = "../img/Revision_Salida/Frontal/".$nombre_frontal;
    $ruta_trasera = "../img/Revision_Salida/Trasera/".$nombre_trasera;
    $ruta_izquierda = "../img/Revision_Salida/Izquierda/".$nombre_izquierda;
    $ruta_derecha = "../img/Revision_Salida/Derecha/".$nombre_derecha;

    echo($nombre_frontal);

    //Caracteristicas de las imagenes
    $tipo_frontal = $_FILES['foto1']['type'];
    $size_frontal = $_FILES['foto1']['size'];
    $ruta_provisional_frontal = $_FILES['foto1']['tmp_name'];
    
    $tipo_trasera = $_FILES['foto2']['type'];
    $size_trasera = $_FILES['foto2']['size'];
    $ruta_provisional_trasera = $_FILES['foto2']['tmp_name'];
    
    $tipo_izquierda = $_FILES['foto3']['type'];
    $size_izquierda = $_FILES['foto3']['size'];
    $ruta_provisional_izquierda = $_FILES['foto3']['tmp_name'];
    
    $tipo_derecha = $_FILES['foto4']['type'];
    $size_derecha = $_FILES['foto4']['size'];
    $ruta_provisional_derecha = $_FILES['foto4']['tmp_name'];    
        
    $foto_frontal = false;
    $foto_trasera = false;
    $foto_izquierda = false;
    $foto_derecha = false;

    try{                                                                               
        
        if ($extension_frontal != 'jpg' && $extension_frontal != 'jpeg' && $extension_frontal != 'png'){

            $error1['foto'] = 'La imagen frontal es incompatible'; 
            print json_encode($error1);             

        }else if ($size_frontal > 1024*1024){

            $error1['tamanio'] = 'La imagen frontal es demasiado grande'; 
            print json_encode($error1);              

        }else{

            $foto_frontal = true;            
        }

        if ($extension_trasera != 'jpg' && $extension_trasera != 'jpeg' && $extension_trasera != 'png') {
            
            $error1['foto'] = 'La imagen trasera es incompatible'; 
            print json_encode($error1);

        }else if ($size_trasera > 1024*1024){

            $error1['tamanio'] = 'La imagen trasera es demasiado grande'; 
            print json_encode($error1);              

        } else {
            $foto_trasera = true;
        }

        if ($extension_izquierda != 'jpg' && $extension_izquierda != 'jpeg' && $extension_izquierda != 'png') {
            
            $error1['foto'] = 'La imagen izquierda es incompatible'; 
            print json_encode($error1);

        }else if ($size_izquierda > 1024*1024){

            $error1['tamanio'] = 'La imagen izquierda es demasiado grande'; 
            print json_encode($error1);              

        } else {
            $foto_izquierda = true;
        }
        
        if ($extension_derecha != 'jpg' && $extension_derecha != 'jpeg' && $extension_derecha != 'png') {
            
            $error1['foto'] = 'La imagen derecha es incompatible'; 
            print json_encode($error1);

        }else if ($size_derecha > 1024*1024){

            $error1['tamanio'] = 'La imagen derecha es demasiado grande'; 
            print json_encode($error1);              

        } else {
            $foto_derecha = true;
        }
        

        if ($foto_frontal && $foto_trasera && $foto_izquierda && $foto_derecha) {
            move_uploaded_file($ruta_provisional_frontal,$ruta_frontal);
            move_uploaded_file($ruta_provisional_trasera,$ruta_trasera);
            move_uploaded_file($ruta_provisional_izquierda,$ruta_izquierda);
            move_uploaded_file($ruta_provisional_derecha,$ruta_derecha);
            print json_encode("Imagen enviada");
        }

    }catch(Exception $e){
        
        print json_encode(die('Error en la consulta: ' . $e->GetMessage()));
    
    }finally{
    
    $conexion = null;

    }         

?>