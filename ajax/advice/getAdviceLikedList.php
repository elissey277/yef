<?php
include '../../config.php';
$advices = mysqli_query($db,
    "SELECT advices.Id, advices.Title".$_POST["language"]." as Title, advices.Image FROM advices
        INNER JOIN advicesliked ON advices.Id = advicesliked.AdviceId
        WHERE advicesliked.UserId = ".$_POST["user"]."
        ORDER BY advicesliked.CreatedOn DESC")
or die(mysql_error());

$json = array();
while($advice = mysqli_fetch_array($advices)) {
    array_push($json, array($advice['Id'],$advice['Title'],$advice['Image']));
}
echo json_encode($json);