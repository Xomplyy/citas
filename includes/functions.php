<?php
function connection()
{
    $db = 'database.php';
    return $db;
};
function getSchedule()
{
    require connection();
    $hours = array();
    $sql = "SELECT * FROM horario;";
    $query = mysqli_query($db, $sql);
    while ($row = mysqli_fetch_assoc($query)) {
        $h = substr($row["hora"], 0, 5);
        $hours[] = array(
            'hour' => $h,
        );
    }
    return $hours;
}
function saveSchedules()
{
    try {
        require connection();
        $hora = $_POST["hora"];
        $sql = "INSERT INTO horario (hora) VALUES ('$hora');";
        $query = mysqli_query($db, $sql);
        echo $query;
    } catch (\Throwable $th) {
        //throw $th;
        var_dump($th);
    }
};
function deleteSchedules()
{
    try {
        require connection();
        $hora = $_POST["hora"];
        $sql = "DELETE FROM horario WHERE (hora = '$hora');";
        $query = mysqli_query($db, $sql);
        echo $query;
    } catch (\Throwable $th) {
        // throw $th;
        var_dump($th);
    }
};
function getHours($date)
{
    try {
        require connection();
        $sql = "SELECT hora FROM citas WHERE fecha = '$date'";
        $query = mysqli_query($db, $sql);
        if ($query->num_rows > 0){
            while ($row = mysqli_fetch_assoc($query)) {
                $rowH = substr($row["hora"], 0, 5);
                $hours[] = array(
                    "hour" => $rowH
                );
            };
            $hoursSch = getSchedule();
            foreach ($hours as $key => $h) {
                foreach ($hoursSch as $key => $hSch) {
                    if($h == $hSch){
                        $time []= $h;
                    }
                }
            }
        }else {
            $time = [
                0
            ];
        }
        return $time;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
////////////////////////////////// FUNCTIONS /////////////////////////////////////////
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_POST["btn"] == "saveSch") {
        saveSchedules();
    };
    if ($_POST["btn"] == "deleteSch") {
        deleteSchedules();
    };
    if($_POST["searchDate"] == "1"){
        $date = $_POST["date"];
        $hrjs = [
            'noActive' => getHours($date)
        ];
        $hrjson = json_encode($hrjs);
        echo $hrjson;
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $js = [
        'Schedule' => getSchedule(),
    ];
    $json = json_encode($js);
    echo $json;
}


