window.onload = () => {
  const grid = document.querySelector(".grid");
  const masorny = new Masonry(grid, {
    percentPosition: true,
    itemSelector: ".grid-item",
    // gutter: ".gutter-sizer",

    gutter: 40,
    horizontalOrder: true,
  });
};
