import "./PlayerZoneShipShop.scss";

import deck1 from "../1deck.png";
import deck2 from "../2deck.png";
import deck3 from "../3deck.png";
import deck4 from "../4deck.png";
import { useEffect, useState } from "react";

const ships = [
    {
        img: deck4,
        alt: "4-палубник",
        altClass: "player-zone__ship--4",
        decks: 4,
    },
    {
        img: deck3,
        alt: "3-палубник",
        altClass: "player-zone__ship--3",
        decks: 3,
    },
    {
        img: deck3,
        alt: "3-палубник",
        altClass: "player-zone__ship--3",
        decks: 3,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
    },
];

const PlayerZoneShipShop = ({ setCurrentNumberOfDeck, positionedShips }) => {
    const [filteredShips, setFilteredShips] = useState({});
    useEffect(() => {
        if (positionedShips.length) {
            positionedShips.forEach((pos) => {
                setFilteredShips((prev) => {
                    if (prev[pos.numberOfDeck]) {
                        return {
                            ...prev,
                            [pos.numberOfDeck]: [
                                prev?.[pos.numberOfDeck],
                                pos.positions,
                            ],
                        };
                    } else {
                        return {
                            ...prev,
                            [pos.numberOfDeck]: [pos.positions],
                        };
                    }
                });
            });
        }
    }, [positionedShips]);

    return (
        <div className="player-zone__ship-shop">
            {ships.map((ship, index) => {
                return (
                    <div
                        key={ship.alt + "-" + index}
                        className={`player-zone__ship ${ship.altClass}`}
                        decks={ship.decks}
                        onClick={(e) => {
                            setCurrentNumberOfDeck(
                                e.target
                                    .closest(".player-zone__ship")
                                    .getAttribute("decks")
                            );
                        }}
                    >
                        <img src={ship.img} alt={ship.alt} />
                    </div>
                );
            })}
        </div>
    );
};

export default PlayerZoneShipShop;
