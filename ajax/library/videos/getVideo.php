<?php
include '../../../config.php';
$likes = mysqli_query($db,
    "SELECT UserId, VideoId FROM videosliked
        WHERE UserId = ".$_POST["user"]." AND VideoId = ".$_POST["id"])
or die(mysql_error());
$liked = mysqli_num_rows($likes);

$alllikes = mysqli_query($db,
    "SELECT UserId, VideoId FROM videosliked
        WHERE VideoId = ".$_POST["id"])
or die(mysql_error());
$allliked = mysqli_num_rows($alllikes);

$videos = mysqli_query($db,
    "SELECT Id, Title0 as TitleEng, Text0 as TextEng, Title".$_POST["language"]." as TitleTrns, Text".$_POST["language"]." as TextTrns, Video FROM videos
        WHERE Id = ".$_POST["id"])
or die(mysql_error());
$video = mysqli_fetch_array($videos);

echo json_encode(array($video['Id'],$video['TitleEng'],$video['TextEng'],$video['TitleTrns'],$video['TextTrns'],$liked,$allliked,$video['Video']));

$reads = mysqli_query($db,
    "SELECT UserId, VideoId, videosread.Count FROM videosread
        WHERE UserId = ".$_POST["user"]." AND VideoId = ".$_POST["id"])
or die(mysql_error());
if(mysqli_num_rows($reads) == 0){
    mysqli_query($db,
        "INSERT INTO videosread (UserId, VideoId)
            VALUES(".$_POST["user"].",".$_POST["id"].")")
    or die(mysql_error());
} else {
    mysqli_query($db,
        "UPDATE videosread
            SET videosread.Count = videosread.Count + 1
            WHERE UserId = ".$_POST["user"]." AND VideoId = ".$_POST["id"])
    or die(mysql_error());
}