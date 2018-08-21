<?php    

    require 'Conexion.php';

    
    $opcion = $_POST['opcion'];  
    $fecha_verificacion = $_POST['fecha_verificacion'];  
    $proveedor = $_POST['proveedor'];  
    $importe = $_POST['importe'];  
    $id_usuario = $_POST['id_usuario'];  
    $descripcion = $_POST['descripcion'];  
    $proxima_fecha = $_POST['proxima_fecha'];  
    $id_vehiculo = $_POST['id_vehiculo'];        
    

    //Declaración nombre de imagenes

    $imagen_factura = $_FILES['factura']['name'];
    
    //Extension de imagenes
    $extension_imagen_factura = explode('.',$imagen_factura);
    $extension_factura = end($extension_imagen_factura);

    //Cambio de nombre a imagenes
    $nombre_factura = $id_vehiculo."-".$fecha_verificacion.".".$extension_factura;                                            

    //Declaración ruta a guardar
    $ruta_factura = "../img/Verificaciones/".$nombre_factura;

    //Caracteristicas de las imagenes
    $tipo_factura = $_FILES['factura']['type'];
    $size_factura = $_FILES['factura']['size'];
    $ruta_provisional_factura = $_FILES['factura']['tmp_name'];  
        
    $foto_factura = false;    

    if ($opcion == 'registrar') {

        try{

            if ($extension_factura != 'jpg' && $extension_factura != 'jpeg' && $extension_factura != 'png'){

                $error1['factura'] = 'La imagen frontal es incompatible'; 
                print json_encode($error1);             
    
            }else{
    
                $foto_factura = true;            
            }

            if ($foto_factura) {
                move_uploaded_file($ruta_provisional_factura,$ruta_factura);               
                $consulta = ("CALL insert_verificacion(?,?,?,?,?,?,?,?);");
                $resultado = $conexion->prepare($consulta);             
                $resultado->execute(array($fecha_verificacion, $proveedor, $importe, $id_usuario,
                                         $descripcion, $nombre_factura, $proxima_fecha, $id_vehiculo));
                $filas_afectadas = $resultado->rowCount(); 

                if ($filas_afectadas > 0) {
                    $result['Resultado'] = 'Guardado';
                    print json_encode($result);
                }else{
                    $result['Resultado'] = 'NO Guardado';
                    print json_encode($result);
                }                                                                     
            }
            
                                                 
        }catch(\Exception $e){
            echo $e->getMessage();
            $result['Resultado'] = 'Error';
            print json_encode($result);
        }
    }


?>

