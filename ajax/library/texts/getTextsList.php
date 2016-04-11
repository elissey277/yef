<?php
include '../../../config.php';
$perPage = 10;
$texts = mysqli_query($db,
    "SELECT texts.Id, texts.Title".$_POST["language"]." as Title, texts.Difficulty, textscategories.Title".$_POST["language"]." as Category, textscategories.Image FROM texts
        INNER JOIN textscategories ON texts.CategoryId = textscategories.Id
        ORDER BY Title ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($text = mysqli_fetch_array($texts)) {
    array_push($json, array($text['Id'],$text['Title'],$text['Difficulty'],$text['Category'],$text['Image']));
}

$alltexts = mysqli_query($db,
    "SELECT texts.Id FROM texts")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($alltexts)/$perPage));

echo json_encode($json);