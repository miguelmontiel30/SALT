<?php

    require 'Conexion.php';

    session_start();

    $id_viaje = $_SESSION['id_viaje'];
    $opcion = $_POST['opcion'];    

    if ($opcion == 'primera') {
        
        try{

            $consulta = 'CALL select_primera_revision(?);';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array($id_viaje));            

            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if($row){

                $datos["data"] = $row;
                print json_encode($datos); 
                
            }else{
                print json_encode('No se encontraron coincidencias');
            }
        }catch(\Exeption $e){

            echo $e->getMessage();
        }        
    }

?>