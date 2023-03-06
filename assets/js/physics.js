class Point {
    constructor (p,r,c,b,d,v) {
        this.pos = p;
        this.velocity = v;
        this.radius = r;
        this.colour = c;
        this.bouncyness = b;
        this.drag = d;

        this.constrain = (size) => {
            if (this.pos.x - this.radius < 0) {
                this.pos.x = 0 + this.radius;
                this.velocity.x *= -this.bouncyness;
                this.velocity.y *= this.drag;
            }
            if (this.pos.x + this.radius > size.x) {
                this.pos.x = size.x - this.radius;
                this.velocity.x *= -this.bouncyness;
                this.velocity.y *= this.drag;
            }
            if (this.pos.y - this.radius < 0) {
                this.pos.y = 0 + this.radius;
                this.velocity.x *= this.drag;
                this.velocity.y *= -this.bouncyness;
            }
            if (this.pos.y + this.radius > size.y) {
                this.pos.y = size.y - this.radius;
                this.velocity.x *= this.drag;
                this.velocity.y *= -this.bouncyness;
            }
        };
        this.solveCollisions = (points) => {
            points.map((i) => {
                const dis = returnDistance(new Vector2(this.pos.x-i.pos.x,this.pos.y-i.pos.y));
                const requiredDistance = this.radius + i.radius;
                if (dis < requiredDistance) {
                    if (i != this) {
                        const normal = new Vector2(this.pos.x-i.pos.x,this.pos.y-i.pos.y);
                        normal.normalize();
                        const add1 = normal.clone();
                        add1.multiply(new Vector2((requiredDistance-dis)*((requiredDistance-this.radius)/requiredDistance), (requiredDistance-dis)*((requiredDistance-this.radius)/requiredDistance)));
                        normal.multiply(new Vector2((requiredDistance-dis)*((requiredDistance-i.radius)/requiredDistance), (requiredDistance-dis)*((requiredDistance-i.radius)/requiredDistance)));
                        normal.multiply(new Vector2(-1,-1));
                        this.pos.add(add1);
                        this.velocity.add(add1);
                        i.pos.add(normal);
                        i.velocity.add(normal);
                    }
                }
            });
        };
    }
}
class Weld {
    constructor (p1,p2,r,c) {
        this.point1 = p1;
        this.point2 = p2;
        this.radius = r;
        this.colour = c;
    }
}
class Vector2 {
    constructor (x,y) {
        this.x = x;
        this.y = y;

        this.add = (v) => {
            try {
                this.x += v.x;
                this.y += v.y;
            } catch (e) {
                console.error("Argument is not of type \"Vector2\"")
            }
        };
        this.substract = (v) => {
            try {
                this.x -= v.x;
                this.y -= v.y;
            } catch (e) {
                console.error("Argument is not of type \"Vector2\"")
            }
        };
        this.multiply = (v) => {
            try {
                this.x *= v.x;
                this.y *= v.y;
            } catch (e) {
                console.error("Argument is not of type \"Vector2\"")
            }
        };
        this.devide = (v) => {
            try {
                this.x /= v.x;
                this.y /= v.y;
            } catch (e) {
                console.error("Argument is not of type \"Vector2\"")
            }
        };
        this.round = () => {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        };
        this.absolute = () => {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
        };
        this.normalize = () => {
            this.x /= returnDistance(this);
            this.y /= returnDistance(this);
        };
        this.clone = () => {
            return new Vector2(this.x,this.y);
        };
    }
}
class Colour {
    constructor (r,g,b,a) {
        this.r = r|0;
        this.g = g|0;
        this.b = b|0;
        this.a = a|0;

        this.getRgbString = () => {
            return `rgba(${r},${g},${b},${a})`;
        };
    }
}
class Enviroment {
    constructor (s,g) {
        this.size = s;
        this.gravity = g;
        this.points = [];
        this.welds = [];

        this.addPoint = (p) => {
            this.points.push(p);
        };
        this.addWeld = (w) => {
            this.welds.push(w);
        };

        this.draw = (can) => {
            const ctx = can.getContext('2d');
            ctx.clearRect(0,0,can.width,can.height);
            this.points.map((i) => {
                ctx.beginPath();
                ctx.arc(i.pos.x,i.pos.y,i.radius,0,2*Math.PI,false);
                ctx.fillStyle = i.colour.getRgbString();
                ctx.fill();
            });
            this.welds.map((i) => {
                ctx.beginPath();
                ctx.moveTo(i.point1.pos.x, i.point1.pos.y);
                ctx.lineTo(i.point2.pos.x, i.point2.pos.y);
                ctx.lineWidth = i.radius;
                ctx.strokeStyle = i.colour.getRgbString();
                ctx.stroke();
            });
        };
        this.generateCanvas = () => {
            const can = document.createElement("canvas");
            can.width = size.x;
            can.height = size.y;
            return can;
        };
        this.solvePhysics = () => {
            this.points.map((i)=>{
                const change = new Vector2(0,0);
                change.add(i.velocity);
                change.add(this.gravity);
                i.velocity = change;
                i.pos.add(i.velocity);
                i.solveCollisions(this.points);
                i.constrain(size);
            });
        };
    }
}
function getRandomPosition (size) {
    const p = new Vector2(Math.random(),Math.random());
    p.multiply(size);
    return p;
}
function returnDistance (shape) {
    return Math.sqrt(Math.pow(shape.x,2)+Math.pow(shape.y,2));
}