export interface board{
    readonly elem:HTMLTableDataCellElement,
    obstacle:boolean,
    readonly x:number,
    readonly y:number,
    num:number,
    color:number
}
export interface board2 extends Array<board>{}

export interface boardInterface extends Array<board2>{}
