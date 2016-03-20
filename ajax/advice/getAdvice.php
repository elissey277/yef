<?php
include '../../config.php';
$likes = mysqli_query($db,
    "SELECT UserId, AdviceId FROM advicesliked
        WHERE UserId = ".$_POST["user"]." AND AdviceId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, AdviceId FROM advicesliked
        WHERE AdviceId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$advices = mysqli_query($db,
    "SELECT Id, Title".$_POST["language"]." as Title, Text".$_POST["language"]." as Text, Image FROM advices
        WHERE Id = ".$_POST["id"]."
        ORDER BY advices.Id ASC")
or die(mysql_error());
$advice = mysqli_fetch_array($advices);

echo json_encode(array($advice['Id'],$advice['Title'],$advice['Text'],$advice['Image'],$liked,$allliked));

$reads = mysqli_query($db,
    "SELECT UserId, AdviceId, advicesread.Count FROM advicesread
        WHERE UserId = ".$_POST["user"]." AND AdviceId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO advicesread (UserId, AdviceId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE advicesread
            SET advicesread.Count = advicesread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND AdviceId = ".$_POST["id"])
    or die(mysql_error());
}