<?php
include '../../../config.php';
$users = mysqli_query($db,
    "UPDATE users
        SET Photo = ''
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());