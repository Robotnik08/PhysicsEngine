const size = new Vector2(1000,1000);
const main = new Enviroment (size,new Vector2(0,0.1));
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
const amount = 100;
for (let i = 0; i < amount; i++) {
    const p = new Point(getRandomPosition(size),20,new Colour(Math.random()*255,Math.random()*255,Math.random()*255,1),0,0.99,new Vector2(0,0));
    main.addPoint(p);
}
update();