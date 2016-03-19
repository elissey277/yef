<?php
include '../../config.php';
mysqli_query($db,
    "INSERT INTO users(Email, Password, FirstName)
      VALUES ('" . $_POST["email"] . "','" . md5($_POST["password"]) . "','" . $_POST["name"] . "')")
or die(mysql_error());

$users = mysqli_query($db,
    "SELECT Id FROM users
      WHERE Email = '" . $_POST["email"] . "'")
or die(mysql_error());
$user = mysqli_fetch_array($users);
echo $user["Id"];