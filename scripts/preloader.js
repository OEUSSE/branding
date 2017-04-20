function preloader(e) {
  const target = e.currentTarget
  const who = target.id;
  //const main = document.querySelector('.main');
  const loader = document.querySelector('.preloader');
  //const contact = document.querySelector('.contact');
  
  loader.classList.add('load-in');
  
  loaderAnimation()

  // Simulation loader  
  let promise = new Promise(function (resolve, rejected) {
    setTimeout(function () {
      resolve(removePreloader(loader))
    }, 2000);
  })
  
  promise.then(function () {
    loader.innerHTML = ''
    if (who == 'goContact') {
      drawContactContainer()
    }
      
    else if (who == 'goMain') {
       drawBrandContainer()
       document.querySelector('.backhome-button').removeEventListener('click', preloader)
    }

    loader.classList.remove('load-out');
  })
}

function loaderAnimation () {
  const loader = new mojs.Shape({
    parent: '#preloader',
    fill: 'crimson',
    shape: 'polygon',
    angle: { 0 : 360 },
    scale: { 0.5: 3.5 },
    points: { 6 : 9 },
    
    delay: 100,
    duration: 900,
    isYoyo: true,
    repeat: 2,
    easing: 'sin.out'
  }).replay(0)
}

function removePreloader(preloader) {
  preloader.classList.remove('load-in');
  preloader.classList.add('load-out');
}