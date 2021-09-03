import { Algorytm } from "./Algorytm"
import { ball } from "./Ball"
import { boardInterface } from "./Interfaces"
import { board } from "./Interfaces"
import { strajk, szydera } from "./Decorators"
import { cli } from "../node_modules/webpack/types"
import { Zbijanie } from "./Zbijanie"

export class Board {
    readonly width: number = 9
    readonly height: number = 9
    private div: HTMLDivElement;
    target: board;
    destination: board;
    readonly obstacles: number = 3
    protected numOfObstacles: number = 0
    board: boardInterface = []
    readonly algorytm = new Algorytm
    private nextBalls: Array<HTMLElement>
    readonly zbijanie = new Zbijanie
    punkty: number = 0
    zbite = false

    constructor() {
        this.div = document.createElement("div")
        this.div.id = "board"
        this.nextBalls = this.randomBalls()
        this.createTable()

    }
    //@strajk
    //@szydera
    private createTable(): void {

        console.log("Creating table")
        let self = this
        let table = document.createElement("table")
        for (let w: number = 0; w < this.width; w++) {
            this.board[w] = []
            let row = document.createElement("tr")
            for (let h: number = 0; h < this.height; h++) {
                let cell = document.createElement("td")
                cell.className = "boardCell"
                row.appendChild(cell)
                this.board[w][h] = { elem: cell, obstacle: false, x: w, y: h, num: undefined, color: undefined }

                cell.onclick = function () {
                    self.clickCell(self.board[w][h], event)
                }
                cell.onmouseenter = function () {
                    self.hover(self.board[w][h])
                }
            }
            table.appendChild(row)
        }
        this.div.appendChild(table)
        document.body.appendChild(this.div)
        this.createObstacles(this.obstacles)
    }


    private createObstacles(amount: number): void {
        console.log("Creating obstacles")
        let creating: Boolean = true
        let createdObstacles: number = 0
        let balls = this.nextBalls
        let i = 0
        document.getElementById("kulki").innerHTML = ""
        if (this.numOfObstacles + this.obstacles >= this.width * this.height) {
            this.board.forEach(element => {
                element.forEach(element2 => {
                    if (!element2.obstacle && i < 3) {
                        element2.elem.appendChild(this.nextBalls[i].cloneNode())
                        element2.obstacle = true
                        element2.num = NaN
                        this.numOfObstacles += 1
                        i += 1
                        let zbijanie = this.zbijanie.bitka(this.board, element2)
                        if (zbijanie[0]) {
                            this.numOfObstacles -= zbijanie[1]
                            this.punkty += zbijanie[1]
                            document.getElementById("punkty").innerHTML = this.punkty.toString()
                        }
                        if (this.numOfObstacles == this.width * this.height) {
                            alert("Gratulacje uzyskales " + this.punkty.toString() + " punktów")
                        }
                    }
                });

            });
        }
        else {
            while (createdObstacles < amount) {
                let x = Math.floor((Math.random() * this.width));
                let y = Math.floor((Math.random() * this.height));
                if (this.board[x][y].obstacle != true) {
                    createdObstacles++
                    this.numOfObstacles += 1
                    let el = this.board[x][y]
                    el.obstacle = true
                    el.num = NaN
                    el.elem.appendChild(this.nextBalls[i].cloneNode())
                    i += 1
                    let zbijanie = this.zbijanie.bitka(this.board, el)
                    if (zbijanie[0]) {
                        this.numOfObstacles -= zbijanie[1]
                        this.punkty += zbijanie[1]
                        document.getElementById("punkty").innerHTML = this.punkty.toString()
                    }
                    //el.elem.style.backgroundColor = "black"
                }
                if (this.numOfObstacles == this.width * this.height) {
                    break
                }

            }
        }
        this.nextBalls = this.randomBalls()

        for (let i = 0; i < this.obstacles; i++) {
            document.getElementById("kulki").appendChild(this.nextBalls[i])
        }
    }

