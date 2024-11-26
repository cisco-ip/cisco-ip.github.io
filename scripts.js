console.log("JavaScript is connected!");
// scripts.js
const password = "Crazycrab44"; // Set your desired password
const loginSection = document.getElementById("login-section");
const fireworksSection = document.getElementById("fireworks-section");
const errorMessage = document.getElementById("error-message");

document.getElementById("password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredPassword = document.getElementById("password").value;

  if (enteredPassword === password) {
    loginSection.style.display = "none";
    fireworksSection.style.display = "block";
    startFireworks();
  } else {
    errorMessage.textContent = "Incorrect password. Try again!";
  }
});

function startFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  const colors = ["#FF69B4", "#FF1493", "#FF6EB4", "#FFC0CB"];

  function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    ctx.bezierCurveTo(x - size, y + size, x, y + size, x, y + size + size / 2);
    ctx.bezierCurveTo(x, y + size, x + size, y + size, x + size, y);
    ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    ctx.closePath();
    ctx.fill();
  }

  function createHeart() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 50 + 20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    hearts.push({ x, y, size, color });
  }

  function updateAndDrawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart, index) => {
      heart.size -= 0.5; // Hearts shrink over time
      if (heart.size <= 0) {
        hearts.splice(index, 1); // Remove small hearts
      } else {
        drawHeart(heart.x, heart.y, heart.size, heart.color);
      }
    });

    if (hearts.length < 50) createHeart();

    requestAnimationFrame(updateAndDrawHearts);
  }

  updateAndDrawHearts();
}
