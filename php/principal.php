<?php
    session_start();

    require 'Conexion.php';
    
    $nombre['nombre'] = $_SESSION['nombre'];

    print json_encode($nombre);
?>