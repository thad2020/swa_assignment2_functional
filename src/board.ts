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
    positions: any[]
};

export type Effect<T> = {};

export type MoveResult<T> = {
    board: Board<T>,
    effects: Effect<T>[]
}    

export function create<T>(generator: Generator<T>, width: number, height: number): Board<T> {      
    const board: Board<T> = ({width: width, height: height, generator:generator, positions:[]})
    positions(board);
    return board; 
}    

export function positions(board: Board<T>) {
    let array: Position[] = [];

    for (let i = 0; i < board.height; i++) {
        for (let j = 0; j < board.width; j++) {
            array.push({ row: i, col: j })
        }
    };

    board.positions = array; 

    return board.positions
}

export function piece<T>(board: Board<T>, p: Position): T | undefined {
    let returnValue = undefined;

    board.positions.forEach(element => {
        const value = board.generator.next();

        if (element.row === p.row && element.col === p.col) {
            returnValue = <T> value
        }
    });
    
    return returnValue
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
