var placeHolderElement
$(document).ready(function () {
    GetContactCards();

    $("#mySearch").on("keyup", function () {
        const value = $(this).val().toUpperCase();

        const cardContainer = document.getElementById("container")
        const cards = cardContainer.getElementsByClassName("card mb-5")

        $.each(cards, function () {
            if (this.innerText.toUpperCase().indexOf(value) > -1) {
                this.parentElement.style.display = "block"
            }
            else {
                this.parentElement.style.display = "none"
            }
        })
    });
});


function filter() {
    var filter = document.getElementById("filterText");
    const value = filter.value.toUpperCase();

    const cardContainer = document.getElementById("container")
    const filterSelected = document.getElementById("filterSelecter").value

    if (value === "") {
        const cards = cardContainer.getElementsByClassName("card mb-5")


        $.each(cards, function () {
            if (this.innerText.toUpperCase().indexOf(value) > -1) {
                this.parentElement.style.display = "block"
            }
            else {
                this.parentElement.style.display = "none"
            }
        })
    }


    if (filterSelected === "Age") {
        const cards = cardContainer.getElementsByClassName("age")


        $.each(cards, function () {
            if (this.innerText.toUpperCase().indexOf(value) > -1) {
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block"
            }
            else {
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
            }
        })
    }
    else if (filterSelected === "Next Birthday") {
        const cards = cardContainer.getElementsByClassName("nextBirthday")


        $.each(cards, function () {
            if (this.innerText.toUpperCase().indexOf(value) > -1) {
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block"
            }
            else {
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
            }
        })
    }
}

function deleteContact(contactId) {

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            $.ajax({
                method: 'DELETE',
                url: '/Contact/DeleteContact?contactID=' + contactId + "&fromUpdate=" + true,
                dataType: 'json'

            }).done(function (response) {
                Swal.fire('Contact Delelted', '', 'info')

            }).then(function () {
                $("#staticBackdrop").modal("hide");
                location.reload()
            });

        }
    })


}

function hideModal() {
    var id = document.getElementsByName("Contact.Id")
    if (id.length != 0) {
        $.ajax({
            method: 'DELETE',
            url: '/Contact/DeleteContact?contactID=' + id[0].value + "&fromUpdate=" + false,
            dataType: 'json'

        }).done(function (response) {
            $("#staticBackdrop").modal("hide");

        });
    }
    $("#staticBackdrop").modal("hide");
}

