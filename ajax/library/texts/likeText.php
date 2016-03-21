<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO textsliked (UserId, TextId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, TextId FROM textsliked
        WHERE TextId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);