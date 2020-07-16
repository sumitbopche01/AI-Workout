import gsap from "gsap";

export default class ShatteredCube {

    constructor(data, ctx) {
        this.cube_color = data.cube_color;
        this.duration = this.random(1, 3);
        this.current_x = data.current_x;
        this.current_y = data.current_y;
        this.ctx = ctx;
        // this.t1 = gsap.timeline()
        // this.t1.to()
        this.tween = gsap.to(this, {
            duration: 3,
            current_x: Math.random()*window.gameWidth,
            current_y: Math.random()*window.gameHeight
            // cube_color:
            // onComplete: this.gotHit,
            // onCompleteParams: [this],
        });
    }

    draw() {
        this.ctx.beginPath();
        // this.ctx.save();
        // // this.ctx.rotate(this.random(0, 10));
        // this.ctx.translate(this.current_x * this.random(-0.1,0.1), this.current_y * this.random(-0.1,0.1))
        this.ctx.moveTo(this.current_x, this.current_y);
        this.ctx.lineTo(this.current_x + 50, this.current_y);
        this.ctx.lineTo(this.current_x + 50, this.current_y + 50);
        this.ctx.lineTo(this.current_x, this.current_y + 50);
        this.ctx.lineTo(this.current_x, this.current_y);
        // this.ctx.lineTo(this.current_x+20, this.current_y-20);
        // this.ctx.lineTo(this.current_x+20+50, this.current_y-20);
        // this.ctx.lineTo(this.current_x+50, this.current_y);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        // this.ctx.translate(this.current_x +10, this.current_y+ 10);
        this.ctx.fill();
        this.ctx.stroke();
        // this.ctx.restore()
        // this.ctx.globalAlpha -= 0.001
        // gsap.to(this, {duration:2, opacity:0})
    }

    gotHit() {
        console.log('duration', this.duration)
    }

    random(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return min + (max - min) * Math.random();
    }
}

