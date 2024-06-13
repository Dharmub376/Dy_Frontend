const header = document.getElementById("header"),
  navMenu = document.getElementById("nav-menu"),
  navOpen = document.getElementById("nav-open"),
  navClose = document.getElementById("nav-close"),
  navLinks = document.querySelectorAll(".nav__link");

/* Change header style on scroll
---------------------------------------*/
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header--scroll");
  } else {
    header.classList.remove("header--scroll");
  }
});

/* Navigation Menu
---------------------------------------*/

// Open the nav menu
navOpen.addEventListener("click", () => {
  navMenu.classList.add("nav__menu--open");
});

// Close the nav menu
navClose.addEventListener("click", () => {
  navMenu.classList.remove("nav__menu--open");
});

// Close the nav menu when the user clicks on each nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--open");
  });
});

/* routes swiper 
----------------------------------------*/
let swiper = new Swiper(".routes__wrapper", {
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 32,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper__next",
    prevEl: ".swiper__prev",
  },
});

/* Play and Pause Video 
---------------------------------------*/
const video = document.getElementById("video-tour"),
  videoBtn = document.getElementById("video-btn"),
  videoIcon = document.getElementById("video-icon");

function videoState() {
  if (video.paused) {
    // Play the video
    video.play();
    // Replace the play icon
    videoIcon.classList.replace("ri-play-fill", "ri-pause-fill");
  } else {
    // Pause the Video
    video.pause();
    // Replace the pause icon
    videoIcon.classList.replace("ri-pause-fill", "ri-play-fill");
  }
}

// Replace the pause icon when the video ends
video.addEventListener("ended", () => {
  videoIcon.classList.replace("ri-pause-fill", "ri-play-fill");
});

videoBtn.addEventListener("click", videoState);

/* 
Scrolltop 
----------------------------------------------*/
const scrollTop = document.getElementById("scrolltop");

function showScrollTop() {
  if (window.scrollY > 150) {
    scrollTop.classList.add("scrolltop--show");
  } else {
    scrollTop.classList.remove("scrolltop--show");
  }
}

window.addEventListener("scroll", showScrollTop);

/* 
Active link on scroll section */

function addActiveLink() {
  const section = document.querySelectorAll("section[id]");
  section.forEach((section) => {
    const scrollY = window.scrollY,
      sectionTop = section.offsetTop - 150,
      sectionHeight = section.offsetHeight,
      sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.add("nav__link--active");
    } else {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.remove("nav__link--active");
    }
  });
}

window.addEventListener("scroll", addActiveLink);

// ScrollReveal Animation
const sr = ScrollReveal({
  distance: "100px",
  duration: 2000,
  delay: 400,
  reset: false,
});

sr.reveal(".home__content, .about__img, .offer__content", { origin: "left" });
sr.reveal(".home__img, .about__content, .offer__img", { origin: "right" });
sr.reveal(
  ".routes__wrapper, .video__content, .video__info, .newsletter__wrapper"
);
sr.reveal(".discover__item", { interval: 200, origin: "top" });
sr.reveal(".footer__content", { interval: 150 });

// Apply ScrollReveal to elements in the "Reserve" section
sr.reveal('#reserve .section__header', { origin: 'top', distance: '50px', duration: 1000, delay: 200 });
sr.reveal('#reserve .container1', { origin: 'bottom', distance: '50px', duration: 1000, delay: 400 });
sr.reveal('#reserve .column', { origin: 'left', distance: '50px', duration: 1000, interval: 200 });
sr.reveal('#reserve .tac', { origin: 'bottom', distance: '50px', duration: 1000, delay: 600 });


// form

// Custom Select
$('select').each(function () {
  var $this = $(this), numberOfOptions = $(this).children('option').length;

  $this.addClass('select-hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());

  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $('div.select-styled.active').not(this).each(function () {
      $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
  });

  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.hide();
    //console.log($this.val());
  });

  $(document).click(function () {
    $styledSelect.removeClass('active');
    $list.hide();
  });

});

$(function () {
  $('.quick-reservation').hide();
  $('.quick-reservation').fadeIn(1000);
  $('.close-icon').click(function (e) {
    $('.quick-reservation').fadeOut(500);
    e.stopPropagation();
    $('.after').show(1000);
    e.stopPropagation();
  });
});



// signup signin
document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('auth-form');
  const formTitle = document.getElementById('form-title');
  const extraFields = document.getElementById('extra-fields');
  const confirmPasswordGroup = document.getElementById('confirm-password-group');
  const submitBtn = document.getElementById('submit-btn');
  const toggleLink = document.getElementById('toggle-link');
  
  let isSignUp = false;

  toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      isSignUp = !isSignUp;
      if (isSignUp) {
          formTitle.textContent = 'Sign Up';
          extraFields.style.display = 'block';
          confirmPasswordGroup.style.display = 'block';
          submitBtn.textContent = 'Sign Up';
          toggleLink.textContent = 'Already have an account? Sign in';
          authForm.action = '/register';
      } else {
          formTitle.textContent = 'Sign In';
          extraFields.style.display = 'none';
          confirmPasswordGroup.style.display = 'none';
          submitBtn.textContent = 'Sign In';
          toggleLink.textContent = "Don't have an account? Sign up";
          authForm.action = '/login';
      }
  });

  authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(authForm);
      const data = {};
      formData.forEach((value, key) => data[key] = value);
      
      if (isSignUp && data.password !== data.confirmpassword) {
          alert("Passwords do not match");
          return;
      }

      const response = await fetch(authForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const result = await response.text();
      alert(result);
  });
});
