import { useEffect, useState } from "react";
import { Bot } from "../../helpers/Bot";
import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";
import PlayerZoneShipShop from "./PlayerZoneShipShop/PlayerZoneShipShop";

const PlayerZone = ({
    zoneIndex,
    host,
    handleAskGameStart,
    gameStarted,
    currentPlayer,
    setCurrentPlayer,
    currentMove,
    changeMoveIndex,
    playersPositionedShips,
    setPlayersPositionedShips,
}) => {
    const [currentNumberOfDeck, setCurrentNumberOfDeck] = useState();
    const [positionedShips, setPositionedShips] = useState([]);
    const [shotCells, setShotCells] = useState([]);
    // const [onShotManipulations, setOnShotManipulations] = useState(false);
    const [botLogics, setBotLogics] = useState(null);

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
        const alreadyShot = shotCells.includes(cellId);
        if (!alreadyShot) {
            setShotCells((prev) => [...prev, cellId]);
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

    useEffect(() => {
        if (!host) {
            setBotLogics(new Bot(".player-zone--bot"));
        }
    }, []);

    useEffect(() => {
        if (botLogics) {
            botLogics.createPositions();
            setPositionedShips(botLogics.positionedShips);
        }
    }, [botLogics]);

    useEffect(() => {
        if (gameStarted && botLogics) {
            botLogics.initPlayersField(playersPositionedShips[0]);
        }
    }, [gameStarted]);

    useEffect(() => {
        if (positionedShips.length) {
            setPlayersPositionedShips((prev) => {
                return [...prev].map((item, index) =>
                    index === zoneIndex ? positionedShips : item
                );
            });
        }
    }, [positionedShips]);

    //Здесь должен активироваться функционал работы с полем, когда сменяется currentMove
    // useEffect(() => {
    //     setOnShotManipulations(+currentPlayer === +zoneIndex ? false : true);
    // }, [currentMove]);

    return (
        <div
            className={`player-zone ${
                host ? "player-zone--player" : "player-zone--bot"
            }`}
            style={{
                // filter: host ? "" : "blur(50px)",
                pointerEvents:
                    host || (gameStarted && +currentPlayer !== +zoneIndex)
                        ? ""
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
                    }, 0)}
                </div>
                <div className="player-zone__lost">
                    Без вести потеряно кораблей:
                    {positionedShips.reduce((sum, ship) => {
                        if (ship.destroyed === true) {
                            return sum + 1;
                        }
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
            />
            <PlayerZoneShipShop
                setCurrentNumberOfDeck={setCurrentNumberOfDeck}
                positionedShips={positionedShips}
            />
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
