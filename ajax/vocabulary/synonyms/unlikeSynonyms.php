<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM synonymsliked
        WHERE UserId = ".$_POST["user"]." AND SynonymsId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, SynonymsId FROM synonymsliked
        WHERE SynonymsId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);