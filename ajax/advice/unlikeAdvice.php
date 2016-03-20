<?php
include '../../config.php';
mysqli_query($db,
    "DELETE FROM advicesliked
        WHERE UserId = ".$_POST["user"]." AND AdviceId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, AdviceId FROM advicesliked
        WHERE AdviceId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);