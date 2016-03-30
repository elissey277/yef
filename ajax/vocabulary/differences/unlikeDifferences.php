<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM differencesliked
        WHERE UserId = ".$_POST["user"]." AND DifferencesId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, DifferencesId FROM differencesliked
        WHERE DifferencesId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);