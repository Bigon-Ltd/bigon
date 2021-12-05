import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tile} from "../tile/Tile";
import styles from './Board.module.css'
import {BoardCellContents, Player, playTile, selectBoardState} from "../game/gameSlice";
import {useDrop} from "react-dnd";
import {PlayersTile} from "../rack/Rack";


type BoardCoordinate = {
    x: number,
    y: number,
}

function EmptySquare({x, y}: BoardCoordinate) {
    const dispatch = useAppDispatch();
    const [{isOver}, drop] = useDrop(
       () => ({
            accept: 'PLAY_TILE',
            drop: (item) => {
                const playersTile = item as PlayersTile;
                dispatch(playTile({
                    ...playersTile,
                    boardCol: x,
                    boardRow: y,
                }))
            },
           collect: (monitor => ({
               isOver: !!monitor.isOver(),
           }))
       }),
    [x, y]
    )
    return <div ref={drop} className={styles.dropTarget}>
        {isOver}
    </div>
}

type BoardRow = {
    index: number,
    size: number,
    contents: BoardCellContents[],
}

function Row(row: BoardRow) {
    const elements = []
    for (let i = 0; i < row.size; i++) {
        const rowContents = row.contents[i];
        if (rowContents) {
            elements.push(<Tile {...rowContents} />)
        } else {
            elements.push(<EmptySquare x={i} y={row.index} />);
        }
    }
    return (
        <div className={styles.row}>
            {elements.map((element, key) =>
                <div key={key} className={styles.cell}>
                    {
                        element
                    }
                </div>
            )}
        </div>
    )
}

export function Board() {
    const boardState = useAppSelector(selectBoardState);

    return (
        <div className={styles.board}>
            {
                boardState.rows.map((row: BoardCellContents[], rowNumber) =>
                    <Row key={rowNumber} index={rowNumber} size={boardState.size} contents={row} />
                )
            }
        </div>
    )
}