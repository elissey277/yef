<?php
include '../../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$likes = mysqli_query($db,
    "SELECT UserId, IdiomsId FROM idiomsliked
        WHERE UserId = ".$_POST["user"]." AND IdiomsId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, IdiomsId FROM idiomsliked
        WHERE IdiomsId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$json = array();
$idioms = mysqli_query($db,
    "SELECT idioms.Id, dictionary.Id as WordId, dictionaryusers.UserId as User, dictionary.Word0 as WordF, dictionary.Word".$lang." as WordN, dictionary.Example0 as ExampleF, dictionary.Example".$lang." as ExampleN, dictionary.Image, dictionary.Audio FROM idioms
	    INNER JOIN dictionary ON dictionary.Id = idioms.WordId
        LEFT OUTER JOIN dictionaryusers ON dictionary.Word0 = dictionaryusers.WordForeign AND dictionary.Word".$lang." = dictionaryusers.WordNative AND dictionaryusers.UserId = ".$_POST["user"]."
        WHERE idioms.Id = ".$_POST["id"]."
        ORDER BY dictionary.Word0 ASC")
or die(mysql_error());
$idiom = mysqli_fetch_array($idioms);

echo json_encode(array($idiom['Id'],$idiom['WordF'],$idiom['WordN'],$idiom['ExampleF'],$idiom['ExampleN'],$idiom['Image'],$idiom['Audio'],$idiom['WordId'],$idiom['User'],$liked,$allliked));

$reads = mysqli_query($db,
    "SELECT UserId, IdiomsId, idiomsread.Count FROM idiomsread
        WHERE UserId = ".$_POST["user"]." AND IdiomsId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO idiomsread (UserId, IdiomsId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE idiomsread
            SET idiomsread.Count = idiomsread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND IdiomsId = ".$_POST["id"])
    or die(mysql_error());
}