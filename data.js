let data;
let idArry;

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((d) => {
    data = d;
    idArry = data.map((el) => el.name.toLowerCase().replaceAll(" ", "-"));
  })
  .catch((e) => {
    console.log(e);
  });
