<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO differencesliked (UserId, DifferencesId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, DifferencesId FROM differencesliked
        WHERE DifferencesId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);