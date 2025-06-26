const clouds = document.getElementById("clouds");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const forest = document.getElementById("forest");
const rocks = document.getElementById("rocks");
const text = document.getElementById("text");
const btn = document.getElementById("btn");
const leftFish = document.getElementById("fishLeft");
const rightFish = document.getElementById("fishRight");
let currentScroll = 0;
const fishes = document.querySelectorAll(".littleFish");
console.log(fishes);
const redFishes = document.querySelectorAll(".littleFishRight");

const soundEnter = document.getElementById("soundEnter");
const soundExit = document.getElementById("soundExit");
let hasEnteredWater = false; // برای جلوگیری از تکرار

window.addEventListener("scroll", function () {
  value = window.scrollY;
  const viewportHeight = window.innerHeight;

  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // clouds.style.top = value + 'px';
  bird1.style.transform = `translateX(${value * 1.2}px) translateZ(${
    value * 0.5
  }px)`;
  bird2.style.transform = `translateX(${-value * 1.2}px) translateZ(${
    -value * 0.5
  }px)`;
  // forest.style.top = value + 'px';
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

  // console.log(this.screenY);

  // وقتی به منطقه آب رسیدی (مثلاً در 60% صفحه)
  if (scrollY > currentScroll) {
    // console.log("scrollY::", scrollY);
    // console.log("currentScroll::", currentScroll);
    rightFish.style.transform = "rotateY(0deg)";
    leftFish.style.transform = "rotateY(0deg)";
    currentScroll = scrollY;
  }
  if (scrollY < currentScroll) {
    rightFish.style.transform = "rotateY(180deg)";
    leftFish.style.transform = "rotateY(180deg)";
    currentScroll = scrollY;
  }

  if (scrollY > windowHeight * 0.4) {
    leftFish.style.opacity = 1;
    leftFish.style.left = value * 1.5 + "px";
  }
  if (scrollY > windowHeight * 0.9) {
    rightFish.style.opacity = 1;
    rightFish.style.right = value * 1.5 + "px";
  } else {
    leftFish.style.opacity = 0;
    rightFish.style.opacity = 0;
    leftFish.style.left = "-100px";
    rightFish.style.right = "-100px";
  }
});

