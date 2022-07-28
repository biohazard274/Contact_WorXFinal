var idleTime = 0;
$(document).ready(function () {
    // Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

    // Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
    
});

function showModal(modalData) {
    var placeHolderElement = $('#placeholderLayout');
    placeHolderElement.find('.modal').modal('dispose')
    placeHolderElement.html(modalData);
    placeHolderElement.find('.modal').modal('show')
    placeHolderElement.find('.modal').on('show', function () {
        $(document).off('focusin.modal');
    })
}

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > sessionStorage.getItem('idleTime')) { // user timeout
        window.location.replace('/User/Logout');
    }
}
var target = document.querySelector(".nav-menu");
const togglenav = document.getElementById('header-toggle'),
    nav = document.getElementById('nav-bar'),
    bodypd = document.getElementById('body-pd'),
    headerpd = document.getElementById('header'),
    name = document.getElementById('logo');
target.addEventListener("mouseover", mOver, false);
target.addEventListener("mouseout", mOut, false);

function mOver() {
    // show navbar
    nav.classList.add('show-nav')
    // change icon
    togglenav.classList.add('bx-x')
    // add padding to body
    bodypd.classList.add('body-pd')
    // add padding to header
    headerpd.classList.add('body-pd')
}

function mOut() {
    nav.classList.remove('show-nav')
    // change icon
    togglenav.classList.remove('bx-x')
    // add padding to body
    bodypd.classList.remove('body-pd')
    // add padding to header
    headerpd.classList.remove('body-pd')
}


document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId, navId, bodyId, headerId, logo) => {
        const togglenav = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId),
            name = document.getElementById(logo);

        // Validate that all variables exist
        if (togglenav && nav && bodypd && headerpd) {
            togglenav.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show-nav')
                // change icon
                togglenav.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')

            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header', 'logo')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link-menu')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active-nav'))
            this.classList.add('active-nav')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

});