<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$synonyms = mysqli_query($db,
    "SELECT synonyms.Id, dictionary.Word0 as TitleEn, dictionary.Word".$lang." as Title, synonyms.Image FROM synonyms
	    INNER JOIN dictionary ON dictionary.Id = synonyms.WordId
        INNER JOIN synonymsliked ON synonyms.Id = synonymsliked.SynonymsId
        WHERE synonymsliked.UserId = ".$_POST["user"]."
        ORDER BY synonymsliked.CreatedOn DESC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($synonym = mysqli_fetch_array($synonyms)) {
    array_push($json, array($synonym['Id'],$synonym['TitleEn'],$synonym['Title'],$synonym['Image']));
}

$allsynonyms = mysqli_query($db,
    "SELECT synonyms.Id FROM synonyms
        INNER JOIN synonymsliked ON synonyms.Id = synonymsliked.SynonymsId
        WHERE synonymsliked.UserId = ".$_POST["user"])
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allsynonyms)/$perPage));

echo json_encode($json);