    ;    
    
    /////////section menu acko        
    const menu = document.querySelector(".menu");
    const menuItem = document.querySelectorAll('.menu__item');
    const menuItemLength = menuItem.length;

    menu.addEventListener('click', function(event) {
      for (let i = 0; i < menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
      }
    });

    for (let i = 0; i < menuItemLength; i++) {
      menuItem[i].addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        

        if (menuItem[i].classList.contains('menu__item--active')) {
          menuItem[i].classList.remove('menu__item--active');
        } else {
          for (let i = 0; i < menuItemLength; i++) {
            menuItem[i].classList.remove('menu__item--active');
          };
          menuItem[i].classList.add('menu__item--active');
        }
      });
    }


    //////section team acko
const team = document.querySelector(".team");
const teamItem = document.querySelectorAll('.team__item');
const teamItemLength = teamItem.length;

team.addEventListener('click', function(event) {
  for (let i = 0; i < teamItemLength; i++) {
    teamItem[i].classList.remove('team__item--active');
  }
});

for (let i = 0; i < teamItemLength; i++) {
  teamItem[i].addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    

    if (teamItem[i].classList.contains('team__item--active')) {
      teamItem[i].classList.remove('team__item--active');
    } else {
      for (let i = 0; i < teamItemLength; i++) {
        teamItem[i].classList.remove('team__item--active');
      };
      teamItem[i].classList.add('team__item--active');
    }
  });
};

////hamburger
const hamburger = document.querySelector('.hamb-menu');
const first = document.querySelector('.first');
const firstClose = document.querySelector('.first__close');
function noScroll() {
  window.scrollTo(0, 0);
}
$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  performTransition(target);
  first.style.display = 'none';
});

hamburger.addEventListener('click', function(event) {
  event.preventDefault();

  window.addEventListener('scroll', noScroll); 

  first.style.display = 'flex';
});

firstClose.addEventListener('click', function(event) {
  event.stopPropagation();
  event.preventDefault();

  window.removeEventListener('scroll', noScroll);

  first.style.display = 'none';

  first.addEventListener('click', function(event) {
     event.preventDefault();
     
  })
})


////burgers  slider ПРОСТОЙ БЕСКОНЕЧНЫЙ
// const burgerNext = document.querySelector('.burgers__arrow--next');
// const burgerBack = document.querySelector('.burgers__arrow--back');
// const burgersList = document.querySelector(".burgers__list");

// burgerNext.addEventListener("click", function(event) {
//   event.preventDefault();
//   loop('next', event);
// });

// burgerBack.addEventListener("click", function(event) {
//   event.preventDefault();
//   loop("back", event);
// });

// function loop(direction, event) {

  
//   if(direction == 'next') {
//     burgersList.appendChild(burgersList.firstElementChild);
//   } else {
//     burgersList.insertBefore(burgersList.lastElementChild, burgersList.firstElementChild);
//   }
// }


///////////////////////////////    -----form-----------
const form = document.querySelector('#orderform');
const btnSend = document.querySelector('.btn-send');
const btnClear = document.querySelector('.btn-clear');

btnClear.addEventListener('click', function(event) {
  event.preventDefault();
  form.reset();  
});

btnSend.addEventListener('click', function(event) {
  event.preventDefault();
 
    const formData = new FormData();
    formData.append('name',  form.elements.name.value);
    formData.append('phone',  form.elements.phone.value);
    formData.append('comment',  form.elements.comment.value);
    formData.append('to',  'mi@gmail.com');

  if (validForm(form)) {
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST','https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if ((xhr.response.status)|(xhr.response.status==0)) {
        overlayMessage(xhr.response.message);
        form.reset();
      }
    });
  }

});

function validForm (formForValid) {
  let valid = true;

  if (!validField(form.elements.name)) {
    valid = false;
  }

  if (!validField(form.elements.phone)) {
    valid = false;
  }
  if (!validField(form.elements.comment)) {
    valid = false;
  }
  return valid;
}

function validField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}






// <script>
// function checkPhoneKey(key) {
//   return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
// }
// </script>
// <input onkeydown="return checkPhoneKey(event.key)" placeholder="Введите телефон" type="tel"></input>;
//////////////валидация поля ввода телефона
let formPhoneValid = document.querySelector('.form__phone');
let valueReturn = '';
formPhoneValid.addEventListener('keydown', e => {
  let keyName = e.key;

  if (((keyName >= '0' && keyName <= "9") || (keyName ==='-')) && (valueReturn.length < 16)) {
    valueReturn = valueReturn + keyName;
    formPhoneValid.value.reset();
    return formPhoneValid.value = valueReturn;
  } else {
    if (keyName === "Backspace") {
      valueReturn.pop();
      return formPhoneValid.value = valueReturn;
    }
    // valueReturn = valueReturn + '';
    // return formPhoneValid.value = valueReturn;
    return e.preventDefault();
  }
});



