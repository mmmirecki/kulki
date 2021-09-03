import { boardInterface } from "./Interfaces"
import { board } from "./Interfaces"

export class Zbijanie {
    constructor() {

    }

    public bitka(board: boardInterface, target: board): [Boolean,number] {
        console.log(target)
        let zbite = false
        let punkty = 1
        let x = target.x
        let y = target.y
        let xToCheck = x
        let yToCheck = y
        let el = board[x][y].elem.children[0] as HTMLElement
        let color = el.style.backgroundColor
        let vert = 1
        let hor = 1
        let tlCross = 1
        let trCross = 1
        xToCheck = x + 1
        let vertStrike = [target]
        let horStrike = [target]
        let tlCrossStrike = [target]
        let trCrossStrike = [target]
        while (xToCheck < 9) {
            let elToCheck = board[xToCheck][y].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w dol")
                    vertStrike.push(board[xToCheck][y])
                    xToCheck += 1
                    vert +=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        xToCheck = x - 1
        while(xToCheck>=0){
            let elToCheck = board[xToCheck][y].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w gore")
                    vertStrike.push(board[xToCheck][y])
                    xToCheck -= 1
                    vert+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        yToCheck = y+1
        while(yToCheck<9){
            let elToCheck = board[x][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    horStrike.push(board[x][yToCheck])
                    yToCheck += 1
                    hor+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        yToCheck = y-1
        while(yToCheck>=0){
            let elToCheck = board[x][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    horStrike.push(board[x][yToCheck])
                    yToCheck -= 1
                    hor+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        xToCheck = x + 1
        yToCheck = y + 1
        while(xToCheck<9&&yToCheck<9){

            let elToCheck = board[xToCheck][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    tlCrossStrike.push(board[xToCheck][yToCheck])
                    xToCheck += 1
                    yToCheck += 1
                    tlCross+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        xToCheck = x - 1
        yToCheck = y- 1
        while(xToCheck>=0&&yToCheck>=0){

            let elToCheck = board[xToCheck][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    tlCrossStrike.push(board[xToCheck][yToCheck])
                    xToCheck -= 1
                    yToCheck -= 1
                    tlCross+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        xToCheck = x + 1
        yToCheck = y- 1
        while(xToCheck<9&&yToCheck>=0){

            let elToCheck = board[xToCheck][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    trCrossStrike.push(board[xToCheck][yToCheck])
                    xToCheck += 1
                    yToCheck -= 1
                    trCross+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        xToCheck = x - 1
        yToCheck = y+ 1
        while(xToCheck>=0&&yToCheck<9){

            let elToCheck = board[xToCheck][yToCheck].elem.children[0] as HTMLElement
            if (elToCheck) {
                if (elToCheck.style.backgroundColor == color) {
                    console.log("kulka w bok")
                    trCrossStrike.push(board[xToCheck][yToCheck])
                    xToCheck -= 1
                    yToCheck += 1
                    trCross+=1
                    
                }
                else{
                    break
                }
            }
            else {
                break
            }
        }
        
        
        if(vert>=3){
            vertStrike.forEach(element => {
                console.log(element)
                element.obstacle = false
                element.num = undefined
                element.elem.innerHTML = ""
                zbite = true
            });
            punkty+=vertStrike.length - 1
        }
        if(hor>=3){
            horStrike.forEach(element => {
                console.log(element)
                element.obstacle = false
                element.num = undefined
                element.elem.innerHTML = ""
                zbite = true
            });
            punkty+=horStrike.length - 1
        }
        if(tlCross>=3){
            tlCrossStrike.forEach(element => {
                console.log(element)
                element.obstacle = false
                element.num = undefined
                element.elem.innerHTML = ""
                zbite = true
            });
            punkty+=tlCrossStrike.length - 1
        }
        if(trCross>=3){
            trCrossStrike.forEach(element => {
                console.log(element)
                element.obstacle = false
                element.num = undefined
                element.elem.innerHTML = ""
                zbite = true
            });
            punkty+=trCrossStrike.length - 1
        }
        console.log("kulki")
        console.log("vert: "+vert)
        console.log(vertStrike)
        console.log("hor: "+hor)
        console.log(horStrike)

        return(
            [zbite,punkty]
        )
    }

    private checkField(field: board) {

    }
}