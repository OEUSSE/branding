const mainContainer = document.querySelector('.main-container')
let origen = document.title

var map = {
  state: false
}

function initMap () {
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

function drawBrandContainer () {
  const branContainer = document.createElement('div')
  branContainer.className = 'brandContainer'

  branContainer.innerHTML = `
  <div class="brand">
    <h1>Óscar Eusse Flórez</h1>
    <h3>Web Developer / Frontend Developer</h3>
    <a id="goContact" class="contact-button">Hagamos algo juntos</a>
    <a href="mailto:oeusse.developer@gmail.com" class="contact-button-res">Contáctame</a>
  </div>

  <div class="social">
    <div class="networks">
      <a href="https://www.facebook.com/oeusse.dev/" target="_blank" role="button" aria-label="Ir a facebook" 
          class="button">
        <i class="icon-fb"></i>
      </a>
      <a href="https://twitter.com/HeyEusse" target="_blank" role="button" aria-label="Ir a twitter" 
          class="button">
        <i class="icon-twitter"></i>
      </a>
      <a href="https://github.com/OEUSSE" target="_blank" role="button" aria-label="Ir a Github" 
          class="button">
        <i class="icon-github"></i>
      </a>
      <a href="https://www.linkedin.com/in/oscar-eusse/" target="_blank" role="button" 
          aria-label="Ir a Linkedin" class="button">
          <i class="icon-linkedin"></i>
      </a>
      <a href="http://codepen.io/o-eusse/" target="_blank" role="button" aria-label="Ir a Codepen" 
          class="button">
        <i class="icon-codepen"></i>
      </a>
    </div>`
  
  title('OE - Frontend Developer')
  empty(mainContainer).appendChild(branContainer)
  document.querySelector('.contact-button').addEventListener('click', preloader)
}

function drawContactContainer () {
  const contactContainer = document.createElement('div')
  contactContainer.className = 'contactContainer'

  contactContainer.innerHTML = `
  <div class="formWrapper">
    <div class="contactForm">

      <h1>Contáctame</h1>
      <form id="form" autocomplete="off">
        <div class="row">
          <input id="name" type="text" name="nombre" placeholder="Tu nombre" required/>
          <input id="email" type="email" name="email" placeholder="Tu email" required/>
        </div>
        <input id="subject" type="text" name="asunto" placeholder="Asunto" required/>
        <textarea id="message" name="mensaje" placeholder="Cuentame..." rows="4" required></textarea>
        <input type="submit" value="Enviar"/>
      </form>
      
    </div>
  </div>
  <div class="mapWrapper">
    <div id="map" class="mapLocation"></div>
  </div>`

  title('OE - Contacto')
  empty(mainContainer).appendChild(contactContainer)
  document.querySelector('.backhome-button').addEventListener('click', preloader);

  document.querySelector('#form').onsubmit = sendData
  initMap()
}

function sendData (e) {
  const name = document.querySelector('#name'),
        email = document.querySelector('#email'),
        subject = document.querySelector('#subject'),
        message = document.querySelector('#message')

  if (!name.value || !email.value || !subject.value || !message.value) {
    return false;
  } else {
    $.ajax({
      method: 'POST',
      url: 'https://formspree.io/oeusse.developer@gmail.com',
      data: $('#form').serialize(),
      dataType: 'json'
    })
    e.preventDefault()
    $(this).get(0).reset()
  }
}

function empty (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

function title(str) {
  var i = 1;
  var args = arguments;
  document.title = str.replace(/%[os]/g, function(_){
    switch (_) {
      case '%o':
        return orig;
      case '%s':
        return args[i++];
    }
  });
}

function init () {
  drawBrandContainer()
}

window.onload = function () {
  //if (hasConsoleError) console.clear()
  console.log("%c¡Alto ahí!", "color: red; font-style: italic; font-size: 12vmin;")
}

function hasConsoleError () {
  return function () {
    var oldLog = console.log
    console.log = function () {
      oldLog.apply(console, arguments)
    }
  }
}

init()