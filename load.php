<?php
	include "koneksi.php";

	$idbarang = $_REQUEST['idbarang'];
	
	$query = "select * from barang where idbarang = $idbarang";
	$result = mysql_query($query) or die("Eksekusi Error: " . mysql_error());
	
	$data = array();
	while ($row=mysql_fetch_object($result)){
		$data = $row;
	}

	$json['success'] = true;	
	$json['data'] = $data;
	
	header('Content-type: application/json');
	header("HTTP/1.0 200 OK");

	echo json_encode($json);

?>