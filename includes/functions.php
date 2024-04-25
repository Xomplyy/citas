<?php 
function connection(){
    $db = 'database.php';
    return $db;
};
function saveSchedules(){
    require connection();
    $hora = $_POST["hora"];
    $sql = "INSERT INTO horario (hora) VALUES ('$hora');";
    $query = mysqli_query($db,$sql);
    echo $query;
};
function deleteSchedules(){
    require connection();
    $hora = $_POST["hora"];
    $sql = "DELETE FROM horario WHERE (hora = '$hora');";
    $query = mysqli_query($db,$sql);
    echo $query;
};
function printHours(){
    require connection();
    $sql = "SELECT * FROM horario;";
    $query = mysqli_query($db,$sql);
    return $query;
};
////////////////////////////////// FUNCTIONS /////////////////////////////////////////
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    if ($_POST["btn"] == "saveSch"){
        saveSchedules();
    };
    if ($_POST["btn"] == "deleteSch"){
        deleteSchedules();
    };
}
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $hours = array();
    $resultHours = printHours();
    while($row = mysqli_fetch_assoc($resultHours)){
        $h = substr($row["hora"],0,5);
        $hours [] = array (
            'hour' => $h,
        );
    }
    $json = json_encode($hours);
    echo $json;
}


