import { Board } from "./Board"
import { boardInterface } from "./Interfaces"
import { board } from "./Interfaces"
import { board2 } from "./Interfaces"

export class Algorytm {
    protected toCheck: Array<board> = []
    protected path: board2 = []
    protected pathExist:boolean
    protected found:boolean
    protected pathLength:number= 0
    constructor() {
    }

    public log(board: boardInterface, target: board, destination: board): void {
        this.found = false
        this.pathExist = false
        this.pathLength = 0
        destination.num = 1000
        target.num = 0
        board.forEach(element => {
            element.forEach(element2 => {
                if (!isNaN(element2.num) && element2.num != 1000&&element2!= target) {
                    element2.num = undefined
                    element2.elem.style.backgroundColor = "white"
                }

            });
        });
        this.toCheck = []
        this.pathFind(board, target, destination)

    }

    private pathFind(board: boardInterface, target: board, destination: board): void {
        //let algBoard = [target]
        let currentElem = target
        
        
        //console.log(destination)
        this.find(board, target, destination,target)

        // board.forEach(element => {
        //     element.forEach(element2 => {
        //         element2.num = 0
        //     });
        // });
    }
    private find(board: boardInterface, elem: board, destination: board,target:board): void {

        this.toCheck.shift()
        this.path = []
        //console.log(elem)
        if (elem) {
            //console.log(this.found)
            if (this.found) {
                console.log("znalezione")
                this.toCheck = []
                this.pathExist = true
            }
            else {
                if (board[elem.x + 1] != undefined) {
                    if (board[elem.x + 1][elem.y].num == undefined && board[elem.x + 1][elem.y].num != NaN) {
                        this.toCheck.push(board[elem.x + 1][elem.y])
                        board[elem.x + 1][elem.y].num = elem.num + 1
                    }
                    else if (board[elem.x + 1][elem.y].num == 1000) {
                        this.found = true
                        destination.num = elem.num + 1
                    }
                }
                if (board[elem.x - 1] != undefined && board[elem.x - 1][elem.y].num != NaN) {
                    if (board[elem.x - 1][elem.y].num == undefined) {
                        this.toCheck.push(board[elem.x - 1][elem.y])
                        board[elem.x - 1][elem.y].num = elem.num + 1
                    }
                    else if (board[elem.x - 1][elem.y].num == 1000) {
                        this.found = true
                        destination.num = elem.num + 1
                    }
                }
                if (board[elem.x][elem.y + 1] != undefined && board[elem.x][elem.y + 1].num != NaN) {
                    if (board[elem.x][elem.y + 1].num == undefined) {
                        this.toCheck.push(board[elem.x][elem.y + 1])
                        board[elem.x][elem.y + 1].num = elem.num + 1
                    }
                    else if (board[elem.x][elem.y + 1].num == 1000) {
                        this.found = true
                        destination.num = elem.num + 1
                    }
                }
                if (board[elem.x][elem.y - 1] != undefined && board[elem.x][elem.y - 1].num != NaN) {
                    if (board[elem.x][elem.y - 1].num == undefined) {
                        this.toCheck.push(board[elem.x][elem.y - 1])
                        board[elem.x][elem.y - 1].num = elem.num + 1
                    }
                    else if (board[elem.x][elem.y - 1].num == 1000) {
                        this.found = true
                        destination.num = elem.num + 1
                    }
                }

                this.toCheck.forEach(elem => {
                    if (board[elem.x + 1] != undefined && board[elem.x + 1][elem.y].num != NaN) {
                        if (board[elem.x + 1][elem.y].num == undefined) {
                            this.toCheck.push(board[elem.x + 1][elem.y])
                            board[elem.x + 1][elem.y].num = elem.num + 1
                        }
                        else if (board[elem.x + 1][elem.y].num == 1000) {
                            this.found = true
                            destination.num = elem.num + 1
                        }
                    }
                    if (board[elem.x - 1] != undefined && board[elem.x - 1][elem.y].num != NaN) {
                        if (board[elem.x - 1][elem.y].num == undefined) {
                            this.toCheck.push(board[elem.x - 1][elem.y])
                            board[elem.x - 1][elem.y].num = elem.num + 1
                        }
                        else if (board[elem.x - 1][elem.y].num == 1000) {
                            this.found = true
                            destination.num = elem.num + 1
                        }
                    }
                    if (board[elem.x][elem.y + 1] != undefined && board[elem.x][elem.y + 1].num != NaN) {
                        if (board[elem.x][elem.y + 1].num == undefined) {
                            this.toCheck.push(board[elem.x][elem.y + 1])
                            board[elem.x][elem.y + 1].num = elem.num + 1
                        }
                        else if (board[elem.x][elem.y + 1].num == 1000) {
                            this.found = true
                            destination.num = elem.num + 1
                        }
                    }
                    if (board[elem.x][elem.y - 1] != undefined && board[elem.x][elem.y - 1].num != NaN) {
                        if (board[elem.x][elem.y - 1].num == undefined) {
                            this.toCheck.push(board[elem.x][elem.y - 1])
                            board[elem.x][elem.y - 1].num = elem.num + 1
                        }
                        else if (board[elem.x][elem.y - 1].num == 1000) {
                            this.found = true
                            destination.num = elem.num + 1
                        }
                    }
                });
                if (!this.found) {
                    this.find(board, this.toCheck[0], destination,target)

                }
                else if (this.found) {
                    this.reverse(board, destination,target)
                    this.path.push(target)
                }
            }
        }
        
    }

    private reverse(board: boardInterface, dest: board,target:board): void {
        let x = dest.x
        let y = dest.y
        let next = true
        //console.log(dest)
        if (board[x + 1]) {
            if(next){
                if(dest.num -1 == board[x+1][y].num){
                    this.path.push(board[x+1][y])
                    next = false
                    this.pathLength+=1
                    this.reverse(board, board[x+1][y],target)
                }
            }
            
        }
        if (board[x - 1]) {
            if(next){
                if(dest.num -1 == board[x-1][y].num){
                    this.path.push(board[x-1][y])
                    next = false
                    this.pathLength+=1
                    this.reverse(board, board[x-1][y],target)
                }
            }
        }
        if (board[x][y+1]) {
            if(next){
                if(dest.num -1 == board[x][y+1].num){
                    this.path.push(board[x][y+1])
                    next = false
                    this.pathLength+=1
                    this.reverse(board, board[x][y+1],target)
                }
            }
        }
        if (board[x][y-1]) {
            if(next){
                if(dest.num -1 == board[x][y-1].num){
                    this.path.push(board[x][y-1])
                    next = false
                    this.pathLength+=1
                    this.reverse(board, board[x][y-1],target)
                }
            }
        }
        
        if(!next){
            //console.log(this.path[1])
        }
        // console.log("path")
        // console.log(this.path.length)
        // console.log("num")
        // console.log(dest.num)
        
    }

    public getPath():Array<board>{
        
        return this.path
    }

    public isPath():boolean{
        //console.log(this.path)
        if (this.path.length==0){
            this.pathExist = false
        }
        else{
            this.pathExist = true
        }
        return this.pathExist
    }
}