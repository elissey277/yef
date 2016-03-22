<?php
include '../../../config.php';
$perPage = 10;
// search all read
$allliked = mysqli_query($db,
    "SELECT texts.Id FROM texts
        INNER JOIN textsliked ON texts.Id = textsliked.TextId
        WHERE textsliked.UserId = ".$_POST["user"])
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
    "SELECT textsrecommended.Text2Id as Id FROM textsrecommended
	  INNER JOIN textsliked ON textsliked.TextId = textsrecommended.Text1Id
        WHERE textsliked.UserId = ".$_POST["user"]." AND textsrecommended.Text2Id NOT IN ".$inliked)
or die(mysql_error());
// search recommendations by read
$readrecs = mysqli_query($db,
    "SELECT textsrecommended.Text2Id as Id FROM textsrecommended
	  INNER JOIN textsread ON textsread.TextId = textsrecommended.Text1Id
        WHERE textsread.UserId = ".$_POST["user"]." AND textsrecommended.Text2Id NOT IN ".$inliked)
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
for($i=($_POST['page']-1)*$perPage;$i<count($reclist)&&$i<$_POST['page']*$perPage;$i++){
    $texts = mysqli_query($db,
        "SELECT texts.Id, texts.Title".$_POST["language"]." as Title, texts.Difficulty, textscategories.Title".$_POST["language"]." as Category, textscategories.Image FROM texts
            INNER JOIN textscategories ON texts.CategoryId = textscategories.Id
            WHERE texts.Id = ".$reclist[$i][0])
    or die(mysql_error());
    $text = mysqli_fetch_array($texts);
    array_push($json, array($text['Id'],$text['Title'],$text['Difficulty'],$text['Category'],$text['Image']));
}

$json = array_reverse($json);
array_push($json, ceil(count($reclist)/$perPage));
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