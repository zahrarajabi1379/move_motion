const body = document.body;
const clouds = document.getElementById("clouds");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const forest = document.getElementById("forest");
const forestSound = document.getElementById("forestSound");
const rocks = document.getElementById("rocks");
const text = document.getElementById("text");
const btn = document.getElementById("btn");
const leftFish = document.getElementById("fishLeft");
const rightFish = document.getElementById("fishRight");
let currentScroll = 0;
const fishes = document.querySelectorAll(".littleFish");
const redFishes = document.querySelectorAll(".littleFishRight");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const owl = document.getElementById("owl");
const owlSound = document.getElementById("owlSound");
const lion = document.getElementById("lion");
const lionSound = document.getElementById("lionSound");
const sky = document.getElementById("sky"); // فرض بر این است که عنصر کلی آسمان است
const oceanSound = document.getElementById("oceanSound");

const sunriseHour = 6;
const sunsetHour = 18;
let currentDay = null;

const soundEnter = document.getElementById("soundEnter");
const soundExit = document.getElementById("soundExit");
let hasEnteredWater = false; // برای جلوگیری از تکرار

// تابع تشخیص شب یا روز بر اساس ساعت
function isDay() {
  const now = new Date().getHours();
  const isDay = now >= sunriseHour && now < sunsetHour;
  return { isDay, now };
}

window.addEventListener("scroll", function () {
  const value = window.scrollY;
  const viewportHeight = window.innerHeight;

  playForestSound()

  bird1.style.transform = `translateX(${value * 1.2}px) translateZ(${
    value * 0.5
  }px)`;
  bird2.style.transform = `translateX(${-value * 1.2}px) translateZ(${
    -value * 0.5
  }px)`;
  forest.style.bottom = value + "px";
  text.style.marginRight = value * 5 + "px";
  text.style.marginBottom = value * 1 + "px";
  rocks.style.bottom = value + "px";

  if (scrollY > viewportHeight * 0.4 && !hasEnteredWater) {
    // وارد منطقه آب شد
    soundEnter.play();
    hasEnteredWater = true;
  } else if (scrollY <= viewportHeight * 0.4 && hasEnteredWater) {
    // از منطقه آب خارج شد
    soundExit.play();
    hasEnteredWater = false;
  }

  // برای تعیین جهت حرکت دو تا ماهی
  if (scrollY > currentScroll) {
    rightFish.style.transform = "rotateY(0deg)";
    leftFish.style.transform = "rotateY(0deg)";
    currentScroll = scrollY;
  }
  if (scrollY < currentScroll) {
    rightFish.style.transform = "rotateY(180deg)";
    leftFish.style.transform = "rotateY(180deg)";
    currentScroll = scrollY;
  }

  // وقتی به منطقه آب رسیدی (مثلاً در 60% صفحه)
  if (scrollY > viewportHeight * 0.4) {
    leftFish.style.opacity = 1;
    leftFish.style.left = value * 1.5 + "px";
  }
  if (scrollY > viewportHeight * 0.9) {
    rightFish.style.opacity = 1;
    rightFish.style.right = value * 1.5 + "px";
  } else {
    leftFish.style.opacity = 0;
    rightFish.style.opacity = 0;
    leftFish.style.left = "-100px";
    rightFish.style.right = "-100px";
  }
});

window.addEventListener("DOMContentLoaded", function () {
  console.log("Forest played");
  playForestSound();
});

// تابع کنترل حجم صدا بر اساس اسکرول
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // منطقه شروع تا پایان جنگل
  const startForest = 0;
  const endForest = viewportHeight * 0.4; // مثلا 40% صفحه، جای جنگل است
  const startWater = viewportHeight * 0.6; // مثلا 60%، شروع منطقه آب

  if (scrollY <= endForest) {
    // در منطقه جنگل یا بالای آن، صدا کامل
    forestSound.volume = 1;
    oceanSound.volume = 0;
  } else if (scrollY > endForest && scrollY < startWater) {
    // مسیر کم شدن صدا وقتی می‌روی به سمت آب
    const progress = (scrollY - endForest) / (startWater - endForest);
    playOceanSound();
    // کم کردن حجم از 1 تا 0 بر اساس progress
    forestSound.volume = Math.max(0, 1 - progress);
    oceanSound.volume = Math.min(1, progress);
  } else {
    // رسیدن به آب، قطع کامل
    forestSound.volume = 0;
    oceanSound.volume = 1;
  }
});

