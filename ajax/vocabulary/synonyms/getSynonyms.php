<?php
include '../../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$likes = mysqli_query($db,
    "SELECT UserId, SynonymsId FROM synonymsliked
        WHERE UserId = ".$_POST["user"]." AND SynonymsId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, SynonymsId FROM synonymsliked
        WHERE SynonymsId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$json = array();
$synonyms = mysqli_query($db,
    "SELECT synonyms.Id, dictionary.Word0 as TitleEn, dictionary.Word".$lang." as Title, synonyms.Image FROM synonyms
	    INNER JOIN dictionary ON dictionary.Id = synonyms.WordId
        WHERE synonyms.Id = ".$_POST["id"])
or die(mysql_error());
$synonym = mysqli_fetch_array($synonyms);
array_push($json, array($synonym['Id'],$synonym['TitleEn'],$synonym['Title'],$synonym['Image'],$liked,$allliked));

$words = mysqli_query($db,
    "SELECT dictionary.Id, dictionary.Word0 as WordF, dictionary.Word".$lang." as WordN, dictionary.Image, dictionary.Audio, dictionaryusers.UserId as User FROM synonymswords
	    INNER JOIN dictionary ON dictionary.Id = synonymswords.WordId
        LEFT OUTER JOIN dictionaryusers ON dictionary.Word0 = dictionaryusers.WordForeign AND dictionary.Word".$lang." = dictionaryusers.WordNative AND dictionaryusers.UserId = ".$_POST["user"]."
        WHERE synonymswords.SynonymsId = ".$_POST["id"]."
        ORDER BY dictionary.Word0 ASC")
or die(mysql_error());
while($word = mysqli_fetch_array($words)){
    array_push($json, array($word['Id'],$word['WordF'],$word['WordN'],$word['Image'],$word['Audio'],$word['User']));
}

echo json_encode($json);

$reads = mysqli_query($db,
    "SELECT UserId, SynonymsId, synonymsread.Count FROM synonymsread
        WHERE UserId = ".$_POST["user"]." AND SynonymsId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO synonymsread (UserId, SynonymsId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE synonymsread
            SET synonymsread.Count = synonymsread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND SynonymsId = ".$_POST["id"])
    or die(mysql_error());
}