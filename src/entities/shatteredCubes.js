import gsap from "gsap";

export default class ShatteredCube {

    constructor(data, entity) {
        this.cube_color = data.cube_color;
        this.duration = this.random(1, 3);
        this.current_x = data.current_x;
        this.current_y = data.current_y;
        this.ctx = entity.ctx;
        this.entity = entity;
        // this.t1 = gsap.timeline()
        // this.t1.to()
        this.tween = gsap.to(this, {
            duration: 1.8,
            current_x: Math.random()*window.gameWidth,
            current_y: Math.random()*window.gameHeight,
            cube_color: `${this.cube_color.slice(0,-4)} ${parseInt(this.cube_color.slice(-4,-1)) - 0.1})`,
            onComplete: this.gotHit,
            onCompleteParams: [entity],
        });
    }

    draw() {
        this.ctx.beginPath();
        // this.ctx.save();
        // this.ctx.translate(this.current_x * this.random(-0.1,0.1), this.current_y * this.random(-0.1,0.1))
        this.ctx.moveTo(this.current_x, this.current_y);
        this.ctx.lineTo(this.current_x + 10, this.current_y);
        this.ctx.lineTo(this.current_x + 10, this.current_y + 10);
        this.ctx.lineTo(this.current_x, this.current_y + 10);
        this.ctx.lineTo(this.current_x, this.current_y);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        // this.ctx.translate(this.current_x +10, this.current_y+ 10);
        this.ctx.fill();
        // this.ctx.stroke();
        // this.ctx.restore()
        // this.ctx.globalAlpha -= 0.001
        // gsap.to(this, {duration:2, opacity:0})
    }

    //remove entity from entities
    gotHit(entity) {
        window.ee.emit('destroyComplete', entity)
    }

    random(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return min + (max - min) * Math.random();
    }
}

