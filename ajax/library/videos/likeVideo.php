<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO videosliked (UserId, VideoId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, VideoId FROM videosliked
        WHERE VideoId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);