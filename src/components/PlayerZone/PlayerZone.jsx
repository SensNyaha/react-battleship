import { useState } from "react";
import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";
import PlayerZoneShipShop from "./PlayerZoneShipShop/PlayerZoneShipShop";

const PlayerZone = ({ host }) => {
    const [currentNumberOfDeck, setCurrentNumberOfDeck] = useState();
    const [positionedShips, setPositionedShips] = useState([]);

    const onPlacingTheShip = (highlightedBlocks) => {
        setPositionedShips((prev) => [
            ...prev,
            { numberOfDeck: currentNumberOfDeck, positions: highlightedBlocks },
        ]);
        setCurrentNumberOfDeck(null);
    };

    return (
        <div
            className={`player-zone ${host ? "player-zone--player" : ""}`}
            style={{
                filter: host ? "" : "blur(10px)",
                pointerEvents: host ? "" : "none",
            }}
        >
            <div className="player-zone__scores">
                <div className="player-zone__alive">
                    Кораблей, выходящих на связь: {"2"}
                </div>
                <div className="player-zone__lost">
                    Без вести потеряно кораблей: {"2"}
                </div>
            </div>
            <PlayerZoneField
                numberOfDeck={currentNumberOfDeck}
                onPlacingTheShip={onPlacingTheShip}
                shipsPositions={positionedShips}
            />
            <PlayerZoneShipShop
                setCurrentNumberOfDeck={setCurrentNumberOfDeck}
            />
        </div>
    );
};

export default PlayerZone;
