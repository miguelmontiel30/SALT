<?php
session_start();

    require 'Conexion.php';
    
    $correo = $_SESSION['correo'];    
    $contrasenia = $_SESSION['contrasenia'];    
    

    
    try{
        
        $consulta = "CALL validacion_user(?,?);";              //Consulta SQL
        $resultado = $conexion->prepare($consulta);             //Preparación de la consulta
        $resultado->execute(array($correo,$contrasenia));                //Ejecución de la consulta y pase de parámetros
        
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