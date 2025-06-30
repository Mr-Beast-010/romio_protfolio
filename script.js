const toggleSwitch = document.getElementById('themeToggle');

// === Apply saved theme on load ===
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  toggleSwitch.checked = isDark;
});

// === Toggle dark mode and save preference ===
toggleSwitch.addEventListener('change', () => {
  const isDark = toggleSwitch.checked;

  document.documentElement.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Force DOM to sync before changing background
  document.documentElement.offsetHeight;
  updateBackground(); // Instant background switch
});


// === Scroll-aware active navbar link ===
const navLinks = document.querySelectorAll('.navbar-link');

function setActiveLinkOnScroll() {
  const scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 10;

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}



window.addEventListener('scroll', setActiveLinkOnScroll);
window.addEventListener('load', setActiveLinkOnScroll);

// === Instant active change on click ===
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetSection = document.querySelector(this.getAttribute('href'));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Delayed update after scroll finishes
    setTimeout(() => {
      setActiveLinkOnScroll(); // ✅ now works
      moveUnderline?.();       // if underline is used
    }, 400); // adjust this based on scroll speed
  });
});


// === Quotes List ===
const quotes = [
  { text: "Push yourself, because no one else is going to do it for you.", tag: "#motivation" },
  { text: "Don’t watch the clock; do what it does. Keep going.", tag: "#productivity" },
  { text: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", tag: "#consistency" },
  { text: "Believe you can and you're halfway there.", tag: "#belief" },
  { text: "Your limitation—it's only your imagination.", tag: "#mindset" },
];

// === Display random quote ===
function showRandomQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = `"${random.text}"`;
  document.getElementById("tag").textContent = random.tag;
}

// === Start loop on load ===
window.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  setInterval(showRandomQuote, 7000); // refresh every 5 seconds
});

// === Background image sets ===
const lightWallpapers = [
  "daybg/day.jpg",
  "daybg/day1.jpg",
  "daybg/day2.jpg",
  "daybg/day3.jpg",
  "daybg/day4.jpg"
];

const darkWallpapers = [
  "nightbg/night1.jpg",
  "nightbg/night2.jpg",
  "nightbg/night3.jpg",
  "nightbg/night4.jpg",
  "nightbg/night5.jpg",
  "nightbg/night6.jpg",
  "nightbg/night7.jpg"
];

let currentIndex = 0;

// === Get current theme (light or dark) ===
function getCurrentTheme() {
  return document.body.classList.contains("dark-mode") ? "dark" : "light";
}

// === Change background based on current theme ===
function updateBackground() {
  const theme = getCurrentTheme();
  const imageList = theme === "dark" ? darkWallpapers : lightWallpapers;

  document.documentElement.style.backgroundImage = `url('${imageList[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % imageList.length;
}

// === Start on load and rotate every 10s ===
window.addEventListener("DOMContentLoaded", () => {
  updateBackground();                     // Set first image
  setInterval(updateBackground, 7000);   // Change every 5 seconds
});


