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
    get left() {
        return this.pos.x - this.size.x / 2
    }
    get right() {
        return this.pos.x + this.size.x / 2
    }
    get top() {
        return this.pos.y - this.size.y / 2
    }
    get bottom() {
        return this.pos.y + this.size.y / 2
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

class Player extends Rect {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        this.ball = new Ball;
        this.ball.pos.x = 100;
        this.ball.pos.y = 100;

        this.ball.vel.x = 100;
        this.ball.vel.y = 100;

        this.players = [
            new Player,
            new Player
        ];

        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player =>
            player.pos.y = this._canvas.height / 2);
        let lastTime;
        const callback = (miliS) => {
            if (lastTime) {
                this.update((miliS - lastTime) / 1000);
            }
            lastTime = miliS;
            requestAnimationFrame(callback);
        }
        callback();
    }
    collide(player, ball) {
        
    }
    draw() {
        this._ctx.fillStyle = "#000";
        this._ctx.fillRect(0, 0,
            this._canvas.width, this._canvas.height);
        this.drawRect(this.ball);

        this.players.forEach(player => this.drawRect(player));
    }

    drawRect(rect) {
        this._ctx.fillStyle = "#FFF";
        this._ctx.fillRect(rect.left, rect.top,
            rect.size.x, rect.size.y);
    }

    update(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        if (this.ball.left < 0 || this.ball.right > this._canvas.width - 10) {
            this.ball.vel.x = -this.ball.vel.x;
        }
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height - 10) {
            this.ball.vel.y = -this.ball.vel.y;
        }

        this.players[1].pos.y = this.ball.pos.y;
        this.draw();
    }
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);

canvas.addEventListener("mousemove", ev =>
    pong.players[0].pos.y = ev.offsetY);