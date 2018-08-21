<?php
 require 'Conexion.php';
	
		$marca = $_POST["marca"];
		$modelo = $_POST["modelo"];
		$numSerie = $_POST["num_serie"];
		$anio = $_POST["anio"];
		$placas = $_POST["placas"];
		$tanque = $_POST["tanque"];
		$combustible = $_POST["combustible"];
		$rendimiento = $_POST["rendimiento"];
		$numTarjeta = $_POST["numero"];
		$estado = $_POST["estado"];
		$vigencia = $_POST["vigencia"];
		$kilometros = $_POST["km"];
		$mantenimiento = $_POST["mantenimiento"];
		$vehiEstado = $_POST["status"];

        $foto_nombre = $_FILES["file"]["name"];
        $ruta = "../img/car-images/".$foto_nombre;

    if(move_uploaded_file($_FILES["file"]["tmp_name"], $ruta)){

        
		$sql = $conexion->prepare("Call agregarVehiculoImagen(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	
        $sql->bindParam(1,$foto_nombre);
		$sql->bindParam(2,$marca);
		$sql->bindParam(3,$modelo);
		$sql->bindParam(4,$numSerie);
		$sql->bindParam(5,$anio);
		$sql->bindParam(6,$placas);
		$sql->bindParam(7,$tanque);
		$sql->bindParam(8,$combustible);
		$sql->bindParam(9,$rendimiento);
		$sql->bindParam(10,$numTarjeta);
		$sql->bindParam(11,$estado);
		$sql->bindParam(12,$vigencia);
		$sql->bindParam(13,$kilometros);
		$sql->bindParam(14,$mantenimiento);
		$sql->bindParam(15,$vehiEstado);

		echo $sql->execute() ? "Registrado con exito" : "Error de registro";


    }
       


	
   
?>