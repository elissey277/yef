<?php
include '../config.php';
$messages = mysqli_query($db,
    "SELECT UserFromId,UserToId,Text,CreatedOn FROM messages
      WHERE (UserFromId = 6 && UserToId = 7) || (UserFromId = 7 && UserToId = 6)
      ORDER BY CreatedOn DESC
      LIMIT 10")
or die(mysql_error());

$json = array();
while($msg = mysqli_fetch_array($messages)) {
    array_push($json, array($msg['UserFromId'],$msg['UserToId'],$msg['Text'],$msg['CreatedOn']));
}
$json = array_reverse($json);
echo json_encode($json);