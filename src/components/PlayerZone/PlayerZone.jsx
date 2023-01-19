import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";
import PlayerZoneShipShop from "./PlayerZoneShipShop/PlayerZoneShipShop";

const PlayerZone = () => {
    return (
        <div className="player-zone">
            <div className="player-zone__scores">
                <div className="player-zone__alive">
                    Кораблей, выходящих на связь: {"2"}
                </div>
                <div className="player-zone__lost">
                    Без вести потеряно кораблей: {"2"}
                </div>
            </div>
            <PlayerZoneField />
            <PlayerZoneShipShop />
        </div>
    );
};

export default PlayerZone;
