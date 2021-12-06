const NUMBER_OF_DIMENSIONS = 4;
export type Dimension = 0 | 1 | 2 | 3;
const NUMBER_OF_VALUES = 5;
export type DimensionValue = 0 | 1 | 2 | 3 | 4;


type ProtoTile = DimensionValue[];

const addDimensionToProtoTiles = (smallerTiles: ProtoTile[]): ProtoTile[] => {
    const biggerTiles: ProtoTile[] = [];
    for (let tile of smallerTiles) {
        for (let value = 0; value < NUMBER_OF_VALUES; value++) {
            const newTile = [...tile];
            newTile.push(value as DimensionValue);
            biggerTiles.push(newTile);
        }
    }
    return biggerTiles;
}


const makeProtoTiles = (): ProtoTile[] => {
    let tiles: ProtoTile[] = [[]];
    for (let dimension = 0; dimension < NUMBER_OF_DIMENSIONS; dimension++) {
        tiles = addDimensionToProtoTiles(tiles);
    }
    return tiles;
}


type Square<Edge> = {
    left: Edge,
    top: Edge,
    right: Edge,
    bottom: Edge,
}

export type PositionInSquare = "left" | "right" | "top" | "bottom";

export type RotationType = 'rotateClockwise' | 'rotateAnticlockwise' | 'flipHorizontal' | 'flipVertical'

export const rotated = (square: Square<any>, rotationType: RotationType) => {
    switch (rotationType) {
        case "flipHorizontal":
            return {
                left: square.left,
                top: square.bottom,
                right: square.right,
                bottom: square.top
            }
        case "flipVertical":
            return {
                left: square.right,
                top: square.top,
                right: square.left,
                bottom: square.bottom,
            }
        case "rotateAnticlockwise":
            return {
                left: square.top,
                top: square.right,
                right: square.bottom,
                bottom: square.left
            }
        case "rotateClockwise":
            return {
                left: square.bottom,
                top: square.left,
                right: square.top,
                bottom: square.right
            }
    }
}

export const tileFromProtoTile = (protoTile: ProtoTile) => {
    return {
        left: {
            dimension: 0 as Dimension,
            value: protoTile[0]
        },
        top: {
            dimension: 1 as Dimension,
            value: protoTile[1]
        },
        right: {
            dimension: 2 as Dimension,
            value: protoTile[2]
        },
        bottom: {
            dimension: 3 as Dimension,
            value: protoTile[3]
        },
    };
}


export const makeTiles = () => {
    return makeProtoTiles().map(tileFromProtoTile)
}

export type OrientedTileProps = Square<{
    dimension: Dimension,
    value: DimensionValue,
}>
