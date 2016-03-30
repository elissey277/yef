<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
// search all read
$allliked = mysqli_query($db,
    "SELECT differences.Id FROM differences
        INNER JOIN differencesliked ON differences.Id = differencesliked.DifferencesId
        WHERE differencesliked.UserId = ".$_POST["user"])
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
    "SELECT differencesrecommended.Differences2Id as Id FROM differencesrecommended
	    INNER JOIN differencesliked ON differencesliked.DifferencesId = differencesrecommended.Differences1Id
        WHERE differencesliked.UserId = ".$_POST["user"]." AND differencesrecommended.Differences2Id NOT IN ".$inliked)
or die(mysql_error());
// search recommendations by read
$readrecs = mysqli_query($db,
    "SELECT differencesrecommended.Differences2Id as Id FROM differencesrecommended
	    INNER JOIN differencesread ON differencesread.DifferencesId = differencesrecommended.Differences1Id
        WHERE differencesread.UserId = ".$_POST["user"]." AND differencesrecommended.Differences2Id NOT IN ".$inliked)
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
    $glossaries = mysqli_query($db,
        "SELECT differences.Id, differences.Title0 as TitleEn, differences.Title".$lang." as Title, differences.Image FROM differences
            WHERE differences.Id = ".$reclist[$i][0])
    or die(mysql_error());
    $glossary = mysqli_fetch_array($glossaries);
    array_push($json, array($glossary['Id'],$glossary['TitleEn'],$glossary['Title'],$glossary['Image']));
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