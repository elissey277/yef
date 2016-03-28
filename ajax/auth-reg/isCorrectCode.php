<?php
include '../../config.php';
$users = mysqli_query($db,
    "SELECT Id,Password FROM users
      WHERE users.Email = '".$_POST["email"]."'")
or die(mysql_error());
$user = mysqli_fetch_array($users);
if(md5($user["Password"]) == $_POST["code"]) {
    echo 1;
} else {
    echo 0;
}