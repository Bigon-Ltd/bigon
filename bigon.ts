export class Tile {
    constructor(readonly data: number[]) { }
}


const VALUES_PER_DIMENSION = 5;


const addDimensionToTile = (tile: Tile, value): Tile => {
    const data = [...tile.data];
    data.push(value);
    return new Tile(data);
}

const addDimensionToTiles = (smallerTiles: Tile[]): Tile[] => {
    const biggerTiles: Tile[] = [];
    for (let tile of smallerTiles) {
        for (let value = 0; value < VALUES_PER_DIMENSION; value++) {
            const dataForTile = [...tile.data];
            dataForTile.push(value);
            biggerTiles.push(new Tile(dataForTile));
        }
    }
    return biggerTiles;
}


const makeTiles = (numDimensions: number): Tile[] => {
    let tiles: Tile[] = [new Tile([])];
    for (let dimension = 0; dimension < numDimensions; dimension++) {
        tiles = addDimensionToTiles(tiles);
    }
    return tiles;
}


export class Orientation {
    readonly dimensions: number[];
    constructor() {
        this.dimensions = [0, 1, 2, 3];
    }
    rotateClockwise(): void {
        this.dimensions.unshift(this.dimensions.pop());
    }
    rotateAntiClockwise(): void {
        this.dimensions.push(this.dimensions.shift());
    }
    flipHorizontal(): void {
        const savedValue = this.dimensions[1];
        this.dimensions[1] = this.dimensions[2];
        this.dimensions[3] = savedValue;
    }
    flipVertical(): void {
        const savedValue = this.dimensions[0];
        this.dimensions[0] = this.dimensions[2];
        this.dimensions[2] = savedValue;
    }
}


export class OrientedTile {
    constructor(readonly tile: Tile, readonly orientation: Orientation = new Orientation()) {}
    symbols() {
        const values = this.tile.data;
        const dimensions = this.orientation.dimensions;
        return {
            left: {
                dimension: dimensions[0],
                value: values[dimensions[0]]
            },
            top: {
                dimension: dimensions[1],
                value: values[dimensions[1]]
            },
            right: {
                dimension: dimensions[2],
                value: values[dimensions[2]]
            },
            bottom: {
                dimension: dimensions[3],
                value: values[dimensions[3]]
            }
        };
    }
}


class BoardCoordinate {
    constructor(readonly x: number, readonly y: number) {}
}


// A play of the game (by a given player) is specified by
// - a map from some tiles to some coordinates

type PlacedTiles = Map<BoardCoordinate, OrientedTile>

function isPlayValid(boardState: PlacedTiles, Player, Play): boolean {
    // FIXME: implement
    return true;
}

// State of the game is given by
// - a map from some tiles to some coordinates
// - an allocation of tiles to each player


class Player {
    constructor(readonly id: number) {}
}


class TilesDealt {
    tiles: Set<Tile>;
    player: Player;
}

type GameEvent = TileDealt | TilePlayed;