////////проверка ввода этажа
let formFloorValid = document.querySelector('.form__floor');
let valueReturnFloor = '';
formFloorValid.addEventListener('keydown', e => {
  let keyName = e.key;

  if (((keyName >= '0' && keyName <= "9") || (keyName ==='-')) && (valueReturn.length < 16)) {
    valueReturnFloor = valueReturnFloor + keyName;
    formFloorValid.value.reset();
    return formFloorValid.value = valueReturnFloor;
  } else {
    if (keyName === "Backspace") {
      valueReturnFloor.pop();
      return formFloorValid.value = valueReturnFloor;
    }
    // valueReturn = valueReturn + '';
    // return formPhoneValid.value = valueReturn;
    return e.preventDefault();
  }
});


//////////////валидация поля ввода квартиры
let formFlatValid = document.querySelector('.form__flat');
let valueReturnFlat = '';
formFlatValid.addEventListener('keydown', e => {
  let keyNameFlat = e.key;

  if (keyNameFlat >= '0' && keyNameFlat <= "9") {
    valueReturnFlat = valueReturnFlat + keyNameFlat;
    formFlatValid.value.reset();
    return formFlatValid.value = valueReturnFlat;
  } else {
    if (keyNameFlat === "Backspace") {
      valueReturnFlat.pop();
      return formFlatValid.value = valueReturnFlat;
    }
    // valueReturn = valueReturn + '';
    // return formPhoneValid.value = valueReturn;
    return e.preventDefault();
  }
});
/////////////////////////////////////////////////////////////
/// плавный бесконечный слайдер
let item = document.querySelectorAll('.burgers__item');
const itemLength = item.length;

const burgers__list = document.querySelector('.burgers__list');

const rightArrow = document.querySelector(".burgers__arrow--back");
const leftArrow = document.querySelector(".burgers__arrow--next");

let slider = [];
for (let i = 0; i<itemLength; i++) {
  slider[i] = item[i];
  item[i].remove();
}
let step = 0;
let offset = 0;

function burgerSlider() {
  let div = document.createElement('li');
  div = slider[slider.length-1];
  div.classList.add('burgers__item');
  div.style.left = -100 + '%';
  burgers__list.appendChild(div); 
  
  div = slider[step];
  div.style.left = offset*100 + '%';
  burgers__list.appendChild(div); 

  div = slider[step+1];
  div.style.left = offset*100 + 100 + '%';
  burgers__list.appendChild(div); 
  offset = 1;
}

function burgerSliderL() {
  if (step == (slider.length-1)) {
    step = 1;
  } else {
    if (step == (slider.length-2)) {
      step = 0;
    } else {
      step = (step +2);
    }
  }
  let div = document.createElement('li');
  div = slider[step];
  div.classList.add('burgers__item');
  div.style.left = offset*100 + '%';
  burgers__list.appendChild(div); 
    
  if (step == 0) {
    step = (slider.length-1);
  } else {
    step = (step - 1);
  }
  offset = 1;
}

function left() {
  leftArrow.onclick = null;
  let slider2 = document.querySelectorAll('.burgers__item');
  let offset2 = -1;
  for (let i = 0; i<slider2.length; i++) {
    slider2[i].style.left = offset2*100 - 100 + '%';
    offset2 ++;
  }
  setTimeout(function() {
    slider2[0].remove();
    burgerSliderL();
    leftArrow.onclick = left;
  }, 600);
}

function burgerSliderR() {
  if (step == 0) {
    step = (slider.length-2);
  } else {
    if (step == 1) {
      step = (slider.length-1);
    } else {
      step = (step -2);
    }
  }
  let offset = -1;
  let div = document.createElement('li');
  div = slider[step];
  div.classList.add('burgers__item');
  div.style.left = offset*100 + '%';
  burgers__list.insertBefore(div, burgers__list.firstElementChild);
  if (step == (slider.length-1)) {
      step = 0;
   } else {
     step = (step+1);
   }
  offset = 1;
}

function right() {
  rightArrow.onclick = null;
  
  let slider2 = document.querySelectorAll('.burgers__item');
  let offset2 = (slider2.length-1);
 
  for (let i = (slider2.length-1); i>=0; i--) {
    slider2[i].style.left = offset2*100 + '%';
    offset2 --;
  }
  setTimeout(function() {
    slider2[(slider2.length-1)].remove();
     burgerSliderR();
     rightArrow.onclick = right;
  }, 600);
}

