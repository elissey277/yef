<?php
include '../../../config.php';
$perPage = 10;
if($_POST['title']==''){
    $searchTitle = '1';
} else {
    $searchTitle = '(texts.Title'.$_POST['language'].' LIKE "%'.$_POST['title'].'%" OR texts.Text'.$_POST['language'].' LIKE "%'.$_POST['title'].'%")';
}
if($_POST['difficulty']==0){
    $searchDifficulty = '1';
} else {
    $searchDifficulty = 'texts.Difficulty='.$_POST['difficulty'];
}
if($_POST['category']==0){
    $searchCategory = '1';
} else {
    $searchCategory = 'texts.CategoryId='.$_POST['category'];
}
$texts = mysqli_query($db,
    "SELECT texts.Id, texts.Title".$_POST["language"]." as Title, texts.Difficulty, textscategories.Title".$_POST["language"]." as Category, textscategories.Image FROM texts
        INNER JOIN textscategories ON texts.CategoryId = textscategories.Id
        WHERE ".$searchTitle." AND ".$searchDifficulty." AND ".$searchCategory."
        ORDER BY texts.Id ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($text = mysqli_fetch_array($texts)) {
    array_push($json, array($text['Id'],$text['Title'],$text['Difficulty'],$text['Category'],$text['Image']));
}

$alltexts = mysqli_query($db,
    "SELECT texts.Id FROM texts
        WHERE ".$searchTitle." AND ".$searchDifficulty." AND ".$searchCategory)
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($alltexts)/$perPage));

echo json_encode($json);