// Variable used to store a timeout when user resized its screen
import createEntities from '../usecases/createEntities';
let resizeTimeout;
// Function called right after user resized its screen
function onResize(canvas, entities, ctx) {
    // Clear the timeout variable
    resizeTimeout = window.clearTimeout(resizeTimeout);
    // Store a new timeout to avoid calling afterResize for every resize event
    resizeTimeout = window.setTimeout(afterResize(canvas, entities, ctx), 500, canvas, ctx);
}

// Function called after the user resized its screen
function afterResize(canvas, entities, ctx) {
    window.gameWidth = canvas.offsetWidth;
    window.gameHeight = canvas.offsetHeight;
    if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
    } else {
        canvas.width = window.gameWidth;
        canvas.height = window.gameHeight;
    }
    window.PROJECTION_CENTER_X = window.gameWidth / 2;
    window.PROJECTION_CENTER_Y = window.gameHeight / 2;
    window.FIELD_OF_VIEW = window.gameWidth * 0.8;

    createEntities(entities, ctx); // Reset all entities
}

export {
    onResize,
    afterResize
}