import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";
import {makeTiles, OrientedTileProps, PositionInSquare, rotated, RotationType} from "../../models/tile";

const makeEmptyRows = (boardSize: number) => {
    const rows = []
    for (let i = 0; i < boardSize; i++) {
        rows.push((new Array(boardSize)).fill(null));
    }
    return rows;
}

export type BoardCellContents = OrientedTileProps | null;
type BoardSate = {
    size: number,
    rows: BoardCellContents[][]
}
export type GameState = {
    currentPlayer: Player | null,
    racks: OrientedTileProps[][]
    bag: {
        tiles: OrientedTileProps[],
    },
    board: BoardSate,
};

export const initialState: GameState = {
    currentPlayer: null,
    racks: [],
    bag: {
        tiles: [],
    },
    board: {
        size: 0,
        rows: [],
    },
}

export type Player = 0 | 1;

const takeRandomItem = <X>(items: X[]): X => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items.splice(randomIndex, 1)[0];
}

type RequestToPlayTile = {
    player: Player,
    tileIndex: number,
    boardCol: number,
    boardRow: number,
}


const getReasonCannotPlay = (tile: OrientedTileProps, board: BoardSate, col: number, row: number): string => {
    const rows = board.rows;
    const SQUARE_POSITIONS: PositionInSquare[] = ['left', 'top', 'right', 'bottom'];
    for (let pair of [[0, 2], [1, 3]]) {
        const isVertical = !!pair[0];
        for (let isNot of [0, 1]) {
            let rowToCompare = row;
            let colToCompare = col;
            if (isVertical) {
                rowToCompare += isNot ? 1 : -1;
            } else {
                colToCompare += isNot ? 1 : -1;
            }
            const maybeTileToCompare = rows[rowToCompare] && rows[rowToCompare][colToCompare];
            const position = SQUARE_POSITIONS[pair[isNot]];
            if (maybeTileToCompare) {
                const tileToCompare: OrientedTileProps = maybeTileToCompare;
                const positionToCompare = SQUARE_POSITIONS[pair[1 - isNot]];
                const toCompare = tileToCompare[positionToCompare];
                console.log(
                    'Checking', JSON.stringify(toCompare),
                    'which is to the', position, 'of', JSON.stringify(tile[position])
                );
                if (toCompare.dimension !== tile[position].dimension) {
                    return `Mismatch to the ${position}: our dimension ${tile[position].dimension} should match their ${toCompare.dimension}`
                }
                if (toCompare.value !== tile[position].value) {
                    return `Mismatch to the ${position}: our value ${tile[position].value} should match their ${toCompare.value}`
                }
            } else {
                console.log(`No tile to the ${position} to clash with`)
            }
        }
    }
    return 'none';
}


const isPlayLegal = (gameState: GameState, {player, tileIndex, boardCol, boardRow}: RequestToPlayTile): boolean => {
    if (player !== gameState.currentPlayer) {
        console.warn(`It is ${gameState.currentPlayer}'s turn, not ${player}'s.`);
        return false;
    }
    const tile = gameState.racks[player][tileIndex];
    const reasonToNotPlay = getReasonCannotPlay(tile, gameState.board, boardCol, boardRow);
    console.debug('Reason not to play', reasonToNotPlay);
    return reasonToNotPlay === 'none';
}

export const gameSlice = createSlice({
    'name': 'game',
    initialState,
    reducers: {
        initialise: (state) => {
            state.currentPlayer = 0 as Player;
            state.bag = {tiles: makeTiles()};
            state.racks = [[]];
            const BOARD_SIZE = 9;
            state.board = {
                size: BOARD_SIZE,
                rows: makeEmptyRows(BOARD_SIZE)
            };
        },
        pickTile: (state, action: PayloadAction<Player>) => {
            const player = action.payload;
            const tile = takeRandomItem(state.bag.tiles);
            state.racks[player].push(tile);
        },
        playTile: (state, action: PayloadAction<RequestToPlayTile>) => {
            if (isPlayLegal(state, action.payload)) {
                 const {player, tileIndex, boardCol, boardRow} = action.payload;
                 const rack = state.racks[player];
                 const tile = rack.splice(tileIndex, 1)[0];
                 state.board.rows[boardRow].splice(boardCol, 1, tile);
            } else {
                console.log('Play not legal')
            }
        },
        rotatePlayerTile: (state, action: PayloadAction<{
            player: Player,
            tileIndex: number,
            rotationType: RotationType,
        }>) => {
            const {player, tileIndex, rotationType} = action.payload;
            const tile = state.racks[player][tileIndex];
            state.racks[player][tileIndex] = rotated(tile, rotationType);
        }
    }
})

export const { initialise, pickTile, playTile, rotatePlayerTile } = gameSlice.actions;

export const selectBoardState = (state: RootState) => state.game.board;

export const selectRackContents = (state: RootState) => {
    return state.game.racks;
}

export default gameSlice.reducer;