/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render() {
    // Clear the scene
    ctx.clearRect(0, 0, window.gameWidth, window.gameHeight);
    // Loop through the entities array and draw every entity
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].stop_drawing && !entities[i].is_destroyed) {
            for (let triangle of entities[i].shattered_cube_list) {
                triangle.draw();
            }
        }
        else {
            entities[i].draw();
        }
        // entities[i].drawShatteredCube()
    }
    if (!entities[0].hit) {
        window.requestAnimationFrame(render);
    } else {
        fillCanvas(canvas);
    }
}