// the color of the circles by times
export const intervals = [
    {start:60 , end:660, color:"rgba(219, 112, 147, 0.2)" },
    {start:661 , end:1260, color:"rgba(219, 112, 147, 0.3)"},
    {start:1261 , end:1860, color:"rgba(219, 112, 147, 0.4)"},
    {start:1861 , end:2460, color:"rgba(219, 112, 147, 0.5)"},
    {start:2461 , end:3060, color:"rgba(219, 112, 147, 0.6)"},
    {start:3061 , end:3600, color:"rgba(219, 112, 147, 0.7)"},
    {start:3601 , end:4200, color:"rgba(219, 112, 147, 0.8)"},
    {start:4201 , end:4800, color:"rgba(219, 112, 147, 0.9)"},
    {start:4801 , end:5400, color:"rgba(219, 112, 147, 1.0)"}
]

export class CirclesOfRoom {
    constructor(id, name, r)
    {
        this.id = id;    
        this.name = name;
        this.r = r;   
        this.x = []; 
        this.y = [];
    }

    // loads the coordinate arrays, if we want to draw more circles 
    addCircle(x_start, x_end, x_end2, y_start, y_end, y)
    {
        let x, iterator = (2*this.r);
            
        if ( y !== 0) {
            for (x = x_start; x < x_end; x += iterator) {
                this.x.push(x);
                this.y.push(y);
            }
        } else if (x_end2 !== 0) {
            for (y = y_start; y <= y_end; y += iterator) {
                if (y === y_start) {
                    for (x = x_start; x <= x_end; x += iterator) { 
                        this.x.push(x);
                        this.y.push(y);
                    }
                } else {
                    for (x = x_start; x <= x_end2; x += iterator) { 
                        this.x.push(x);
                        this.y.push(y);
                    } 
                }
            }
        } else {
            for (y = y_start; y <= y_end; y += iterator) {
                for (x = x_start; x <= x_end; x += iterator) { 
                    this.x.push(x);
                    this.y.push(y);
                }
            }
        }
    }

    // draws one circle / room
    coloringOneCircle(ctx,x,y,color_t)
    {
        ctx.fillStyle = color_t;
        ctx.strokeStyle = color_t;
        ctx.beginPath();
            ctx.arc(x,y,this.r,0,2*Math.PI);
            ctx.fill();
        ctx.stroke();
    }

    // draws more circles / room
    coloringCircles(ctx,color_t)
    {
        ctx.fillStyle = color_t;
        ctx.strokeStyle = color_t;
        ctx.beginPath();
        for(let i = 0; i < this.x.length; i++) {
            ctx.arc(this.x[i],this.y[i],this.r,0,2*Math.PI);
            ctx.fill();
        }
        ctx.stroke();
    }
}

export default CirclesOfRoom;