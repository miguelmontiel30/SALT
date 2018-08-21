<?php

    require 'Conexion.php';

    $opcion = $_POST['opcion'];
    //$opcion = 'cargar_proveedores';

    if ($opcion == 'registrar_proveedor') {
        
        try{

            $nombre = $_POST['proveedor_nombre'];
            $direccion = $_POST['proveedor_direccion'];            
            $telefono = $_POST['proveedor_numero'];
            
            // $nombre = "Mécanico";
            // $direccion = "NO";            
            // $telefono = "NO";

            $consulta = "CALL insert_proveedor(?,?,?);";
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array($nombre, $direccion, $telefono));
            $filas_afectadas = $resultado->rowCount(); 

            if ($filas_afectadas > 0) {
                
                $result['Resultado'] = 'Guardado';
                print json_encode($result);

            }else{                                
                $result['Resultado'] = 'NO Guardado';
                print json_encode($result);
            }




        }catch(\Exception $e){
            print json_encode($e->get_Message());
        }
    }else if ($opcion == 'cargar_proveedores') {
        
        try{
            
            $consulta = "select * from proveedores WHERE estado = 'Activo';";
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array());
            
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($data) {
                
                $result['data'] = $data;
                print json_encode($result);

            }else{                                
                $result['Resultado'] = 'Vacio';
                print json_encode($result);
            }

        }catch(\Exception $e){  
            print json_encode('No se ejecuto correctamente la consulta');                
        }
    }else if ($opcion == 'no_mantenimientos') {
        
        try{

            $id_vehiculo = $_POST['id_vehiculo'];
            
            $consulta = "select COUNT(*) from mantenimientos WHERE id_vehiculo = ?;";
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array($id_vehiculo));
            
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);

            if ($data) {
                
                $result['data'] = $data;
                print json_encode($result);

            }else{                                
                $result['Resultado'] = 'Vacio';
                print json_encode($result);
            }

        }catch(\Exception $e){  
            print json_encode('No se ejecuto correctamente la consulta');                
        }
    }else if ($opcion == 'actualizar_kilometraje') {
        
        try{
            $id_vehiculo = $_POST['id_vehiculo'];
            $kilometraje = $_POST['kilometraje'];

            $consulta = ("CALL update_kilometraje(?,?)");
            $resultado = $conexion->prepare($consulta);             
            $resultado->execute(array($id_vehiculo, $kilometraje));
            
            $filas_afectadas = $resultado->rowCount();                                                       

            if ($filas_afectadas > 0) {                
                $result['Resultado'] = 'Kilometraje';
                print json_encode($result);
            }else{
                $result['Resultado'] = 'NO Agregado';
                print json_encode($result);
            }

        }catch(\Exception $e){
            echo $e->getMessage();
            $result['Resultado'] = 'Error';
            print json_encode($result);
        }

    }


?>