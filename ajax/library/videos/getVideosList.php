<?php
include '../../../config.php';
$perPage = 10;
$videos = mysqli_query($db,
    "SELECT videos.Id, videos.Title".$_POST["language"]." as Title, videos.Difficulty, videoscategories.Title".$_POST["language"]." as Category, videoscategories.Image FROM videos
        INNER JOIN videoscategories ON videos.CategoryId = videoscategories.Id
        ORDER BY videos.Id ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($video = mysqli_fetch_array($videos)) {
    array_push($json, array($video['Id'],$video['Title'],$video['Difficulty'],$video['Category'],$video['Image']));
}

$allvideos = mysqli_query($db,
    "SELECT videos.Id FROM videos")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allvideos)/$perPage));

echo json_encode($json);