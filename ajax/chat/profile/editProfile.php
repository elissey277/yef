<?php
include '../../../config.php';
$users = mysqli_query($db,
    "UPDATE users
        SET FirstName = '".$_POST['firstName']."', LastName = '".$_POST['lastName']."', Email = '".$_POST['email']."',
            DateOfBirth = '".$_POST['dateOfBirth']."', LanguageId = ".$_POST['language'].", EnglishLevel = ".$_POST['englishLevel'].",
            Gender = ".$_POST['gender'].", AboutMe = '".mysql_real_escape_string($_POST['aboutMe'])."'
        WHERE users.Id = ".$_POST['id'])
or die(mysql_error());
