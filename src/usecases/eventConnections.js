import * as EventEmitter from "events";
import LoadMenu from "./loadMenu"
import createShatteredCubeEntities from './createShatteredCubeEntities';

export default function (){

    window.ee = new EventEmitter();

    window.ee.on("loadMenu", () => {
      LoadMenu("loadMenu");
    });

    window.ee.on('removeStartButton', () => {
      LoadMenu("removeStartButton");
    });

    window.ee.on('startWorkout', () => {
      console.log('start work out event called')
    });

    window.ee.on('gotHit', () => {
    });

    
    window.ee.on('destroy', (entity) => {
      entity.shattered_cube_list = createShatteredCubeEntities(entity);
      console.log('destroy is called ')
    });
    
    window.ee.on('gameOver', () => {
    });

    window.ee.on('destroyComplete', (entity)=> {
      entity.is_destroyed = true;
    });
}