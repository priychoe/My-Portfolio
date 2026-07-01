// ================================================
// PRIYANKA CHOPRA PORTFOLIO - script.js
// ================================================
// ── Custom Cursor ──────────────────────────────
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
document.addEventListener("mousemove", (e) => {
const x = e.clientX, y = e.clientY;
cursorDot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
cursorOutline.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
});
document.querySelectorAll("a, button, .project-card, .stat-card").forEach(el => {
el.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
});
// ── Typing Animation ───────────────────────────
const roles = [
"Data Analyst",
"MIS Specialist",
"SQL Developer",
"AWS QuickSight Developer",
"Fraud Analytics Specialist"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById("typingText");
function type() {
const current = roles[roleIndex];
typingEl.textContent = isDeleting
? current.substring(0, charIndex--)
: current.substring(0, charIndex++);
let speed = isDeleting ? 60 : 100;
if (!isDeleting && charIndex > current.length) {
isDeleting = true; speed = 1800;
} else if (isDeleting && charIndex < 0) {
isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400;
}
setTimeout(type, speed);
}
type();
// ── Navigation Scroll ──────────────────────────
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
const scrolled = window.scrollY > 50;
navbar.classList.toggle("scrolled", scrolled);
backTop.classList.toggle("visible", window.scrollY > 300);
// Active nav link
const sections = document.querySelectorAll("section[id]");
let current = "";
sections.forEach(s => {
if (window.scrollY >= s.offsetTop - 120) current = s.id;
});
document.querySelectorAll(".nav-link").forEach(l => {
l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
});
});
// ── Hamburger Menu ─────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
navLinks.classList.toggle("open");
const spans = hamburger.querySelectorAll("span");
spans[0].style.transform = navLinks.classList.contains("open") ? "rotate(45deg) translate(5px,5px)" :
"";
spans[1].style.opacity = navLinks.classList.contains("open") ? "0" : "1";
spans[2].style.transform = navLinks.classList.contains("open") ? "rotate(-45deg) translate(5px,-5px)" :
"";
});
document.querySelectorAll(".nav-link").forEach(l => {
l.addEventListener("click", () => navLinks.classList.remove("open"));
});
// ── Smooth Scroll ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", e => {
e.preventDefault();
const target = document.querySelector(anchor.getAttribute("href"));
if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
});
});
// ── Animated Counters ──────────────────────────
function animateCounter(el) {
const target = parseFloat(el.dataset.target);
const isDecimal = target % 1 !== 0;
let current = 0;
const step = target / 60;
const timer = setInterval(() => {
current += step;
if (current >= target) {
el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString();
clearInterval(timer);
} else {
el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
}
}, 30);
}
// ── Skill Bar Animations ───────────────────────
function animateSkills() {
document.querySelectorAll(".skill-fill").forEach(bar => {
bar.style.width = bar.dataset.width + "%";
});
}
// ── Intersection Observer ──────────────────────
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
const el = entry.target;
if (el.classList.contains("reveal")) {
el.classList.add("visible");
}
if (el.classList.contains("stat-number")) {
animateCounter(el);
}
if (el.classList.contains("skills")) {
animateSkills();
}
observer.unobserve(el);
});
}, { threshold: 0.15 });
document.querySelectorAll(".reveal, .stat-number, .skills").forEach(el => observer.observe(el));
// Add reveal class to cards
document.querySelectorAll(
".project-card, .stat-card, .timeline-item, .skill-item"
).forEach((el, i) => {
el.classList.add("reveal");
el.style.transitionDelay = `${i * 0.1}s`;
observer.observe(el);
});
// ── Contact Form Validation ────────────────────
document.getElementById("contactForm").addEventListener("submit", function(e) {
e.preventDefault();
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const subject = document.getElementById("subject").value.trim();
const message = document.getElementById("message").value.trim();
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!name || !email || !subject || !message) {
showNotification("Please fill in all fields.", "error"); return;
}
if (!emailRx.test(email)) {
showNotification("Please enter a valid email address.", "error"); return;
}
showNotification("Message sent successfully! I will get back to you soon.", "success");
this.reset();
});
function showNotification(msg, type) {
const existing = document.querySelector(".notification");
if (existing) existing.remove();
const div = document.createElement("div");
div.className = `notification ${type}`;
div.style.cssText = `
position:fixed; top:100px; right:2rem; z-index:9999;
padding:1rem 1.5rem; border-radius:10px; font-weight:600; font-size:0.9rem;
background:${type === "success" ? "#c9a87c" : "#e07070"};
color:${type === "success" ? "#1a1612" : "#fff"};
transform:translateX(200%); transition:transform 0.4s ease;
`;
div.textContent = msg;
document.body.appendChild(div);
requestAnimationFrame(() => { div.style.transform = "translateX(0)"; });
setTimeout(() => { div.style.transform = "translateX(200%)"; setTimeout(() => div.remove(), 400); },
4000);
}
// ── Back to Top ────────────────────────────────
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
// ── Year Update ────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();
