<?php
include '../../../config.php';
$users = mysqli_query($db,
    "UPDATE users
        SET Photo = '".$_POST['id'].".png'
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());