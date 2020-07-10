
const CUBE_LINES = [[0, 1], [1, 3], [3, 2], [2, 0], [2, 6], [3, 7], [0, 4], [1, 5], [6, 7], [6, 4], [7, 5], [4, 5]];
const CUBE_VERTICES = [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]];
import gsap from "gsap";
const depth = 1000

export default class Cube {
    constructor(ctx) {
        this.x = window.gameWidth * 0.001;
        this.y = window.gameWidth * 0.001;
        this.z = window.gameWidth * 0.001;
        console.log(window.gameWidth);
        this.radius = Math.floor(22);
        this.ctx = ctx;
        this.tween = gsap.to(this, {
            duration: 3,
            z: -(window.gameWidth - window.gameWidth*0.25),
            onComplete: this.gotHit,
            onCompleteParams: ["Got hit by the cube"],
        });
        this.points_array = []
        this.cube_color = "rgba(10, 250, 0, 0.3)";
        this.arrow_color = "rgba(0, 250, 0, 0.6)";
        this.arrow_direction = 'from_bottom';
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

    shake() {
        this.tween.pause();
        gsap.to(this, 0.1, { x: "+=20", repeat: 5 });
        gsap.to(this, 0.1, { x: "-=20", repeat: 5 });
        this.tween.resume();
    }

    gotHit(message) {
        console.log(message);
    }

    destroy() {
        this.tween.kill();
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

            this.points_array.push([v1Project.x, v1Project.y, v2Project.x, v2Project.y])
            if (this.points_array.length == 12) {
                console.log("point array size 12")
                this.drawCube()
                this.points_array = []
            }
        }
    }

    drawCube() {
        this.drawLeftFace();
        this.drawUpperFace();
        this.drawRightFace();
        this.drawBottomFace();
        this.drawFrontFace();
        this.drawBackFace();
        //from_left, from_right, from_upper, from_bottom
        this.drawArrow();
    }

    drawLeftFace() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[3][0], this.points_array[3][1]);
        this.ctx.lineTo(this.points_array[3][2], this.points_array[3][3]);
        this.ctx.lineTo(this.points_array[6][2], this.points_array[6][3]);
        this.ctx.lineTo(this.points_array[9][0], this.points_array[9][1]);
        this.ctx.lineTo(this.points_array[4][0], this.points_array[4][1]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color
        this.ctx.fill()
        this.ctx.stroke();
    }

    drawUpperFace() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[0][0], this.points_array[0][1]);
        this.ctx.lineTo(this.points_array[0][2], this.points_array[0][3]);
        this.ctx.lineTo(this.points_array[7][2], this.points_array[7][3]);
        this.ctx.lineTo(this.points_array[11][0], this.points_array[11][1]);
        this.ctx.lineTo(this.points_array[6][0], this.points_array[6][1]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        this.ctx.fill()
        this.ctx.stroke();
    }

    drawRightFace() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[0][0], this.points_array[0][1]);
        this.ctx.lineTo(this.points_array[0][2], this.points_array[0][3]);
        this.ctx.lineTo(this.points_array[5][2], this.points_array[5][3]);
        this.ctx.lineTo(this.points_array[10][2], this.points_array[10][3]);
        this.ctx.lineTo(this.points_array[7][0], this.points_array[7][1]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        this.ctx.fill()
        this.ctx.stroke();
    }

    drawBottomFace() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[2][0], this.points_array[2][1]);
        this.ctx.lineTo(this.points_array[2][2], this.points_array[2][3]);
        this.ctx.lineTo(this.points_array[4][2], this.points_array[4][3]);
        this.ctx.lineTo(this.points_array[8][2], this.points_array[8][3]);
        this.ctx.lineTo(this.points_array[5][0], this.points_array[5][1]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color
        this.ctx.fill()
        this.ctx.stroke();
    }

    drawFrontFace() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[0][0], this.points_array[0][1]);
        this.ctx.lineTo(this.points_array[0][2], this.points_array[0][3]);
        this.ctx.lineTo(this.points_array[1][2], this.points_array[1][3]);
        this.ctx.lineTo(this.points_array[2][2], this.points_array[2][3]);
        this.ctx.lineTo(this.points_array[3][2], this.points_array[3][3]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        this.ctx.fill()
        this.ctx.stroke();
    }

    drawArrow() {
        let arrow_points = {
            from_left: {
                x1: [0, 0],
                y1: [0, 1],
                x2: [2, 2],
                y2: [2, 3]
            },
            from_right: {
                x1: [0, 2],
                y1: [0, 3],
                x2: [1, 2],
                y2: [1, 3]
            },
            from_upper: {
                x1: [0, 0],
                y1: [0, 1],
                x2: [0, 2],
                y2: [0, 3]
            },
            from_bottom: {
                x1: [2, 2],
                y1: [2, 3],
                x2: [1, 2],
                y2: [1, 3]
            }
        }

        let x1 = arrow_points[this.arrow_direction].x1,
        y1 = arrow_points[this.arrow_direction].y1,
        x2 = arrow_points[this.arrow_direction].x2,
        y2 = arrow_points[this.arrow_direction].y2;

        let center_x = this.points_array[0][0] + (this.points_array[0][2] - this.points_array[0][0])/2
        let center_y = this.points_array[0][1] + (this.points_array[2][3] - this.points_array[0][1])/2

        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[x1[0]][x1[1]], this.points_array[y1[0]][y1[1]])
        this.ctx.lineTo(center_x, center_y)
        this.ctx.lineTo(this.points_array[x2[0]][x2[1]], this.points_array[y2[0]][y2[1]])
        this.ctx.closePath();
        this.ctx.fillStyle = this.arrow_color;
        this.ctx.fill();
        // this.ctx.strokeStyle = '#FF0000'
        this.ctx.stroke();
    }
    
    drawBackFace(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.points_array[8][0], this.points_array[8][1]);
        this.ctx.lineTo(this.points_array[8][2], this.points_array[8][3]);
        this.ctx.lineTo(this.points_array[10][2], this.points_array[10][3]);
        this.ctx.lineTo(this.points_array[11][0], this.points_array[11][1]);
        this.ctx.lineTo(this.points_array[9][0], this.points_array[9][1]);
        this.ctx.closePath();
        this.ctx.fillStyle = this.cube_color;
        this.ctx.fill()
        this.ctx.stroke();
    }
}
