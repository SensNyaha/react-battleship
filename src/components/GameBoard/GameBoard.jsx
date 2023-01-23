import { useEffect } from "react";
import { useState } from "react";
import PlayerZone from "../PlayerZone/PlayerZone";
import SpinArrow from "../SpinArrow/SpinArrow";

import "./GameBoard.scss";

const GameBoard = ({ mode }) => {
    const [gameStartAsks, setGameStartAsks] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("");
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

    return (
        <div className="game__board">
            <PlayerZone
                zoneIndex={0}
                host
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
            />
            <PlayerZone
                zoneIndex={1}
                host={mode !== "single" ? true : false}
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
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
