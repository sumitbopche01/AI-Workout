import './style.css';
import gsap from "gsap";
import eventConnection from "./usecases/eventConnections";
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

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
window.gameWidth = canvas.clientWidth; // Width of the canvas
window.gameHeight = canvas.clientHeight; // Height of the canvas
const entities = []; // Every entities in an array
const button = document.getElementById("startButton");

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

window.onload = function loadStartMenu(){
  gsap.fromTo("#startButton", {autoAlpha: 0, x:"50%", y:-100}, {autoAlpha: 1, x:"50%", y: "100%", duration: 3});
}

button.onclick = function startWorkout(){
  
  const button = document.querySelector("#startButton");
  gsap.to(button, {autoAlpha: 0, onComplete: showCanvas, duration: 2});
}

eventConnection();

function showCanvas() {

  const button = document.querySelector("#startButton");
  button.classList.add("display");
  window.ee.emit("startGame");
  
  // Populate the entities array with required entities
  createEntities(entities, ctx);

  // Render the scene
  window.requestAnimationFrame(render);
}

/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render() {
  // Clear the scene
  ctx.clearRect(0, 0, window.gameWidth, window.gameHeight);
  // Loop through the entities array and draw every entity
  for (var i = 0; i < entities.length; i++) {
    entities[i].draw();
  }
  window.requestAnimationFrame(render);
}

window.addEventListener('resize', onResize(canvas, entities, ctx));
