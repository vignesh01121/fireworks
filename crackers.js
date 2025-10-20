let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;

let friction = 0.99;
let gravity = 0.005;
function Circle(x, y, radius, velocity, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.color = color;
  this.alpha = 1;

  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  };

  this.update = () => {
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.005;
    this.draw();
  };
}

let arr = [];
let arrayOfColors = ["#F2C447", "#F76218", "#FF1D68", "#B10065", "#740580"];

window.addEventListener("click", (eve) => {
  let mouse = { x: eve.clientX, y: eve.clientY };
  let particle = 400;
  let radius = 3;
  let angle = ((Math.PI * 2) / 360) * particle;

  for (let i = 0; i < particle; i++) {
    let index = Math.floor(Math.random() * arrayOfColors.length);
    let obj = new Circle(
      mouse.x,
      mouse.y,
      radius,
      {
        x: Math.cos(angle * i) * Math.random() * 8,
        y: Math.sin(angle * i) * Math.random() * 8,
      },
      `hsl(${Math.floor(Math.random() * 360)},${Math.floor(
        Math.random() * 100
      )}%,${Math.floor(Math.random() * 100)}%)`
    );

    arr.push(obj);
  }

  console.log(arr);
});

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "rgba(0,0,0,0.2)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  arr.forEach((ele, i) => {
    if (ele.alpha > 0) {
      ele.update();
    } else {
      arr.splice(i, i);
    }
  });
}

animate();
