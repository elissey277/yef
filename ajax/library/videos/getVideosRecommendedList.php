<?php
include '../../../config.php';
$perPage = 10;
// search all read
$allliked = mysqli_query($db,
    "SELECT videos.Id FROM videos
        INNER JOIN videosliked ON videos.Id = videosliked.VideoId
        WHERE videosliked.UserId = ".$_POST["user"])
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
    "SELECT videosrecommended.Video2Id as Id FROM videosrecommended
	  INNER JOIN videosliked ON videosliked.VideoId = videosrecommended.Video1Id
        WHERE videosliked.UserId = ".$_POST["user"]." AND videosrecommended.Video2Id NOT IN ".$inliked)
or die(mysql_error());
// search recommendations by read
$readrecs = mysqli_query($db,
    "SELECT videosrecommended.Video2Id as Id FROM videosrecommended
	  INNER JOIN videosread ON videosread.VideoId = videosrecommended.Video1Id
        WHERE videosread.UserId = ".$_POST["user"]." AND videosrecommended.Video2Id NOT IN ".$inliked)
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
    $videos = mysqli_query($db,
        "SELECT videos.Id, videos.Title".$_POST["language"]." as Title, videos.Difficulty, videoscategories.Title".$_POST["language"]." as Category, videoscategories.Image FROM videos
            INNER JOIN videoscategories ON videos.CategoryId = videoscategories.Id
            WHERE videos.Id = ".$reclist[$i][0])
    or die(mysql_error());
    $video = mysqli_fetch_array($videos);
    array_push($json, array($video['Id'],$video['Title'],$video['Difficulty'],$video['Category'],$video['Image']));
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