import styles from "./Rack.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Tile} from "../tile/Tile";
import {OrientedTileProps} from "../../models/tile";
import {pickTile, Player, rotatePlayerTile, selectRackContents} from "../game/gameSlice";
import React from "react";
import {useDrag} from "react-dnd";

type RackProps = {
    player: Player;
};

export type PlayersTile = {
    player: Player;
    tileIndex: number;
}

function PlayableTile({tile, player, tileIndex}: {tile: OrientedTileProps, tileIndex: number, player: Player}) {
    const dispatch = useAppDispatch();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PLAY_TILE',
        item: {player, tileIndex} as PlayersTile,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))
    return (
        <div
            ref={drag}
            className={styles.tilePlace}
            style={{opacity: isDragging ? 0.5: 1, cursor: 'move'}}
        >
            <Tile {...tile} />
            <div className={styles.rotator} onClick={() => {
                dispatch(rotatePlayerTile({
                    player,
                    tileIndex,
                    rotationType: 'rotateClockwise',
                }))
            }}>r</div>
            <div className={styles.flipper} onClick={() => {
                dispatch(rotatePlayerTile({
                    player,
                    tileIndex,
                    rotationType: 'flipVertical'
                }))
            }} />
        </div>
    )
}


export function Rack(props: RackProps) {
    const player = props.player;
    const dispatch = useAppDispatch();
    const tiles = useAppSelector(selectRackContents)[player] || [];
    const MAX_TILES = 7;
    return (
        <div>
            <div className={styles.rack}>
                {
                    tiles.map((tileProps: OrientedTileProps, tileIndex) => (
                        <PlayableTile key={tileIndex} player={player} tileIndex={tileIndex} tile={tileProps}/>
                    ))
                }
            </div>
            {
                (tiles.length < MAX_TILES) &&
                <button onClick={() => {
                    dispatch(pickTile(player))
                }}>
                    Take tile
                </button>
            }
        </div>
    )
}