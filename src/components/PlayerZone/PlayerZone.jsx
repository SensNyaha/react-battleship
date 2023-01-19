import "./PlayerZone.scss";
import PlayerZoneField from "./PlayerZoneField/PlayerZoneField";

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
            <div className="player-zone__ship-shop">SHIP-SHOP</div>
        </div>
    );
};

export default PlayerZone;
