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

hamburger.addEventListener('click', function(event) {
  event.preventDefault();
  first.style.display = 'flex';
});

firstClose.addEventListener('click', function(event) {
  event.stopPropagation();
  event.preventDefault();

  first.style.display = 'none';
  first.addEventListener('click', function(event) {
    event.preventDefault();
  })
})



////preventDefault for reviews and burgers
const reviews = document.querySelector('.reviews');
const burgers = document.querySelector('.burgers');

reviews.addEventListener('click', function(event) {
  event.preventDefault();
});

burgers.addEventListener('click', function(event) {
  event.preventDefault();
});


////burgers  slider
const burgerNext = document.querySelector('.burgers__arrow--next');
const burgerBack = document.querySelector('.burgers__arrow--back');
const burgersList = document.querySelector(".burgers__list");

burgerNext.addEventListener("click", function(event) {
  event.preventDefault();
  loop('next', event);
});

burgerBack.addEventListener("click", function(event) {
  event.preventDefault();
  loop("back", event);
});

function loop(direction, event) {

  
  if(direction == 'next') {
    burgersList.appendChild(burgersList.firstElementChild);
  } else {
    burgersList.insertBefore(burgersList.lastElementChild, burgersList.firstElementChild);
  }
}

