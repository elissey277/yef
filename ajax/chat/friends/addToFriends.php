<?php
include '../../../config.php';
mysqli_query($db,
    "INSERT INTO friends (User1Id, User2Id, IsAccepted)
        VALUES (".$_COOKIE["user"].", ".$_POST["id"].",0),(".$_POST["id"].", ".$_COOKIE["user"].",1)")
or die(mysql_error());

$friends = mysqli_query($db,
    "SELECT users.Id, friends.isAccepted FROM users
        LEFT OUTER JOIN friends ON friends.User1Id = users.Id AND friends.User2Id = ".$_COOKIE['user']."
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());
$friend = mysqli_fetch_array($friends);
echo $friend['isAccepted'];