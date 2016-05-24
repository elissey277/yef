<?php
include '../../../config.php';
mysqli_query($db,
    "DELETE FROM friends
        WHERE (friends.User1Id = ".$_COOKIE["user"]." AND friends.User2Id = ".$_POST["id"].")
            OR (friends.User1Id = ".$_POST["id"]." AND friends.User2Id = ".$_COOKIE["user"].")")
or die(mysql_error());

$friends = mysqli_query($db,
    "SELECT users.Id, friends.isAccepted FROM users
        LEFT OUTER JOIN friends ON friends.User1Id = users.Id AND friends.User2Id = ".$_COOKIE['user']."
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());
$friend = mysqli_fetch_array($friends);
echo $friend['isAccepted'];