import gameReducer, {
    pickTile, Player,
    playTile,
    rotatePlayerTile,
} from './gameSlice';
import {tileFromProtoTile} from "../../models/tile";

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
        racks: [],
        bag: {tiles: []},
        board: {row: []},
    });
  });

  it('should handle pickTile', () => {
      const tileA = tileFromProtoTile([0, 1, 3, 4]);
      const tileB = tileFromProtoTile([4, 3, 1, 0])
      const initialState = {
          racks: [[], []],
          bag: {tiles: [tileA, tileB]},
          board: {rows: []}
      }
    const afterOne = gameReducer(initialState, pickTile(0 as Player));
    expect(afterOne.racks[0].length).toEqual(1);
    expect(afterOne.bag.tiles.length).toEqual(1);
    const afterTwo = gameReducer(initialState, pickTile(0 as Player));
    expect(afterOne.racks[0].length).toEqual(2);
    expect(afterOne.bag.tiles).toEqual([]);
  });
});