burgerSlider();
step = 0;

leftArrow.onclick = left;
rightArrow.onclick = right;

const burgers = document.querySelector('.burgers');

burgers.addEventListener('click', function(event) {
  event.preventDefault();
});


//////////////////    --------OVERLAY------------
const template = document.querySelector('#overlayTemp').innerHTML;
const overlay = createOverlay(template);

function overlayMessage(message) {
  overlay.open();
  overlay.setContent(message);
  document.body.style.overflow = "hidden";
  
  
}
function createOverlay(template) {
  
  const fragment = document.createElement('div');

  
  fragment.innerHTML = template;
  const overlayElement = fragment.querySelector(".overlay");
  const contentElement = fragment.querySelector(".overlay__content");
  const closeElement = fragment.querySelector(".overlay__close");

  overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
      closeElement.click();
      document.body.style.overflow = "initial";
    }
  });

  closeElement.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.removeChild(overlayElement);
    document.body.style.overflow = "initial";
  });

  return {
    open() {
       
      document.body.appendChild(overlayElement);
     
    },
    close() {
      
      closeElement.click();
    },
    setContent(message) {
      contentElement.innerHTML = message;
    },
  };
}

///////////////// POP-UP
const reviewsList = document.querySelector('.reviews__list');
const popup = document.querySelector('.popup');
const popupText = document.querySelector('.popup__content');
const popupName = document.querySelector('.popup__name');
const popupClose = document.querySelector('.popup__close');
reviewsList.addEventListener('click', e => {
  e.preventDefault();
  let elem = e.target;

  if (elem.tagName == 'A') {
    let modalText = elem.previousElementSibling.innerHTML;
    let modalName = elem.previousElementSibling.previousElementSibling.innerHTML;
    popupText.innerHTML = modalText;
    popupName.innerHTML = modalName;
    popup.style.display = 'block';
    document.body.style.overflow = "hidden";
  }
});

document.addEventListener('keyup', e => {
  let keyName = e.key;

  if (keyName === 'Escape') {
    popup.style.display = 'none';
    document.body.style.overflow = "initial";
  }
});

popup.addEventListener("click", e => {
  if (e.target === popup) {
    popup.style.display = 'none';
    document.body.style.overflow = "initial";
  }
});
popupClose.addEventListener("click", function(e) {
  e.preventDefault();
  popup.style.display = 'none';
  document.body.style.overflow = "initial";
});






///////////one page scroll

const pages = $(".page");
$(document).ready(() => {
  $('.page').first().addClass('page--active')
});
const fixDat = $(".menu-fix__dat");
$(document).ready(() => {
  $('.menu-fix__dat').first().addClass('menu-fix__dat--active')
});

const display = $('.maincontent');
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const performTransition = sectionEq => {
  if (inScroll) return;
    inScroll = true;
    const transitionNext = 400;

    const position = sectionEq * -100;

  pages.eq(sectionEq).addClass('page--active').siblings().removeClass("page--active");


  display.css({
    transform: `translateY(${position}%)`
  });

  setTimeout(() => {
    inScroll = false;

    $('.menu-fix__dat--active').removeClass('menu-fix__dat--active');
    fixDat.eq(sectionEq).addClass("menu-fix__dat--active");
  }, transitionNext); 
};

const scroller = () => {
  const activeSection = pages.filter('.page--active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) performTransition(nextSection.index());
    },
    prev() {
      if (prevSection.length)  performTransition(prevSection.index());
    }
  };

};

$(window).on("wheel", e => {

  const deltaY = e.originalEvent.deltaY;
  const scrollToSection = scroller()
  if (deltaY > 0) {
    scrollToSection.next();
  }

  if (deltaY < 0) {
    scrollToSection.prev();

  }
});

$(document).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
  const windowScroller = scroller();
  
  if (userTypingInInputs) return;
  switch(e.keyCode) {
    case 38:
      windowScroller.prev();
      break;
    case 40:
      windowScroller.next();
      break;

  };
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  performTransition(target);
});

$("body").on('touchmove', (e) => {
  e.preventDefault();
});
if (isMobile) {

  $("body").swipe( {
    //Generic swipe handler for all directions
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    const scrollToSection = scroller();
    if (direction == "up") {
      scrollToSection.next();
    } else {
      scrollToSection.prev();
    }
  
  }
  });
}




/////////////////     PLAYER

let player = document.getElementsByTagName('video')[0];

