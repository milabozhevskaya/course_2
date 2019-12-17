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
    xhr.open('POST','https://webdev-api.loftschool.com/sendmail/fail');
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

