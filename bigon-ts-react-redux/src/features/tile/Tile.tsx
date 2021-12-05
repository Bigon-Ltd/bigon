import React from "react";
import {Dimension, DimensionValue, OrientedTileProps, PositionInSquare} from "../../models/tile";
import styles from './Tile.module.css';

type QuadrantProps = {
    position: PositionInSquare;
    dimension: Dimension;
    value: DimensionValue;
}

export function TileQuadrant(props: QuadrantProps) {
    const iconClass = `icon-${props.dimension}-${props.value}`;
    return (
        <div
            className={`${styles.quadrant} ${styles[props.position]} ${styles[iconClass]}`}
        />
    )
}


export function Tile(props: OrientedTileProps) {
    return (
      <span className={styles.tile}>
          <TileQuadrant position="left" dimension={props.left.dimension} value={props.left.value}/>
          <TileQuadrant position="top" dimension={props.top.dimension} value={props.top.value}/>
          <TileQuadrant position="right" dimension={props.right.dimension} value={props.right.value}/>
          <TileQuadrant position="bottom" dimension={props.bottom.dimension} value={props.bottom.value}/>
      </span>
    )
}
