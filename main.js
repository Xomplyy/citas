fecthHours();
        document.querySelectorAll('.button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                let btnName = this.name;
                // console.log(btnName);
                if (btnName == "schedules" || btnName == "customer" || btnName == "appointment") {
                    displayForms(btnName);
                    document.querySelector("#schedule").value = "";
                    document.querySelector("#hour").value = "";
                } else if (btnName == "saveSch" || btnName == "deleteSch") {
                    schedules(btnName);
                    fecthHours();
                    document.querySelector("#schedule").focus();
                } else if (btnName == "deleteCust" || btnName == "saveCust" || btnName == "searchCust") {
                    customer(btnName);
                } else if (btnName == "deleteAppo" || btnName == "saveAppo" || btnName == "searchAppo") {
                    appointments(btnName);
                } else {
                    search(btnName);
                };
            });
        });
        document.querySelector("#dateIn").addEventListener('input', function (e) {
            if (e.target !== "") {
                let date = document.querySelector("#dateIn").value;
                activeHours(date);
            }
        });
        function activeHours(date) {
            let searchDate = 1;
            let btn = 0;
            $.ajax({
                url: 'includes/functions.php',
                type: 'POST',
                data: { date, searchDate, btn },
                success: function (response) {
                    let hours = JSON.parse(response)
                    if (hours !== 0) {
                        $('.hours').removeClass('hrs_notActive');
                        $('.hours').addClass('hrs_active');
                        hours = hours["noActive"];
                        hours.forEach(hour => {
                            document.querySelectorAll('.hours').forEach(function (event) {
                                $hr = hour["hour"];
                                let e = event.querySelector('div').parentElement;
                                if ($hr == event.innerText) {
                                    $(e).removeClass('hrs_active');
                                    $(e).addClass('hrs_notActive');
                                }
                            });
                        })
                    }
                }
            });
        }
        function search(btnName) {
            let dateIni = document.getElementById("dateIn").name;
            let dateEnd = document.getElementById("dateEnd").name;
            if (document.getElementById("dateIn").value == "") {
                alertEmpty(dateIni);
                return;
            } else if (document.getElementById("dateEnd").value == "") {
                alertEmpty(dateEnd);
                return;
            }
            //// AJAX PARA COSULTA //////  
        }
        function appointments(btnName) {
            let dni = document.getElementById("dniAppo").name;
            let date = document.getElementById("date").name;
            let hour = document.getElementById("hour").name;
            let adviser = document.getElementById("adviser").name;
            if (btnName == "searchAppo") {
                if (document.getElementById("dniAppo").value == "") {
                    alertEmpty(dni);
                    return;
                }else{
                    searchAppointment(btnName);
                };
            }else if(btnName == "deleteAppo"){
                if (document.getElementById("dniAppo").value == "") {
                    alertEmpty(dni);
                    return;
                } else if (document.getElementById("date").value == "") {
                    alertEmpty(date);
                    return;
                } else if (document.getElementById("hour").value == "") {
                    alertEmpty(hour);
                    return;
                }else{
                    deleteAppointment(btnName);
                };
            }else {
                if (document.getElementById("dniAppo").value == "") {
                    alertEmpty(dni);
                    return;
                } else if (document.getElementById("date").value == "") {
                    alertEmpty(date);
                    return;
                } else if (document.getElementById("hour").value == "") {
                    alertEmpty(hour);
                    return;
                } else if (document.getElementById("adviser").value == "") {
                    alertEmpty(adviser);
                    return;
                }else{
                    saveAppointment(btnName);
                }
            }
            document.getElementById("dniAppo").value = "";
            document.getElementById("date").value = "";
            document.getElementById("hour").value = "";
            document.getElementById("adviser").value = "";
        };
        function deleteAppointment(btnName){
            let dni = document.getElementById("dniAppo").value;
            let date = document.getElementById("date").value;
            let hour = document.getElementById("hour").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                    "date": date,
                    "hour": hour
                },
                success: function (response) {
                    let delet = JSON.parse(response);
                    let result = delet["result"];
                    let template = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>La cita del ${delet["date"]}, ${delet["hour"]} se elimino con exito</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>El número de cedula ${delet["dni"]} no tiene citas asignadas</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
        function saveAppointment(btnName){
            let dni = document.getElementById("dniAppo").value;
            let date = document.getElementById("date").value;
            let hour = document.getElementById("hour").value;
            let adviser = document.getElementById("adviser").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                    "date": date,
                    "hour": hour,
                    "adviser": adviser,
                },
                success: function (response) {
                    let save = JSON.parse(response);
                    let result = save["result"];
                    console.log(result);
                    let template = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Registro Exitoso</h2>
                                            <p>Cédula: ${save["dni"]}</p>
                                            <p>Fecha: ${save["date"]}</p>
                                            <p>Hora: ${save["hour"]}</p>
                                            <p>Asesor: ${save["adviser"]}</p>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Esta cita ya esta asignada a otro cliente</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
        function searchAppointment(btnName){
            let dni = document.getElementById("dniAppo").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                },
                success: function (response) {
                    let search = JSON.parse(response);
                    console.log(search);
                    let answer = search["answer"];
                    let result = answer["result"];
                    let data = search["data"];

                    console.log(data);
                    let template = "";
                    let tempHours = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Cliente</h2>
                                            <p>Cédula: ${answer["customer"]["dni"]}</p>
                                            <p>Nombre: ${answer["customer"]["name"]}</p>
                                            <p>Apellido: ${answer["customer"]["lastname"]}</p>
                                            <p>Telefono: ${answer["customer"]["phone"]}</p>
                                            <p>Correo: ${answer["customer"]["email"]}</p>
                                        </div>
                                        <div class="appos">
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                        cont = 0;
                        data.forEach(e=>{
                            tempHours += `
                                <div class="appo">
                                    <p>Fecha: ${data[cont]["date"]}</p>
                                    <p>Hora: ${data[cont]["hour"]}</p>                                                
                                    <p>Asesor: ${data[cont]["adviser"]}</p>
                                </div>
                            `
                            cont++;
                        });
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>El número de cedula ${data["dni"]} no tiene citas asignadas</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.appos').html(tempHours);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
        function customer(btnName) {
            let dni = document.getElementById("dniCust").name;
            let name = document.getElementById("name").name;
            let lastname = document.getElementById("lastname").name;
            let phone = document.getElementById("phone").name;
            let email = document.getElementById("email").name;
            if (btnName == "searchCust" || btnName == "deleteCust") {
                if (document.getElementById("dniCust").value == "") {
                    alertEmpty(dni);
                    return;
                }else{
                    if (btnName == "searchCust"){
                        searchCustomer(btnName);
                    }else {
                        deleteCustomer(btnName);
                    }
                }
            } else {
                if (document.getElementById("dniCust").value == "") {
                    alertEmpty(dni);
                    return;
                } else if (document.getElementById("name").value == "") {
                    alertEmpty(name);
                    return;
                } else if (document.getElementById("lastname").value == "") {
                    alertEmpty(lastname);
                    return;
                } else if (document.getElementById("phone").value == "") {
                    alertEmpty(phone);
                    return;
                } else if (document.getElementById("email").value == "") {
                    alertEmpty(email);
                    return;
                } else {
                    saveCustomer(btnName);
                };
            }
            document.getElementById("dniCust").value = "";
            document.getElementById("name").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
        }
        function deleteCustomer(btnName){
            let dni = document.getElementById("dniCust").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                },
                success: function (response) {
                    let save = JSON.parse(response);
                    let result = save["result"];
                    console.log(result);
                    let template = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>El número de cedula ${save["dni"]} se elimino con exito</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>El número de cedula ${save["dni"]} no esta registrado</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
        function saveCustomer(btnName){
            let dni = document.getElementById("dniCust").value;
            let name = document.getElementById("name").value;
            let lastname = document.getElementById("lastname").value;
            let phone = document.getElementById("phone").value;
            let email = document.getElementById("email").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                    "name": name,
                    "lastname": lastname,
                    "phone": phone,
                    "email": email,
                },
                success: function (response) {
                    let save = JSON.parse(response);
                    let result = save["result"];
                    console.log(result);
                    let template = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Registro Exitoso</h2>
                                            <p>Cédula: ${save["dni"]}</p>
                                            <p>Nombre: ${save["name"]}</p>
                                            <p>Apellido: ${save["lastname"]}</p>
                                            <p>Telefono: ${save["phone"]}</p>
                                            <p>Correo: ${save["email"]}</p>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Cliente Ya Existe</h2>
                                            <p>Cédula: ${save["dni"]}</p>
                                            <p>Nombre: ${save["name"]}</p>
                                            <p>Apellido: ${save["lastname"]}</p>
                                            <p>Telefono: ${save["phone"]}</p>
                                            <p>Correo: ${save["email"]}</p>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
        function searchCustomer(btnName){
            let dni = document.getElementById("dniCust").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dni": dni,
                },
                success: function (response) {
                    let save = JSON.parse(response);
                    let result = save["result"];
                    console.log(result);
                    let template = "";
                    if (result) {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>Cliente Registrado</h2>
                                            <p>Cédula: ${save["dni"]}</p>
                                            <p>Nombre: ${save["name"]}</p>
                                            <p>Apellido: ${save["lastname"]}</p>
                                            <p>Telefono: ${save["phone"]}</p>
                                            <p>Correo: ${save["email"]}</p>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/cheque.png" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    } else {
                        template = `
                            <div class="back_layer">
                                <div class="message">
                                    <div class="msg_info">
                                        <div class="close_msg">
                                            <img src="img/close.ico" alt="icono cerrar"></label>
                                        </div>
                                        <div class="msg_info_cust">
                                            <h2>El número de cedula ${save["dni"]} no esta registrado</h2>
                                        </div>
                                        <div class="msg_accepted">
                                            <img src="img/close.ico" alt="incono de aceptado">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    $('.main').after(template);
                    $('.close_msg').on('click', function () {
                        $('.back_layer').remove();
                    });
                }
            });
        }
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
            let time = document.getElementById("schedule").value;
            let date = document.querySelector("#dateIn").value;
            if (time == "" || time == "00:00") {
                alertEmpty(document.getElementById("schedule").name);
            } else {
                time = {
                    "hora": time,
                    "btn": btnName,
                };
                $.ajax({
                    url: 'includes/functions.php',
                    type: 'POST',
                    data: time,
                    success: function (response) {
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
                        if (date !== "") {
                            activeHours(date);
                        }
                    }
                });
            };
            document.querySelector("#schedule").value = "";
        };
        function fecthHours() {
            $.ajax({
                url: 'includes/functions.php',
                type: 'GET',
                success: function (response) {
                    let hours = JSON.parse(response)["Schedule"];
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
        function selectHour(hour) {
            document.querySelector("#schedule").value = hour;
            document.querySelector("#hour").value = hour;
        };
        function alertEmpty(input) {
            $.ajax({
                success: function () {
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
                    let empty = `
                        <div class="empty"></div>
                    `
                    switch (input) {
                        ///////// FORM SCHEDULE ///////////
                        case "schedule":
                            $('#schedule').after(empty);
                            break;
                        ///////// FORM CUSTOMER ///////////
                        case "dniCust":
                            $('#dniCust').after(empty);
                            break;
                        case "name":
                            $('#name').after(empty);
                            break;
                        case "lastname":
                            $('#lastname').after(empty);
                            break;
                        case "phone":
                            $('#phone').after(empty);
                            break;
                        case "email":
                            $('#email').after(empty);
                            break;
                        //////// FORM APPOINTMENTS /////////
                        case "dniAppo":
                            $('#dniAppo').after(empty);
                            break;
                        case "date":
                            $('#date').after(empty);
                            break;
                        case "hour":
                            $('#hour').after(empty);
                            break;
                        case "adviser":
                            $('#adviser').after(empty);
                            break;
                        //////// BUTTON SEARCH /////////
                        case "dateIn":
                            $('#dateIn').after(empty);
                            break;
                        case "dateEnd":
                            $('#dateEnd').after(empty);
                            break;
                    };
                    $('.empty').html(template);
                    $('.empty').css('width', '0');
                    $('.empty').css('height', '0');
                    $(document).on('click', function () {
                        if (!(this.id == "empty")) {
                            $('.alert').remove();
                            $('.empty').remove();
                        }
                    });
                }
            });
        };