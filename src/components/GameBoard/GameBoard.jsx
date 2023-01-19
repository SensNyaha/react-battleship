import PlayerZone from "../PlayerZone/PlayerZone";

import "./GameBoard.scss";

const GameBoard = () => {
    return (
        <div className="game__board">
            <PlayerZone host />
            <PlayerZone />
        </div>
    );
};

export default GameBoard;
