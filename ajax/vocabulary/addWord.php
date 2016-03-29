<?php
include '../../config.php';
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$words = mysqli_query($db,
    "SELECT Id, Word0 as WordF, Word".$lang." as WordN, Example0 as ExampleF, Example".$lang." as ExampleN, Image, Audio, TypeId FROM dictionary
        WHERE Id = ".$_POST["id"])
or die(mysql_error());
$word = mysqli_fetch_array($words);

mysqli_query($db,
    "INSERT INTO dictionaryusers (UserId, WordForeign, WordNative, ExampleForeign, ExampleNative, Image, Audio, TypeId)
        VALUE (".$_POST["user"].",'".$word["WordF"]."','".$word["WordN"]."','".$word["ExampleF"]."','".$word["ExampleN"]."','".$word["Image"]."','".$word["Audio"]."',".$word["TypeId"].")")
or die(mysql_error());