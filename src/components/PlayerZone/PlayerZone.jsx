import { useEffect, useState } from "react";
import acceptPositionReturnBlocked from "../../helpers/acceptPositionReturnBlocked";
import { Bot } from "../../helpers/Bot";
import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";
import PlayerZoneShipShop from "./PlayerZoneShipShop/PlayerZoneShipShop";

const PlayerZone = ({
    zoneIndex,
    host,
    handleAskGameStart,
    gameStarted,
    gameEnded,
    currentPlayer,
    setCurrentPlayer,
    changeMoveIndex,
    setPlayersPositionedShips,
    moveIndex,
    bot,
    setBot,
}) => {
    const [currentNumberOfDeck, setCurrentNumberOfDeck] = useState();
    const [positionedShips, setPositionedShips] = useState([]);
    const [shotCells, setShotCells] = useState(new Set());

    const onPlacingTheShip = (highlightedBlocks, currentDirection) => {
        setPositionedShips((prev) => [
            ...prev,
            {
                numberOfDeck: currentNumberOfDeck,
                positions: highlightedBlocks,
                orientation: currentDirection,
                destroyed: false,
            },
        ]);
        setCurrentNumberOfDeck(null);
    };
    const onClickingTheShip = (cellId) => {
        if (!currentNumberOfDeck) {
            const shipIndex = positionedShips.findIndex((ship) =>
                ship.positions.some((item) => item === cellId)
            );
            setPositionedShips((prev) => {
                return prev.filter((ship, index) => index !== shipIndex);
            });
        }
    };
    const handleShotEnemyField = (cellId) => {
        const alreadyShot = shotCells.has(cellId);
        if (!alreadyShot) {
            setShotCells((prev) => prev.add(cellId));
            if (
                !positionedShips.some((ship) =>
                    ship.positions.some((pos) => pos === cellId)
                )
            ) {
                setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
            }
            changeMoveIndex((prev) => prev + 1);
        }
    };
    const addShotCellsAfterShipDestroying = (positionedShips) => {
        positionedShips.forEach((ship) => {
            if (ship.destroyed) {
                ship.positions.forEach((id) =>
                    acceptPositionReturnBlocked(id).forEach((id) => {
                        setShotCells((prev) => prev.add(id));
                    })
                );
            }
        });
    };

    useEffect(() => {
        if (!host) {
            setBot(new Bot(".player-zone--bot"));
        }
    }, []);

    useEffect(() => {
        if (bot && !host) {
            bot.createPositions();
            setPositionedShips(bot.positionedShips);
        }
    }, [bot]);

    useEffect(() => {
        if (gameStarted && bot && host) {
            bot.initPlayersField(positionedShips);
        }
    }, [gameStarted]);

    useEffect(() => {
        if (
            gameStarted &&
            bot &&
            host &&
            currentPlayer === 1 &&
            zoneIndex === 0 &&
            !gameEnded
        ) {
            handleShotEnemyField(bot.doTurn());
        }
    }, [gameStarted, bot, host, currentPlayer, zoneIndex, moveIndex]);

    useEffect(() => {
        if (positionedShips.length) {
            setPlayersPositionedShips((prev) => {
                return [...prev].map((item, index) =>
                    index === zoneIndex ? positionedShips : item
                );
            });
        }
    }, [positionedShips]);

    useEffect(() => {
        if (gameStarted) {
            let wasDestroyed = false;
            const newState = positionedShips.map((ship) => {
                const isDead = ship.positions.every((position) =>
                    shotCells.has(position)
                );
                if (isDead) {
                    wasDestroyed = true;
                    return { ...ship, destroyed: true };
                } else {
                    return ship;
                }
            });
            if (wasDestroyed) {
                setPositionedShips(newState);
            }
        }
    }, [shotCells.size]);

    useEffect(() => {
        if (positionedShips) {
            addShotCellsAfterShipDestroying(positionedShips);
        }
    }, [positionedShips]);

    return (
        <div
            className={`player-zone ${
                host ? "player-zone--player" : "player-zone--bot"
            }`}
            style={{
                // filter: host ? "" : "blur(50px)",
                pointerEvents:
                    host || (gameStarted && +currentPlayer !== +zoneIndex)
                        ? host && gameStarted
                            ? "none"
                            : ""
                        : "none",
            }}
        >
            <div className="player-zone__scores">
                <div className="player-zone__alive">
                    Кораблей, выходящих на связь:
                    {positionedShips.reduce((sum, ship) => {
                        if (ship.destroyed === false) {
                            return sum + 1;
                        }
                        return sum;
                    }, 0)}
                </div>
                <div className="player-zone__lost">
                    Без вести потеряно кораблей:
                    {positionedShips.reduce((sum, ship) => {
                        if (ship.destroyed === true) {
                            return sum + 1;
                        }
                        return sum;
                    }, 0) || 0}
                </div>
            </div>
            <PlayerZoneField
                numberOfDeck={currentNumberOfDeck}
                onPlacingTheShip={onPlacingTheShip}
                positionedShips={positionedShips}
                onClickingTheShip={onClickingTheShip}
                botField={!host}
                gameStarted={gameStarted}
                currentPlayer={+currentPlayer === +zoneIndex}
                handleShotEnemyField={handleShotEnemyField}
                shotCells={shotCells}
            />
            {!gameStarted ? (
                <PlayerZoneShipShop
                    setCurrentNumberOfDeck={setCurrentNumberOfDeck}
                    positionedShips={positionedShips}
                />
            ) : null}
            {positionedShips.length >= 10 && host && !gameStarted ? (
                <button
                    className="player-zone__start"
                    onClick={handleAskGameStart}
                >
                    Я готов начать!
                </button>
            ) : null}
        </div>
    );
};

export default PlayerZone;
