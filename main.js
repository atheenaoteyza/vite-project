import "./style.css";
/*const apiKey = "TWvM_zLxG9ar3m65o0pYxe_7lbNpXHpmhsKc_eR4Qbs";*/

async function fetchMessage(url) {
  const response = await fetch(url);
  const body = await response.json();
  const { results } = body;
  return results;
}

function getUrl(input) {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=TWvM_zLxG9ar3m65o0pYxe_7lbNpXHpmhsKc_eR4Qbs`;
  return url;
}

function getImgSrc(urlsArray) {
  const { urls } = urlsArray;
  return urls.raw;
}

function getArrayOfImgUrl(fetchedResult) {
  let newArray = [];
  fetchedResult.forEach((element) => {
    newArray.push(getImgSrc(element));
  });
  return newArray;
}

async function switchBg(array) {
  const flexItems = document.querySelectorAll(".flex-items");
  document.querySelector(
    ".background"
  ).style.backgroundImage = `url(${array[1]})`;
  for (let i = 0; i < array.length; i++) {
    if (i < array.length) {
      flexItems[i].style.backgroundImage = `url(${array[i]})`;
    }
  }
}

async function render(url) {
  if (url) {
    const results = await fetchMessage(url);
    const arrayOfImages = getArrayOfImgUrl(results);
    await switchBg(arrayOfImages);
  }
}

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  let cityValue = getUrl(input.value);
  render(cityValue);
  input.value = "";
});

document.addEventListener("DOMContentLoaded", async () => {
  const flexItems = document.querySelectorAll(".flex-items");

  flexItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageUrl = window.getComputedStyle(item).backgroundImage;
      document.querySelector(".background").style.backgroundImage = imageUrl;
    });
  });
});
