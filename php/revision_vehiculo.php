<?php

    session_start();

    require 'Conexion.php';

    
    $opcion = $_POST['opcion'];    
    //$opcion = 'cargar data vehiculo';
    $id_vehiculo = $_SESSION['id_vehiculo'];
    $id_viaje = $_SESSION['id_viaje'];    


    if ($opcion == 'cargar data vehiculo') {

        try{

            $consulta = 'CALL select_vehiculo(?);';
            $resultado = $conexion->prepare($consulta);
            $resultado ->execute(array($id_vehiculo));

            $row = $resultado->fetch(PDO::FETCH_ASSOC);

            print json_encode($row);

        }catch(Exception $e){
        
            die('Error en la consulta: ' . $e->GetMessage());

        }finally{

            $conexion = null;

        }           

    }
        
        // $consulta = 'CALL insert_revision();';    
    

?>