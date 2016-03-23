<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
if($_POST['title']==''){
    $searchTitle = '1';
} else {
    $searchTitle = '(videos.Title0 LIKE "%'.$_POST['title'].'%" OR videos.Text0 LIKE "%'.$_POST['title'].'%" OR videos.Title'.$lang.' LIKE "%'.$_POST['title'].'%" OR videos.Text'.$lang.' LIKE "%'.$_POST['title'].'%")';
}
if($_POST['difficulty']==0){
    $searchDifficulty = '1';
} else {
    $searchDifficulty = 'videos.Difficulty='.$_POST['difficulty'];
}
if($_POST['category']==0){
    $searchCategory = '1';
} else {
    $searchCategory = 'videos.CategoryId='.$_POST['category'];
}
$videos = mysqli_query($db,
    "SELECT videos.Id, videos.Title".$_POST["language"]." as Title, videos.Difficulty, videoscategories.Title".$_POST["language"]." as Category, videoscategories.Image FROM videos
        INNER JOIN videoscategories ON videos.CategoryId = videoscategories.Id
        WHERE ".$searchTitle." AND ".$searchDifficulty." AND ".$searchCategory."
        ORDER BY videos.Id ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($video = mysqli_fetch_array($videos)) {
    array_push($json, array($video['Id'],$video['Title'],$video['Difficulty'],$video['Category'],$video['Image']));
}

$allvideos = mysqli_query($db,
    "SELECT videos.Id FROM videos
        WHERE ".$searchTitle." AND ".$searchDifficulty." AND ".$searchCategory)
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allvideos)/$perPage));

echo json_encode($json);