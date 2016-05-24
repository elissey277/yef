<?php
include '../../../config.php';

copy($_FILES['file']['tmp_name'], '../../../images/photos/'.$_COOKIE['user'].'tmp.png');