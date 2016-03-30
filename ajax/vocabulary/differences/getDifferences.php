<?php
include '../../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$likes = mysqli_query($db,
    "SELECT UserId, DifferencesId FROM differencesliked
        WHERE UserId = ".$_POST["user"]." AND DifferencesId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, DifferencesId FROM differencesliked
        WHERE DifferencesId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$json = array();
$differences = mysqli_query($db,
    "SELECT differences.Id, differences.Title0 as TitleEn, differences.Title".$lang." as Title, differences.Image FROM differences
        WHERE differences.Id = ".$_POST["id"])
or die(mysql_error());
$difference = mysqli_fetch_array($differences);
array_push($json, array($difference['Id'],$difference['TitleEn'],$difference['Title'],$difference['Image'],$liked,$allliked));

$words = mysqli_query($db,
    "SELECT dictionary.Id, dictionary.Word0 as WordF, dictionary.Word".$lang." as WordN, dictionary.Image, dictionary.Audio, differenceswords.Description, dictionaryusers.UserId as User FROM differenceswords
	    INNER JOIN dictionary ON dictionary.Id = differenceswords.WordId
        LEFT OUTER JOIN dictionaryusers ON dictionary.Word0 = dictionaryusers.WordForeign AND dictionary.Word".$lang." = dictionaryusers.WordNative AND dictionaryusers.UserId = ".$_POST["user"]."
        WHERE differenceswords.DifferencesId = ".$_POST["id"]."
        ORDER BY dictionary.Word0 ASC")
or die(mysql_error());
while($word = mysqli_fetch_array($words)){
    array_push($json, array($word['Id'],$word['WordF'],$word['WordN'],$word['Image'],$word['Audio'],$word['User'],$word['Description']));
}

echo json_encode($json);

$reads = mysqli_query($db,
    "SELECT UserId, DifferencesId, differencesread.Count FROM differencesread
        WHERE UserId = ".$_POST["user"]." AND DifferencesId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO differencesread (UserId, DifferencesId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE differencesread
            SET differencesread.Count = differencesread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND DifferencesId = ".$_POST["id"])
    or die(mysql_error());
}