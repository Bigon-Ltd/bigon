class Tile {
    data: number[] = [];
    constructor(data: number[]) {
        this.data = [...data];
    }
    static makeInitial(numDimensions: number) {
        const data: number[] = [];
        for (let dimension = 0; dimension < numDimensions; dimension++) {
            data.push(0);
        }
        return new Tile(data);
    }
    addDimension(value: number): Tile {
        const data = [...this.data];
        data.push(value);
        return new Tile(data);
    }
}


const VALUES_PER_DIMENSION = 3;


function addDimensionToTiles(smallerTiles: Tile[]): Tile[] {
    const biggerTiles: Tile[] = [];
    for (let tile of smallerTiles) {
        for (let value = 0; value < VALUES_PER_DIMENSION; value++) {
            biggerTiles.push(tile.addDimension(value));
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


class Orientation {
    constructor(readonly dimensions: number[]) {}

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


class OrientedTile {
    constructor(readonly tile: Tile, readonly orientation: Orientation) {}
    symbols() {
        const values = this.tile.data;
        const dimensions = this.orientation.dimensions;
        return {
            left: values[dimensions[0]],
            top: values[dimensions[1]],
            right: values[dimensions[2]],
            bottom: values[dimensions[3]]
        };
    }
}


class BoardCoordinate {
    constructor(readonly x: number, readonly y: number) {}
}


// A play of the game (by a given player) is specified by
// - a map from some tiles to some coordinates

type Play = Map<OrientedTile, BoardCoordinate>

function isPlayValid(BoardState, Player, Play): boolean {
    // FIXME: implement
}

// State of the game is given by
// - a map from some tiles to some coordinates
// - an allocation of tiles to each player


class Player {
    constructor(id: number) {
        this.id = id;
    }
}


class TilesDealt {
    tiles: Set<Tile>;
    player: Player;
}

type GameEvent = TileDealt | TilePlayed;


