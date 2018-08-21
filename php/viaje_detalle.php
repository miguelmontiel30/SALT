<?php
session_start();

require 'Conexion.php';

$id_viaje = $_POST["id_viaje"];
$id_vehiculo = $_POST["id_vehiculo"];
$opcion = $_POST["opcion"];


if ($opcion == 'enviar id') {                   
     $_SESSION['id_viaje'] = $id_viaje;
     $_SESSION['id_vehiculo'] = $id_vehiculo;                
}


?>