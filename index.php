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
                <button class="button btn_nav btn_search" type="button" title="Buscar"><img src="img/search.png" alt="icono buscar"></button>
            </div>
        </div>
        <div class="btn_header">
            <button class="button btn_nav" type="button" title="Horario"><img src="img/appointement_management.png" alt="icono horarios"></button>
            <button class="button btn_nav" type="button" title="Clientes"><img src="img/add__customer.png" alt="icono clientes"></button>
            <button class="button btn_nav" type="button" title="Citas"><img src="img/appointments.png" alt="icono citas"></button>
        </div>
    </header>
    <main class="main">
        <div class="appointments">
        </div>
        <div class="forms">
            <div class="form_appointments form">
                <h2>Citas</h2>
                <div class="cont_form">
                    <div class="rows">
                        <div>
                            <label for="ldni">Cedula</label>
                            <input type="number" name="dni" id="ldni">
                        </div>
                    </div>
                    <div class="rows">
                        <div>
                            <label for="ldate">Fecha</label>
                            <input type="date" name="date" id="ldate">
                        </div>
                    </div>
                    <div class="rows">
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
                    </div>
                </div>
                <div class="rows buttons">
                    <button class="button btn"><img src="img/delete_1.png" alt="icono eliminar"></button>
                    <button class="button btn"><img src="img/save_1.png" alt="icono guardar"></button>
                    <button class="button btn btn_search"><img src="img/search_1.png" alt="icono buscar"></button>
                </div>
            </div>
            <div class="form_customer form">
                <h2>Cliente</h2>
                <div class="cont_form">
                    <div class="rows">
                        <div>
                            <label for="ldni">Cedula</label>
                            <input type="number" name="dni" id="ldni">
                        </div>
                    </div>
                    <div class="rows">
                        <div>
                            <label for="">Nombre</label>
                            <input type="text" name="" id="">
                        </div>
                    </div>
                    <div class="rows">
                        <div>
                            <label for="">Apellido</label>
                            <input type="text" name="" id="">
                        </div>
                    </div>
                    <div class="rows">
                        <div>
                            <label for="">Telefono</label>
                            <input type="text" name="" id="">
                        </div>
                    </div>
                    <div class="rows">
                        <div>
                            <label for="">Correo</label>
                            <input type="text" name="" id="">
                        </div>
                    </div>
                </div>
                <div class="rows buttons">
                    <button class="button btn"><img src="img/delete_1.png" alt="icono eliminar"></button>
                    <button class="button btn"><img src="img/save_1.png" alt="icono guardar"></button>
                    <button class="button btn btn_search"><img src="img/search_1.png" alt="icono buscar"></button>
                </div>
            </div>
            <div class="availability form">
                <h2>Cliente</h2>
                <div class="cont_form">
                    <div class="row_availability">
                        <div>
                            <label for="">Hora</label>
                            <input type="time" name="" id="">
                        </div>
                        <div class="buttons">
                            <button class="button btn"><img src="img/delete_1.png" alt="icono eliminar"></button>
                            <button class="button btn"><img src="img/save_1.png" alt="icono guardar"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>