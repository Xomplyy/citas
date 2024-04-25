<?php 
$db = mysqli_connect('localhost', 'root', '2108', 'citas_inmobiliaria');

if (!$db){
    echo "Hubo un erro";
    exit;
};
