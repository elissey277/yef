<?php
include '../../config.php';
$advices = mysqli_query($db,
    "SELECT Id, Title".$_POST["language"]." as Title, Image FROM advices
        ORDER BY advices.Id ASC")
or die(mysql_error());

$json = array();
while($advice = mysqli_fetch_array($advices)) {
    array_push($json, array($advice['Id'],$advice['Title'],$advice['Image']));
}
echo json_encode($json);