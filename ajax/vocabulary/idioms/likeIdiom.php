<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO idiomsliked (UserId, IdiomsId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, IdiomsId FROM idiomsliked
        WHERE IdiomsId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);