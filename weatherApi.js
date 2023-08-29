const searchButton = document.querySelector(".search-box button"),
  notFaund = document.querySelector(".not-found"),
  weatherBox = document.querySelector(".weather-box"),
  weatherDitails = document.querySelector(".weather-ditails"),
  container = document.querySelector(".container");
  

searchButton.addEventListener("click", () => {
  let city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod === '404') {
        container.style.height = "400px";
        notFaund.classList.add("fadeIn");
        notFaund.style.display = "block";
        weatherDitails.style.display = "none";
        weatherBox.style.display = "none";
      return;

      }
      notFaund.classList.remove("fadeIn");
      notFaund.style.display = "none";

      const img = document.querySelector(".weather-box img"),
        temp = document.querySelector(".weather-box .temperature"),
        description = document.querySelector(".weather-box .description"),
        humidity = document.querySelector(".weather-ditails .humidity span"),
        wind = document.querySelector(".wind span");

      switch (data.weather[0].main) {
        case "Clouds":
          img.src = "img/cloud.png";
          break;

        case "Clear":
          img.src = "img/clear.png";
          break;
        case "Rain":
          img.src = "img/rain.png";
          break;
        case "Snow":
          img.src = "img/snow.png";
          break;
        case "Haze":
          img.src = "img/mist.png";
          break;
        default:
          img.src = "";
      }
      temp.innerHTML = `${Math.floor(data.main["temp"])}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
       humidity.innerHTML = `${data.main.humidity}%`;
       wind.innerHTML = `${data.wind.speed} Km/h`;

      weatherBox.style.display = "";
      weatherDitails.style.display = "";
      container.style.height = "550px";
      weatherBox.classList.add("fadeIn");
      weatherDitails.classList.add("fadeIn");

      let btn = `<button class="btnClear">
      <i class="fa-solid fa-circle-xmark fa-2x"style='color:#fcdf99'></i>
      </button>`; 
  
          container.insertAdjacentHTML('afterbegin',btn);
       
const btnClear = document.querySelector('.btnClear');
         btnClear.addEventListener('click',()=>{
          
        container.style.display = 'none';
        location.reload();
        });
    });
    
});


