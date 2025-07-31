let API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=";
let API_KEY = "0ce92077d14c915394b1f346e9283bb0";

let searchBox = document.querySelector("#searchBox");
let searchButton = document.querySelector("#searchButton");
let tempIcon = document.querySelector("#tempIcon");
let tempBox = document.querySelector("#tempBox");
let cityBox = document.querySelector("#cityBox");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let errorBox = document.querySelector("#error");
let infoBox = document.querySelector("#infoBox");


searchButton.addEventListener("click", ()=>{
  let city = searchBox.value;
  searchBox.value="";
  weatherAPI(city);
})


async function weatherAPI(city) {
  let res = await fetch(API_URL+`${API_KEY}&q=${city}`);
  let data = await res.json();
  
  if(data.cod==404){
    infoBox.style.display = "none";
    errorBox.style.display = "block";
    return;
  }
  else {
    infoBox.style.display = "block";
    errorBox.style.display = "none";
  }

  tempBox.innerText = `${Math.round(data.main.temp)}°C`;
  cityBox.innerText = data.name;
  humidity.innerText = `${Math.round(data.main.humidity)}%`;
  windSpeed.innerText = `${Math.round(data.wind.speed)}km/h`;

  let temp = Math.round(data.main.temp);
  if (temp < 15) {
    tempIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  } else if (temp < 25) {
    tempIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else {
    tempIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
}