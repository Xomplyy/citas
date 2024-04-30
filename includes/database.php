<?php 
$url = 'byndyk4rmgnqyubahgzz-mysql.services.clever-cloud.com';
$user = 'uhulcra4upbt5pae';
$password= 'unRXhiVle8IDTEG6O0H7';
$nameDB = 'byndyk4rmgnqyubahgzz';
$db = mysqli_connect($url, $user, $password, $nameDB);

if (!$db){
    echo "Hubo un erro";
    exit;
};
