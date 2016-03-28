<?php
include '../../../config.php';
$likes = mysqli_query($db,
    "SELECT UserId, TextId FROM textsliked
        WHERE UserId = ".$_POST["user"]." AND TextId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, TextId FROM textsliked
        WHERE TextId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$texts = mysqli_query($db,
    "SELECT Id, Title0 as TitleEng, Text0 as TextEng, Title".$_POST["language"]." as TitleTrns, Text".$_POST["language"]." as TextTrns FROM texts
        WHERE Id = ".$_POST["id"])
or die(mysql_error());
$text = mysqli_fetch_array($texts);

echo json_encode(array($text['Id'],$text['TitleEng'],$text['TextEng'],$text['TitleTrns'],$text['TextTrns'],$liked,$allliked));

$reads = mysqli_query($db,
    "SELECT UserId, TextId, textsread.Count FROM textsread
        WHERE UserId = ".$_POST["user"]." AND TextId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO textsread (UserId, TextId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE textsread
            SET textsread.Count = textsread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND TextId = ".$_POST["id"])
    or die(mysql_error());
}