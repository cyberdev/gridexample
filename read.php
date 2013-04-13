<?php
	include "koneksi.php";

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$key = empty($_REQUEST['query'])?'':$_REQUEST['query'];

	$query = "select * from barang where nmbarang like '%$key%'";
	$result = mysql_query($query) or die("Eksekusi Error: " . mysql_error());
	$total = mysql_num_rows($result);

	$query = "select * from barang  where nmbarang like '%$key%' limit $start, $limit";
	$result = mysql_query($query) or die("Eksekusi Error: " . mysql_error());
	

	$data = array();
	while ($row=mysql_fetch_object($result)){
		$data [] = $row;
	}

	$json['success'] = true;
	$json['total'] = $total;
	$json['data'] = $data;
	
	header('Content-type: application/json');
	header("HTTP/1.0 200 OK");

	echo json_encode($json);

?>