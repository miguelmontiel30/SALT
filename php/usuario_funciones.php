<?php

require 'Conexion.php';

$id_usuario = $_POST["id_usuario"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$rol = $_POST["rol"];
$correo = $_POST["correo"];
$contrasenia = $_POST["contrasenia"];
$opcion = $_POST["opcion"];
$result = [];

if($opcion == 'editar'){
    try{
        $consulta = ("CALL update_user(?,?,?,?,?);");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_usuario, $nombre, $apellido, $rol, $correo));
        $result['Resultado'] = 'Exito';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}else if($opcion == 'eliminar'){
    try{
        $consulta = ("CALL delete_user(?);");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_usuario));
        $result['Resultado'] = 'Borrado';
        print json_encode($result);
     }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
     }
}else if($opcion == 'agregar'){
    try{
        $consulta = ("CALL insert_user(?,?,?,?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($nombre, $apellido, $rol, $correo, $contrasenia));
        $result['Resultado'] = 'Agregado';
        print json_encode($result);
     }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
     }
 }

?>