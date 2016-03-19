<?php
include '../config.php';
mysqli_query($db,
    "INSERT INTO messages(UserFromId,UserToId,Text,CreatedOn)
        VALUES (" . $_POST["userFromId"] . "," . $_POST["userToId"] . ",'" . $_POST["text"] . "',CURRENT_TIMESTAMP)")
or die(mysql_error());