function updateSunMoon() {
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;

  // ساعت محلی ساری:
  // فرض بر این است که ساعت محلی در این کد درست باشد

  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");

  // ساعات طلوع و غروب
  const sunriseHour = 6; // 6 صبح
  const sunsetHour = 18; // 6 غروب

  // مدت زمان حرکت روز یا شب
  const dayDuration = 12; // ساعت

  // محاسبه درصد تپه (0 تا 1) بین طلوع تا غروب
  let dayProgress = 0;
  if (hours >= sunriseHour && hours <= sunsetHour) {
    dayProgress = (hours - sunriseHour) / dayDuration;
  } else if (hours > sunsetHour) {
    // شب شروع
    dayProgress = (hours - sunsetHour) / dayDuration;
  } else {
    // قبل از طلوع
    dayProgress = (hours + 24 - sunsetHour) / dayDuration; // در ساعت‌های بعد از midnight
  }

  // موقعیت خورشید
  if (hours >= sunriseHour && hours <= sunsetHour) {
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
  if (hours >= sunsetHour || hours < sunriseHour) {
    // حرکت نیم‌دایره‌ای برای ماه
    let moonProgress = 0;
    if (hours >= sunsetHour) {
      moonProgress = (hours - sunsetHour) / dayDuration;
    } else {
      moonProgress = (hours + 24 - sunsetHour) / dayDuration;
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

setInterval(updateSunMoon, 60000);
updateSunMoon();
updateWaterLevelVisible();

// تابع تشخیص شب یا روز بر اساس ساعت
// تابع بررسی شب یا روز
function checkDayNight() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6; // شب از ۷ شب تا ۶ صبح
}

let currentNight = null;

function updateScene() {
  const isNight = checkDayNight();
  if (isNight !== currentNight) {
    currentNight = isNight;
    if (isNight) {
      // شب شد، جغد بیاد روی درخت
      document.body.style.backgroundColor = "#001d3d"; // پس‌زمینه شب
      showOwlOnTree();
      hideLion();
    } else {
      // روز شد، شیر برگرده روی صخره
      document.body.style.backgroundColor = "#87CEFA"; // پس‌زم background روز
      showLion();
      hideOwl();
    }
  }
}

function updateSky() {
  const now = new Date();
  const hours = now.getHours();
  const sky = document.getElementById("sky"); // فرض بر این است که عنصر کلی آسمان است

  if (hours >= 18 || hours < 6) {
    // از 6 بعدازظهر تا 6 صبح -> هوا تاریک
    sky.classList.add("night");
    sky.classList.remove("day");
  } else {
    // از 6 صبح تا 6 بعدازظهر -> هوا روشن
    sky.classList.add("day");
    sky.classList.remove("night");
  }
}

// در هر دقیقه چک کن
setInterval(updateSky, 60000);
// اول کار هم اجرا کن
updateSky();

// نشان دادن جغد روی درخت
function showOwlOnTree() {
  const owl = document.getElementById("owl");
  owl.style.display = "block";
  owl.style.position = "absolute";
  owl.style.top = "220px"; // ارتفاع روی درخت
  owl.style.left = "8%";
  owl.style.width = "70px";
  owl.style.zIndex = 100; // سمت چپ
}

const owlImg = document.getElementById("owl");

const owlSound = new Audio("assets/audios/owl-sound-sherlock.mp3");
$("#owl").on("click", function () {
  const owlSound = document.getElementById("owlSound");
  owlSound.currentTime = 0;
  owlSound.play();
});
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const owl = document.getElementById("owl");

  // مثال:

  // حرکت عمودی
  // owl.style.top = 300 + scrollY * 0.5 + "px";

  // محو شدن با افزایش اسکرول
  if (scrollY > 200) {
    owl.style.opacity = Math.max(1 - (scrollY - 200) / 200, 0);
  } else {
    owl.style.opacity = 1;
  }

  // می‌تونی `z-index` رو هم تغییر بدی
  if (scrollY > 300) {
    owl.style.zIndex = -1; // برگرد اون پشت درخت و سنگ
  } else {
    owl.style.zIndex = 100; // روی درخت و سنگ
  }
});

// مخفی کردن جغد
function hideOwl() {
  document.getElementById("owl").style.display = "none";
}

const lionImage = document.getElementById("lion");
$("#lion").on("click", function () {
  const lionSound = document.getElementById("lionSound");
  lionSound.currentTime = 0;
  lionSound.play();
});

document.getElementById("owl").addEventListener("click", (e) => {
  e.stopPropagation();
  owlSound.currentTime = 0;
  owlSound.play();
});
// نشان دادن شیر روی صخره
function showLion() {
  const lion = document.getElementById("lion");
  lion.style.display = "block";
  lion.style.position = "absolute";
  lion.style.left = "10%";
  lion.style.top = "320px";
  lion.style.width = "150px";
  lion.style.zIndex = 100;
}

// مخفی کردن شیر
function hideLion() {
  document.getElementById("lion").style.display = "none";
}

// هر چند ثانیه چک کن وضعیت
setInterval(updateScene, 5000); // هر ۵ ثانیه
// اجرای اولیه
updateScene();

const forestSound = document.getElementById("forestSound");

// قبل از هر کار، حتما پخش را شروع کن
forestSound.loop = true;
forestSound.volume = 1; // اول کامل باشد
forestSound.play().catch((e) => {
  // اجرای autoplay ممکن است محدود باشد، نیاز به تعامل کاربر دارد
  console.log("پخش خودکار ممکن است نیاز به تعامل کاربر داشته باشد");
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
  } else if (scrollY > endForest && scrollY < startWater) {
    // مسیر کم شدن صدا وقتی می‌روی به سمت آب
    const progress = (scrollY - endForest) / (startWater - endForest);
    // کم کردن حجم از 1 تا 0 بر اساس progress
    forestSound.volume = Math.max(0, 1 - progress);
  } else {
    // رسیدن به آب، قطع کامل
    forestSound.volume = 0;
  }
});

const oceanSound = document.getElementById("oceanSound");

// اطمینان از شروع پخش
try {
  forestSound.play();
  oceanSound.play();
  oceanSound.volume = 0;
} catch (e) {
  console.log("پخش صدا نیاز به تعامل کاربر دارد.");
}

