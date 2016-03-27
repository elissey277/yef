<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO rulesliked (UserId, RuleId)
        VALUES (".$_POST["user"].", ".$_POST["id"].")")
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, RuleId FROM rulesliked
        WHERE RuleId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);