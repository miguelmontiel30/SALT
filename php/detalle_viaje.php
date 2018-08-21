<?php

    require 'Conexion.php';

    session_start();

    $id_viaje = $_SESSION['id_viaje'];
    $opcion = $_POST['opcion'];
    //$opcion = 'detalles presupuesto';
    

        if ($opcion == 'detalles viaje') {
            try{

                $consulta = "CALL select_travel_detail(?);";
                $resultado = $conexion->prepare($consulta);
                $resultado->execute(array($id_viaje));

                $row = $resultado->fetch(PDO::FETCH_ASSOC);        

                print json_encode($row);

            }catch(Exception $e){

                die('Error en la consulta: ' . $e->GetMessage());

            }finally{

                $conexion = null;

            }    

        }else if ($opcion == 'detalles presupuesto') {

            try{

                $consulta = "CALL select_presupuesto(?);";
                $resultado = $conexion->prepare($consulta);
                $resultado->execute(array($id_viaje));

                $row = $resultado->fetch(PDO::FETCH_ASSOC);        

                print json_encode($row);          
            }catch(Exception $e){

                die('Error en la consulta: ' . $e->GetMessage());

            }finally{

                $conexion = null;

            }  

        }   

    



?>