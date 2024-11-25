// edit configs
const TOTAL_ON_SCREEN = 3; // must be odd && < SRCs.length
const IMAGES_PER_SIDE = (TOTAL_ON_SCREEN - 1) / 2;
const ROTATE_TIMER = 5000;

// links to images
const SRCs = [
  "../../library/plan/Library-Project-Layout.png",
  "../../tic-tac-toe/plan/tic-tac-toe-layout.png",
  "../../todo-list/todo-layout-plan.png",
  "../../odin-links-and-images/images/dog.jpg",
  "../../admin-dashboard/img/dashboard-project.png",
];

const CAROUSEL = document.querySelector(".image-carousel");
const CAROUSEL_FRAME = CAROUSEL.querySelector(".image-carousel-frame");

const IMAGES = [];
const NAV_BUTTONS = [];
let ON_SCREEN = [];
let currentIndex = 0;
let countdown = window.setInterval(rotateCarousel, ROTATE_TIMER);

initialise();
document.addEventListener("click", clickHandler);

function clickHandler(event) {
  if (event.target.id.slice(0, 13) === "carousel-nav-") {
    const clickIndex = +event.target.id.slice(13);
    if (clickIndex !== currentIndex) rotateCarousel(clickIndex - currentIndex);
  }
  switch (event.target.className.baseVal) {
    case "right-arrow":
      rotateCarousel(1);
      break;
    case "left-arrow":
      rotateCarousel(-1);
      break;
  }
}

function initialise() {
  CAROUSEL_FRAME.remove();
  createNodes();
  createNavButtons();
  rotateCarousel(0);
}

// create element nodes for each linked img
function createNodes() {
  for (let i in SRCs) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", SRCs[i]);
    IMAGES.push(newImg);
  }
}

function createNavButtons() {
  const navDiv = document.querySelector(".carousel-nav");
  for (let i in SRCs) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", `carousel-nav-${i}`);
    navDiv.appendChild(newDiv);
    NAV_BUTTONS.push(newDiv);
  }

  // index 0 is toggled 2x during initialisation
  toggleNavButton(0);
}

function toggleNavButton(index) {
  NAV_BUTTONS[index].classList.toggle("current");
}

// place img on 1 side of carousel from startIdx
function placeImages(startIdx) {
  for (let i = 0; i < IMAGES_PER_SIDE; i++) {
    CAROUSEL.appendChild(IMAGES.at(startIdx));
    ON_SCREEN.push(IMAGES.at(startIdx));
    if (++startIdx >= IMAGES.length) startIdx = 0;
  }
}

// rotate carousel --> by num
function rotateCarousel(num = 1) {
  removeImages();
  toggleNavButton(currentIndex);
  clearInterval(countdown);

  // keep currentIndex within index bounds
  currentIndex = currentIndex + num + IMAGES.length;
  currentIndex = currentIndex % IMAGES.length;

  toggleNavButton(currentIndex);

  // place left side of frame
  placeImages(currentIndex - IMAGES_PER_SIDE);

  // place frame & main img
  CAROUSEL.appendChild(CAROUSEL_FRAME);
  CAROUSEL_FRAME.appendChild(IMAGES[currentIndex]);
  ON_SCREEN.push(IMAGES[currentIndex]);

  // place right side of frame
  placeImages((currentIndex + 1) % 5);
  countdown = window.setInterval(rotateCarousel, ROTATE_TIMER);
}

function removeImages() {
  for (let i in ON_SCREEN) {
    ON_SCREEN[i].remove();
  }
  ON_SCREEN = [];
}
