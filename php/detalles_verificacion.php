<?php

    require 'Conexion.php';

    $opcion = $_POST['opcion'];
    $id_vehiculo = $_POST['id_vehiculo'];
    
    // $opcion = 'cargar verificacion';
    // $id_vehiculo = '17';

        if ($opcion == 'no_verificaciones') {
            
            try{

            $consulta = 'CALL select_no_verificaciones(?)';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array($id_vehiculo));

            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);            
            
            if ( $row ) {

                $datos["data"] = $row;
                print json_encode($datos);    
                
            }else{
                $datos["data"] = 'Vacio';
                print json_encode($datos);    
            }
        }catch(\Exception $e){

            echo $e->getMessage();
            $result['Resultado'] = 'Error';
            print json_encode($result);
    
        }

        }else if ($opcion == 'gasto') {

            try{

            $consulta = 'CALL select_gasto_verificaciones(?)';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array($id_vehiculo));

            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);            
            
            if ( $row ) {

                $datos["data"] = $row;
                print json_encode($datos);    
                
            }else{
                $datos["data"] = 'Vacio';
                print json_encode($datos);    
            }
        }catch(\Exception $e){

        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
        }
        }else if ($opcion == 'proxima_fecha') {

            try{            
                
            $consulta = 'CALL select_proxima_verificacion(?)';
            $resultado = $conexion->prepare($consulta);
            $resultado->execute(array($id_vehiculo));

            $row = $resultado->fetchAll(PDO::FETCH_ASSOC);            
            
            if ( $row ) {

                $datos["data"] = $row;
                print json_encode($datos);    
                
            }else{
                $datos["data"] = 'Vacio';
                print json_encode($datos);    
            }
        }catch(\Exception $e){

        echo $e->getMessage();
        $result['Resultado'] = 'Error';
        print json_encode($result);
        }
    }else if ($opcion == 'dias') {

        try{            
            
            $fecha = $_POST['fecha'];
            
        $consulta = 'CALL select_dias_verificacion(?)';
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(array($fecha));

        $row = $resultado->fetchAll(PDO::FETCH_ASSOC);            
        
        if ( $row ) {

            $datos["data"] = $row;
            print json_encode($datos);    
            
        }else{
            $datos["data"] = 'Vacio';
            print json_encode($datos);    
        }
    }catch(\Exception $e){

    echo $e->getMessage();
    $result['Resultado'] = 'Error';
    print json_encode($result);
    } 
}    



?>