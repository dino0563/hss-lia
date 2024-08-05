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
    document.getElementById("guest-name-desktop").innerText = guestName;
    document.getElementById("guest-name-mobile").innerText = `Dear: ${guestName}`;
    document.getElementById("valid-for-desktop").innerText = "Valid for 1 person";
    document.getElementById("valid-for-mobile").innerText = "Valid for 1 person";
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

document.addEventListener("click", function () {
  document.getElementById("audio").play();
}, { once: true });

window.onload = setGuestName;

document.getElementById("mute-button").addEventListener("click", function () {
  const music = document.getElementById("audio");
  const muteButton = document.getElementById("mute-button");
  if (music.muted) {
    music.muted = false;
    muteButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
  } else {
    music.muted = true;
    muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
  }
});

  const googleCalendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lia's+Birthday+Dinner&dates=20240805T093000Z/20240805T110000Z&details=Birthday+Dinner+at+OURA+-+Cafe+%26+Restaurant&location=Jl.+Pahlawan+Trip+No.A11%2C+Oro-oro+Dowo%2C+Kec.+Klojen%2C+Kota+Malang%2C+Jawa+Timur+65112";
  const icsFileLink = "./reminder.ics";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  document.getElementById("calendarLink").href = isIOS ? icsFileLink : googleCalendarLink;

  function countdown() {
    const targetDate = new Date('2024-08-25T16:30:00+07:00'); // Waktu dalam WIB (GMT+7)
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(interval);
        document.getElementById('days').innerText = '0';
        document.getElementById('hours').innerText = '0';
        document.getElementById('minutes').innerText = '0';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
}

const interval = setInterval(countdown, 60000); // Perbarui setiap menit
countdown();


document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate__animated');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const animationClass = entry.target.dataset.animation;
              entry.target.classList.add(animationClass);
              // Optionally, unobserve the element after it has animated in
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1 // You can adjust this threshold value to trigger the animation sooner or later
  });

  elements.forEach(element => {
      observer.observe(element);
  });
});