<?php
	include "koneksi.php";

	$selectedkeys = json_decode($_REQUEST['selectedkeys']);
	foreach ($selectedkeys as $idbarang) {
		$query = "delete from barang where idbarang=$idbarang";
		$result = mysql_query($query) or die("Eksekusi Error: " . mysql_error());		
	}

	$json['success'] = true;	
	$json['message'] = 'Data telah dihapus';
	
	header('Content-type: application/json');
	header("HTTP/1.0 200 OK");

	echo json_encode($json);

?>