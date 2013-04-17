<?php
	include "koneksi.php";

	$idbarang = $_POST['idbarang'];
	$kdbarang = $_POST['kdbarang'];
	$nmbarang = $_POST['nmbarang'];
	$stok = $_POST['stok'];
	

	if($_POST['idbarang']==null){
		$query = "insert into barang(kdbarang, nmbarang, stok) values('$kdbarang', '$nmbarang', $stok)";	
	}else{
		$query = "update barang set kdbarang='$kdbarang', nmbarang='$nmbarang', stok=$stok where idbarang=$idbarang";	
	}
	$result = mysql_query($query) or die("Eksekusi Error: " . mysql_error());
	
	$json['success'] = true;	
	
	header('Content-type: application/json');
	header("HTTP/1.0 200 OK");

	echo json_encode($json);

?>