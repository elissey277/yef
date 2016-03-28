<?php
include '../../../config.php';
$rules = mysqli_query($db,
    "SELECT rules.Id, rules.Title".$_POST["language"]." as Title, rules.IsHeader FROM rules
        INNER JOIN rulesliked ON rules.Id = rulesliked.RuleId
        WHERE rulesliked.UserId = ".$_POST["user"]."
        ORDER BY rulesliked.CreatedOn DESC")
or die(mysql_error());

$json = array();
while($rule = mysqli_fetch_array($rules)) {
    array_push($json, array($rule['Id'],$rule['Title'],$rule['IsHeader']));
}

echo json_encode($json);