let currentVolume = 0.1;
player.volume = currentVolume;
$('.player__start').on("click", e => {
  const btn = $(e.currentTarget);
  onPlayPause(btn);
});

$('#myvideo').on("click", e => {
  const btn = $('.player__start');
  onPlayPause(btn);
});

function onPlayPause(btn) {
  if (btn.hasClass('paused')) {
    player.pause();
    btn.removeClass('paused');

  } else {
    player.play();
    btn.addClass('paused');
    $('.player__wrapper').addClass('active');
  }
}
const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes *60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}
if (player.readyState) {onPlayReady();};

function onPlayReady() {
  let interval;
  let durationSec = player.duration;

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    const compleatedSec = player.currentTime;
    const compleatedPersent = (compleatedSec / durationSec) * 100;
    $('.player__playback-button').css({
      left: `${compleatedPersent}%`
    });

    $('.player__duration-completed').text(formatTime(compleatedSec));

  }, 1000);

  $('.player__duration-estimate').text(formatTime(durationSec));
  // console.log(durationSec);
};

$('.player__splash').on('click', e => {
  player.play();
  $('.player__start').addClass('paused');
  $('.player__wrapper').addClass('active');
});


$('.player__playback').on('click', e => {
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const buttonPosPersent = (newButtonPosition / bar.width()) * 100;

  const newPlayerTimeSec = (player.duration / 100) * buttonPosPersent;
  // console.log(newPlayerTimeSec);

  player.currentTime = newPlayerTimeSec;
  $('.player__playback-button').css({
    
    left: `${buttonPosPersent}%`
  });
});

$('.volume__start').on("click", e => {
  const vol = $(e.currentTarget);
  vol.toggleClass('no-active');
  if (vol.hasClass('no-active')) {
    player.volume = 0;
  } else {
    player.volume = currentVolume;
  }
});
$('.volume__playback').on("click", e => {
  const bar = $(e.currentTarget);
  const volumeButtonPosition = e.pageY - bar.offset().top;
  const buttonPosPersent = ((bar.height() - volumeButtonPosition) / bar.height()) * 100;
  currentVolume = (1 / 100) * buttonPosPersent;
  if (currentVolume>=0) {
    player.volume = currentVolume;
    if ($('.volume__start').hasClass('no-active')) {
       $('.volume__start').removeClass('no-active')
    }
  } else {
    currentVolume = 0;
    player.volume = currentVolume;
    $('.volume__start').addClass('no-active');
  }
  
  $('.volume__playback-button').css( {
    bottom: `${buttonPosPersent}%`
  });
})











ymaps.ready(init);

var placemarks = [
  {
    latitude: 59.97,
    longitude: 30.31,
    hintContent: '<div class="map__hint">ул.Литераторов, д. 19</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-image" src="../img/content/burger.png" alt="Бургер"/>',
      'Самые вкусные бургеры у нас! Заходите по адресу: ул.Литераторов, д.19',
      '</div>'
    ]
  },
  {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: '<div class="map__hint">Малый проспект В О, д.64</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-image" src="../img/content/burger.png" alt="Бургер"/>',
      'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д.64',
      '</div>'
    ]
  },
  {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: '<div class="map__hint">наб.реки Фонтанки, д.56</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-image" src="../img/content/burger.png" alt="Бургер"/>',
      'Самые вкусные бургеры у нас! Заходите по адресу: наб.реки Фонтанки, д.56',
      '</div>'
    ]
  },
  {
    latitude: 59.94,
    longitude: 30.46,
    hintContent: '<div class="map__hint">наб.реки Фонтанки, д.56</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-image" src="../img/content/burger.png" alt="Бургер"/>',
      'Самые вкусные бургеры у нас! Заходите по адресу: наб.реки Фонтанки, д.56',
      '</div>'
    ]
  }
];
var geoObjects = [];
function init() {
  var map = new ymaps.Map("map-yandex", {
    center: [59.95, 30.32],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  for (let i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark ([placemarks[i].latitude, placemarks[i].longitude], {
      hintContent: placemarks[i].hintContent,
      balloonContent: placemarks[i].balloonContent.join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [46,58],
      iconImageOffset: [-23, -58],
    });
   
  }
var clusterer = new ymaps.Clusterer ({
  clusterIcons: [
    {
      href: 'img/content/burger.png',
      size: [100, 100],
      offset: [-50, -50]
    }
  ],
  clusterIconContentLayout: null
});
map.geoObjects.add(clusterer);
// map.geoObjects.add(placemark);
clusterer.add(geoObjects);
}






    