// function moveFish(fish) {
//   const maxTop = 105; // بیشترین ارتفاع
//   const minTop = 95; // کمترین ارتفاع، برای حرکت روی سطح آب
//   const maxLeft = 90; // بر حسب درصد یا پیکسل
//   const minLeft = 0;

//   // تصادفی موقعیت جدید
//   const newTop = Math.random() * (maxTop - minTop) + minTop + "%";
//   const newLeft = Math.random() * (maxLeft - minLeft) + minLeft * 4 + "%";

//   fish.style.top = newTop;
//   fish.style.left = newLeft;
// }
//******************************* */

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

//******************************* */
// کنترل حجم صدا بر اساس اسکرول
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // document.querySelectorAll(".littleFish, .littleFishRight").forEach((fish) => {
  //   setInterval(moveFish(fish), 10000);
  //   moveFish(fish);
  // });

  const startWaterZone = viewportHeight * 0.6; // شروع منطقه آب
  const endWaterZone = viewportHeight * 5; // پایان منطقه آب

  if (scrollY >= startWaterZone && scrollY <= endWaterZone) {
    // داخل منطقه آب، صدای کامل
    oceanSound.volume = 1;
  } else if (scrollY > endWaterZone && scrollY < startWaterZone) {
    // نزدیک سطح آب و کم کردن حجم
    const progress = (scrollY - endWaterZone) / (startWaterZone - endWaterZone);
    oceanSound.volume = Math.max(0, 1 - progress);
  } else {
    // خارج از منطقه آب، خاموش
    oceanSound.volume = 0;
  }
});

// $.ajax({
//   url: `https://api.openweathermap.org/data/2.5/weather?q=Sari&appid=$b1d63a3f460a03e91d03d73d807ef1ca&units=metric`,
//   method: 'GET',
//   success: function(data) {
//     const weatherMain = data.weather[0].main;
//     if (weatherMain === 'Rain') {
//       showRain();
//     } else if (weatherMain === 'Clouds') {
//       showClouds();
//     } else if (weatherMain === 'Clear') {
//       showClear();
//     }
//   },
//   error: function() {
//     console.error('Error fetching weather data');
//   }
// });

const apikey = "b1d63a3f460a03e91d03d73d807ef1ca";
const city = "Sari,IR";

function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=fa`;

  $.getJSON(url, function (data) {
    console.log("Weather data:", data);
    const weatherMain = data.weather[0].main;
    const icon = data.weather[0].icon;
    const isDay = icon.endsWith("d");
    updateSkyElements(isDay, weatherMain);
    updateWaterLevel(isDay);
    updateRain(weatherMain);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Error fetching weather:", textStatus, errorThrown, jqXHR.responseText);
  });
}

function updateSkyElements(isDay, weatherMain) {
  const $sun = $("#sun");
  const $moon = $("#moon");
  const $clouds = $("#clouds");
  const $rain = $("#rain");

  if (isDay) {
    $sun.show();
    $moon.hide();
  } else {
    $moon.show();
    $sun.hide();
  }

  if (weatherMain === "Clouds") {
    $clouds.show();
    if (isDay) {
      $sun.css("opacity", 0.4);
    } else {
      $moon.css("opacity", 0.4);
    }
  } else {
    $clouds.hide();
  }
}
function createRainDrops() {
  const rainContainer = document.getElementById("rain");
  rainContainer.innerHTML = ""; // پاک کردن قطرات قدیمی
  const numberOfDrops = 150; // تعداد قطره‌های باران

  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.className = "rain-drop";

    // قرار دادن تصادفی عرض و تاخیر شروع
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = (Math.random() * 2) + "s";
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
setInterval(fetchWeather, 10 * 60 * 1000);

function updateWaterLevel(isDay) {
  const $water = $("#water");
  const $rocks = $("#rocks");

  if (isDay) {
    $water.css("height", "250px");
    $rocks.css("bottom", "-150px");
  } else {
    $water.css("height", "100px");
    $rocks.css("bottom", "0px");
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
  // const moonVisible = true;
  const moonVisible = $("#moon")?.css("display") !== "none";
  if (moonVisible) {
    $("#water").css({ zIndex: "85" });
    $("#rocks").css({ zIndex: "81" });
  } else {
    $("#water").css({ zindex: "81" });
    $("#rocks").css({ zIndex: "85" });
  }
}
$(document).ready(function () {
  updateWaterLevelVisible();
});
