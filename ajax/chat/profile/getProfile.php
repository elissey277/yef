<?php
include '../../../config.php';
$profiles = mysqli_query($db,
    "SELECT users.Id, Email, Photo, FirstName, LastName, languages.Title AS Language, Gender, DateOfBirth, AboutMe, EnglishLevel, friends.isAccepted FROM users
        INNER JOIN languages ON languages.Id = users.LanguageId
        LEFT OUTER JOIN friends ON friends.User1Id = users.Id AND friends.User2Id = ".$_COOKIE['user']."
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());
$profile = mysqli_fetch_array($profiles);
$user = array($profile['Id'],$profile['Email'],$profile['Photo'],$profile['FirstName'],$profile['LastName'],$profile['Language'],
        $profile['Gender'],$profile['DateOfBirth'],$profile['AboutMe'],$profile['isAccepted'],$profile['EnglishLevel']);

$fs = array();
$friends = mysqli_query($db,
    "SELECT users.Id, Photo, FirstName, LastName, myfriends.isAccepted FROM users
        INNER JOIN friends as userfriends ON userfriends.User2Id = users.Id
        LEFT OUTER JOIN friends as myfriends ON myfriends.User1Id = users.Id AND myfriends.User2Id = ".$_COOKIE['user']."
        WHERE userfriends.isAccepted = 2 AND userfriends.User1Id = ".$_POST['id']."
        ORDER BY RAND()
        LIMIT 25")
or die(mysql_error());
while($friend = mysqli_fetch_array($friends)) {
    array_push($fs, array($friend['Id'],$friend['Photo'],$friend['FirstName'],$friend['LastName'],$friend['isAccepted']));
}

$allfriends = mysqli_query($db,
    "SELECT users.Id FROM users
        INNER JOIN friends as userfriends ON userfriends.User2Id = users.Id
        WHERE userfriends.isAccepted = 2 AND userfriends.User1Id = ".$_POST['id'])
or die(mysql_error());
array_push($fs, mysqli_num_rows($allfriends));

array_push($user,$fs);

echo json_encode($user);