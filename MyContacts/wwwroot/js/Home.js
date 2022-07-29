$(document).ready(function () {
    GetContactCards();

    $("#mySearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#contact").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function GetContactCards() {
    $.ajax({
        method: 'GET',
        url: '/Contact/GetAllContacts',
        dataType: 'json'

    }).done(function (response) {
        if (response.success) {
            var container = document.getElementById('container');
            $.each(response.data, function () {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var birthday = new Date(this.contact.dateOfBirth);
                console.log(this)
                birthday = birthday.toLocaleDateString("en-US", options)
                var content = ``
                content = ` <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4" id="contact" >
                            <div class="card mb-5 cssanimation3 d-flex shadow p-3" >
<div class="card-body p-1">
                                <div class="row align-items-center">
                                    <div class="row">
                                        <div class="col">
                                            <h4 class="mb-0 text-lg bold mt-0">${this.contact.firstName} ${this.contact.lastName}</h4>
                                            <span class="text-sm">Date of Birth: ${birthday}</span>
                                        </div>
                                        <div class="col-2 d-flex text-right">
                                            <div class="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex ">
                                        <div class=" w-100">
                                            <div class="p-2 mt-2 justify-content-between rounded">
                                                <div class="row">
                                                    
                                                    <div class="col">`;

                    
                    if (this.address != null) {
                        content += `<div class="p-3 card">
                                    <div class="d-flex flex-row align-items-center">
                                      <span class="circle">
                                          <i class="fa fa-home"></i>
                                      </span>
              
                                      <div class="d-flex flex-column ms-3">
                                          <h6 class="fw-bold">Address</h6>
                                          <span>${this.address.streetAddress}, ${this.address.city}, <br>${this.address.state}, ${this.address.country}</span>
                                      </div>
                                    </div>
                                </div>`
                    }


                content += `
                                        
                                                    </div>
                                                    <div class="col">
                                                        <div class="p-3 card">
                                                            <div class="d-flex flex-row align-items-center">
                                                              <span class="circle">
                                                                  <i class="fa fa-phone"></i>
                                                              </span>

                                                              <div class="d-flex flex-column ms-3">
                                                                  <h6 class="fw-bold">Contact Numbers</h6>
                                                                  <span>`
                if (this.telephones != null) {
                    console.log(this)
                    $.each(this.telephones, function () {
                        console.log(this)
                        content += `(+${this.countryCode}) ${this.phoneNumber} <br>`
                    })
                    
                }
                    
                    
                    `</span>
                                                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="button mt-2 d-flex flex-row align-items-center">
                                                <button class="btn btn-sm btn-outline-primary w-100">Chat</button>
                                                <button class="btn btn-sm btn-primary  w-100 ml-2">Follow</button>
                                            </div>
                                        </div>
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
function newContactModal() {
    var placeHolderElement = $('#placeholderLayout');
    var url = "/Contact/AddContact";
    var decodedUrl = decodeURIComponent(url)
    $.get(decodedUrl).done(function (data) {
        showModal(data);
    })
    placeHolderElement.unbind().on('click', '[data-save="NewContact"]', function (event) {
        event.preventDefault();
        var form = $(this).parents('.modal').find('form');
        var sendData = form.serialize();
        try {
            $.post("/Contact/SaveContact/", sendData).done(function (data) {
                if (data.success) {

                    var url = "/Contact/AddAddress?contactID=" + data.contactID;
                    var decodedUrl = decodeURIComponent(url)
                    $.get(decodedUrl).done(function (data) {
                        showModal(data);
                    })
                    placeHolderElement.unbind().on('click', '[data-save="NewAddress"]', function (event) {
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
                                    placeHolderElement.unbind().on('click', '[data-save="NewNumber"]', function (event) {
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
                    if (data.newContact) {
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

                            } else if (result.isDenied) {

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
                            timer: 2000,
                        })
                    }
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


