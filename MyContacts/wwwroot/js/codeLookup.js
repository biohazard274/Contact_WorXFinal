$(document).ready(function () {

    generateToken();
});
function generateToken() {
    var authToken;
    //-------------------------------Get Token-------------------------//
    var selectedCountry = (selectedRegion = selectedCity = "");
    var url = "https://www.universal-tutorial.com/api/getaccesstoken";

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "Accept": "application/json",
            "api-token": "ZCpv_XYXn7ggYf9PuynaU-U_wwWGYV_vjcEX4Rfj6Acb_mbLDaxW-sv1Bd6AVVH3JTQ",
            "user-email": "brandonmcquade@gmail.com"
        },

    }).done(function (response) {
        authToken = response.auth_token
        getCountries(authToken)
    });
}

function getCountries(token) {
    $("#country option").remove();
    $('country').append('<option value="">Loading options</option>');
    var url = "https://www.universal-tutorial.com/api/countries/";

    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }
    }).done(function (data) {
        $("#country option").remove();
        $.each(data, function () {
            $("#country").append(
                '<option value="' + this.country_phone_code + '">' + this.country_name +" (+"+ this.country_phone_code + ")</option>"
            );
        })

    });

}