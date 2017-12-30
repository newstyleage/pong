class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rect {
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const ball = new Ball;
ball.pos.x = 100;
ball.pos.y = 100;

ball.vel.x = 100;
ball.vel.y = 100;

let lastTime;

function callback(miliS) {
    if (lastTime) {
        update((miliS - lastTime) / 1000);
    }
    lastTime = miliS;
    requestAnimationFrame(callback);
}

function update(dt) {
    ball.pos.x += ball.vel.x * dt;
    ball.pos.y += ball.vel.y * dt;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFF";
    ctx.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();