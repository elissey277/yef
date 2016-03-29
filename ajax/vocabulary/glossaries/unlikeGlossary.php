<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM glossariesliked
        WHERE UserId = ".$_POST["user"]." AND GlossaryId = ".$_POST["id"])
or die(mysql_error());

$likes = mysqli_query($db,
    "SELECT UserId, GlossaryId FROM glossariesliked
        WHERE GlossaryId = ".$_POST["id"])
or die(mysql_error());
echo mysqli_num_rows($likes);