const size = new Vector2(1000,1000);
const main = new Enviroment (size,new Vector2(0,0.1), 1);
const can = main.generateCanvas();
document.body.appendChild(can);
can.addEventListener("mousedown", (e) => {
    main.gravity = new Vector2(e.clientX/can.width*2-1,(e.clientY/can.height)*2-1);
});
function update () {
    main.draw(can);
    main.solvePhysics();
    requestAnimationFrame(update);
}
const amount = 200;
// for (let i = 0; i < amount; i++) {
//     const p = new Point(getRandomPosition(size),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0,0.99,new Vector2(0,0));
//     main.addPoint(p);
// }
main.addShape(getSimpleShape(4,70,new Vector2(100,100),new Colour(0,0,0,1),2,0.9,0.5));
// main.addPoint(new Point(new Vector2(100,100),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0.9,0.2,new Vector2(30,0)));
// main.addPoint(new Point(new Vector2(100,200),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0.9,0.2,new Vector2(0,0)));
// main.addPoint(new Point(new Vector2(200,200),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0.9,0.2,new Vector2(0,0)));
// main.addPoint(new Point(new Vector2(200,100),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0.9,0.2,new Vector2(0,0)));
// main.addWeld(new Weld(main.points[0],main.points[1],2,new Colour(0,0,0,1),0,0),100);
// main.addWeld(new Weld(main.points[0],main.points[2],2,new Colour(0,0,0,1),0,0),100);
// main.addWeld(new Weld(main.points[0],main.points[3],2,new Colour(0,0,0,1),0,0),100);
// main.addWeld(new Weld(main.points[1],main.points[2],2,new Colour(0,0,0,1),0,0),100);
// main.addWeld(new Weld(main.points[1],main.points[3],2,new Colour(0,0,0,1),0,0),100);
// main.addWeld(new Weld(main.points[2],main.points[3],2,new Colour(0,0,0,1),0,0),100);
update();