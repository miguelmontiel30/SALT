<?php

    require 'Conexion.php';
    
    $correo = $_POST['correo'];    
    $contrasenia = $_POST['contrasenia'];

    // $correo = 'admin';
    // $contrasenia = '123';

    try{
        
        $consulta = "CALL validacion_user(?,?)";              //Consulta SQL
        $resultado = $conexion->prepare($consulta);             //Preparación de la consulta
        $resultado->execute(array($correo,$contrasenia));                //Ejecución de la consulta y pase de parámetros
        
        $row = $resultado->fetch(PDO::FETCH_ASSOC);             //Asociacion de datos        
        
        if($row){                      
            session_start();
            $datos["Estado"] = 1;
            $datos["Usuario"] = $row;
                        
            $_SESSION['id_usuario'] = $row["id_usuario"];            
            $_SESSION['nombre'] = $row["nombre"];
            $_SESSION['apellido'] = $row["apellido"];            
            $_SESSION['correo'] = $row["correo"];                           
            $_SESSION['contrasenia'] = $row["contrasenia"];  
            $_SESSION['rol'] = $row["rol"];                        

            print json_encode($datos); 

        } else {
            print json_encode(array("Estado" => 2, "Mensaje" => "Ha ocurrido un error"));
        } 
	    
    }catch(Exception $e){
        die('Error en la consulta: ' . $e->GetMessage());
    }finally{
        $conexion = null;
    }


?>