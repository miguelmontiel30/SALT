<?php    

    session_start();
        


    if(!isset($_SESSION['id_usuario'])){
        $data['sesion'] = false;
        print json_encode($data);
    }else{
        $data['sesion'] = true;
        print json_encode($data);
    }
    
    
?>