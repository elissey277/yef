<?php
header('Content-Type: text/html;charset=UTF-8');

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','yef');

//define('DB_HOST','mysql.hostinger.com.ua');
//define('DB_USER','u766148187_admin');
//define('DB_PASSWORD','pangeya777');
//define('DB_NAME','u766148187_yef');

$db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
or die("Could not connect: ".mysql_error());