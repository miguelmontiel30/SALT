<?php
    $db_host = "mysql:host=localhost; dbname=salt";
    $db_user = "root";
    $db_password = "";

    try{
       $conexion = new PDO($db_host,$db_user, $db_password);
        //$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$conexion->exec("SET CHARACTER SET utf8");
    }catch(Exception $e){
        die('Error de Conexión: ' . $e->GetMessage());	
    }
?>