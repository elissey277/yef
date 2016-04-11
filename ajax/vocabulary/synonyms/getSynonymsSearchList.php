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
    $searchTitle = '(main.Word0 LIKE "%'.$_POST['title'].'%" OR main.Word'.$lang.' LIKE "%'.$_POST['title'].'%" OR other.Word0 LIKE "%'.$_POST['title'].'%" OR other.Word'.$lang.' LIKE "%'.$_POST['title'].'%")';
}
$synonyms = mysqli_query($db,
    "SELECT synonyms.Id, main.Word0 as TitleEn, main.Word".$lang." as Title, synonyms.Image FROM synonyms
	    INNER JOIN dictionary as main ON main.Id = synonyms.WordId
        INNER JOIN synonymswords ON synonymswords.SynonymsId = synonyms.Id
        INNER JOIN dictionary as other ON synonymswords.WordId = other.Id
        WHERE ".$searchTitle."
        GROUP BY synonyms.Id
        ORDER BY TitleEn ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());
$json = array();
while($synonym = mysqli_fetch_array($synonyms)) {
    array_push($json, array($synonym['Id'],$synonym['TitleEn'],$synonym['Title'],$synonym['Image']));
}

$allsynonyms = mysqli_query($db,
    "SELECT synonyms.Id, main.Word0 as TitleEn, main.Word".$lang." as Title, synonyms.Image FROM synonyms
	    INNER JOIN dictionary as main ON main.Id = synonyms.WordId
        INNER JOIN synonymswords ON synonymswords.SynonymsId = synonyms.Id
        INNER JOIN dictionary as other ON synonymswords.WordId = other.Id
        WHERE ".$searchTitle."
        GROUP BY synonyms.Id")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allsynonyms)/$perPage));

echo json_encode($json);