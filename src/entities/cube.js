
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
            z: -(window.gameWidth - 200),
            onComplete: this.gotHit,
            onCompleteParams: ["Got hit by the cube"],
        });
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
        this.points_array = []
        this.cube_color = "rgba(10, 250, 0, 0.3)";
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
            // console.log([v1Project.x, v1Project.y, v2Project.x, v2Project.y])
            this.points_array.push([v1Project.x, v1Project.y, v2Project.x, v2Project.y])
            if (this.points_array.length == 12) {
                console.log("point array size 12")
                this.drawCube()
                this.points_array = []
            }
            // this.ctx.beginPath();
            // this.ctx.moveTo(v1Project.x, v1Project.y);
            // this.ctx.lineTo(v2Project.x, v2Project.y);
            // this.ctx.stroke();
        }
    }

    drawCube() {
        this.drawLeftFace();
        this.drawUpperFace();
        this.drawRightFace();
        this.drawBottomFace();
        this.drawFrontFace();
        this.drawBackFace();
    }

    //Left face
    // line 3 6 9 4

    // [
    //     [0,1,2,3],// 0
    //     [0,1,2,3],// 1
    //     [0,1,2,3],// 2
    //     [0,1,2,3],// 3 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 4 0 1 lineTo step 5
    //     [0,1,2,3],// 5
    //     [0,1,2,3],// 6 2 3 lineTo step 3
    //     [0,1,2,3],// 7 
    //     [0,1,2,3],// 8
    //     [0,1,2,3],// 9 0 1 lineTo step 4
    //     [0,1,2,3],// 10
    //     [0,1,2,3],// 11
    // ]
    //
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

    //upper face
    // line 0 7 11 6

    // [
    //     [0,1,2,3],// 0 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 1 
    //     [0,1,2,3],// 2
    //     [0,1,2,3],// 3 
    //     [0,1,2,3],// 4 
    //     [0,1,2,3],// 5
    //     [0,1,2,3],// 6 0 1 lineTo step 5 
    //     [0,1,2,3],// 7 2 3 lineTo step 3
    //     [0,1,2,3],// 8
    //     [0,1,2,3],// 9 
    //     [0,1,2,3],// 10
    //     [0,1,2,3],// 11 0 1 lineTo step 4
    // ]
    //
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

    //right face
    // line 1 5 10 7

    // [
    //     [0,1,2,3],// 0 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 1 
    //     [0,1,2,3],// 2
    //     [0,1,2,3],// 3 
    //     [0,1,2,3],// 4 
    //     [0,1,2,3],// 5 2 3 lineTo step 3
    //     [0,1,2,3],// 6  
    //     [0,1,2,3],// 7 0 1 lineTo step 5
    //     [0,1,2,3],// 8
    //     [0,1,2,3],// 9 
    //     [0,1,2,3],// 10 2 3 lineTo step 4
    //     [0,1,2,3],// 11 
    // ]
    //

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

    //Bottom face
    // line 2 4 8 5

    // [
    //     [0,1,2,3],// 0 
    //     [0,1,2,3],// 1 
    //     [0,1,2,3],// 2 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 3 
    //     [0,1,2,3],// 4 2 3 lineTo step 3
    //     [0,1,2,3],// 5 0 1 lineTo step 5
    //     [0,1,2,3],// 6  
    //     [0,1,2,3],// 7 
    //     [0,1,2,3],// 8 2 3 lineTo step 4
    //     [0,1,2,3],// 9 
    //     [0,1,2,3],// 10 
    //     [0,1,2,3],// 11 
    // ]
    //

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

    //Front face
    // line 0 1 2 3

    // [
    //     [0,1,2,3],// 0 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 1 2 3 lineTo step 3
    //     [0,1,2,3],// 2 2 3 lineTo step 4
    //     [0,1,2,3],// 3 2 3 lineTo step 5
    //     [0,1,2,3],// 4 
    //     [0,1,2,3],// 5 
    //     [0,1,2,3],// 6  
    //     [0,1,2,3],// 7 
    //     [0,1,2,3],// 8 
    //     [0,1,2,3],// 9 
    //     [0,1,2,3],// 10 
    //     [0,1,2,3],// 11 
    // ]
    //

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

    //Back face
    // line 8 10 11 9
    // [
    //     [0,1,2,3],// 0 
    //     [0,1,2,3],// 1 
    //     [0,1,2,3],// 2 
    //     [0,1,2,3],// 3 
    //     [0,1,2,3],// 4 
    //     [0,1,2,3],// 5 
    //     [0,1,2,3],// 6  
    //     [0,1,2,3],// 7 
    //     [0,1,2,3],// 8 0 1 moveTo step 1 | 2 3 lineTo step 2
    //     [0,1,2,3],// 9 0 1 lineTo step 5
    //     [0,1,2,3],// 10 2 3 lineTo step 3
    //     [0,1,2,3],// 11 0 1 lineTo step 4
    // ]
    //

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
