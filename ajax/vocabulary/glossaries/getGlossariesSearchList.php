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
    $searchTitle = '(glossaries.Title0 LIKE "%'.$_POST['title'].'%" OR glossaries.Title'.$lang.' LIKE "%'.$_POST['title'].'%" OR tags.Title0 LIKE "%'.$_POST['title'].'%" OR tags.Title'.$lang.' LIKE "%'.$_POST['title'].'%" OR dictionary.Word0 LIKE "%'.$_POST['title'].'%" OR dictionary.Word'.$lang.' LIKE "%'.$_POST['title'].'%")';
}
$glossaries = mysqli_query($db,
    "SELECT glossaries.Id, glossaries.Title0 as TitleEn, glossaries.Title".$lang." as Title, glossaries.Image FROM glossaries
	    INNER JOIN glossariestags ON glossariestags.GlossaryId = glossaries.Id
        INNER JOIN tags ON tags.Id = glossariestags.TagId
        INNER JOIN glossarieswords ON glossarieswords.GlossaryId = glossaries.Id
        INNER JOIN dictionary ON glossarieswords.WordId = dictionary.Id
        WHERE ".$searchTitle."
        GROUP BY glossaries.Id
        ORDER BY glossaries.Id ASC
        LIMIT ".(($_POST["page"]-1)*$perPage).", ".$perPage)
or die(mysql_error());

$json = array();
while($glossary = mysqli_fetch_array($glossaries)) {
    array_push($json, array($glossary['Id'],$glossary['TitleEn'],$glossary['Title'],$glossary['Image']));
}

$allglossaries = mysqli_query($db,
    "SELECT glossaries.Id FROM glossaries
        INNER JOIN glossariestags ON glossariestags.GlossaryId = glossaries.Id
        INNER JOIN tags ON tags.Id = glossariestags.TagId
        INNER JOIN glossarieswords ON glossarieswords.GlossaryId = glossaries.Id
        INNER JOIN dictionary ON glossarieswords.WordId = dictionary.Id
        WHERE ".$searchTitle."
        GROUP BY glossaries.Id")
or die(mysql_error());

array_push($json, ceil(mysqli_num_rows($allglossaries)/$perPage));

echo json_encode($json);