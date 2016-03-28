<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM textsliked
        WHERE UserId = ".$_POST["user"]." AND TextId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, TextId FROM textsliked
        WHERE TextId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);