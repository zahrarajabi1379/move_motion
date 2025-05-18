let clouds = document.getElementById('clouds');
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById('bird2');
let forest = document.getElementById('forest');
let rocks = document.getElementById('rocks');
let text = document.getElementById('text');
let btn = document.getElementById('btn');

window.addEventListener('scroll' , function(){
value = window.scrollY

clouds.style.left = value + 'px';
bird1.style.left = value + 'px';
bird2.style.right = value + 'px';
forest.style.top = value + 'px';
text.style.marginRight = value * 5.5 + 'px';
text.style.marginBottom = value * 1.5 + 'px';
rocks.style.bottom = value + 'px';

});