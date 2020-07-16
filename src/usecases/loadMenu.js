import Menu from "../entities/menu";

export default function LoadMenu(action) {
    const startButton = document.getElementById("startButton");
    const menu = new Menu(startButton);
    
    switch (action) {
        case "loadMenu":
            menu.load();
            break;

        case "removeStartButton":
            menu.remove();
            break;
    
        default:
            break;
    }
}