import './style.css';
import eventConnection from "./usecases/eventConnections";

console.clear();

window.onload = function loadStartMenu(){
  window.ee.emit("loadMenu");
}

eventConnection();