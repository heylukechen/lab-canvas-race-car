const startingScreen = document.querySelector(".game-intro");
const gameScreen = document.querySelector("#canvas");
const bgImg = new Image();
bgImg.src = "./images/road.png";
const carImg = new Image();
carImg.src = "./images/car.png";

const myGameArea = {
  canvas: document.getElementById("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = 282;
    this.canvas.height = 441;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 10);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

let myCar = {
  x: 124,
  y: 360,
  width: 32,
  height: 64,
  speedX: 0,
  update: function () {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
  },
  newPos: function () {
    const tempX = this.x + this.speedX;
    if (tempX >= 26 && tempX <= 226) {
      this.x = tempX;
    }
  },
};

function drawBackground() {
  const ctx = myGameArea.context;
  ctx.drawImage(bgImg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
}

const obstacles = [];

class Obstacle {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  update() {
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateObstacle() {
  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
    obstacles[i].update();
  }

  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    let minWidth = 10;
    let maxWidth = 100;

    //update x range to be between 26 and 226.
    let minPosX = 26;
    let maxPosX = 226;
    let x = Math.floor(Math.random() * (maxPosX - minPosX + 1) + minPosX);
    let y = 0;

    let width = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + 40 + minWidth
    );
    obstacles.push(new Obstacle(width, 10, "red", x, y));
  }
}

function updateGameArea() {
  myGameArea.clear();
  drawBackground();
  myCar.newPos();
  myCar.update();
  updateObstacle();
}

myGameArea.start();

window.onload = () => {
  gameScreen.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function startGame() {
  startingScreen.style.display = "none";
  gameScreen.style.display = "block";
}

///Event listener to update the position of the car
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37: // left arrow
      myCar.speedX -= 1;
      break;
    case 39: // right arrow
      myCar.speedX += 1;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  myCar.speedX = 0;
});
