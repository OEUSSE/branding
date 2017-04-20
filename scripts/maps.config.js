window.initMap = function initMap () {
  var myLatLng = { lat: 5.067642, lng: -75.515471 }
  var mapStyle = styles['night'] // silver, night, retro, hiding

  var map = new google.maps.Map(document.querySelector('#map'), {
    center: myLatLng,
    mapTypeControl: false,
    scrollWheel: false,
    zoom: 6
  })

  //Marker
  let pin = 'assets/location-pin-x64.png'
  var marker = new google.maps.Marker({
    map,
    position: myLatLng,
    icon: pin,
    title: 'My location',
    animation: google.maps.Animation.DROP
  })  
  marker.addListener('click', function() {
    infoWindow.open(map, marker)
  })

  const info = `
      <div class="info">
        <p>
          <span class="address">Colombia, Manizales - Caldas</span>
        </p>
        <span class="email">oeusse.developer@gmail.com</span>
      </div>
    `;

  var infoWindow = new google.maps.InfoWindow({
    content: info
  })
  
  map.setOptions({ styles: mapStyle })
}