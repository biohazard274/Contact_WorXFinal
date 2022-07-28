

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

