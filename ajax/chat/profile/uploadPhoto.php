<?php
include '../../../config.php';

$imageData = $GLOBALS['HTTP_RAW_POST_DATA'];
$filteredData = substr($imageData, strpos($imageData, ",")+1);
$unencodedData = base64_decode($filteredData);
$fp = fopen('../../../images/photos/'.$_COOKIE['user'].'.png', 'wb' );
fwrite($fp, $unencodedData);
fclose($fp);

unlink('../../../images/photos/'.$_COOKIE['user'].'tmp.png');