<?php

    require 'Conexion.php';

    $opcion = $_POST['opcion'];


    if ($opcion == 'viajes_transcurso') {
        
        try{

            $consulta = 'CALL select_viajes_transcurso();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            
            if ($datos) {

                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }


        }catch(\Exception $e){
            echo $e->getMessage();
            $result['Resultado'] = 'Error en la consulta';
            print json_encode($result);
        }
        
    }else if($opcion == 'viajes_mes') {

        try{

            $consulta = 'CALL select_total_viajes_mes();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }else if($opcion == 'total_viajes') {

        try{

            $consulta = 'CALL select_no_viajes();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }

    }else if($opcion == 'total_usuarios') {

        try{

            $consulta = 'CALL select_no_users();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }else if($opcion == 'total_vehiculos') {

        try{

            $consulta = 'CALL select_no_vehiculos();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }else if($opcion == 'total_mantenimientos') {

        try{

            $consulta = 'CALL select_gasto_man();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }else if($opcion == 'total_verificaciones') {

        try{

            $consulta = 'CALL select_gasto_veri();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }else if($opcion == 'total_seguro') {

        try{

            $consulta = 'CALL select_gasto_seg();';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array());

            $datos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($datos) {
                
                $data['data'] = $datos;
                print json_encode($data);

            }else{

                $data['data'] = 'Vacio';
                print json_encode($data);

            }

        }catch(\Exception $e){
            print json_encode($e->getMessage());
        }
    }


?>