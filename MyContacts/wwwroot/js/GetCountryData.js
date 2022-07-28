$(document).ready(function () {

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
        }
    }).done(function (response) {
        authToken = response.auth_token
        getCountries(authToken)
    });



    // Country selected --> update region list .
    $("#country").change(function () {
        selectedCountry = this.options[this.selectedIndex].text;
        countryName = $("#country").val();
        $("#region option").remove();
        $('#region').append('<option value="">Loading options</option>');
        // Populate country select box from battuta API
        var url = "https://www.universal-tutorial.com/api/states/" + countryName;

        $.ajax({
            type: 'GET',
            url: url,
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + authToken,
            }
        }).done(function (data) {
            $("#city option").remove();
            $('#city').append('<option value="">Please a region first</option>');
            $("#region option").remove();
            $('#region').append('<option value="">Please a region</option>');
            $.each(data, function () {
                // APPEND OR INSERT DATA TO SELECT ELEMENT.
                $("#region").append(
                    '<option  value="' + this.state_name + '">' + this.state_name + "</option>"
                );
            });
        });

        
    });
    // Region selected --> updated city list
    $("#region").on("change", function () {
        $("#city option").remove();
        $('#city').append('<option value="">Loading options</option>');
        selectedRegion = this.options[this.selectedIndex].text;
        // Populate country select box from battuta API
        countryCode = $("#country").val();
        region = $("#region").val();

        var url = "https://www.universal-tutorial.com/api/cities/" + region;

        $.ajax({
            type: 'GET',
            url: url,
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + authToken,
            }
        }).done(function (data) {
            $("#city option").remove();
            $('#city').append('<option value="">Please a city</option>');
            $.each(data, function () {
                // APPEND OR INSERT DATA TO SELECT ELEMENT.
                $("#city").append(
                    '<option value="' + this.city_name + '">' + this.city_name + "</option>"
                );
            });
        });
    });
    
});

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
        },
        success: function (data) {
            console.log(data)
        },
        errorfunction(data) {
            document.reload()
        }
    }).done(function (data) {
        $("#country option").remove();
        $('country ').append('<option value="">Please a country</option>');
        $.each(data, function () {
            $("#country").append(
                '<option value="' + this.country_name + '">' + this.country_name + "</option>"
            );
        })
    });
}
