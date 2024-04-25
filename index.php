<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/calendar.ico" type="image/x-icon">
    <title>Citas</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
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
                <button class="button btn_nav btn_search" type="button" title="Buscar" name="search" id="btn_search"><img src="img/search.png" alt="icono buscar"></button>
            </div>
        </div>
        <div class="btn_header">
            <button class="button btn_nav" type="button" title="Horario" name="schedules" id="btn_schedules"><img src="img/appointement_management.png" alt="icono horarios"></button>
            <button class="button btn_nav" type="button" title="Clientes" name="customer" id="btn_customer"><img src="img/add__customer.png" alt="icono clientes" for="btn_customer"></button>
            <button class="button btn_nav" type="button" title="Citas" name="appointment" id="btn_appointment"><img src="img/appointments.png" alt="icono citas"></button>
        </div>
    </header>
    <main class="main">
        <div class="appointments">
            <div class="cont_appo">

                <!-- <div class="hours hrs_active">
                    <div>
                        <p>09:00</p>
                    </div>
                </div>
                <div class="hours hrs_active">
                    <div>
                        <p>10:00</p>
                    </div>
                </div> -->

            </div>
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
                    <button class="button btn" name="delete" id="btn_delete"><img src="img/delete_1.png" alt="icono eliminar"></button>
                    <button class="button btn" name="save" id="btn_save"><img src="img/save_1.png" alt="icono guardar"></button>
                    <button class="button btn btn_search" name="searchAppo" id="btn_searchAppo"><img src="img/search_1.png" alt="icono buscar"></button>
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
                    <button class="button btn" name="deleteCust" id="btn_deleteCust"><img src="img/delete_1.png" alt="icono eliminar"></button>
                    <button class="button btn" name="saveCust" id="btn_saveCust"><img src="img/save_1.png" alt="icono guardar"></button>
                    <button class="button btn btn_search" name="searchCust" id="btn_searchCust"><img src="img/search_1.png" alt="icono buscar"></button>
                </div>
            </div>
            <div class="form_schedules form">
                <h2>Horario</h2>
                <div class="cont_form">
                    <div class="row_schedules">
                        <div>
                            <label for="">Hora</label>
                            <input type="time" name="schedule" id="lschedule">
                            <div id="empty"></div>
                        </div>
                        <div class="buttons">
                            <button class="button btn" name="deleteSch" id="btn_deleteSch"><img src="img/delete_1.png" alt="icono eliminar" name="imgdeleteSch"></button>
                            <button class="button btn" name="saveSch" id="btn_saveSch"><img src="img/save_1.png" alt="icono guardar" name="imgbtn_saveSch"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script>
        fecthHours();
        document.querySelectorAll('.button').forEach(function(btn) {
            btn.addEventListener('click', function() {
                let btnName = this.name;
                if (btnName == "schedules" || btnName == "customer" || btnName == "appointment") {
                    displayForms(btnName);
                } else if (btnName == "saveSch" || btnName == "deleteSch") {
                    schedules(btnName);
                    fecthHours();
                    document.querySelector("#lschedule").value = "";
                    document.querySelector("#lschedule").focus();

                };
            });
        });
       
        function displayForms(btn) {
            let schedules = document.querySelector(".form_schedules");
            let customer = document.querySelector(".form_customer");
            let appointments = document.querySelector(".form_appointments");
            switch (btn) {
                case "schedules":
                    schedules.style.display = 'flex';
                    customer.style.display = 'none';
                    appointments.style.display = 'none';
                    break;
                case "customer":
                    customer.style.display = 'flex';
                    schedules.style.display = 'none';
                    appointments.style.display = 'none';
                    break;
                case "appointment":
                    appointments.style.display = 'flex';
                    schedules.style.display = 'none';
                    customer.style.display = 'none';
                    break;
            };
        };
        function schedules(btnName) {
            let time = document.getElementById("lschedule").value;
            if (time == "" || time == "00:00"){
                alertEmpty(btnName);
            } else {
                time = {
                    "hora": time,
                    "btn": btnName,
                };
                $.ajax({
                    url: 'includes/functions.php',
                    type: 'POST',
                    data: time,
                    success: function(response) {
                        if (response) {
                            if (btnName == "saveSch") {
                                console.log("Se guardo con exito");
                                fecthHours();
                            } else {
                                console.log("Se elimino con exito");
                                fecthHours();
                            };
                        } else {
                            if (btnName == "saveSch") {
                                console.log("No se guardo con exito");
                            } else {
                                console.log("No se elimino con exito");
                            };
                        };
                    },
                });
            };
        };
        function fecthHours() {
            $.ajax({
                url: 'includes/functions.php',
                type: 'GET',
                success: function(response) {
                    let hours = JSON.parse(response);
                    let template = "";
                    hours.forEach(row => {
                        let appo = row["hour"];
                        template += `
                        <div class="hours hrs_active" onclick="selectHour('${row["hour"]}')">
                            <div>
                                <p>${row["hour"]}</p>
                            </div>
                        </div>
                            
                        `
                    });
                    $('.cont_appo').html(template);
                }
            });
        };
        function selectHour(hour){
            document.querySelector("#lschedule").value = hour;
            console.log("click");
        }
        function alertEmpty() {
            $.ajax({
                success: function() {
                    let template = `
                        <div class="alert" name="alert">
                            <div class="icoAlert">
                                <img src="img/alert.png" alt="">
                            </div>
                            <div class="paragraph">
                                <p>Completa este campo</p>
                            </div>
                        </div>    
                        `
                    $('#empty').html(template);
                    $(document).on('click', function(){
                        if(!(this.id == "empty")){
                            $('.alert').remove();
                        }
                    });
                }
            });
        };
    </script>
</body>

</html>