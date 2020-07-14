import { gsap, TweenMax, Elastic } from "gsap";

export function fillCanvas(canvas) {
  shake(canvas, 10);
  gsap.fromTo(canvas, { backgroundColor: "#ff0000", duration: 0 }, { backgroundColor: "#ffffff", duration: 5 });
}

function shake(target, x_index = 5,) {
  TweenMax.fromTo(target, 0.05, { x: -x_index }, { x: x_index, repeat: 5, yoyo: true, ease: Elastic, onComplete: function () { TweenMax.to(target, 0.5, { x: 0, ease: Elastic.easeOut }) } })
}