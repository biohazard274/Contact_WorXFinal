document.querySelector('#password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        Logon();
    }
});

function Logon() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    $.post("/User/CheckCredentials?username=" + username + "&password=" + password).done(function (data) {

        if (!data.success) {
            swal.fire({
                title: "",
                icon: "error",
                text: data.message,
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                timer: 2000,
            })

        }
        else {
            swal.fire({
                imageUrl: 'https://cdn.dribbble.com/users/153131/screenshots/2995660/phone_2x.gif',

                imageHeight: 150,
                imageAlt: 'Custom image',
                html: data.message + "<br>You will be logged out after " + data.timeout + " minutes of inactivity.",
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(function () {
                var timeout = data.timeout;

                sessionStorage.setItem("idleTime", timeout)
                window.location.replace('/Home/Index');
            });


        }
    })
}