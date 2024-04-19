<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/calendar.ico" type="image/x-icon">
    <title>Citas</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="jquery.min.js"></script>
</head>

<body>
    <header class="header">
        <div class="date_header">
            <div>
                <label for="ldateIn">Fecha Inicio</label>
                <input type="date" name="dateIn" id="ldateIn">
            </div>
            <div>
                <label for="ldateEnd">Fecha Inicio</label>
                <input type="date" name="dateEnd" id="ldateEnd">
            </div>
            <div>
                <button type="button">Buscar</button>
            </div>
        </div>
        <div class="btn_header">
            <button type="button">Disponibilidad</button>
            <button type="button">Cliente</button>
            <button type="button">Citas</button>
        </div>
    </header>
    <main>
        <div class="forms">
            <div>
                <div class="form_appointments form">
                    <h2>Citas</h2>
                    <div class="cont_form">
                        <div class="rows">
                            <div>
                                <label for="ldni_appo">Cedula</label>
                                <input type="number" name="dni_appo" id="ldni_appo">
                            </div>
                            <div>
                                <label for="lhour">Hora</label>
                                <input type="time" name="hour" id="lhour">
                            </div>
                        </div>
                        <div class="rows">
                            <div>
                                <label for="ladviser">Asesor</label>
                                <input type="text" name="adviser" id="ladviser">
                            </div>
                            <div>
                                <label for="">Fecha</label>
                                <input type="date" name="date" id="lhour">
                            </div>
                        </div>
                        <div class="rows buttons">
                            <button><img src="img/delete.png" alt="icono eliminar"></button>
                            <button><img src="img/save.png" alt="icono "></button>
                            <button><img src="img/search.png" alt=""></button>
                        </div>
                    </div>
                </div>
                <div class="form_customer form">
                    <h2>Cliente</h2>
                    <div class="cont_form">
                        <div class="rows">
                            <div>
                                <label for="">Nombre</label>
                                <input type="text" name="" id="">
                            </div>
                            <div>
                                <label for="">Apellido</label>
                                <input type="text" name="" id="">
                            </div>
                        </div>
                        <div class="rows">
                            <div>
                                <label for="">Correo</label>
                                <input type="text" name="" id="">
                            </div>
                            <div>
                                <label for="">Telefono</label>
                                <input type="text" name="" id="">
                            </div>
                        </div>
                        <div class="rows buttons">
                            <button><img src="img/delete.png" alt="icono eliminar"></button>
                            <button><img src="img/save.png" alt="icono "></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>