    private clickCell(clickedCell: board, event: any): void {
        console.log("przed")
        console.log(clickedCell)
        let otoczenie = 0
        if (clickedCell.x != 8 && clickedCell.x != 0) {
            if (this.board[clickedCell.x + 1][clickedCell.y].obstacle) {
                otoczenie += 1
            }
            if (this.board[clickedCell.x - 1][clickedCell.y].obstacle) {
                otoczenie += 1
            }
            if (clickedCell.y != 8 && clickedCell.y != 0) {
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            else if (clickedCell.y == 8) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            else if (clickedCell.y == 0) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
            }
        }
        else if (clickedCell.x == 8) {
            otoczenie += 1
            if (this.board[clickedCell.x - 1][clickedCell.y].obstacle) {
                otoczenie += 1
            }
            if (clickedCell.y != 8 && clickedCell.y != 0) {
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            if (clickedCell.y == 8) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            else if (clickedCell.y == 0) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
            }
        }
        else if (clickedCell.x == 0) {
            otoczenie += 1
            if (clickedCell.y != 8 && clickedCell.y != 0) {
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            if (this.board[clickedCell.x + 1][clickedCell.y].obstacle) {
                otoczenie += 1
            }
            if (clickedCell.y == 8) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y - 1].obstacle) {
                    otoczenie += 1
                }
            }
            else if (clickedCell.y == 0) {
                otoczenie += 1
                if (this.board[clickedCell.x][clickedCell.y + 1].obstacle) {
                    otoczenie += 1
                }
            }
        }

        console.log(otoczenie)


        // if(!this.board[clickedCell.x+1][clickedCell.y].obstacle&&!this.board[clickedCell.x-1][clickedCell.y].obstacle&&
        //     !this.board[clickedCell.x][clickedCell.y+1].obstacle&&!this.board[clickedCell.x][clickedCell.y-1].obstacle){
        //         console.log("mozna")
        //     }
        // else{
        //     console.log("nie mozna")
        // }

        if (this.target && this.destination == undefined && clickedCell.elem.children.length < 1 && this.getPath().length == clickedCell.num + 1) {
            console.log("clickedCell")

            this.destination = clickedCell
            //console.log(this.destination)
            this.destination.elem.style.backgroundColor = "red"
            this.findWay(this.board, this.target, this.destination)
            this.destination.obstacle = true
            this.destination.num = NaN
            this.target.obstacle = false
            //this.target.num = 0
            if (this.target.elem.children.length > 0) {
                let children = this.target.elem.children[0]
                this.destination.elem.appendChild(children)
            }
            let zbijanie = this.zbijanie.bitka(this.board, this.destination)
            if (zbijanie[0]) {
                this.zbite = true
                this.numOfObstacles -= zbijanie[1]
                this.punkty += zbijanie[1]
                console.log("zbijanmie")
                console.log(zbijanie)
                document.getElementById("punkty").innerHTML = this.punkty.toString()
            }
            else {
                this.zbite = false
            }
            this.getPath().forEach(element => {
                element.elem.style.backgroundColor = "gray"
                setTimeout(() => {
                    element.elem.style.backgroundColor = "white"
                }, 100);
            });
            setTimeout(() => {
                if (!this.zbite) {
                    this.createObstacles(this.obstacles)
                }
                this.destination.elem.style.backgroundColor = "white"
                //this.destination.num= NaN
                this.target = undefined
                this.destination = undefined
            }, 100);



        }
        else if (this.target == undefined && clickedCell.elem.children.length == 1 && otoczenie != 4) {
            this.target = clickedCell
            this.target.elem.style.backgroundColor = "blue"
            //this.target.obstacle = false
            //this.target.num = 0
        }
        else if (this.target == clickedCell) {
            this.target.elem.style.backgroundColor = "white"
            this.target.num = NaN
            this.target.obstacle = true
            this.target = undefined

            this.board.forEach(element => {
                element.forEach(element2 => {
                    if (!isNaN(element2.num) && element2.num != 1000) {
                        element2.num = 0
                        element2.elem.style.backgroundColor = "white"
                    }

                });
            });
        }
        else if (this.target && this.destination == undefined && clickedCell.elem.children.length == 1 && otoczenie != 4) {
            console.log("przklikane")
            this.target.elem.style.backgroundColor = "white"
            this.target.num = NaN
            this.target.obstacle = true
            this.target = undefined
            this.target = clickedCell
            this.target.elem.style.backgroundColor = "blue"
        }
        //console.log(this.target)
        //console.log(this.destination)
        console.log("po")
        console.log(clickedCell)
        document.getElementById("punkty").innerHTML = this.punkty.toString()
    }

    private hover(hoveredCell: board): void {
        if (this.target && hoveredCell.elem.children.length < 1 && this.destination == undefined) {
            this.findWay(this.board, this.target, hoveredCell)
            //console.log(this.getPath().length)
            //console.log(hoveredCell.num)
            if (this.getPath().length == hoveredCell.num + 1) {
                hoveredCell.elem.style.backgroundColor = "red"
                this.getPath().forEach(element => {

                    element.elem.style.backgroundColor = "blue"
                });
            }
        }
        else if (hoveredCell.elem.children.length == 1 && this.destination == undefined) {
            this.board.forEach(element => {
                element.forEach(element2 => {
                    if (!isNaN(element2.num) && element2.num != 1000 && element2 != this.target) {
                        element2.num = undefined
                        element2.elem.style.backgroundColor = "white"
                    }

                });
            });
        }
    }

    private findWay(board: boardInterface, target: board, destination: board): void {
        this.algorytm.log(board, target, destination)
    }

    private getPath(): Array<board> {
        return this.algorytm.getPath()
    }
    private randomBalls(): Array<HTMLDivElement> {
        let balls: Array<HTMLDivElement> = []
        let colors = ["#d9ccff", "#ccffff", "#ffccd9", "#ff8080", "#d9d9d9", "#ffd9b3", "#e6ff99"]
        for (let i = 0; i < this.obstacles; i++) {
            balls.push(ball(colors))
        }
        return balls
    }


}



