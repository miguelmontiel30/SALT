<?php

    require 'Conexion.php';

    $opcion = $_POST['opcion'];

    if ($opcion == 'verificaciones') {
        
        try{

            $consulta = "CALL select_proximas_verificaciones();";
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array());                        
                
            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($row) {                
                $result['Resultado'] = $row;
                print json_encode($result);
            }else{                                
                $result['Resultado'] = 'Vacio';
                print json_encode($result);
            }

        }catch(\Exception $e){
            print json_encode($e->get_Message());
        }

    }else if ($opcion == 'seguro') {
        
        try{

            $consulta = "CALL select_proximos_seguros();";
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array());                        
                
            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($row) {                
                $result['Resultado'] = $row;
                print json_encode($result);
            }else{                                
                $result['Resultado'] = 'Vacio';
                print json_encode($result);
            }

        }catch(\Exception $e){
            print json_encode($e->get_Message());
        }

    }




?>