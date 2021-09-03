
export function ball(colors:Array<string>):HTMLDivElement{
    let ball:HTMLDivElement
    var color:string = colors[Math.floor(Math.random() * colors.length)];
    ball = document.createElement("div")
    ball.className = "ball"
    ball.style.backgroundColor = color
    
    return ball
}