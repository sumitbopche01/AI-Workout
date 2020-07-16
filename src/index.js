import './style.css';
console.clear();

/* ====================== */
/* ====== INITIALIZE ==== */
/* ====================== */
// Get the canvas element from the DOM
const canvas = document.querySelector('#scene');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext('2d');

/* ====================== */
/* ======= IMPORTS ====== */
/* ====================== */
import createEntities from './usecases/createEntities';
import { onResize } from './helpers/resize';
import { fillCanvas } from './entities/animateCanvas'

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
window.gameWidth = canvas.clientWidth; // Width of the canvas
window.gameHeight = canvas.clientHeight; // Height of the canvas
const entities = []; // Every entities in an array

/* ====================== */
/* ====== CONSTANTS ===== */
/* ====================== */
window.PROJECTION_CENTER_X = window.gameWidth / 2; // X center of the canvas HTML
window.PROJECTION_CENTER_Y = window.gameHeight / 2; // Y center of the canvas HTML
window.FIELD_OF_VIEW = window.gameWidth * 0.8;

// for iPhone and otehr devices with high pixel density
if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  ctx.scale(2, 2);
}

/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render() {
  // Clear the scene
  ctx.clearRect(0, 0, window.gameWidth, window.gameHeight);
  // Loop through the entities array and draw every entity
  for (var i = 0; i < entities.length; i++) {
    if (entities[i].stop_drawing) {
      for (let triangle of entities[i].shattered_cube_list) {
        triangle.draw();
      }
    }
    else {
      entities[i].draw();
    }
    // entities[i].drawShatteredCube()
  }
  if (!entities[0].hit) {
    window.requestAnimationFrame(render);
  } else {
    fillCanvas(canvas);
  }
}

setTimeout(() => {
  entities[0].destroy()
}, 2000);

// entities[0].drawShatteredCube()

// window.addEventListener('resize', onResize(canvas, entities, ctx));
// window.addEventListener('resize', onResize(canvas, entities, ctx));

// Populate the entities array with required entities
createEntities(entities, ctx);

// Render the scene
window.requestAnimationFrame(render);
