import { useEffect } from "react";
import { useState } from "react";
import PlayerZone from "../PlayerZone/PlayerZone";
import SpinArrow from "../SpinArrow/SpinArrow";

import "./GameBoard.scss";

const GameBoard = ({ mode }) => {
    const [playersPositionedShips, setPlayersPositionedShips] = useState([
        [],
        [],
    ]);
    const [gameStartAsks, setGameStartAsks] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [moveIndex, setMoveIndex] = useState(0);

    const handleAskGameStart = () => {
        setGameStartAsks((prev) => prev + 1);
    };

    useEffect(() => {
        if (
            (mode === "single" && gameStartAsks >= 1) ||
            (mode === "twin" && gameStartAsks >= 2)
        ) {
            setGameStarted(true);
        }
    }, [gameStartAsks, mode]);

    useEffect(() => {
        if (gameStarted) {
            setMoveIndex(1);
        }
    }, [gameStarted]);

    return (
        <div className="game__board">
            <PlayerZone
                zoneIndex={0}
                host
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                currentMove={moveIndex}
                changeMoveIndex={setMoveIndex}
                playersPositionedShips={playersPositionedShips}
                setPlayersPositionedShips={setPlayersPositionedShips}
            />
            <PlayerZone
                zoneIndex={1}
                host={mode !== "single" ? true : false}
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                currentMove={moveIndex}
                changeMoveIndex={setMoveIndex}
                playersPositionedShips={playersPositionedShips}
                setPlayersPositionedShips={setPlayersPositionedShips}
            />
            <SpinArrow
                gameStarted={gameStarted}
                setCurrentPlayer={setCurrentPlayer}
                currentPlayer={currentPlayer}
            />
        </div>
    );
};

export default GameBoard;
