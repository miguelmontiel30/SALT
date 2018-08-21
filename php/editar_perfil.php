<?php
session_start();
require 'Conexion.php';

$opcion = $_POST["opcion"];
$id_usuario = $_POST["id_usuario"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$rol = $_POST["rol"];
$correo = $_POST["correo"];
$contrasenia = $_POST["contrasenia"];
$result = [];

if($opcion == 'editar'){
    try{
        $consulta = ("CALL update_user(?,?,?,?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_usuario, $nombre, $apellido, $rol, $correo));
        $result['Resultado'] = 'Exito';                  
        $_SESSION['nombre'] = $nombre;
        $_SESSION['apellido'] = $apellido;            
        $_SESSION['correo'] = $correo;                                           
        print json_encode($result);        
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}else if($opcion == 'contrasenia'){
    try{
        $consulta = ("CALL cambiar_contrasenia(?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_usuario, $contrasenia));
        $result['Resultado'] = 'Cambiada';
        $_SESSION['contrasenia'] = $contrasenia;   
        print json_encode($result);
     }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
     }
 }else if ($opcion == 'salir') {
     try{
         session_destroy();  
         $result['Resultado'] = 'Destruida';
         print json_encode($result);        
     }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error al destruir sesion';
        print json_encode($result);
     }
 }

?>