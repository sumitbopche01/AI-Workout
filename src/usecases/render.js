import { fillCanvas } from "../entities/animateCanvas";
import { onResize } from '../helpers/resize';
import createEntities from "./createEntities";

// Get the canvas element from the DOM
const canvas = document.querySelector('#scene');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton");
let cube_and_arrow_colors = [
    {
        cube: "rgba(100, 200, 100, 0.3)",
        arrow: "rgba(100, 200, 100, 0.8)"
    },
    {
        cube: "rgba(100, 100, 200, 0.3)",
        arrow: "rgba(100, 100, 200, 0.8)"
    },
    {
        cube: "rgba(200, 100, 100, 0.3)",
        arrow: "rgba(200, 100, 100, 0.8)"
    },
    {
        cube: "rgba(90, 240, 90, 0.3)",
        arrow: "rgba(90, 240, 90, 0.8)"
    },
]

let arrow_directions = ['from_left', 'from_right', 'from_upper', 'from_bottom'];

let entities = []; // Every entities in an array

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

window.gameWidth = canvas.clientWidth; // Width of the canvas
window.gameHeight = canvas.clientHeight; // Height of the canvas
window.PROJECTION_CENTER_X = window.gameWidth / 2; // X center of the canvas HTML
window.PROJECTION_CENTER_Y = window.gameHeight / 2; // Y center of the canvas HTML
window.FIELD_OF_VIEW = window.gameWidth * 0.8;
window.addEventListener('resize', onResize(canvas, entities, ctx));

// for iPhone and otehr devices with high pixel density
if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
}

function render() {
    // Clear the scene
    ctx.clearRect(0, 0, window.gameWidth, window.gameHeight);
    // Loop through the entities array and draw every entity
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].stop_drawing && !entities[i].is_destroyed) {
            for (let shattered_cube of entities[i].shattered_cube_list) {
                shattered_cube.draw();
            }
        }
        else if (entities[i].is_hit) {
            fillCanvas(canvas)
        }
        else {
            entities[i].draw();
        }

        if (!entities[i].is_hit) {
            window.requestAnimationFrame(render);
        }
    }
}

function callCreateEntity() {
    let color_obj = cube_and_arrow_colors[randomInteger(0, cube_and_arrow_colors.length - 1)];
    createEntities(entities, ctx, color_obj.cube, color_obj.arrow, arrow_directions[randomInteger(0,3)]);
}

startButton.onclick = function startWorkout() {
    window.ee.emit("removeStartButton");
    window.ee.emit("startWorkout");
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { render, callCreateEntity };
