<?php
include '../../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$likes = mysqli_query($db,
    "SELECT UserId, GlossaryId FROM glossariesliked
        WHERE UserId = ".$_POST["user"]." AND GlossaryId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, GlossaryId FROM glossariesliked
        WHERE GlossaryId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$json = array();
$glossaries = mysqli_query($db,
    "SELECT Id, Title0 as TitleEn, Title".$lang." as Title, Image FROM glossaries
        WHERE glossaries.Id = ".$_POST["id"])
or die(mysql_error());
$glossary = mysqli_fetch_array($glossaries);
array_push($json, array($glossary['Id'],$glossary['TitleEn'],$glossary['Title'],$glossary['Image'],$liked,$allliked));

$words = mysqli_query($db,
    "SELECT dictionary.Id, dictionary.Word0 as WordF, dictionary.Word".$lang." as WordN, dictionary.Image, dictionary.Audio, dictionaryusers.UserId as User FROM glossarieswords
	    INNER JOIN dictionary ON dictionary.Id = glossarieswords.WordId
        LEFT OUTER JOIN dictionaryusers ON dictionary.Word0 = dictionaryusers.WordForeign AND dictionary.Word".$lang." = dictionaryusers.WordNative AND dictionaryusers.UserId = ".$_POST["user"]."
        WHERE glossarieswords.GlossaryId = ".$_POST["id"]."
        ORDER BY dictionary.Word0 ASC")
or die(mysql_error());
while($word = mysqli_fetch_array($words)){
    array_push($json, array($word['Id'],$word['WordF'],$word['WordN'],$word['Image'],$word['Audio'],$word['User']));
}

echo json_encode($json);

$reads = mysqli_query($db,
    "SELECT UserId, GlossaryId, glossariesread.Count FROM glossariesread
        WHERE UserId = ".$_POST["user"]." AND GlossaryId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO glossariesread (UserId, GlossaryId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE glossariesread
            SET glossariesread.Count = glossariesread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND GlossaryId = ".$_POST["id"])
    or die(mysql_error());
}