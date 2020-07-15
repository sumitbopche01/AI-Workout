import * as EventEmitter from "events";
import gsap from "gsap";

export default function (){

    window.ee = new EventEmitter();

    window.ee.on('loadMenu', (startButton) => {
      gsap.fromTo(startButton, {autoAlpha: 0, x:"50%", y:-100}, {autoAlpha: 1, x:"50%", y: "100%", duration: 3});
    });

    window.ee.on('removeStartButton', (startButton) => {
      console.log("Start Button Removed");

      gsap.to(startButton, {autoAlpha: 0, duration: 2});
    });

    window.ee.on('startWorkout', () => {
      console.log("Workout Started");

    });

    window.ee.on('gotHit', () => {
      console.log("Got hit");
    });

    
    window.ee.on('destroy', () => {
      console.log("Destroyed");
    });
    
    window.ee.on('gameOver', () => {
      console.log("Game Over");
    });
}