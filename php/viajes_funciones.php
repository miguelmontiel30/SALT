<?php

require 'Conexion.php';

 $id_viaje = $_POST["id_viaje"];
 $id_vehiculo = $_POST["id_vehiculo"];
 $opcion = $_POST["opcion"];
 $kilometraje = $_POST["kilometraje"];
 $fecha_salida = $_POST["fecha_salida"];   
 $destino = $_POST["destino"];   
 $motivo = $_POST["motivo"];   
 $estado = $_POST["estado"];   
 $observaciones = $_POST["observaciones"];    
 $id_usuario = $_POST["id_usuario"];   
 $eliminar = 'Eliminado';
 $result = [];

if($opcion == 'actualizar kilometraje'){
    try{
        $consulta = ("CALL update_kilometraje(?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_vehiculo, $kilometraje));
        $result['Resultado'] = 'Exito';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}else if ($opcion == 'agregar') {
    try{
        $consulta = ("CALL insert_travel(?,?,?,?,?,?);");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($fecha_salida, $destino, $motivo, $observaciones, $id_vehiculo, $id_usuario));
        $result['Resultado'] = 'Guardado';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}else if ($opcion == 'editar') {
    try{
        $consulta = ("CALL update_travel(?,?,?,?,?,?,?,?);");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_viaje, $fecha_salida, $destino, $motivo, $estado, $observaciones, $id_vehiculo, $id_usuario));
        $result['Resultado'] = 'Guardado';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}else if ($opcion == 'eliminar') {
    try{
        $consulta = ("CALL update_travel_status(?,?);");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_viaje, $eliminar));
        $result['Resultado'] = 'Eliminado';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}

?>