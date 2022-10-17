const logo = document.querySelector(".primary-header__logo");
const viewButton = document.querySelector(".view-btn");
const closeButton = document.querySelector("#close-btn");
const galleryModal = document.querySelector(".overlay");
const [previousButton, nextButton] = document.querySelectorAll("svg");
const progressBar = document.querySelector(".footer__status-current");
const pageWarning = document.querySelector(".warning");

// slideshow attrs
const showHeroLarge = document.querySelector("source");
const showHeroSmall = document.querySelector("#hero-image");
const showTitle = document.querySelector("#main-title");
const showArtist = document.querySelector("#main-artist");
const showArtistImg = document.querySelector("#artist");
const showYear = document.querySelector("#year");
const showDesc = document.querySelector("#description");
const showSource = document.querySelector("#source");
const showGalleryImg = document.querySelector("#gallery-img");
const showFtTitle = document.querySelector("#ft-title");
const showFtArtist = document.querySelector("#ft-artist");

let data;
let interval;
let currentDataIndex = parseInt(localStorage.getItem("currentDataIndex"));
const showActive = localStorage.getItem("showActive");

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((d) => {
    data = d;
    fillSlideShow();
  })
  .catch((e) => {
    console.log(e);
  });

if (showActive === "true") {
  slideButton.innerText = "stop slideshow";
  startSlideShow();
} else {
  slideButton.innerText = "start slideshow";
}

viewButton.addEventListener("click", () => {
  galleryModal.classList.add("active");
  stopSlideShow();
});

closeButton.addEventListener("click", () => {
  galleryModal.classList.remove("active");
});

nextButton.addEventListener("click", (e) => {
  if (currentDataIndex < 14) {
    pageWarning.classList.remove("animation");
    currentDataIndex++;
    fillSlideShow();
  } else if (currentDataIndex === 14) {
    pageWarning.innerText = "last page!";
    pageWarning.classList.add("animation");
  }
});

previousButton.addEventListener("click", () => {
  if (currentDataIndex > 0) {
    currentDataIndex--;
    console.log("toggled", currentDataIndex);

    pageWarning.classList.remove("animation");
    fillSlideShow();
  } else if (currentDataIndex === 0) {
    pageWarning.innerText = "first page!";
    pageWarning.classList.add("animation");
    pageWarning.disabled = true;
  }
});

logo.addEventListener("click", () => {
  stopSlideShow();
  localStorage.setItem("currentDataIndex", 0);
  console.log("clicked");
});

function fillSlideShow() {
  // console.log("in func:", currentDataIndex);
  const d = data[currentDataIndex];

  showHeroLarge.setAttribute("srcset", d.images.hero.large);
  showHeroSmall.setAttribute("src", d.images.hero.small);

  // title
  showTitle.innerText = d.name;
  showFtTitle.innerText = d.name;

  //artist
  showArtist.innerText = d.artist.name;
  showFtArtist.innerText = d.artist.name;
  showArtistImg.setAttribute("srcset", d.artist.image);

  //year
  showYear.innerText = d.year;

  //description
  showDesc.innerText = d.description;

  showSource.setAttribute("href", d.source);
  showGalleryImg.setAttribute("src", d.images.gallery);

  localStorage.setItem("currentDataIndex", currentDataIndex);
  fillProgressbar();
}

function fillProgressbar() {
  const progress = Math.floor(((currentDataIndex + 1) / data.length) * 100);
  progressBar.style.width = `${progress}%`;
}

function startSlideShow() {
  if (!interval)
    interval = setInterval(
      () => {
        fillSlideShow();
        currentDataIndex++;

        if (currentDataIndex === 15) {
          console.log("done");
          stopSlideShow();
        }
      },
      1000,
      this
    );
}

function stopSlideShow() {
  slideButton.setAttribute("active-state", "false");
  localStorage.setItem("showActive", false);
  clearInterval(interval);
  interval = null;
  slideButton.innerText = "start slideshow";
}
