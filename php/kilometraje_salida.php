<?php
session_start();

    require 'Conexion.php';
    
    $id_viaje = $_SESSION['id_viaje'];        
    
    try{
        
        $consulta = "CALL select_travel_detail(?);";              //Consulta SQL
        $resultado = $conexion->prepare($consulta);             //Preparación de la consulta
        $resultado->execute(array($id_viaje));                //Ejecución de la consulta y pase de parámetros
        
        $row = $resultado->fetch(PDO::FETCH_ASSOC);             //Asociacion de datos        
        
        if($row){                                  
            print json_encode($row); 
        } else {
            print json_encode(array("Estado" => 2, "Mensaje" => "Ha ocurrido un error"));
        } 
	    
    }catch(Exception $e){
        die('Error en la consulta: ' . $e->GetMessage());
    }finally{
        $conexion = null;
    }


?>