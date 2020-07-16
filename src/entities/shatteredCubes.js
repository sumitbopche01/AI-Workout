import gsap from "gsap";
export default class ShatteredCube {

    constructor(data, entity) {
        this.cube_color = data.cube_color;
        this.duration = this.random(1, 3);
        this.current_x = data.current_x;
        this.current_y = data.current_y;
        this.ctx = entity.ctx;
        this.entity = entity;
        this.tween = gsap.to(this, {
            duration: 0.8,
            current_x: this.current_x + this.random(-200, 200),
            current_y: this.current_y + this.random(-200, 200),
            cube_color: `${this.cube_color.slice(0, -4)} ${parseInt(this.cube_color.slice(-4, -1)) - 0.03})`,
            onComplete: this.gotHit,
            onCompleteParams: [entity],
        });
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.current_x, this.current_y);
        this.ctx.lineTo(this.current_x + 20, this.current_y);
        this.ctx.lineTo(this.current_x + 20, this.current_y + 20);
        this.ctx.lineTo(this.current_x, this.current_y + 20);
        this.ctx.lineTo(this.current_x, this.current_y);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        this.ctx.fill();
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

