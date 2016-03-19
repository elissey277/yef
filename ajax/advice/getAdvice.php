<?php
include '../../config.php';
$advices = mysqli_query($db,
    "SELECT Id, Title".$_POST["language"]." as Title, Text".$_POST["language"]." as Text, Image FROM advices
        WHERE Id = ".$_POST["id"]."
        ORDER BY advices.Id ASC")
or die(mysql_error());

$advice = mysqli_fetch_array($advices);
echo json_encode(array($advice['Id'],$advice['Title'],$advice['Text'],$advice['Image']));