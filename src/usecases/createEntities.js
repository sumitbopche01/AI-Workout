import Cube from '../entities/cube'

export default function createEntities(entities, ctx) {
    // Empty the array of entities
    entities.length = 0;

    // Create a new dot based on the amount needed
    // for (let i = 0; i < 100; i++) {
        entities.push(new Cube(ctx));
    // }
}