<?php
include '../../../config.php';
$likes = mysqli_query($db,
    "SELECT UserId, RuleId FROM rulesliked
        WHERE UserId = ".$_POST["user"]." AND RuleId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, RuleId FROM rulesliked
        WHERE RuleId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$rules = mysqli_query($db,
    "SELECT Id, Title".$_POST["language"]." as Title, Text".$_POST["language"]." as Text FROM rules
        WHERE Id = ".$_POST["id"])
or die(mysql_error());
$rule = mysqli_fetch_array($rules);

echo json_encode(array($rule['Id'],$rule['Title'],$rule['Text'],$liked,$allliked));

$reads = mysqli_query($db,
    "SELECT UserId, RuleId, rulesread.Count FROM rulesread
        WHERE UserId = ".$_POST["user"]." AND RuleId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO rulesread (UserId, RuleId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE rulesread
            SET rulesread.Count = rulesread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND RuleId = ".$_POST["id"])
    or die(mysql_error());
}