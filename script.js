let startY;

function startSwipe(event) {
    startY = event.touches[0].clientY;
}

function moveSwipe(event) {
    const currentY = event.touches[0].clientY;
    const diffY = startY - currentY;

    if (diffY > 50) { // Swipe up threshold
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
    const guestName = getQueryParameter('to');
    if (guestName) {
        document.getElementById('guest-name-desktop').innerText = guestName;
        document.getElementById('guest-name-mobile').innerText = `Dear: ${guestName}`;
        document.getElementById('valid-for-desktop').innerText = "Valid for 1 person";
        document.getElementById('valid-for-mobile').innerText = "Valid for 1 person";
    }
}

function transitionDesktop() {
    const introDesktop = document.getElementById('intro-desktop');
    const mainContainer = document.getElementById('main-container');
    introDesktop.classList.add('slide-up');
    setTimeout(() => {
        introDesktop.style.display = 'none';
        mainContainer.style.display = 'flex';
    }, 1000);
}

function transitionMobile() {
    const introMobile = document.getElementById('intro-mobile');
    const mainContainer = document.getElementById('main-container');
    introMobile.classList.add('slide-up');
    setTimeout(() => {
        introMobile.style.display = 'none';
        mainContainer.style.display = 'block';
    }, 1000);
}

document.addEventListener('click', function() { document.getElementById('audio').play() }, { once: true });

window.onload = setGuestName;

