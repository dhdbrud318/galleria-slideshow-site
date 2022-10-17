const slideButton = document.querySelector("#slide-btn");
const thumbnails = document.querySelectorAll(".main__article");

let slideshowToggle = "false";

slideButton.addEventListener("click", (e) => {
  localStorage.setItem("currentDataIndex", 0);
  slideshowToggle = slideButton.getAttribute("active-state");
  if (slideshowToggle === "true") {
    slideButton.setAttribute("active-state", "false");
    localStorage.setItem("showActive", false);
    slideButton.innerText = "start slideshow";
    stopSlideShow();
  } else {
    slideButton.setAttribute("active-state", "true");
    localStorage.setItem("showActive", true);
    slideButton.innerText = "stop slideshow";
    startSlideShow();
  }
});

thumbnails.forEach((th) => {
  th.addEventListener("click", () => {
    localStorage.setItem("currentDataIndex", parseInt(th.dataset.indexNumber));
    location.href = "./slide.html";
  });
});
