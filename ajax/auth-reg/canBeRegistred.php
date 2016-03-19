<?php
include '../../config.php';
$users = mysqli_query($db,
    "SELECT Id FROM users
      WHERE users.Email = '".$_POST["email"]."'")
or die(mysql_error());

echo mysqli_num_rows($users);