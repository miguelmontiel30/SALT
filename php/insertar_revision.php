<?php
    session_start();

    require 'Conexion.php';

    $id_vehiculo = $_SESSION['id_vehiculo'];
    $id_viaje = $_SESSION['id_viaje'];

    $opcion = $_POST['opcion'];  
    $aceite_motor = $_POST['aceite_motor'];  
    $aceite_transmision = $_POST['aceite_transmision'];  
    $anticongelante = $_POST['anticongelante'];  
    $liquido_frenos = $_POST['liquido_frenos'];  
    $llanta_refaccion = $_POST['llanta_refaccion'];  
    $llave_ruedas = $_POST['llave_ruedas'];  
    $verificacion = $_POST['verificacion'];  
    $poliza_seguro = $_POST['poliza_seguro'];  
    $gato = $_POST['gato'];  
    $tarjeta_circulacion = $_POST['tarjeta_circulacion'];
    $cinchos = $_POST['cinchos'];  
    $matracas = $_POST['matracas'];  
    $cobijas = $_POST['cobijas'];  
    $colchones = $_POST['colchones'];  
    $rampas = $_POST['rampas'];  
    $limpieza_vehiculo = $_POST['limpieza_vehiculo'];  
    $nivel_gasolina_ida = $_POST['nivel_gasolina_ida'];  
    $observaciones = $_POST['observaciones'];  

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
    $nombre_frontal = $id_viaje.'-frontal-salida'.".".$extension_frontal;                    
    $nombre_trasera = $id_viaje.'-trasera-salida'.".".$extension_trasera;                    
    $nombre_izquierda = $id_viaje.'-izquierda-salida'.".".$extension_izquierda;                    
    $nombre_derecha = $id_viaje.'-derecha-salida'.".".$extension_derecha;                    

    //Declaración ruta a guardar
    $ruta_frontal = "../img/Revision_Salida/Frontal/".$nombre_frontal;
    $ruta_trasera = "../img/Revision_Salida/Trasera/".$nombre_trasera;
    $ruta_izquierda = "../img/Revision_Salida/Izquierda/".$nombre_izquierda;
    $ruta_derecha = "../img/Revision_Salida/Derecha/".$nombre_derecha;

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

    if ($opcion == 'registrar') {

        try{

            if ($extension_frontal != 'jpg' && $extension_frontal != 'jpeg' && $extension_frontal != 'png'){

                $error1['foto'] = 'La imagen frontal es incompatible'; 
                print json_encode($error1);             
    
            }else{
    
                $foto_frontal = true;            
            }
    
            if ($extension_trasera != 'jpg' && $extension_trasera != 'jpeg' && $extension_trasera != 'png') {
                
                $error1['foto'] = 'La imagen trasera es incompatible'; 
                print json_encode($error1);
    
            }else {
                $foto_trasera = true;
            }
    
            if ($extension_izquierda != 'jpg' && $extension_izquierda != 'jpeg' && $extension_izquierda != 'png') {
                
                $error1['foto'] = 'La imagen izquierda es incompatible'; 
                print json_encode($error1);
    
            }else {
                $foto_izquierda = true;
            }
            
            if ($extension_derecha != 'jpg' && $extension_derecha != 'jpeg' && $extension_derecha != 'png') {
                
                $error1['foto'] = 'La imagen derecha es incompatible'; 
                print json_encode($error1);
    
            }else {
                $foto_derecha = true;
            }

            if ($foto_frontal && $foto_trasera && $foto_izquierda && $foto_derecha) {
                move_uploaded_file($ruta_provisional_frontal,$ruta_frontal);
                move_uploaded_file($ruta_provisional_trasera,$ruta_trasera);
                move_uploaded_file($ruta_provisional_izquierda,$ruta_izquierda);
                move_uploaded_file($ruta_provisional_derecha,$ruta_derecha);                
                $consulta = ("CALL insert_revision(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);");
                $resultado = $conexion->prepare($consulta);             
                $resultado->execute(array($aceite_motor, $aceite_transmision, $anticongelante, $liquido_frenos,
                                         $llanta_refaccion, $llave_ruedas, $verificacion, $poliza_seguro,
                                         $gato,$tarjeta_circulacion, $cinchos, $matracas, $cobijas, $colchones, $rampas, $limpieza_vehiculo, $nivel_gasolina_ida,
                                         $observaciones,$nombre_frontal, $nombre_trasera, $nombre_izquierda, $nombre_derecha, $id_viaje));
                $filas_afectadas = $resultado->rowCount();                                                       
                $result['Resultado'] = 'Guardado';
                print json_encode($result);
            }
            
                                                 
        }catch(\Exception $e){
            echo $e->getMessage();
            $result['Resultado'] = 'Error';
            print json_encode($result);
        }
    }



    // $opcion = 'registrar';  
// $aceite_motor = 'en condicion';  
// $aceite_transmision = 'en condicion';  
// $anticongelante = 'en condicion';  
// $liquido_frenos = 'en condicion';  
// $llanta_refaccion = '1';  
// $llave_ruedas = '1';  
// $verificacion = '1';  
// $poliza_seguro = '1';  
// $gato = '1';  
// $cinchos = '1';  
// $matracas = '2';  
// $cobijas = '0';  
// $colchones = '3';  
// $rampas = '0';  
// $limpieza_vehiculo = 'limpia';  
// $nivel_gasolina_ida = '45.3';  
// $observaciones = 'el vehiculo va en perfectas condicines';  
// $foto_frontal = 'prueba';  
// $foto_trasera = 'prueba';  
// $foto_izquierda = 'prueba';  
// $foto_derecha = 'prueba'; 

?>

