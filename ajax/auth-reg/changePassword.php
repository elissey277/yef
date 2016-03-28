<?php
include '../../config.php';
mysqli_query($db,
    "UPDATE users
      SET users.Password = '" . md5($_POST["password"]) . "' WHERE users.Email = '".$_POST["email"]."'")
or die(mysql_error());
$users = mysqli_query($db,
    "SELECT Id FROM users
      WHERE users.Email = '".$_POST["email"]."'")
or die(mysql_error());
if(mysqli_num_rows($users) == 0) {
    echo -1;
} else {
    $user = mysqli_fetch_array($users);
    echo $user["Id"];
}