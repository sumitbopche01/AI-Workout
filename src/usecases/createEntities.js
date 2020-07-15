import Cube from '../entities/cube'

export default function createEntities(entities, ctx) {
    // Empty the array of entities
    entities.length = 0;
    function generateEntities() {
        let time = randomInteger(1000, 2000);
        let cube = new Cube(ctx);
        entities.push(cube);
        setTimeout(generateEntities, time);
    }

    generateEntities();
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}