function updateSunMoon() {
  const now = isDay().now;
  console.log(now);

  // مدت زمان حرکت روز یا شب
  const dayDuration = 12; // ساعت

  // محاسبه درصد تپه (0 تا 1) بین طلوع تا غروب
  let dayProgress = 0;
  if (now >= sunriseHour && now <= sunsetHour) {
    dayProgress = (now - sunriseHour) / dayDuration;
  } else if (now > sunsetHour) {
    // شب شروع
    dayProgress = (now - sunsetHour) / dayDuration;
  } else {
    // قبل از طلوع
    dayProgress = (now + 24 - sunsetHour) / dayDuration; // در ساعت‌های بعد از midnight
  }

  // موقعیت خورشید
  if (now >= sunriseHour && now <= sunsetHour) {
    // حرکت نیم‌دایره‌ایِ بالا
    const angle = Math.PI * dayProgress; // 0 تا π
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    sun.style.left = 50 + x * 50 + "%"; // حرکت از 0% تا 100%
    sun.style.top = 50 - y * 50 + "%"; // حرکت از پایین به بالا
    sun.style.opacity = 1;
  } else {
    // خورشید غروب کرده یا هنوز طلوع نکرده
    sun.style.opacity = 0;
  }

  // شبانه، ماه از سمت راست شروع می‌کند و نیم‌دایره‌ای بالا می‌رود
  // و در شب در وسط قرار می‌گیرد
  if (now >= sunsetHour || now < sunriseHour) {
    // حرکت نیم‌دایره‌ای برای ماه
    let moonProgress = 0;
    if (now >= sunsetHour) {
      moonProgress = (now - sunsetHour) / dayDuration;
    } else {
      moonProgress = (now + 24 - sunsetHour) / dayDuration;
    }

    const moonAngle = Math.PI * moonProgress;
    const mx = Math.cos(moonAngle);
    const my = Math.sin(moonAngle);
    moon.style.left = 50 + mx * 50 + "%";
    moon.style.top = 50 - my * 50 + "%";
    moon.style.opacity = 1;
  } else {
    // شب تمام شده، ماه پایین و سمت چپ
    moon.style.opacity = 0;
  }
}

updateScreen();
// setInterval(updateScreen, 6000);
// updateSunMoon();
// updateWaterLevelVisible();

// نشان دادن جغد روی درخت
function showOwlOnTree() {
  owl.style.display = "block";
  owl.style.position = "absolute";
  owl.style.top = "220px"; // ارتفاع روی درخت
  owl.style.left = "8%";
  owl.style.width = "70px";
  owl.style.zIndex = 102; // سمت چپ
}

// مخفی کردن جغد
function hideOwl() {
  owl.style.display = "none";
}

// نشان دادن شیر روی صخره
function showLion() {
  lion.style.display = "block";
  lion.style.position = "absolute";
  lion.style.left = "10%";
  lion.style.top = "320px";
  lion.style.width = "150px";
  lion.style.zIndex = 102;
}

// مخفی کردن شیر
function hideLion() {
  lion.style.display = "none";
}

function setDayTheme() {
  sky.classList.add("day");
  sky.classList.remove("night");
}

function setNightTheme() {
  sky.classList.add("night");
  sky.classList.remove("day");
}

function updateScene() {
  const is_Day = isDay().isDay;

  if (is_Day !== currentDay) {
    currentDay = is_Day;
    if (is_Day) {
      // روز شد، شیر برگرده روی صخره
      setDayTheme();
      showLion();
      hideOwl();
    } else {
      // شب شد، جغد بیاد روی درخت
      setNightTheme();
      showOwlOnTree();
      hideLion();
    }
  }
}

function updateScreen() {
  updateSunMoon();
  updateScene();
}

