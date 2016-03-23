<?php
include '../../../config.php';
$perPage = 10;
$texts = mysqli_query($db,
    "SELECT videoscategories.Id, videoscategories.Title".$_POST["language"]." as Title FROM videoscategories
        ORDER BY videoscategories.Id ASC")
or die(mysql_error());

$json = array();
while($text = mysqli_fetch_array($texts)) {
    array_push($json, array($text['Id'],$text['Title'],$text['Difficulty'],$text['Category'],$text['Image']));
}
echo json_encode($json);