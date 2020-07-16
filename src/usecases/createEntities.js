import Cube from '../entities/cube'

export default function createEntities(entities, ctx, cube_color, arrow_color, arrow_direction) {
    // Empty the array of entities
    entities.length = 0;
    // function generateEntities() {
        // let time = randomInteger(4000, 6000);
        let cube = new Cube(ctx, cube_color, arrow_color,arrow_direction);
        window.cube = cube;
        entities.push(cube);
        // setTimeout(generateEntities, time);
    // }

    // generateEntities();
}


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}