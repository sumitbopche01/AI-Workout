import * as EventEmitter from "events";
import LoadMenu from "./loadMenu"
import createShatteredCubeEntities from './createShatteredCubeEntities';
import { render, callCreateEntity } from './render';
import createEntities from './createEntities';

export default function () {

  window.ee = new EventEmitter();

  window.ee.on("loadMenu", () => {
    LoadMenu("loadMenu");
  });

  window.ee.on('removeStartButton', () => {
    LoadMenu("removeStartButton");
  });

  window.ee.on('startWorkout', () => {
    callCreateEntity()
    render()
  });

  window.ee.on('gotHit', () => {
  });

  window.ee.on('destroy', (entity) => {
    entity.shattered_cube_list = createShatteredCubeEntities(entity);
    // callCreateEntity();
  });

  window.ee.on('gameOver', () => {
  });

  window.ee.on('destroyComplete', (entity) => {
    entity.is_destroyed = true;
    console.log('call create entity');
    callCreateEntity();
  });
}