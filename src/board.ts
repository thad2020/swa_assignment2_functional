export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}    

export type Match<T> = {
    matched: T,
    positions: Position[]
}    

export type Board<T> = {
   readonly width: number
   readonly height: number
   readonly generator: Generator<T>
   board: T[][]
//pieces: T[]
 //  positionsArray: Position[]
};

export type Effect<T> = {};

export type MoveResult<T> = {
    board: Board<T>,
    effects: Effect<T>[]
}    

export function create<T>(generator: Generator<T>, width: number, height: number): Board<T> {      
    const Board: Board<T> = ({
        width: width, 
        height: height, 
        generator:generator, 
        board: []
       // positionsArray: []
    })

   // this.positions = positions(Board)
   this.board = generate(Board, generator)
//console.log(this.board)
    return Board; 
}    

export function generate<T>(Board: Board<T>, generator: Generator<T>)
{
    let array = [];

    for (let i = 0; i < Board.height; i++) {
        let row = [];
        for (let j = 0; j < Board.width; j++) {
            row.push(generator.next());
        }
        array.push(row);
    }

    return array;
}

export function positions<T>(board: Board<T>): Position[] {
    let array = [];

    for (let i = 0; i < board.height; i++) {
        for (let j = 0; j < board.width; j++) {
            array.push({row: i, col: j});
        }
    }

    return array
}

export function piece<T>(board: [][], p: Position): T | undefined {


    if (p.row < 0 || p.col < 0) {
        return undefined;
    }

    if (p.row < board.height && p.col < board.width) {
        return board[p.row][p.col]
        //return board.board[p.row][p.col];
    }

    return undefined;
}    

export function canMove<T>(board: Board<T>, first: Position, second: Position): boolean {

    if(first.col < 0 || second.col < 0 || first.row < 0 || second.row < 0
        || first.col > board.width-1  || second.col > board.width-1 || first.row > board.height-1 || second.row > board.height-1) {
        return false
     }
     //Samme kolonne OG række
     if(first.col === second.col && first.row === second.row) {
        return false
     }

     if(first.col === second.col || first.row === second.row //&&
       // this.hasMatch(second ,this.piece(first)) || this.hasMatch(first, this.piece(second))
       )
      { 
        return true}
 

 return false

}

export function move<T>(generator: Generator<T>, board: Board<T>, first: Position, second: Position): MoveResult<T> {
    let indexfirst = board.positions.findIndex(({row, col}) => row === first.row && col === first.col)
    let indexsecond = board.positions.findIndex(({row, col}) => row === second.row && col === second.col)


    let neweBoard = board;
    neweBoard.positions[indexfirst] = second;
    neweBoard.positions[indexsecond] = first;

    let effect: Effect<T>[]; 
    let result: MoveResult<T> = {board: neweBoard, effects: effect } 
   
    return result
}
