/* ══ CURSOR ══ */
var curDot  = document.getElementById('cur');
var curRing = document.getElementById('cur-ring');
var mX = 0, mY = 0, rX = 0, rY = 0;

document.addEventListener('mousemove', function(e) {
  mX = e.clientX; mY = e.clientY;
  curDot.style.left = mX + 'px';
  curDot.style.top  = mY + 'px';
});
(function animRing() {
  rX += (mX - rX) * 0.12;
  rY += (mY - rY) * 0.12;
  curRing.style.left = rX + 'px';
  curRing.style.top  = rY + 'px';
  requestAnimationFrame(animRing);
})();

/* ══ TYPING ══ */
var phrases = ['Software Developer','React Developer','Java Developer','Full Stack Dev',"Web Developer",'Problem Solver','Open Source Fan'];
var pi = 0, ci = 0, deleting = false;
var typEl = document.getElementById('typingText');
var blink = true;

setInterval(function() {
  blink = !blink;
  typEl.style.borderRightColor = blink ? '#f5a623' : 'transparent';
}, 500);
typEl.style.borderRight = '2px solid #f5a623';
typEl.style.paddingRight = '3px';

function runTyping() {
  var phrase = phrases[pi];
  if (!deleting) {
    ci++;
    typEl.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) { deleting = true; setTimeout(runTyping, 1800); return; }
  } else {
    ci--;
    typEl.textContent = phrase.slice(0, ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(runTyping, deleting ? 50 : 85);
}
runTyping();

/* ══ SCROLL REVEAL + SKILL BARS ══ */
function checkAll() {
  var wH = window.innerHeight;

  /* Reveal elements */
  document.querySelectorAll('.reveal').forEach(function(el) {
    if (el.getBoundingClientRect().top < wH - 50) {
      el.classList.add('visible');
    }
  });

  /* Skill bars */
  document.querySelectorAll('.skill-cat').forEach(function(cat) {
    if (cat.getBoundingClientRect().top < wH - 30 && !cat.dataset.filled) {
      cat.dataset.filled = '1';
      cat.querySelectorAll('.sk-fill').forEach(function(bar) {
        bar.style.width = (bar.getAttribute('data-w') || '0') + '%';
      });
    }
  });
}

window.addEventListener('scroll', checkAll);
window.addEventListener('resize', checkAll);
/* Run on load AND after fonts render */
checkAll();
setTimeout(checkAll, 300);


