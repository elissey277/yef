<?php
include '../../config.php';
mysqli_query($db,
    "INSERT INTO advicesliked (UserId, AdviceId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, AdviceId FROM advicesliked
        WHERE AdviceId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);