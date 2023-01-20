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
        positioned: false,
    },
    {
        img: deck3,
        alt: "3-палубник",
        altClass: "player-zone__ship--3",
        decks: 3,
        positioned: false,
    },
    {
        img: deck3,
        alt: "3-палубник",
        altClass: "player-zone__ship--3",
        decks: 3,
        positioned: false,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
        positioned: false,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
        positioned: false,
    },
    {
        img: deck2,
        alt: "2-палубник",
        altClass: "player-zone__ship--2",
        decks: 2,
        positioned: false,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
        positioned: false,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
        positioned: false,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
        positioned: false,
    },
    {
        img: deck1,
        alt: "1-палубник",
        altClass: "player-zone__ship--1",
        decks: 1,
        positioned: false,
    },
];

const PlayerZoneShipShop = ({ setCurrentNumberOfDeck, positionedShips }) => {
    const [plantedShips, setPlantedShips] = useState(ships);

    useEffect(() => {
        if (plantedShips) {
            plantedShips?.forEach((ship, index) => {
                const shipInProp = positionedShips?.find(
                    (item) => +item.numberOfDeck === ship.decks
                );

                if (shipInProp) {
                    setPlantedShips((prev) => {
                        const copy = [...prev];
                        copy[index] = {
                            ...prev.find((item) => +item.decks === ship.decks),
                            positioned: true,
                        };
                        return copy;
                    });
                }
            });
        }
    }, [positionedShips]);

    return (
        <div className="player-zone__ship-shop">
            {plantedShips &&
                plantedShips.map((ship, index) => {
                    return (
                        <div
                            key={ship.alt + "-" + index}
                            className={`player-zone__ship ${ship.altClass} ${
                                ship.positioned
                                    ? "player-zone__ship--placed"
                                    : ""
                            }`}
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
