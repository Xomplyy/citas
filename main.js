// Get schedule
fetchHours();

// Temporary window for a  quick message
function toast(type, body) {
    let title = "";
    // message title and message type, whether it was successful or an error.
    if (type == 1) {
        title = `Proceso Exitoso`
        alert = `success` 
    } else {
        title = `Proceso Fallido`
        alert = `danger`
    }
    // template of the message
    let msg = `
        <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0; border-radius:20px;">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="6000">
                <div class="toast-header">
                    <strong class="rounded px-3 py-2 alert-${alert}">¡${title}!</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true"><i class="bi bi-x"></i></span>
                    </button>
                </div>
                <div class="toast-body">
                    ${body}
                </div>
            </div>
        </div>
    `
    // Print the template and active the message
    $('main').after(msg);
    $('.toast').toast('show');
    setTimeout(e => { $('.position-fixed').remove() }, 6000);
}
// Modal window for printing information about the customer and his appointments
function modal(success, body) {
    let alert = "";
    let title = "";
    if (success == 1) {
        alert += `
            <div class="alert alert-success" role="alert">
        `
        title += "Proceso Exitoso";
    } else {
        alert += `
            <div class="alert alert-danger" role="alert">
        `
        title += "Proceso Fallido";
    }
    let template = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <div class="close_msg">
                                <img src="img/close.ico" alt="icono cerrar"></label>
                            </div>
                        </button>
                        ${alert}
                            ¡${title}!
                        </div>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                </div>
            </div>
        </div>
    `
    //Delete modal window if it exist
    if ($('.modal')) {
        $('.modal').remove();
    }
    $('main').after(template);
    //activate button for show modal window
    document.querySelector('.btn-modal').click();
}
//Show the form according to the button. In the devices smalls
document.querySelectorAll('.dropdown-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        let btnName = this.name;
        if (btnName == "schedules" || btnName == "customer" || btnName == "appointment") {
            displayForms(btnName);
            document.querySelector("#schedule").value = "";
            document.querySelector("#hour").value = "";
            //if of date filter is active, this is removed to have schedules
            document.querySelector('.search_appos')?.remove();
            fetchHours();
        }
    });
});
// Lisent all button for make the actiones neccesary
document.querySelectorAll('.button').forEach(function (btn) {
    btn.addEventListener('click', function () {
        let btnName = this.name;
        if (btnName == "schedules" || btnName == "customer" || btnName == "appointment") {
            displayForms(btnName);
            document.querySelector("#schedule").value = "";
            document.querySelector("#hour").value = "";
            //if of date filter is active, this is removed to have schedules
            document.querySelector('.search_appos')?.remove();
            fetchHours();
        } else if (btnName == "saveSch" || btnName == "deleteSch") {
            schedules(btnName);
            fetchHours();
            callActiveHours();
            document.querySelector("#schedule").focus();
        } else if (btnName == "deleteCust" || btnName == "saveCust" || btnName == "searchCust") {
            customer(btnName);
            callActiveHours();
        } else if (btnName == "deleteAppo" || btnName == "saveAppo" || btnName == "searchAppo") {
            appointments(btnName);
            callActiveHours();
        } else {
            search(btnName);
        };
    });
});
// function to call other function and thus obtain the available hours
function callActiveHours() {
    let date = document.querySelector("#dateIn").value;
    if (date !== "") {
        activeHours(date);
    }
}
//See all the changes to input of date and show available hours
document.getElementById("dateIn").addEventListener('input', function (e) {
    if (e.target !== "") {
        callActiveHours();
    }
});
// It will change the style of the hours that are busy.
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
                        let active = event.querySelector('div').parentElement;
                        if ($hr == event.innerText) {
                            $(active).removeClass('hrs_active');
                            $(active).addClass('hrs_notActive');
                        }
                    });
                })
            }
        }
    });
}
// Search appointments in the range between two dates
function search(btnName) {
    let dateIni = document.querySelector(".dateIn").name;
    let dateEnd = document.querySelector(".dateEnd").name;
    if (document.getElementById("dateIn").value == "") {
        alertEmpty(dateIni);
        return;
    } else if (document.getElementById("dateEnd").value == "") {
        alertEmpty(dateEnd);
        return;
    } else {
        let dIn = new Date(document.getElementById("dateIn").value + 'UTC-05:00');
        let dEnd = new Date(document.getElementById("dateEnd").value + 'UTC-05:00');
        dIn.setHours(0, 0, 0, 0);
        dEnd.setHours(0, 0, 0, 0);
        if (dIn > dEnd) {
            let msg = "La fecha inicial debe ser igual o mayor de la fecha final";
            toast(0, msg);
        } else {
            let dateIni = document.getElementById("dateIn").value;
            let dateEnd = document.getElementById("dateEnd").value;
            $.ajax({
                url: "includes/functions.php",
                type: "POST",
                data: {
                    "btn": btnName,
                    "dateIn": dateIni,
                    "dateEnd": dateEnd
                },
                success: function (response) {
                    let search = JSON.parse(response);
                    let result = search["result"];
                    if (result) {
                        // Template to print all the appointments
                        let template = "";
                        search["filter"].forEach(e => {
                            cont = 0;
                            let array = Object.values(e);
                            let key = Object.keys(e).toString();
                            template += `
                            <div>
                                <h3> Fecha: ${key}</h3>
                                <div class="search_appo">
                        `
                            array[0].forEach(e => {
                                let hour = array[0][cont].hora;
                                hour = hour.substring(0, 5);
                                template += `
                                <div>
                                    Hora: ${hour}
                                </div>
                            `
                                cont++;
                            })
                            template += `
                                </div>
                            </div>
                        `
                        })
                        $('.cont_appo').addClass('search_appos')
                        $('.cont_appo').removeClass('cont_appo')
                        $('.search_appos').html(template)
                    }else{
                        toast(0,search["msg"]);
                    }
                }
            });
        }
    }
    document.getElementById("dateIn").value = "";
    document.getElementById("dateEnd").value = "";
}
// Functions for save, delete and search appointments
function appointments(btnName) {
    let dni = document.getElementById("dniAppo").name;
    let date = document.getElementById("date").name;
    let hour = document.getElementById("hour").name;
    let adviser = document.getElementById("adviser").name;
    //Search Appointments
    if (btnName == "searchAppo") {
        if (document.getElementById("dniAppo").value == "") {
            alertEmpty(dni);
            return;
        } else {
            let dni = document.querySelector('#dniAppo').value;
            if (dni.length > 6 && dni.length <= 12) {
                searchAppointment(btnName);
            } else {
                //Message of size uncorrect
                let msg = `"Cedula" debe tener entre 7 y 12 caracteres`;
                toast(0, msg);
            }
        };
    // Delete Appointments
    } else if (btnName == "deleteAppo") {
        if (document.getElementById("dniAppo").value == "") {
            alertEmpty(dni);
            return;
        } else if (document.getElementById("date").value == "") {
            alertEmpty(date);
            return;
        } else if (document.getElementById("hour").value == "") {
            alertEmpty(hour);
            return;
        } else {
            let dni = document.querySelector('#dniAppo').value;
            if (dni.length > 6 && dni.length <= 12) {
                deleteAppointment(btnName);
            } else {
                //MENSAJE DE TAMAÑO INVALIDO
                let msg = `"Cedula" debe tener entre 7 y 12 caracteres`;
                toast(0, msg);
            }
        };
    // Save Appointments
    } else {
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
        } else {
            let dni = document.querySelector('#dniAppo').value;
            if (dni.length > 6 && dni.length <= 12) {
                let date = new Date(document.getElementById("date").value + 'UTC-05:00');
                date.setHours(0, 0, 0, 0);
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) {
                    let msg = "La fecha es incorrecta";
                    toast(0, msg);
                } else {
                    saveAppointment(btnName);
                    //Reset inputs
                    document.getElementById("dniAppo").value = "";
                    document.getElementById("date").value = "";
                    document.getElementById("hour").value = "";
                    document.getElementById("adviser").value = "";
                }
            } else {
                let msg = `"Cedula" debe tener entre 7 y 12 caracteres`;
                toast(0, msg);
            }
        }
    }
};
function deleteAppointment(btnName) {
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
                    La cita del ${delet["date"]} a las ${delet["hour"]} se elimino           
                `
                toast(1, template);
            } else {
                template = `
                    El número de cedula ${delet["dni"]} no tiene citas asignadas
                `
                toast(0, template);
            }
        }
    });
}
function saveAppointment(btnName) {
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
            let template = "";
            if (result) {
                template = `
                    <p><strong>Cédula:</strong> ${save["dni"]}</p>
                    <p><strong>Fecha:</strong> ${save["date"]}</p>
                    <p><strong>Hora:</strong> ${save["hour"]}</p>
                    <p><strong>Asesor:</strong> ${save["adviser"]}</p>
                `
                modal(1, template);
            } else {
                template = `        
                    Esta cita ya esta asignada a otro cliente
                `
                toast(0, template);
            }
        }
    });
    fetchHours();
}
function searchAppointment(btnName) {
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
            let answer = search["answer"];
            let result = answer["result"];
            let data = search["data"];

            let template = "";
            let tempHours = "";
            if (result) {
                template = `                        
                    <p><strong>Cédula:</strong> ${answer["customer"]["dni"]}</p>
                    <p><strong>Nombre:</strong> ${answer["customer"]["name"]}</p>
                    <p><strong>Apellido:</strong> ${answer["customer"]["lastname"]}</p>
                    <p><strong>Telefono:</strong> ${answer["customer"]["phone"]}</p>
                    <p><strong>Correo:</strong> ${answer["customer"]["email"]}</p>
                `
                cont = 0;
                data.forEach(e => {
                    tempHours += `
                        <div class="appo">
                            <p><strong>Fecha:</strong> ${data[cont]["date"]}</p>
                            <p><strong>Hora:</strong> ${data[cont]["hour"]}</p>                                                
                            <p><strong>Asesor:</strong> ${data[cont]["adviser"]}</p>
                        </div>
                    `
                    cont++;
                });
                template += tempHours;
                modal(1, template);
            } else {
                template = `
                    El número de cedula ${data["dni"]} no tiene citas asignadas.
                `
                toast(0, template);
            }
        }
    });
}
// Functions for save, delete and search customers
function customer(btnName) {
    let dni = document.getElementById("dniCust").name;
    let name = document.getElementById("name").name;
    let lastname = document.getElementById("lastname").name;
    let phone = document.getElementById("phone").name;
    let email = document.getElementById("email").name;
    //Search and delete Customer
    if (btnName == "searchCust" || btnName == "deleteCust") {
        if (document.getElementById("dniCust").value == "") {
            alertEmpty(dni);
            return;
        } else {
            let dni = document.querySelector('#dniCust').value;
            //Validate size of date input
            if (dni.length > 6 && dni.length <= 12) {
                if (btnName == "searchCust") {
                    searchCustomer(btnName);
                } else {
                    deleteCustomer(btnName);
                }
            } else {
                let msg = `"Cedula" debe tener entre 7 y 12 caracteres`;
                toast(0, msg);
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
            let dni = document.querySelector('#dniCust').value;
            //Validate size of date input
            if (dni.length > 6 && dni.length <= 12) {
                let phone = document.querySelector('#phone').value;
                //Validate size of phone input
                if (phone.length == 10) {
                    let email = document.querySelector('#email').value;
                    //Validate expression of email input
                    if(validateEmail(email)){
                        saveCustomer(btnName);
                        //Reset inputs
                        document.getElementById("dniCust").value = "";
                        document.getElementById("name").value = "";
                        document.getElementById("lastname").value = "";
                        document.getElementById("phone").value = "";
                        document.getElementById("email").value = "";
                    }else{
                        let msg = `Revisa el formato de "correo". "@" o "."`;
                        toast(0, msg);
                    }
                } else {
                    let msg = `"Telefono" debe tener 10 caracteres`;
                    toast(0, msg);
                }
            } else {
                let msg = `"Cedula" debe tener entre 7 y 12 caracteres`;
                toast(0, msg);
            }
        };
    }
}
function deleteCustomer(btnName) {
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
            let template = "";
            if (result) {
                template = `       
                    El número de cedula ${save["dni"]} se elimino con exito.
                `
                toast(1, template)
            } else {
                template = `
                    El número de cedula ${save["dni"]} no esta registrado.
                `
                toast(0, template)
            }
        }
    });
}
function saveCustomer(btnName) {
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
            let template = "";
            if (result) {
                template = `    
                    <p><strong>Cédula:</strong> ${save["dni"]}</p>
                    <p><strong>Nombre:</strong> ${save["name"]}</p>
                    <p><strong>Apellido:</strong> ${save["lastname"]}</p>
                    <p><strong>Telefono:</strong> ${save["phone"]}</p>
                    <p><strong>Correo:</strong> ${save["email"]}</p>
                `
                toast(1, template);
            } else {
                template = `
                    El cliente ya esta registrado.
                `
                toast(0, template);
            }
        }
    });
}
function searchCustomer(btnName) {
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
            let template = "";
            if (result) {
                template = `
                    <p><strong>Cédula:</strong> ${save["dni"]}</p>
                    <p><strong>Nombre:</strong> ${save["name"]}</p>
                    <p><strong>Apellido:</strong> ${save["lastname"]}</p>
                    <p><strong>Telefono:</strong> ${save["phone"]}</p>
                    <p><strong>Correo:</strong> ${save["email"]}</p>         
                `
                modal(1, template);
            } else {
                template = `
                    El cliente no esta registrado            
                `
                toast(0, template);
            }
        }
    });
}
//Show forms
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
//Functions for save or delete Schedules
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
                let result = JSON.parse(response);
                if (result) {
                    if (btnName == "saveSch") {
                        toast(1,"Se guardo con exito.");
                        fetchHours();
                    } else {
                        toast(1,"Se elimino con exito.");
                        fetchHours();
                    };
                } else {
                    if (btnName == "saveSch") {
                        toast(0,"Ya existe este horario.");
                    } else {
                        toast(0,"No existe este horario.");
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
// Get schedules
function fetchHours() {
    $.ajax({
        url: 'includes/functions.php',
        type: 'GET',
        success: function (response) {
            let hours = JSON.parse(response)["Schedule"];
            let template = `
                <div class="cont_appo row">
            `;
            hours.forEach(row => {
                let appo = row["hour"];
                template += `
                    <div class="hours hrs_active col-sm-4" onclick="selectHour('${appo}')">
                        <div>
                            <p>${appo}</p>
                        </div>
                    </div>
                `
            });
            template += `
                </div>
            `;
            $('.appointments').html(template);
        }
    });
};
// Select hours of schedules for the inputs
function selectHour(hour) {
    document.querySelector("#schedule").value = hour;
    document.querySelector("#hour").value = hour;
};
//Validate the email expression
function validateEmail(email){
    const express = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(express.test(email)){
        return true;
    }else{
        return false;
    }
}
// Validate that input not is empty
function alertEmpty(input) {
    $.ajax({
        success: function () {
            let template = `
                        <div class="alert-empty" name="alert-empty">
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
                    template = `
                        <div class="alert-empty alert-empty-ipt-d1" name="alert-empty">
                            <div class="icoAlert">
                                <img src="img/alert.png" alt="">
                            </div>
                            <div class="paragraph">
                                <p>Completa este campo</p>
                            </div>
                        </div>    
                    `
                    break;
                case "dateEnd":
                    $('#dateEnd').after(empty);
                    template = `
                        <div class="alert-empty alert-empty-ipt-d2" name="alert-empty">
                            <div class="icoAlert">
                                <img src="img/alert.png" alt="">
                            </div>
                            <div class="paragraph">
                                <p>Completa este campo</p>
                            </div>
                        </div>    
                    `
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