$(owl).on("click", function () {
  owlSound.currentTime = 0;
  owlSound.play();
});

$(lion).on("click", function () {
  lionSound.currentTime = 0;
  lionSound.play();
});

// هر چند ثانیه چک کن وضعیت
setInterval(updateScene, 5000); 
updateScene();



function playForestSound() {
  forestSound.loop = true;
  forestSound.volume = 1; 
  forestSound.play().catch((e) => {
      console.log("پخش خودکار ممکن است نیاز به تعامل کاربر داشته باشد");
  });
}

function playOceanSound() {
  oceanSound.loop = true;
  oceanSound.volume = 1; // اول بی‌صدا باشد
  oceanSound.play().catch((e) => {
    // اجرای autoplay ممکن است محدود باشد، نیاز به تعامل کاربر دارد
    console.log("پخش خودکار ممکن است نیاز به تعامل کاربر داشته باشد");
  });
}

fishes.forEach((fish) => {
  fish.speed = Math.random() * 2 + 1;

  const isMovingRight = Math.random() > 0.5;
  fish.direction = isMovingRight ? 1 : -1;

  if (fish.direction === -1) {
    fish.style.transform = "scaleX(-1)";
  }
});

redFishes.forEach((fish) => {
  fish.speed = Math.random() * 2 + 1;

  const isMovingLeft = Math.random() > 0.5;
  fish.direction = isMovingLeft ? 1 : -1;

  if (fish.direction === -1) {
    fish.style.transform = "scaleX(-1)";
  }
});

function updateFish() {
  fishes.forEach((fish) => {
    const currentLeft = parseFloat(fish.style.left);
    const newLeft = currentLeft + (fish.speed * fish.direction) / 20;
    fish.style.left = `${newLeft}%`;

    if (fish.direction === 1 && newLeft > 90) {
      fish.direction = -1;
      fish.style.transform = "scale(-1)";
    } else if (fish.direction === -1 && newLeft < 10) {
      fish.direction = 1;
      fish.style.transform = "scale(1)";
    }
  });

  redFishes.forEach((fish) => {
    const currentLeft = parseFloat(fish.style.left);
    const newLeft = currentLeft - (fish.speed * fish.direction) / 30;
    fish.style.left = `${newLeft}%`;

    if (fish.direction === -1 && newLeft > 90) {
      fish.direction = 1;
      fish.style.transform = "scale(1)";
    } else if (fish.direction === 1 && newLeft < 10) {
      fish.direction = -1;
      fish.style.transform = "scale(-1)";
    }
  });

  requestAnimationFrame(updateFish);
}

updateFish();

const apikey = "b1d63a3f460a03e91d03d73d807ef1ca";
const city = "Sari,Ir";

