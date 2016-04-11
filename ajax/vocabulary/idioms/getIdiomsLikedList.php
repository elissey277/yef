<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$idioms = mysqli_query($db,
    "SELECT idioms.Id, dictionary.Word0 as TitleEn, dictionary.Word".$lang." as Title, dictionary.Image FROM idioms
	    INNER JOIN dictionary ON dictionary.Id = idioms.WordId
        INNER JOIN idiomsliked ON idioms.Id = idiomsliked.IdiomsId
        WHERE idiomsliked.UserId = ".$_POST["user"]."
        ORDER BY idiomsliked.CreatedOn DESC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($idiom = mysqli_fetch_array($idioms)) {
    array_push($json, array($idiom['Id'],$idiom['TitleEn'],$idiom['Title'],$idiom['Image']));
}

$allidioms = mysqli_query($db,
    "SELECT idioms.Id FROM idioms
        INNER JOIN idiomsliked ON idioms.Id = idiomsliked.IdiomsId
        WHERE idiomsliked.UserId = ".$_POST["user"])
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allidioms)/$perPage));

echo json_encode($json);