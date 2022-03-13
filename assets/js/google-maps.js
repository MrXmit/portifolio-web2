function initMap() {
    // Latitude and Longitude
    var myLatLng = {lat: 37.98299781835402, lng: 23.724755874769937};

    var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Head Quarters of TONIS' // Title Location
    });
}

