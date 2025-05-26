let clouds = document.getElementById('clouds');
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById('bird2');
let forest = document.getElementById('forest');
let rocks = document.getElementById('rocks');
let text = document.getElementById('text');
let btn = document.getElementById('btn');

const soundEnter = document.getElementById('soundEnter');
const soundExit = document.getElementById('soundExit');
let hasEnteredWater = false; // برای جلوگیری از تکرار 

window.addEventListener('scroll' , function(){
value = window.scrollY
const viewportHeight = window.innerHeight;

const pageHeight = document.documentElement.scrollHeight;
const windowHeight = window.innerHeight;

clouds.style.top = value + 'px';
bird1.style.transform = `translateX(${value * 1.2}px) translateZ(${value * 0.5}px)`;
bird2.style.transform = `translateX(${-value * 1.2}px) translateZ(${-value * 0.5}px)`;
forest.style.top = value + 'px';
text.style.marginRight = value * 5 + 'px';
text.style.marginBottom = value * 1 + 'px';
rocks.style.bottom = value + 'px';

if (scrollY > viewportHeight * 0.4 && !hasEnteredWater) {
  // وارد منطقه آب شد
  soundEnter.play();
  hasEnteredWater = true;
} else if (scrollY <= viewportHeight * 0.4 && hasEnteredWater) {
  // از منطقه آب خارج شد
  soundExit.play();
  hasEnteredWater = false;
}

 // وقتی به منطقه آب رسیدی (مثلاً در 60% صفحه)
 if (scrollY > windowHeight * 0.4) {
  document.getElementById('fishLeft').style.opacity = 1;
  document.getElementById('fishLeft').style.left = value +'px';
} if(scrollY > windowHeight * 0.9){
  document.getElementById('fishRight').style.opacity = 1;
  document.getElementById('fishRight').style.right = value +'px';
} else {
  document.getElementById('fishLeft').style.opacity = 0;
  document.getElementById('fishRight').style.opacity = 0;
  document.getElementById('fishLeft').style.left = '-100px';
  document.getElementById('fishRight').style.right = '-100px';
}

// وارد شدن کوسه ها
if (scrollY > pageHeight * 0.75) {
    const smallShark = document.getElementById('smallShark');
  smallShark.style.opacity = 1;
  smallShark.style.right = '10%';

  // بعد 3 ثانیه برگرده
  setTimeout(() => {
      smallShark.style.opacity = 0;
      smallShark.style.right = '-200px';

      // کوسه بزرگ از چپ بیاد بیرون بعد
      setTimeout(() => {
          const bigShark = document.getElementById('bigShark');
          bigShark.style.opacity = 1;
          bigShark.style.left = '10%';

          // بعد برگرده
          setTimeout(() => {
              bigShark.style.opacity = 0;
              bigShark.style.left = '-200px';
          }, 3000);
      }, 3000); // بعد از ظهور کوسه کوچک، کوسه بزرگ بیاد
  }, 3000);
}
});

function updateDayNight() {
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;

  const sky = document.getElementById('sky');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  if (hours >= 6 && hours < 18) {
    // روز
    sky.style.backgroundColor = '#87ceeb'; // آسمان روشن
    // حرکت خورشید از راست به وسط
    const progress = (hours - 6) / 12; // 0 تا 1
    sun.style.left = (100 - progress * 50) + '%'; // 100% تا 50%
    sun.style.opacity = 1;
    moon.style.opacity = 0;
  } else {
    // شب
    sky.style.backgroundColor = '#0d1b2a'; // آسمان تاریک
    if (hours >= 18) {
      // غروب
      const progress = (hours - 18) / 12; // 0 تا 1
      // خورشید خارج شده
      sun.style.left = (50 - progress * 50) + '%'; // 50% تا 0%
      sun.style.opacity = 0;
      // ماه بیاد وسط
      moon.style.opacity = 1;
      moon.style.left = '50%'; // ثابت در وسط
    } else {
      // صبح زود قبل از 6 صبح
      const progress = hours / 6; // 0 تا 1
      moon.style.opacity = 0;
      // در حال طلوع ماه، می‌تونی اضافه کنی که ماه بیاد بالا یا وسط؟!
    }
  }
}

// اجرای منظم هر دقیقه
setInterval(updateDayNight, 60000);
updateDayNight(); 

$.ajax({
  url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${b1d63a3f460a03e91d03d73d807ef1ca}&units=metric`,
  method: 'GET',
  success: function(data) {
    const weatherMain = data.weather[0].main;
    if (weatherMain === 'Rain') {
      showRain();
    } else if (weatherMain === 'Clouds') {
      showClouds();
    } else if (weatherMain === 'Clear') {
      showClear();
    }
  },
  error: function() {
    console.error('Error fetching weather data');
  }
});