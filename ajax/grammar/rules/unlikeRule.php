<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM rulesliked
        WHERE UserId = ".$_POST["user"]." AND RuleId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, RuleId FROM rulesliked
        WHERE RuleId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);