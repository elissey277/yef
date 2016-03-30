<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
if($_POST['title']==''){
    $searchTitle = '1';
} else {
    $searchTitle = '(differences.Title0 LIKE "%'.$_POST['title'].'%" OR differences.Title'.$lang.' LIKE "%'.$_POST['title'].'%" OR dictionary.Word0 LIKE "%'.$_POST['title'].'%" OR dictionary.Word'.$lang.' LIKE "%'.$_POST['title'].'%")';
}
$differences = mysqli_query($db,
    "SELECT differences.Id, differences.Title0 as TitleEn, differences.Title".$lang." as Title, differences.Image FROM differences
        INNER JOIN differenceswords ON differenceswords.DifferencesId = differences.Id
        INNER JOIN dictionary ON differenceswords.WordId = dictionary.Id
        WHERE ".$searchTitle."
        GROUP BY differences.Id
        ORDER BY differences.Id ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());
$json = array();
while($difference = mysqli_fetch_array($differences)) {
    array_push($json, array($difference['Id'],$difference['TitleEn'],$difference['Title'],$difference['Image']));
}

$alldifferences = mysqli_query($db,
    "SELECT differences.Id, differences.Title0 as TitleEn, differences.Title".$lang." as Title, differences.Image FROM differences
        INNER JOIN differenceswords ON differenceswords.DifferencesId = differences.Id
        INNER JOIN dictionary ON differenceswords.WordId = dictionary.Id
        WHERE ".$searchTitle."
        GROUP BY differences.Id")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($alldifferences)/$perPage));

echo json_encode($json);