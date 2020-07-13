import { gsap, TweenMax, Elastic, RoughEase, Sine } from "gsap";


export function deleteCanvas(ctx, canvas) {


  // var duration = 2;

  // // starting and ending colors
  // var rgbStart = '#ff0000';
  // var rgbEnd = '#ffffff';
  // // calculate the # of frames that requestAnimationFrame can
  // // draw during the duration
  // var opacitySteps = parseInt(60 * duration);
  // // set the current opacity step at its starting number (0)
  // var opacityStep = 0;

  // // start the 2.5 second animation
  // requestAnimationFrame(animate);


  // function animate(time) {

  //   // calculate the current opacity as a percentage
  //   //     of opacityStep/opacitySteps
  //   var opacity = 100 * (opacityStep / opacitySteps);
  //   if (opacityStep >= opacitySteps - 1) { opacity = 100; }

  //   // clear the canvas
  //   ctx.clearRect(0, 0, width, height);

  //   // draw with the starting color using a lessening opacity
  //   ctx.globalAlpha = (100 - opacity) / 100;
  //   ctx.fillStyle = rgbStart;
  //   ctx.fillRect(0, 0, width, height);
  //   ctx.strokeRect(0, 0, width, height);

  //   // draw with the ending color using a increasing opacity
  //   ctx.globalAlpha = (opacity) / 100;
  //   ctx.fillStyle = rgbEnd;
  //   ctx.fillRect(0, 0, width, height);
  //   ctx.strokeRect(0, 0, width, height);

  //   // clean up, reset globalAlpha to it's default of 1.00
  //   ctx.globalAlpha = 1.00;

  //   // return if all steps have been played
  //   if (++opacityStep >= opacitySteps) { return; }

  //   // otherwise request another frame
  //   requestAnimationFrame(animate);
  // }

  // function update() {
  //   ctx.rect(20, 20, 150, 100);
  //   ctx.fill();
  // }

  // //returns a random integer in a range
  // function random(min, max) {
  //   return (min + Math.random() * (max - min) + 0.5) | 0;
  // }

  // function tweenToRandomColor() {
  //   gsap.to(ctx, 1, { colorProps: { fillStyle: "red" }});
  // }

  // tweenToRandomColor();


  ///////////////////////////////////////////////

  // gsap.to(ctx, 1, { css: { backgroundColor: '#00CCFF' } })
  // gsap.to(ctx, 1, { css: { backgroundColor: '#00CCFF' } })

  // gsap.to("canvas", 1, { x: "+=20" })
  // gsap.to("canvas", 1, { x: "-=20" });
  // gsap.to(canvas, 0.05, { x: "+=10", repeat: 21, yoyo: true });
  TweenMax.fromTo(canvas, 0.05, { x: -10 }, { x: 10, repeat: 5, yoyo: true, ease: RoughEase, onComplete: function () { TweenMax.to(canvas, 0.5, { x: 0, ease: Elastic.easeOut }) } })
  // shake(canvas, 10);
  gsap.fromTo(canvas, { backgroundColor: "#ff0000", duration: 0 }, { backgroundColor: "#ffffff", duration: 5 });
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // gsap.to(canvas, { backgroundColor: "#ffffff", duration: 4 });
}


// export function shake(target, x_index = 5,) {
//   TweenMax.fromTo(target, 0.05, { x: -x_index }, { x: x_index, repeat: 5, yoyo: true, ease: RoughEase, onComplete: function () { TweenMax.to(target, 0.5, { x: 0, ease: Elastic.easeOut }) } })

// }