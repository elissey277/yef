<?php
include '../../config.php';
// search all read
$allliked = mysqli_query($db,
    "SELECT advices.Id FROM advices
        INNER JOIN advicesliked ON advices.Id = advicesliked.AdviceId
        WHERE advicesliked.UserId = ".$_POST["user"])
or die(mysql_error());
$inliked = '';
$inliked .= '(';
for($i=0;$i<mysqli_num_rows($allliked);$i++){
    $row = mysqli_fetch_array($allliked);
    $inliked .= $row["Id"];
    if($i!=mysqli_num_rows($allliked)-1){
        $inliked .= ',';
    }
}
$inliked .= ')';
// search recommendations by liked
$likedrecs = mysqli_query($db,
    "SELECT advicesrecommended.Advice2Id as Id FROM advicesrecommended
	  INNER JOIN advicesliked ON advicesliked.AdviceId = advicesrecommended.Advice1Id
        WHERE advicesliked.UserId = ".$_POST["user"]." AND advicesrecommended.Advice2Id NOT IN ".$inliked)
or die(mysql_error());
// search recommendations by read
$readrecs = mysqli_query($db,
    "SELECT advicesrecommended.Advice2Id as Id FROM advicesrecommended
	  INNER JOIN advicesread ON advicesread.AdviceId = advicesrecommended.Advice1Id
        WHERE advicesread.UserId = ".$_POST["user"]." AND advicesrecommended.Advice2Id NOT IN ".$inliked)
or die(mysql_error());
//create complete list of recommendations
$reclist = array();
while($row = mysqli_fetch_array($likedrecs)) {
    $n = isInList($reclist,$row['Id']);
    if($n == -1){
        array_push($reclist,array($row['Id'],2));
    } else {
        $reclist[$n][1] += 2;
    }
}
while($row = mysqli_fetch_array($readrecs)) {
    $n = isInList($reclist,$row['Id']);
    if($n == -1){
        array_push($reclist,array($row['Id'],1));
    } else {
        $reclist[$n][1] += 1;
    }
}
usort($reclist, "cmp");

$json = array();
for($i=0;$i<count($reclist);$i++){
    $advices = mysqli_query($db,
        "SELECT advices.Id, advices.Title".$_POST["language"]." as Title, advices.Text".$_POST["language"]." as Text, advices.Image FROM advices
            WHERE advices.Id = ".$reclist[$i][0])
    or die(mysql_error());
    $advice = mysqli_fetch_array($advices);
    array_push($json, array($advice['Id'],$advice['Title'],$advice['Text'],$advice['Image']));
}

$json = array_reverse($json);
echo json_encode($json);

function isInList($list, $id) {
    for($i=0;$i<count($list);$i++) {
        if($list[$i][0] == $id){
            return $i;
        }
    }
    return -1;
}

function cmp($a, $b)
{
    if ($a[1] == $b[1]) {
        return 0;
    }
    return ($a[1] > $b[1]) ? -1 : 1;
}