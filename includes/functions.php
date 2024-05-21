<?php
function connection()
{
    $db = 'database.php';
    return $db;
};
function json($js)
{
    $json = json_encode($js);
    echo $json;
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
function saveSchedules($hora)
{
    try {
        require connection();
        $sql_h = "SELECT hora FROM horario WHERE hora = '$hora';";
        $query_h = mysqli_query($db, $sql_h);
        if ($query_h->num_rows == 0) {
            $sql = "INSERT INTO horario (hora) VALUES ('$hora');";
            mysqli_query($db, $sql);
            return true;
        } else {
            //This schedule already exist
            return false;
        }
    } catch (\Throwable $th) {
        //throw $th;
        var_dump($th);
    }
};
function deleteSchedules($hora)
{
    try {
        require connection();
        $sql_h = "SELECT hora FROM horario WHERE hora = '$hora';";
        $query_h = mysqli_query($db, $sql_h);
        if ($query_h->num_rows > 0) {
            $sql = "DELETE FROM horario WHERE (hora = '$hora');";
            mysqli_query($db, $sql);
            return true;
        } else {
            //This schedule don't exist
            return false;
        }
    } catch (\Throwable $th) {
        // throw $th;
        var_dump($th);
    }
};
function getHours($date)
{
    try {
        require connection();
        $sql = "SELECT hora FROM citas WHERE fecha = '$date';";
        $query = mysqli_query($db, $sql);
        if ($query->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $rowH = substr($row["hora"], 0, 5); // correct format of hours
                $hours[] = array(
                    "hour" => $rowH
                );
            };
            $hoursSch = getSchedule();
            foreach ($hours as $key => $h) {
                foreach ($hoursSch as $key => $hSch) {
                    if ($h == $hSch) {
                        $time[] = $h;
                    }
                }
            }
        } else {
            $time = [
                0
            ];
        }
        return $time;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function saveCustomer($dni, $name, $lastname, $phone, $email)
{
    try {
        require connection();
        $sql_customer = "SELECT * FROM clientes WHERE cedula = '$dni';";
        $query_customer = mysqli_query($db, $sql_customer);
        if ($query_customer->num_rows == 0) { //Customer d'not exist
            $save_customer = "INSERT INTO clientes (cedula, nombre, apellido, telefono, correo)
                            VALUES ('$dni', '$name', '$lastname', '$phone', '$email');";
            mysqli_query($db, $save_customer);
            $answer = [
                "result" => true,
                "dni" => $dni,
                "name" => $name,
                "lastname" => $lastname,
                "phone" => $phone,
                "email" => $email
            ];
        } else {
            $row = mysqli_fetch_assoc($query_customer);
            $answer = [
                "result" => false,
                "dni" => $row["cedula"],
                "name" => $row["nombre"],
                "lastname" => $row["apellido"],
                "phone" => $row["telefono"],
                "email" => $row["correo"],
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function searchCustomer($dni)
{
    try {
        require connection();
        $sql = "SELECT * FROM clientes WHERE cedula = '$dni';";
        $query = mysqli_query($db, $sql);
        $row = mysqli_fetch_assoc($query);
        if ($query->num_rows > 0) { //Customer d'not exist
            $answer = [
                "result" => true,
                "dni" => $row["cedula"],
                "name" => $row["nombre"],
                "lastname" => $row["apellido"],
                "phone" => $row["telefono"],
                "email" => $row["correo"]
            ];
        } else {
            $answer = [
                "result" => false,
                "dni" => $dni,
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}

function deleteCustomer($dni)
{
    try {
        require connection();
        $sql_customer = "SELECT * FROM clientes WHERE cedula = '$dni';";
        $query_customer = mysqli_query($db, $sql_customer);

        if ($query_customer->num_rows > 0) { //Customer d'not exist
            $sql = "DELETE FROM clientes WHERE cedula = '$dni';";
            mysqli_query($db, $sql);
            $answer = [
                "result" => true,
                "dni" => $dni
            ];
        } else {
            $answer = [
                "result" => false,
                "dni" => $dni,
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function saveAppointment($dni, $date, $hour, $adviser)
{
    try {
        require connection();
        $sql = "SELECT fecha, hora FROM citas WHERE fecha = '$date' AND hora = '$hour';";
        $query = mysqli_query($db, $sql);

        if ($query->num_rows == 0) { //quotes d'not exist
            $save_quotes = "INSERT INTO citas (id_cliente, fecha, hora, asesor)
                            SELECT id_cliente, '$date', '$hour', '$adviser' FROM clientes WHERE cedula = '$dni';";
            mysqli_query($db, $save_quotes);
            $answer = [
                "result" => true,
                "dni" => $dni,
                "date" => $date,
                "hour" => $hour,
                "adviser" => $adviser,
            ];
        } else {
            $answer = [
                "result" => false
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function searchAppointment($dni)
{
    try {
        require connection();
        $sql = "SELECT cedula, nombre, apellido, telefono, correo, asesor, fecha, hora FROM clientes
            INNER JOIN citas ON clientes.id_cliente = citas.id_cliente WHERE cedula = '$dni';";
        $query = mysqli_query($db, $sql);
        if ($query->num_rows > 0) { //Customer d'not exist
            $sql_cust = "SELECT cedula, nombre, apellido, telefono, correo FROM clientes WHERE cedula = '$dni';";
            $query_cust = mysqli_query($db, $sql_cust);
            $row_cust = mysqli_fetch_assoc($query_cust);
            $ans = [
                "result" => true,
                "customer" => [
                    "dni" => $row_cust["cedula"],
                    "name" => $row_cust["nombre"],
                    "lastname" => $row_cust["apellido"],
                    "phone" => $row_cust["telefono"],
                    "email" => $row_cust["correo"],
                ],
            ];
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    "date" => $row["fecha"],
                    "hour" => $row["hora"],
                    "adviser" => $row["asesor"],
                ];
            };
            $answer = [
                "answer" => $ans,
                "data" => $data
            ];
        } else {
            $answer = [
                "answer" => [
                    "result" => false,
                ],
                "data" => [
                    "dni" => $dni,
                ]
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function deleteAppointment($dni, $date, $hour)
{
    try {
        require connection();
        $sql_id = "SELECT id_cliente FROM clientes WHERE cedula = '$dni';";
        $id = mysqli_query($db, $sql_id);
        if ($id->num_rows > 0) {
            $id = mysqli_fetch_array($id);
            $id = $id[0];
            $sql_v = "SELECT * FROM citas WHERE id_cliente = '$id' AND hora = '$hour' AND fecha = '$date';";
            $query_v = mysqli_query($db, $sql_v);
            if ($query_v->num_rows > 0) {
                $sql = "DELETE FROM citas WHERE id_cliente = '$id' AND hora = '$hour' AND fecha = '$date';";
                mysqli_query($db, $sql);
                $answer = [
                    "result" => true,
                    "date" => $date,
                    "hour" => $hour,
                ];
            } else {
                $answer = [
                    "result" => false,
                    "dni" => $dni
                ];
            }
        } else {
            $answer = [
                "result" => false,
                "dni" => $dni
            ];
        }
        return $answer;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
function filterDates($dateIn, $dateEnd)
{
    try {
        require connection();
        $sql = "SELECT fecha FROM citas WHERE fecha BETWEEN '$dateIn' AND '$dateEnd'
        ORDER BY fecha;";
        $query = mysqli_query($db, $sql);
        if ($query->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $q[] = $row["fecha"];
            };
            $date = array_count_values($q);
            foreach ($date as $key => $value) {
                $sql_date = "SELECT hora FROM citas WHERE fecha = '$key' ORDER BY hora;";
                $query_date = mysqli_query($db, $sql_date);
                $hours = array();
                while ($row = mysqli_fetch_assoc($query_date)) {
                    $hours[] = $row;
                }
                $dates[] = [
                    $key => $hours
                ];
            }
            $data = [
                "result" => true,
                "filter" => $dates
            ];
        } else {
            $data = [
                "result" => false,
                "msg" => "No hay citas en estas fechas"
            ];
        };
        return $data;
    } catch (\Throwable $th) {
        var_dump($th);
    }
}
////////////////////////////////// FUNCTIONS /////////////////////////////////////////
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["btn"])) {
        $btn = $_POST["btn"];
        switch ($_POST["btn"]) {
            case "saveSch":
                $hora = $_POST["hora"];
                $saveSch = saveSchedules($hora);
                json($saveSch);
                break;
            case "deleteSch":
                $hora = $_POST["hora"];
                $deleteSch = deleteSchedules($hora);
                json($deleteSch);
                break;
            case "saveCust":
                $dni = $_POST["dni"];
                $name = $_POST["name"];
                $lastname = $_POST["lastname"];
                $phone = $_POST["phone"];
                $email = $_POST["email"];
                $save = saveCustomer($dni, $name, $lastname, $phone, $email);
                json($save);
                break;
            case "searchCust":
                $dni = $_POST["dni"];
                $search = searchCustomer($dni);
                json($search);
                break;
            case "deleteCust":
                $dni = $_POST["dni"];
                $delete = deleteCustomer($dni);
                json($delete);
                break;
            case "saveAppo":
                $dni = $_POST["dni"];
                $date = $_POST["date"];
                $hour = $_POST["hour"];
                $adviser = $_POST["adviser"];
                $save = saveAppointment($dni, $date, $hour, $adviser);
                json($save);
                break;
            case "searchAppo":
                $dni = $_POST["dni"];
                $search = searchAppointment($dni);
                json($search);
                break;
            case "deleteAppo":
                $dni = $_POST["dni"];
                $date = $_POST["date"];
                $hour = $_POST["hour"];
                $search = deleteAppointment($dni, $date, $hour);
                json($search);
                break;
            case "search":
                $dateIn = $_POST["dateIn"];
                $dateEnd = $_POST["dateEnd"];
                $filterDate = filterDates($dateIn, $dateEnd);
                json($filterDate);
                break;
        }
    }
    if (isset($_POST["searchDate"])) {
        $date = $_POST["date"];
        $hrjs = [
            'noActive' => getHours($date)
        ];
        json($hrjs);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $js = [
        'Schedule' => getSchedule(),
    ];
    json($js);
}