function GetContactCards() {
    $.ajax({
        method: 'GET',
        url: '/Contact/GetAllContacts',
        dataType: 'json'

    }).done(function (response) {
        if (response.success) {
            var container = document.getElementById('container');
            if (response.data.length > 0) {
                $.each(response.data, function () {
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    var birthdayDate = new Date(this.contact.dateOfBirth);
                    const birthday = birthdayDate.toLocaleDateString("en-US", options)
                    var nextBirthDayDate = new Date(this.contact.dateOfBirth)
                    nextBirthDay = nextBirthDayDate.setFullYear(birthdayDate.getFullYear() + this.contact.age + 1);
                    nextBirthDay = nextBirthDayDate.toLocaleDateString("en-US", options)
                    var content = ``
                    content = ` <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12  mb-6" id="contact" >
                            <div class="card mb-5 cssanimation3 shadow p-3" >
                            <div class="card-body p-1">
                                <div class="row align-items-center">
                                    <div class="row">
                                        <div class="col">
                                            <span class="mb-0 text-lg bold mt-0">${this.contact.firstName} ${this.contact.lastName}</br></span>
                                            <span class="text-sm">Date of Birth: ${birthday}<br></span>
                                            <span class="text-sm nextBirthday">Next Birthday: ${nextBirthDay}</span>
                                        </div>
                                        <div class="col-3 align-content-center text-center">
<div class = "card shadow-lg bg-primary text-white align-self-center py-2 mt-1">
                                            <p>Age</p>
                                            <div class="row">
                                                <p class="text-2xl age">${this.contact.age}</p>
                                            </div>
</div>
                                        </div>
                                    </div>

                                            <div class="p-2 mt-2 justify-content-between rounded">
                                                <div class="row">

                                                    <div class="col-12 mb-2">`;


                    if (this.address != null) {
                        content += `<div class="p-3 card">
                                    <div class=" align-items-center">
                                      <span class="circle">
                                          
                                      </span>
              
                                      <div class=" ms-3">
                                          <h6 class="fw-bold">Address</h6>
                                          <span>${this.address.streetAddress}, ${this.address.city}, ${this.address.state}, ${this.address.country}</span>
                                      </div>
                                    </div>
                                </div>`
                    }


                    content += `</div>
                            <div class=" col-12 mb-2">
                                <div class="p-3 card">
                                    <div class= align-items-center">
                                        <span class="circle">
                                            
                                        </span>

                                        <div class=" ms-3">
                                            <h6 class="fw-bold">Contact Numbers</h6>
                                            <div class = "row">
                                            `

                    if (this.telephones != null) {
                        $.each(this.telephones, function () {
                            content += `
<div class = "col-lg-6 col-md-6 col-sm-6 col-12">
                                            <span>

(+${this.countryCode}) ${this.phoneNumber} </span>
</div>`
                        })

                    }

                    content += `
                                                            </div>
                                                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div class="button mt-2 d-flex flex-row align-items-center">
                                                <button class="btn btn-sm btn-outline-primary w-100" onclick="UpdateContact(${this.contact.id})">Edit Contact</button>
                                                <button class="btn btn-sm btn-primary  w-100 ml-2" onclick="addNewNumber(${this.contact.id})">Add Phone Number</button>
                                            </div>
                                        
                                   
                                </div>
                            </div>
                            </div>
                        </div>`

                    container.innerHTML += content;
                })
                var loader = document.getElementById('loader');
                loader.remove()
            }
            else {
                var content = `
                                <div class="d-flex flex-row align-items-center logo">
                                    <img class="center" src="https://assets.materialup.com/uploads/05c93198-397c-475c-9724-f9eb3ac460c9/attachment.jpg" alt="img">
                                </div>`
                container.innerHTML += content;
                var loader = document.getElementById('loader');
                loader.remove()
            }

        }
        else {
            swal.fire({
                title: "Error",
                icon: "error",
                html: response.data,
                showConfirmButton: true,
                showDenyButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
            })
        }

    })
}

$('#date-input').dateDropper({
    theme: 'picker1'
})
function UpdateContact(contactID) {
    var showModalView = $('#placeholderLayout');
    var url = "/Contact/UpdateContact?contactID=" + contactID;
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    showModalView.unbind().on('click', '[data-save="NewNumber"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/SaveNumber/", sendData).done(function (data) {
                if (data.success) {
                    swal.fire({
                        title: "Saved",
                        icon: "success",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    }).then(function () {
                        location.reload();
                    })

                }
                else {
                    swal.fire({
                        title: "Error",
                        icon: "error",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    })
                }

            })
        }
        catch (e) {
            swal.fire({
                title: "FAILURE",
                icon: "error",
                text: e,
                buttons: true
            });
        }
    })
}
function EditContact(contactID) {
    var showModalView = $('#placeholderLayout');
    var url = "/Contact/EditContact?contactID=" + contactID;
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    showModalView.unbind().on('click', '[data-save="EditContact"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/UpdateContact/", sendData).done(function (data) {
                if (data.success) {
                    swal.fire({
                        title: "Saved",
                        icon: "success",
                        html: data.message,
                        showConfirmButton: false,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    }).then(function () {
                        UpdateContact(data.contactID)
                    })

                }
                else {
                    swal.fire({
                        title: "Error",
                        icon: "error",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    })
                }

            })
        }
        catch (e) {
            swal.fire({
                title: "FAILURE",
                icon: "error",
                text: e,
                buttons: true
            });
        }
    })
}
function EditAddress(contactID) {
    var showModalView = $('#placeholderLayout');
    var url = "/Contact/EditAddress?contactID=" + contactID;
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    showModalView.unbind().on('click', '[data-save="EditAddress"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/UpdateAddress/", sendData).done(function (data) {
                if (data.success) {
                    swal.fire({
                        title: "Saved",
                        icon: "success",
                        html: data.message,
                        showConfirmButton: false,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    }).then(function () {
                        UpdateContact(data.contactID)
                    })

                }
                else {
                    swal.fire({
                        title: "Error",
                        icon: "error",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    })
                }

            })
        }
        catch (e) {
            swal.fire({
                title: "FAILURE",
                icon: "error",
                text: e,
                buttons: true
            });
        }
    })
}

