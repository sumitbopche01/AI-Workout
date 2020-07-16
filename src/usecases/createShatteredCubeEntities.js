import ShatteredCube from '../entities/shatteredCubes';
/**
 * 
 * @param {Object} ctx context of the canvas 
 * @param {Object} entity current state of entity, need last points of entity to create small cubes 
 */
export default function createShatteredCubeEntities(entity) {
    
    let shattered_cube_list = [];
    let x_min = entity.last_points[0][0], y_min = entity.last_points[0][1],
        x_max = entity.last_points[1][2], y_max = entity.last_points[1][3];
    //create small cubes
    let rows = Math.floor((x_max - x_min) / 20);
    let columns = Math.floor((y_max - y_min) / 20);
    let current_x = x_min;
    let current_y = y_min;
    // console.log('rows and columns ', rows, columns);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let data = {
                current_x,
                current_y,
                cube_color: entity.cube_color,
                gameHeight: window.gameHeight,
                gameWidth: window.gameWidth
            }
            shattered_cube_list.push(new ShatteredCube(data, entity));
            current_x += 20
        }
        current_y += 20;
        current_x = x_min
    }
    return shattered_cube_list;
}
