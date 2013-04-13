<?php
	$host = 'localhost';
	$user = 'root';
	$passwd = 'root';
	$database = 'contoh';

	$link = mysql_connect($host, $user, $passwd);
	if (!$link) {
	    die('Koneksi gagal: ' . mysql_error());
	}

	$db = mysql_select_db($database);
	if(!$db){
		die ("Database tidak dapat di buka: " . mysql_error());
	}

?>