function addNewNumber(contactID) {
    var showModalView = $('#placeholderLayout');
    var url = "/Contact/AddPhone?contactID=" + contactID;
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    showModalView.unbind().on('click', '[data-save="NewNumber"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/SaveNumber/", sendData).done(function (data) {
                if (data.success) {
                    swal.fire({
                        title: "Saved",
                        icon: "success",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    }).then(function () {
                        location.reload();
                    })

                }
                else {
                    swal.fire({
                        title: "Error",
                        icon: "error",
                        html: data.message,
                        showConfirmButton: true,
                        showDenyButton: false,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        timer: 2000,
                    })
                }

            })
        }
        catch (e) {
            swal.fire({
                title: "FAILURE",
                icon: "error",
                text: e,
                buttons: true
            });
        }
    })
}


function newContactModal() {
    var showModalView = $('#placeholderLayout');
    var url = "/Contact/AddContact";
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    showModalView.unbind().on('click', '[data-save="NewContact"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/SaveContact/", sendData).done(function (data) {
                if (data.success && data.newContact) {

                    var url = "/Contact/AddAddress?contactID=" + data.contactID;
                    var decodedUrl = decodeURIComponent(url)
                    $.get(decodedUrl).done(function (data) {
                        showModal(data);
                    })
                    showModalView.unbind().on('click', '[data-save="NewAddress"]', function (event) {
                        event.preventDefault();
                        var form = $(this).parents('.modal').find('form');
                        var sendData = form.serialize();
                        try {
                            $.post("/Contact/SaveAddress/", sendData).done(function (data) {
                                if (data.success) {
                                    var url = "/Contact/AddPhone?contactID=" + data.contactID;
                                    var decodedUrl = decodeURIComponent(url)
                                    $.get(decodedUrl).done(function (data) {
                                        showModal(data);
                                    })
                                    showModalView.unbind().on('click', '[data-save="NewNumber"]', function (event) {
                                        event.preventDefault();
                                        var form = $(this).parents('.modal').find('form');
                                        var sendData = form.serialize();
                                        try {
                                            $.post("/Contact/SaveNumber/", sendData).done(function (data) {
                                                if (data.success) {
                                                    swal.fire({
                                                        title: "Saved",
                                                        icon: "success",
                                                        html: data.message,
                                                        showConfirmButton: true,
                                                        showDenyButton: false,
                                                        showCancelButton: false,
                                                        allowOutsideClick: false,
                                                        timer: 2000,
                                                    }).then(function () {
                                                        location.reload();
                                                    })

                                                }
                                                else {
                                                    swal.fire({
                                                        title: "Error",
                                                        icon: "error",
                                                        html: data.message,
                                                        showConfirmButton: true,
                                                        showDenyButton: false,
                                                        showCancelButton: false,
                                                        allowOutsideClick: false,
                                                        timer: 2000,
                                                    })
                                                }

                                            })
                                        }
                                        catch (e) {
                                            swal.fire({
                                                title: "FAILURE",
                                                icon: "error",
                                                text: e,
                                                buttons: true
                                            });
                                        }
                                    })

                                }
                                else {
                                    swal.fire({
                                        title: "Error",
                                        icon: "error",
                                        html: data.message,
                                        showConfirmButton: true,
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        allowOutsideClick: false,

                                    })
                                }

                            })
                        }
                        catch (e) {
                            swal.fire({
                                title: "FAILURE",
                                icon: "error",
                                text: e,
                                buttons: true
                            });
                        }
                    })

                }
                else {
                    Swal.fire({
                        title: 'Contact already exists',
                        html: data.message,
                        icon: 'question',
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Yes, add a number',
                        denyButtonText: `No, make a new contact`,
                        confirmButtonColor: '#26de81',
                        denyButtonColor: '#f15642',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var url = "/Contact/AddPhone?contactID=" + data.contactID;
                            var decodedUrl = decodeURIComponent(url)
                            $.get(decodedUrl).done(function (data) {
                                showModal(data);
                            })
                            showModalView.unbind().on('click', '[data-save="NewNumber"]', function (event) {
                                event.preventDefault();
                                var form = $(this).parents('.modal').find('form');
                                var sendData = form.serialize();
                                try {
                                    $.post("/Contact/SaveNumber/", sendData).done(function (data) {
                                        if (data.success) {
                                            swal.fire({
                                                title: "Saved",
                                                icon: "success",
                                                html: data.message,
                                                showConfirmButton: true,
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                allowOutsideClick: false,
                                                timer: 2000,
                                            }).then(function () {
                                                location.reload();
                                            })

                                        }
                                        else {
                                            swal.fire({
                                                title: "Error",
                                                icon: "error",
                                                html: data.message,
                                                showConfirmButton: true,
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                allowOutsideClick: false,
                                                timer: 2000,
                                            })
                                        }

                                    })
                                }
                                catch (e) {
                                    swal.fire({
                                        title: "FAILURE",
                                        icon: "error",
                                        text: e,
                                        buttons: true
                                    });
                                }
                            })

                        } else if (result.isDenied) {
                            var form = $(this).parents('.modal').find('form');
                            var sendData = form.serialize();
                            try {
                                $.post("/Contact/CreateNewContact/", sendData).done(function (data) {
                                    var url = "/Contact/AddAddress?contactID=" + data.contactID;
                                    var decodedUrl = decodeURIComponent(url)
                                    $.get(decodedUrl).done(function (data) {
                                        showModal(data);
                                    })
                                    showModalView.unbind().on('click', '[data-save="NewAddress"]', function (event) {
                                        event.preventDefault();
                                        var form = $(this).parents('.modal').find('form');
                                        var sendData = form.serialize();
                                        try {
                                            $.post("/Contact/SaveAddress/", sendData).done(function (data) {
                                                if (data.success) {
                                                    var url = "/Contact/AddPhone?contactID=" + data.contactID;
                                                    var decodedUrl = decodeURIComponent(url)
                                                    $.get(decodedUrl).done(function (data) {
                                                        showModal(data);
                                                    })
                                                    showModalView.unbind().on('click', '[data-save="NewNumber"]', function (event) {
                                                        event.preventDefault();
                                                        var form = $(this).parents('.modal').find('form');
                                                        var sendData = form.serialize();
                                                        try {
                                                            $.post("/Contact/SaveNumber/", sendData).done(function (data) {
                                                                if (data.success) {
                                                                    swal.fire({
                                                                        title: "Saved",
                                                                        icon: "success",
                                                                        html: data.message,
                                                                        showConfirmButton: true,
                                                                        showDenyButton: false,
                                                                        showCancelButton: false,
                                                                        allowOutsideClick: false,
                                                                        timer: 2000,
                                                                    }).then(function () {
                                                                        location.reload();
                                                                    })

                                                                }
                                                                else {
                                                                    swal.fire({
                                                                        title: "Error",
                                                                        icon: "error",
                                                                        html: data.message,
                                                                        showConfirmButton: true,
                                                                        showDenyButton: false,
                                                                        showCancelButton: false,
                                                                        allowOutsideClick: false,
                                                                        timer: 2000,
                                                                    })
                                                                }

                                                            })
                                                        }
                                                        catch (e) {
                                                            swal.fire({
                                                                title: "FAILURE",
                                                                icon: "error",
                                                                text: e,
                                                                buttons: true
                                                            });
                                                        }
                                                    })

                                                }
                                                else {
                                                    swal.fire({
                                                        title: "Error",
                                                        icon: "error",
                                                        html: data.message,
                                                        showConfirmButton: true,
                                                        showDenyButton: false,
                                                        showCancelButton: false,
                                                        allowOutsideClick: false,

                                                    })
                                                }

                                            })
                                        }
                                        catch (e) {
                                            swal.fire({
                                                title: "FAILURE",
                                                icon: "error",
                                                text: e,
                                                buttons: true
                                            });
                                        }
                                    })


                                })
                            }
                            catch (e) {
                                swal.fire({
                                    title: "FAILURE",
                                    icon: "error",
                                    text: e,
                                    buttons: true
                                });
                            }
                        }
                    })
                }
            })
        }
        catch (e) {
            swal.fire({
                title: "FAILURE",
                icon: "error",
                text: e,
                buttons: true
            });
        }


    })
}


