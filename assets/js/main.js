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
});



function updateSunMoon() {
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;

  // ساعت محلی ساری:
  // فرض بر این است که ساعت محلی در این کد درست باشد

  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  // ساعات طلوع و غروب
  const sunriseHour = 6;   // 6 صبح
  const sunsetHour = 18;   // 6 غروب

  // مدت زمان حرکت روز یا شب
  const dayDuration = 12;  // ساعت

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
    sun.style.left = (50 + x * 50) + '%'; // حرکت از 0% تا 100%
    sun.style.top = (50 - y * 50) + '%';  // حرکت از پایین به بالا
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
    moon.style.left = (50 + mx * 50) + "%";
    moon.style.top = (50 - my * 50) + "%";
    moon.style.opacity = 1;
  } else {
    // شب تمام شده، ماه پایین و سمت چپ
    moon.style.opacity = 0;
  }
}

setInterval(updateSunMoon, 60000);
updateSunMoon();



// تابع تشخیص شب یا روز بر اساس ساعت
// تابع بررسی شب یا روز
function checkDayNight() {
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 6); // شب از ۷ شب تا ۶ صبح
}

let currentNight = null;

function updateScene() {
  const isNight = checkDayNight();
  if (isNight !== currentNight) {
    currentNight = isNight;
    if (isNight) {
      // شب شد، جغد بیاد روی درخت
      document.body.style.backgroundColor = '#001d3d'; // پس‌زمینه شب
      showOwlOnTree();
      hideLion();
    } else {
      // روز شد، شیر برگرده روی صخره
      document.body.style.backgroundColor = '#87CEFA'; // پس‌زم background روز
      showLion();
      hideOwl();
    }
  }
}

function updateSky() {
  const now = new Date();
  const hours = now.getHours();
  const sky = document.getElementById('sky'); // فرض بر این است که عنصر کلی آسمان است

  if (hours >= 18 || hours < 6) {
    // از 6 بعدازظهر تا 6 صبح -> هوا تاریک
    sky.classList.add('night');
    sky.classList.remove('day');
  } else {
    // از 6 صبح تا 6 بعدازظهر -> هوا روشن
    sky.classList.add('day');
    sky.classList.remove('night');
  }
}

// در هر دقیقه چک کن
setInterval(updateSky, 60000);
// اول کار هم اجرا کن
updateSky();

// نشان دادن جغد روی درخت
function showOwlOnTree() {
  const owl = document.getElementById('owl');
  owl.style.display = 'block';
  owl.style.position = 'absolute';
  owl.style.top = '300px'; // ارتفاع روی درخت
  owl.style.left = '10%'; 
  owl.style.width = '90px'; 
  owl.style.zIndex = 20; // سمت چپ
}

const owlImg = document.getElementById('owl');
const owlSound = document.getElementById('owlSound');

owlImg.addEventListener('click', () => {
  owlSound.currentTime = 0;
  owlSound.play().catch(e => {
    console.log('پخش صدا امکان‌پذیر نیست، ممکن است مرورگر تداخل داشته باشد یا فایل مشکل دارد.');
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  const owl = document.getElementById('owl');

  // مثال: 

  // حرکت عمودی
  owl.style.top = (300 + scrollY * 0.5) + 'px';

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
    owl.style.zIndex = 10; // روی درخت و سنگ
  }
});

// مخفی کردن جغد
function hideOwl() {
  document.getElementById('owl').style.display = 'none';
}

const lionImage = document.getElementById('lion');
const lionSound = document.getElementById('lionSound');

lionImage.addEventListener('click', () => {
  lionSound.currentTime = 0; 
  lionSound.play();
});

// نشان دادن شیر روی صخره
function showLion() {
  const lion = document.getElementById('lion');
  lion.style.display = 'block';
  lion.style.position = 'absolute';
  lion.style.left = '10%'; 
  lion.style.top = '320px'; 
  lion.style.width = '150px'; 
  lion.style.zIndex = 20;
}

// مخفی کردن شیر
function hideLion() {
  document.getElementById('lion').style.display = 'none';
}

// هر چند ثانیه چک کن وضعیت
setInterval(updateScene, 5000); // هر ۵ ثانیه
// اجرای اولیه
updateScene();


const forestSound = document.getElementById('forestSound');

// قبل از هر کار، حتما پخش را شروع کن
forestSound.loop = true;
forestSound.volume = 1; // اول کامل باشد
forestSound.play().catch(e => {
  // اجرای autoplay ممکن است محدود باشد، نیاز به تعامل کاربر دارد
  console.log("پخش خودکار ممکن است نیاز به تعامل کاربر داشته باشد");
});

// تابع کنترل حجم صدا بر اساس اسکرول
window.addEventListener('scroll', () => {
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

const oceanSound = document.getElementById('oceanSound');

// اطمینان از شروع پخش
try {
  forestSound.play();
  oceanSound.play();
} catch(e) {
  console.log('پخش صدا نیاز به تعامل کاربر دارد.');
}

// کنترل حجم صدا بر اساس اسکرول
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  
document.querySelectorAll('.littleFish, .littleFishRight').forEach(fish => {
  function moveFish() {
    const maxTop = 95; // بیشترین ارتفاع
    const minTop = 85; // کمترین ارتفاع، برای حرکت روی سطح آب
    const maxLeft = 90; // بر حسب درصد یا پیکسل
    const minLeft = 0;

    // تصادفی موقعیت جدید
    const newTop = (Math.random() * (maxTop - minTop) + minTop) + '%';
    const newLeft = Math.random() * (maxLeft - minLeft) + minLeft * 4 + '%';

    fish.style.top = newTop;
    fish.style.left = newLeft;
  }

  setInterval(moveFish, 1000);
  moveFish();
});



  const startWaterZone = viewportHeight * 0.6;   // شروع منطقه آب
  const endWaterZone = viewportHeight * 0.9;     // پایان منطقه آب

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


// کنترل اسکرول برای فعال‌سازی
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  const shallowStart = viewportHeight * 0.4; // 40%
  const shallowEnd = viewportHeight * 0.6;   // 60%

  // اگر در منطقه کم‌عمق هستید، فعالشون کنید
  if (scrollY >= shallowStart && scrollY <= shallowEnd) {
    activateFishes();
  } else {
    deactivateFishes();
  }
});

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