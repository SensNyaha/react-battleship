import { useEffect } from "react";
import { useState } from "react";
import EndGamePopup from "../EndGamePopup/EndGamePopup";
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
    const [endOfGame, setEndOfGame] = useState(false);
    const [bot, setBot] = useState(null);

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
    useEffect(() => {
        playersPositionedShips.forEach((player) => {
            if (player.length && player.every((ship) => ship.destroyed)) {
                setEndOfGame(true);
            }
        });
    }, [playersPositionedShips]);

    return (
        <>
            <div className="game__board">
                <PlayerZone
                    zoneIndex={0}
                    host
                    handleAskGameStart={handleAskGameStart}
                    gameStarted={gameStarted}
                    gameEnded={endOfGame}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    changeMoveIndex={setMoveIndex}
                    playersPositionedShips={playersPositionedShips}
                    setPlayersPositionedShips={setPlayersPositionedShips}
                    bot={bot}
                    moveIndex={moveIndex}
                />
                <PlayerZone
                    zoneIndex={1}
                    host={mode !== "single" ? true : false}
                    handleAskGameStart={handleAskGameStart}
                    gameStarted={gameStarted}
                    gameEnded={endOfGame}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    changeMoveIndex={setMoveIndex}
                    playersPositionedShips={playersPositionedShips}
                    setPlayersPositionedShips={setPlayersPositionedShips}
                    bot={bot}
                    setBot={setBot}
                    moveIndex={moveIndex}
                />
                <SpinArrow
                    gameStarted={gameStarted}
                    setCurrentPlayer={setCurrentPlayer}
                    currentPlayer={currentPlayer}
                />
            </div>
            {endOfGame ? (
                <EndGamePopup totalMoves={moveIndex} winnerId={currentPlayer} />
            ) : null}
        </>
    );
};

export default GameBoard;
