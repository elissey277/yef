<?php
include '../../../config.php';
$perPage = 10;
if($_POST['language']==0){
    $lang = 1;
} else {
    $lang = $_POST['language'];
}
$glossaries = mysqli_query($db,
    "SELECT Id, Title0 as TitleEn, Title".$lang." as Title, Image FROM glossaries
        ORDER BY TitleEn ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($glossary = mysqli_fetch_array($glossaries)) {
    array_push($json, array($glossary['Id'],$glossary['TitleEn'],$glossary['Title'],$glossary['Image']));
}

$allglossaries = mysqli_query($db,
    "SELECT glossaries.Id FROM glossaries")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allglossaries)/$perPage));

echo json_encode($json);