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
    const container = document.querySelector(".nav button:last-child");
    container.innerHTML = `
        <div>
            <button onclick="confirmDownload()">Yes</button>
            <button onclick="cancelDownload()">No</button>
        </div>`;
}

function confirmDownload() {
    alert("Downloaded Successfully!");
    window.location.href = "./index.html";
}

function cancelDownload() {
    window.location.href = "./index.html";
}

// -----------------------------
// BACKGROUND ANIMATION
// -----------------------------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({length: 70}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5),
    dy: (Math.random() - 0.5)
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animate);
}
animate();

// -----------------------------
// SIDEBAR TOGGLE
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

// -----------------------------
// FETCH DATA.JSON
// -----------------------------
fetch('data.json')
    .then(res => res.json())
    .then(data => populateData(data))
    .catch(err => console.error('Failed to load data:', err));

function populateData(data) {
    // ABOUT ME
    document.querySelector('.self').innerHTML = `<p>${data.aboutMe.self}</p>`;
    document.querySelector('.moreInfo').innerHTML = `<p>${data.aboutMe.moreInfo}</p>`;
    document.querySelector('.hobbies').innerHTML = `
        <h3>Hobbies</h3>
        <ul>${data.aboutMe.hobbies.map(h => `<li>${h}</li>`).join('')}</ul>
    `;
    document.querySelector('.ideUsed').innerHTML = `
        <h3>IDEs Used</h3>
        <ul>${data.aboutMe.ideUsed.map(i => `<li>${i}</li>`).join('')}</ul>
    `;

    // WORKS
    const worksContainer = document.querySelector('.works-container');
    worksContainer.innerHTML = data.works.map(work => `
        <div class="Portfolio">
            <img src="${work.image}" alt="${work.title}">
            <br>
            <small>Title:</small>
            <h3>${work.title}</h3>
            <ul>${work.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <p>${work.description}</p>
        </div>
    `).join('');

    // KNOWLEDGE
    const progContainer = document.querySelector('.prog');
    progContainer.innerHTML = data.knowledge.map(k => `
        <div class="prog-know">
            <div class="progImg">
                <img src="${k.icon}" alt="${k.name}">
                <label>${k.name}</label>
            </div>
            ${k.levels.map(l => `<progress value="${l}" max="100">${l}%</progress>`).join('')}
        </div>
    `).join('');

    // EDUCATION
    const eduContainer = document.querySelector('.backgroundcontainer');
    eduContainer.innerHTML = data.education.map(edu => `
        <h3>${edu.level}</h3>
        <hr>
        <p>${edu.description}</p>
        <ul>${Object.keys(edu.details).map(key => `<li>${key}: ${edu.details[key]}</li>`).join('')}</ul>
    `).join('');
}
