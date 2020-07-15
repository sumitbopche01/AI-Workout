import * as EventEmitter from "events";

export default function (){

    window.ee = new EventEmitter();

    window.ee.on('startGame', ()=>{
      console.log("Game Started");
    });

    window.ee.on('gotHit', ()=>{
      console.log("Got hit")
    });
    
    window.ee.on('destroy', ()=>{
      console.log("destroyed")
    });

}