import "./PlayerZoneShipShop.scss";

import deck1 from "../1deck.png";
import deck2 from "../2deck.png";
import deck3 from "../3deck.png";
import deck4 from "../4deck.png";

const PlayerZoneShipShop = () => {
    return (
        <div className="player-zone__ship-shop">
            <div className="player-zone__ship player-zone__ship--4">
                <img src={deck4} alt="4-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--3">
                <img src={deck3} alt="3-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--3">
                <img src={deck3} alt="3-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--2">
                <img src={deck2} alt="2-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--2">
                <img src={deck2} alt="2-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--2">
                <img src={deck2} alt="2-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--1">
                <img src={deck1} alt="1-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--1">
                <img src={deck1} alt="1-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--1">
                <img src={deck1} alt="1-палубник" />
            </div>
            <div className="player-zone__ship player-zone__ship--1">
                <img src={deck1} alt="1-палубник" />
            </div>
        </div>
    );
};

export default PlayerZoneShipShop;
