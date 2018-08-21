<?php
    
    session_start();
    require 'Conexion.php';
    
    $estado = $_POST['estado']; 
    $id_viaje = $_SESSION['id_viaje'];

    try{
        $consulta = ("CALL update_travel_status(?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_viaje, $estado));        
                                                           
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }



?>