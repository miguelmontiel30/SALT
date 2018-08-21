<?php
session_start();

require 'Conexion.php';

$id_viaje = $_SESSION["id_viaje"];
$id_vehiculo = $_SESSION["id_vehiculo"]; 
$distancia = $_POST["distancia"]; 
$precio_comb = $_POST["precio_comb"]; 
$total_comb = $_POST["total_comb"]; 
$litros_comb = $_POST["litros_comb"]; 
$vale_combustible = $_POST["vale_combustible"]; 
$no_vale = $_POST["no_vale"]; 
$total_casetas = $_POST["total_casetas"]; 
$gasto_casetas = $_POST["gasto_casetas"]; 
$n_personas = $_POST["n_personas"]; 
$total_hotel = $_POST["total_hotel"]; 
$total_comida = $_POST["total_comida"]; 
$total_viaticos = $_POST["total_viaticos"]; 
$total_presupuesto = $_POST["total_presupuesto"]; 
$opcion = $_POST["opcion"];
// $distancia = "250"; 
// $precio_comb = "18.5"; 
// $total_comb = '240.3'; 
// $litros_comb = '123'; 
// $vale_combustible = '0' ; 
// $no_vale = '0' ; 
// $total_casetas = '1' ; 
// $gasto_casetas = '1230' ; 
// $n_personas = '1' ; 
// $total_hotel = '0' ; 
// $total_comida = '0' ; 
// $total_viaticos = '0' ; 
// $total_presupuesto = '1233' ; 
// $opcion = 'agregar' ;


if ($opcion == 'cargar rendimiento') {
     try{
        $consulta = "CALL select_rendimiento(?);";
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($id_vehiculo));
        $row = $resultado->fetchAll(PDO::FETCH_ASSOC);            
        $datos['data'] = $row;
        print json_encode($datos);    
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }     
 }else if ($opcion == 'cancelar') {
     try{
        $_SESSION["id_viaje"];
        $_SESSION["id_vehiculo"]; 
        $resultado['Resultado'] = 'Eliminada';
        print json_encode($resultado);
     }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
 }else if($opcion == 'agregar'){
    try{
        $consulta = ("CALL insert_presupuesto(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $resultado = $conexion->prepare($consulta);             
        $resultado->execute(array($distancia,$precio_comb,$total_comb,$litros_comb,$vale_combustible,$no_vale,$total_casetas,$gasto_casetas,$n_personas,$total_hotel,$total_comida,$total_viaticos,$total_presupuesto,$id_viaje));
        $result['Resultado'] = 'Exito';
        print json_encode($result);
    }catch(\Exception $e){
        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
    }
}

?>