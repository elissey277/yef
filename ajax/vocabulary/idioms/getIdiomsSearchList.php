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
    $searchTitle = '(dictionary.Word0 LIKE "%'.$_POST['title'].'%" OR dictionary.Word'.$lang.' LIKE "%'.$_POST['title'].'%")';
}
$idioms = mysqli_query($db,
    "SELECT idioms.Id, dictionary.Word0 as TitleEn, dictionary.Word".$lang." as Title, dictionary.Image FROM idioms
	    INNER JOIN dictionary ON dictionary.Id = idioms.WordId
        WHERE ".$searchTitle."
        GROUP BY idioms.Id
        ORDER BY TitleEn ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());
$json = array();
while($idiom = mysqli_fetch_array($idioms)) {
    array_push($json, array($idiom['Id'],$idiom['TitleEn'],$idiom['Title'],$idiom['Image']));
}

$allidioms = mysqli_query($db,
    "SELECT idioms.Id, dictionary.Word0 as TitleEn, dictionary.Word".$lang." as Title, dictionary.Image FROM idioms
	    INNER JOIN dictionary ON dictionary.Id = idioms.WordId
        WHERE ".$searchTitle."
        GROUP BY idioms.Id")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allidioms)/$perPage));

echo json_encode($json);