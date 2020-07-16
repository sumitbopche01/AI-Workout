import gsap from "gsap";

export default class Menu {

    constructor(startButton){

        this.startButton = startButton;
    }

    load(){
        gsap.fromTo(this.startButton, {autoAlpha: 0, x:"50%", y:-100}, {autoAlpha: 1, x:"50%", y: "100%", duration: 3});
    }

    remove(){
        gsap.to(this.startButton, {autoAlpha: 0, duration: 2});
    }
}