<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM videosliked
        WHERE UserId = ".$_POST["user"]." AND VideoId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, VideoId FROM videosliked
        WHERE VideoId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);