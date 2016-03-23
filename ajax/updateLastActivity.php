<?php
include '../config.php';
mysqli_query($db,
    "UPDATE users SET LastActivityDate = CURRENT_TIMESTAMP
        WHERE Id = ".$_POST["user"])
or die(mysql_error());