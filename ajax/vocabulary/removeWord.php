<?php
include '../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$words = mysqli_query($db,
    "SELECT Id, Word0 as WordF, Word".$lang." as WordN FROM dictionary
        WHERE Id = ".$_POST["id"])
or die(mysql_error());
$word = mysqli_fetch_array($words);

mysqli_query($db,
    "DELETE FROM dictionaryusers
        WHERE UserId = ".$_POST["user"]." AND WordForeign = '".$word["WordF"]."' AND WordNative = '".$word["WordN"]."'")
or die(mysql_error());