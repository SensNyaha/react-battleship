import { useEffect, useMemo, useState } from "react";
import { Bot } from "../../helpers/Bot";
import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";
import PlayerZoneShipShop from "./PlayerZoneShipShop/PlayerZoneShipShop";

const PlayerZone = ({ host }) => {
    const [currentNumberOfDeck, setCurrentNumberOfDeck] = useState();
    const [positionedShips, setPositionedShips] = useState([]);

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

    useEffect(() => {
        if (!host) {
            const bot = new Bot(".player-zone--bot");
            bot.createPositions();
            setPositionedShips(bot.positionedShips);
        }
    }, []);

    return (
        <div
            className={`player-zone ${
                host ? "player-zone--player" : "player-zone--bot"
            }`}
            style={{
                // filter: host ? "" : "blur(10px)",
                pointerEvents: host ? "" : "none",
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
            />
            <PlayerZoneShipShop
                setCurrentNumberOfDeck={setCurrentNumberOfDeck}
                positionedShips={positionedShips}
            />
            {positionedShips.length >= 10 ? (
                <button className="player-zone__start">Я готов начать!</button>
            ) : null}
        </div>
    );
};

export default PlayerZone;
