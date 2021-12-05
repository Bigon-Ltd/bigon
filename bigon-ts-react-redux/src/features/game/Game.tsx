import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Board} from "../board/Board";
import {Rack} from "../rack/Rack";
import {initialise, Player, selectRackContents} from "./gameSlice";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Game() {
    const racks = useAppSelector(selectRackContents);
    const dispatch = useAppDispatch();
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <button onClick={() => {
                dispatch(initialise())
            }}>Initialise game</button>
          <Board />
          <React.Fragment>
              {
                  racks.map((row, player) =>
                      <Rack key={player} player={player as Player} />
                  )
              }
          </React.Fragment>
        </DndProvider>
    </div>
  );
}

export default Game;
