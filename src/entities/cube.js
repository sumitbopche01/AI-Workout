
const CUBE_LINES = [[0, 1], [1, 3], [3, 2], [2, 0], [2, 6], [3, 7], [0, 4], [1, 5], [6, 7], [6, 4], [7, 5], [4, 5]];
const CUBE_VERTICES = [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]];

export default class Cube {
    constructor(ctx, x, y, z) {
        this.x = (Math.random() - 0.5) * window.gameWidth;
        this.y = (Math.random() - 0.5) * window.gameWidth;
        this.z = (Math.random() - 0.5) * window.gameWidth;
        this.radius = Math.floor(Math.random() * 12 + 10);
        this.ctx = ctx;

        // TweenMax.to(this, Math.random() * 20 + 15, {
        //   x: (Math.random() - 0.5) * (window.gameWidth * 0.5),
        //   y: (Math.random() - 0.5) * (window.gameWidth * 0.5),
        //   z: (Math.random() - 0.5) * window.gameWidth,
        //   repeat: -1,
        //   yoyo: true,
        //   ease: Power2.EaseOut,
        //   delay: Math.random() * -35
        // });
    }
    // Do some math to project the 3D position into the 2D canvas
    project(x, y, z) {
        const sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW + z);
        const xProject = (x * sizeProjection) + PROJECTION_CENTER_X;
        const yProject = (y * sizeProjection) + PROJECTION_CENTER_Y;
        return {
            size: sizeProjection,
            x: xProject,
            y: yProject
        }
    }
    // Draw the dot on the canvas
    draw() {
        // Do not render a cube that is in front of the camera
        // if (this.z < -FIELD_OF_VIEW + this.radius) {
        //   return;
        // }
        for (let i = 0; i < CUBE_LINES.length; i++) {
            const v1 = {
                x: this.x + (this.radius * CUBE_VERTICES[CUBE_LINES[i][0]][0]),
                y: this.y + (this.radius * CUBE_VERTICES[CUBE_LINES[i][0]][1]),
                z: this.z + (this.radius * CUBE_VERTICES[CUBE_LINES[i][0]][2])
            };
            const v2 = {
                x: this.x + (this.radius * CUBE_VERTICES[CUBE_LINES[i][1]][0]),
                y: this.y + (this.radius * CUBE_VERTICES[CUBE_LINES[i][1]][1]),
                z: this.z + (this.radius * CUBE_VERTICES[CUBE_LINES[i][1]][2])
            };
            const v1Project = this.project(v1.x, v1.y, v1.z);
            const v2Project = this.project(v2.x, v2.y, v2.z);
            this.ctx.beginPath();
            this.ctx.moveTo(v1Project.x, v1Project.y);
            this.ctx.lineTo(v2Project.x, v2Project.y);
            this.ctx.stroke();
        }
    }
}