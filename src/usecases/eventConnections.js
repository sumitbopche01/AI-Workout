import * as EventEmitter from "events";
import LoadMenu from "./loadMenu"

export default function (){

    window.ee = new EventEmitter();

    window.ee.on("loadMenu", () => {
      LoadMenu("loadMenu");
    });

    window.ee.on('removeStartButton', () => {
      LoadMenu("removeStartButton");
    });

    window.ee.on('startWorkout', () => {

    });

    window.ee.on('gotHit', () => {
    });

    
    window.ee.on('destroy', () => {
    });
    
    window.ee.on('gameOver', () => {
    });
}