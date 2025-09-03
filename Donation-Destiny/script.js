// Typing effect with synced background
const typedText = document.getElementById("typed-text");
const header = document.querySelector("header");

const phrases = [
  "Hi, I'm Destiny Okonu",
  "Web Developer",
  "Media Visionary",
  "Livestream Strategist"
];

const bgImages = [
  "images/school.jpg",
  "images/web developers.jpg",
  "images/visionary.jpeg",
  "images/media.jpeg"
];

let phraseIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex === 0) {
    typedText.textContent = "";
    updateBackground(phraseIndex);
}
  if (charIndex < phrases[phraseIndex].length) {
    typedText.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
} else {
    setTimeout(erase, 2000);
}
}

function erase() {
  if (charIndex> 0) {
    typedText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
} else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
}
}

function updateBackground(index) {
  header.style.background = `
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url('${bgImages[index]}') center/cover no-repeat
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

// Section reveal on scroll
const sections = document.querySelectorAll("section");
function revealOnScroll() {
  sections.forEach((section, index) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("visible");
      if (section.id === "budget") {
        section.classList.add("animate-zoomIn");
} else if (index % 2 === 0) {
        section.classList.add("animate-fadeInUp");
} else {
        section.classList.add("animate-slideInLeft");
}
}
});
}
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(revealOnScroll, 100);
});
window.addEventListener("load", revealOnScroll);

// Animate budget counters only when in view
const budgetSection = document.getElementById("budget");
let budgetAnimated = false;

function animateBudgetOnScroll() {
  const rect = budgetSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom> 0;

  if (isVisible &&!budgetAnimated) {
    animateCounters();
    budgetAnimated = true;
}
}
window.addEventListener("scroll", animateBudgetOnScroll);
window.addEventListener("load", animateBudgetOnScroll);

// Animated counters
const counters = document.querySelectorAll(".counter");
function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, '');
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(updateCount, 30);
} else {
        counter.innerText = target.toLocaleString();
}
};
    updateCount();
});
}

// Countdown timer
function countdown() {
  const targetDate = new Date("November 4, 2025 23:59:59").getTime();
  const now = new Date().getTime();
  const gap = targetDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = d.toString().padStart(2, '0');
  document.getElementById("hours").innerText = h.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}
setInterval(countdown, 1000);

// Smooth scroll for anchor links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start"});
}
});
});

// Form validation + toast
const form = document.querySelector("form");
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name ||!email ||!message) {
      showToast("Please fill out all fields.");
      return;
}

    showToast("Thank you! Your message has been sent.");
    form.reset();
});
}

// Rotating testimonials
const quotes = document.querySelectorAll("#testimonials blockquote");
let quoteIndex = 0;

function rotateQuotes() {
  quotes.forEach((q, i) => {
    q.style.display = i === quoteIndex? "block": "none";
});
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(rotateQuotes, 5000);
window.addEventListener("load", rotateQuotes);// Reveal tier cards individually
const tierCards = document.querySelectorAll(".tier");

function revealTiers() {
  tierCards.forEach((card, i) => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      setTimeout(() => {
        card.classList.add("visible");
}, i * 150); // staggered reveal
}
});
}

window.addEventListener("scroll", revealTiers);
window.addEventListener("load", revealTiers);

// Optional: Scroll-to-top button
const scrollTopBtn = document.createElement("div");
scrollTopBtn.className = "scroll-top";
scrollTopBtn.innerHTML = "<i class='fas fa-arrow-up'></i>";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("open");
});

// Close menu when clicking a nav link (optional)
document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
  });
});