function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=fa`;

  $.getJSON(url, function (data) {
    console.log("Weather data:", data);
    const weatherMain = data.weather[0].main;
    const icon = data.weather[0].icon;
    const is_Day = isDay().isDay;
    updateSkyElements(is_Day, weatherMain);
    updateWaterLevel(is_Day);
    updateRain(weatherMain);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error(
      "Error fetching weather:",
      textStatus,
      errorThrown,
      jqXHR.responseText
    );
  });
}

fetchWeather();

function updateSkyElements(isDay, weatherMain) {
  const $sun = $("#sun");
  const $moon = $("#moon");
  const $clouds = $("#clouds");
  const $rain = $("#rain");
  console.log(weatherMain);
  console.log(isDay);

  switch (weatherMain) {
    case "Clouds": {
      $clouds.show();
      if (isDay) {
        $sun.css("opacity", 0.4);
        $moon.css("opacity", 0);
      } else {
        $sun.css("opacity", 0);
        $moon.css("opacity", 0.4);
      }
      break;
    }

    case "Rain": {
      $rain.show();
      if (isDay) {
        $sun.css("opacity", 0.4);
      } else {
        $moon.css("opacity", 0.4);
      }
      break;
    }

    default:
      $clouds.hide();
      $rain.hide();
      break;
  }
}
function createRainDrops() {
  const rainContainer = document.getElementById("rain");
  rainContainer.innerHTML = ""; 
  const numberOfDrops = 150; 
  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.className = "rain-drop";

    // قرار دادن تصادفی عرض و تاخیر شروع
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = Math.random() * 2 + "s";
    drop.style.transform = `rotate(${Math.random() * 15 - 7.5}deg)`;

    rainContainer.appendChild(drop);
  }
}

function updateRain(weatherMain) {
  const $rain = $("#rain");
  if (["Rain", "Drizzle", "Thunderstorm"].includes(weatherMain)) {
    $rain.show();
    createRainDrops();
  } else {
    $rain.hide();
  }
}

// هر ۱۰ دقیقه وضعیت رو بروزرسانی کن
fetchWeather();
setInterval(fetchWeather, 600000);

function updateWaterLevel(isDay) {
  const $water = $("#water");
  const $rocks = $("#rocks");

  if (isDay) {
    $water.css({ height: "250px" });
    $rocks.css({ bottom: "-150px" });
  } else {
    $water.css({ height: "auto" });
    $rocks.css({ bottom: "0px" });
  }
}

$(document).ready(function () {
  let smallSharkTriggered = false;
  let bigSharkTriggered = false;

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document.documentElement).height();
    const winHeight = $(window).height();
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    console.log(scrollPercent);

    if (scrollPercent >= 80 && !smallSharkTriggered) {
      smallSharkTriggered = true;

      const $smallShark = $("#smallShark");

      $smallShark.css({
        right: "-200px",
        left: "auto",
        display: "block",
        position: "absolute",
        transform: "scaleX(1)",
        transition: "right 2s linear, transform 0.5s",
      });

      setTimeout(() => {
        $smallShark.css("right", "50%");

        setTimeout(() => {
          $smallShark.css("transform", "scaleX(-1)");
          $smallShark.css("transition", "right 0.7s linear, transform 0.5s");

          setTimeout(() => {
            $smallShark.css("right", "-150px");

            setTimeout(() => {
              $smallShark.css("display", "none");
            }, 700);
          }, 100);
        }, 2000);
      }, 100);
    } else {
      smallSharkTriggered = false;
    }

    if (scrollPercent >= 90 && !bigSharkTriggered) {
      bigSharkTriggered = true;

      const $bigShark = $("#bigShark");

      $bigShark.css({
        left: "-900px",
        right: "auto",
        display: "block",
        position: "absolute",
        transform: "scaleX(1)",
        transition: "left 10s linear",
      });

      setTimeout(() => {
        $bigShark.css("left", "100%");
      }, 700);

      setTimeout(() => {
        $bigShark.css("display", "none");
      }, 11000);
    } else {
      bigSharkTriggered = false;
    }
  });
});

$(document).ready(function () {
  let scrollTimer;
  let isHookDown = false;

  function dropHook() {
    $("#black-line").css("height", "1000px");
    $("#fishing-hook").css("display", "block");
    isHookDown = true;
  }

  function resetHook() {
    $("#black-line").css("height", "0px");
    $("#fishing-hook").css("top", "0px");
    setTimeout(function () {
      $("#fishing-hook").css("display", "none");
    }, 2000);
    isHookDown = false;
  }

  function startInactivityTimer() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (!isHookDown) dropHook();
    }, 4000);
  }

  $(window).on("scroll", function () {
    if (isHookDown) {
      $("#black-line").css("transition", "height 3s ease-out");
      $("#fishing-hook").css("transition", "top 3s ease-out");
      resetHook();

      setTimeout(() => {
        $("#black-line").css("transition", "height 5s linear");
        $("#fishing-hook").css("transition", "top 5s linear");
      }, 1000);
    }
    startInactivityTimer();
  });
  startInactivityTimer();
});

function updateWaterLevelVisible() {
  const moonVisible = $("#moon")?.css("display") !== "none";
  if (moonVisible) {
    $("#water").css({ zIndex: "85" });
    $("#rocks").css({ zIndex: "81" });
  } else {
    $("#water").css({ zIndex: "81" });
    $("#rocks").css({ zIndex: "85" });
  }
}
$(document).ready(function () {
  updateWaterLevelVisible();
});
