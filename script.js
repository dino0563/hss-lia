let startY;

function startSwipe(event) {
  startY = event.touches[0].clientY;
}

function moveSwipe(event) {
  const currentY = event.touches[0].clientY;
  const diffY = startY - currentY;

  if (diffY > 50) {
    // Swipe up threshold
    transitionMobile();
  }
}

function endSwipe() {
  startY = null;
}

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function setGuestName() {
  const guestName = getQueryParameter("to");
  if (guestName) {
    document.getElementById("guest-name-html").innerText = guestName;
  }
}

function transitionDesktop() {
  const introDesktop = document.getElementById("intro-desktop");
  const mainContainer = document.getElementById("main-container");
  introDesktop.classList.add("slide-up");
  setTimeout(() => {
    introDesktop.style.display = "none";
    mainContainer.style.display = "flex";
  }, 1000);
}

function transitionMobile() {
  const introMobile = document.getElementById("intro-mobile");
  const mainContainer = document.getElementById("main-container");
  introMobile.classList.add("slide-up");
  setTimeout(() => {
    introMobile.style.display = "none";
    mainContainer.style.display = "block";
  }, 1000);
}

document.addEventListener(
  "click",
  function () {
    document.getElementById("audio").play();
  },
  { once: true }
);

window.onload = setGuestName;

document.getElementById("mute-button").addEventListener("click", function () {
  var music = document.getElementById("audio");
  if (music.muted) {
    music.muted = false;
    this.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
  } else {
    music.muted = true;
    this.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInDown");
      } else {
        entry.target.classList.remove("animate__animated", "animate__fadeInDown");
      }
    });
  });

  document.querySelectorAll(".flowers").forEach((element) => {
    observer.observe(element);
  });
});

// Adding event listeners for touch events for swipe functionality
document.addEventListener("touchstart", startSwipe, false);
document.addEventListener("touchmove", moveSwipe, false);
document.addEventListener("touchend", endSwipe, false);
