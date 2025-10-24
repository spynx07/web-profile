// -----------------------------
// SECTION SWITCHING FUNCTION
// -----------------------------
function parts(id) {
  document.querySelectorAll(".content").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// -----------------------------
// DOWNLOAD BUTTON LOGIC
// -----------------------------
function download() {
  const container = document.getElementById("content");
  container.innerHTML = `
    <div>
      <button onclick="confirmDownload()">Yes</button>
      <button onclick="cancelDownload()">No</button>
    </div>`;
}

function confirmDownload() {
  alert("Downloaded Successfully");
  window.location.href = "/index.html";
}

function cancelDownload() {
  window.location.href = "/index.html";
}

// -----------------------------
// BACKGROUND ANIMATION
// -----------------------------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    // wrap around
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animate);
}
animate();

// -----------------------------
// SIDEBAR TOGGLE LOGIC
// -----------------------------
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.querySelector(".side-profile");
const overlay = document.getElementById("overlay");

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
