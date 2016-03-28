<?php
include '../../config.php';
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