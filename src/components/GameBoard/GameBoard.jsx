import { useEffect } from "react";
import { useState } from "react";
import PlayerZone from "../PlayerZone/PlayerZone";

import "./GameBoard.scss";

const GameBoard = ({ mode }) => {
    const [gameStartAsks, setGameStartAsks] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

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
    }, [gameStartAsks]);

    return (
        <div className="game__board">
            <PlayerZone
                host
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
            />
            <PlayerZone
                host={mode !== "single" ? true : false}
                handleAskGameStart={handleAskGameStart}
                gameStarted={gameStarted}
            />
        </div>
    );
};

export default GameBoard;
