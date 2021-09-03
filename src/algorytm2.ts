// private reverse(board: boardInterface, dest: board): void {
//     let x = dest.x
//     let y = dest.y
//     let found = false
//     dest.elem.style.backgroundColor = "blue"
//     if (board[x + 1]) {
//         if (!found) {
//             if (board[x + 1][y].num + 1 == dest.num&&!board[x + 1][y].obstacle) {
//                 board[x + 1][y].elem.style.backgroundColor = "blue"
//                 found = true
//                 this.path.push( board[x + 1][y])
//                 this.reverse(board, board[x + 1][y])

//             }
//         }
//     }
//     if (board[x - 1]) {
//         if (!found) {
//             if (board[x - 1][y].num + 1 == dest.num&&!board[x - 1][y].obstacle) {
//                 board[x - 1][y].elem.style.backgroundColor = "blue"
//                 found = true
//                 this.path.push( board[x - 1][y])
//                 this.reverse(board, board[x - 1][y])
//             }
//         }
//     }
//     if (board[x][y + 1]) {
//         if (!found) {
//             if (board[x][y + 1].num + 1 == dest.num&&!board[x][y+1].obstacle) {
//                 board[x][y + 1].elem.style.backgroundColor = "blue"
//                 found = true
//                 this.path.push( board[x][y+1])
//                 this.reverse(board, board[x][y + 1])
//             }
//         }
//     }
//     if (board[x][y - 1]) {
//         if (!found) {
//             if (board[x][y - 1].num + 1 == dest.num&&!board[x][y-1].obstacle) {
//                 board[x][y - 1].elem.style.backgroundColor = "blue"
//                 found = true
//                 this.path.push( board[x][y-1])
//                 this.reverse(board, board[x][y - 1])
//             }
//         }
//     }

// }