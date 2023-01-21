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

//USE MEMO для POSITIONEDSHIPS

const PlayerZoneShipShop = ({ setCurrentNumberOfDeck, positionedShips }) => {
    const [shipsInShop, setShipsInShop] = useState(ships);
    const [currentlyChosenShipIndex, setCurrentlyChosenShipIndex] =
        useState(null);

    useEffect(() => {
        //Логика затемнения
        if (shipsInShop) {
            for (let i = 0; i < shipsInShop.length; i++) {
                const shipInProp = positionedShips?.find(
                    (item) =>
                        +item.numberOfDeck === shipsInShop[i].decks &&
                        !shipsInShop[i].positioned
                );

                if (shipInProp) {
                    setShipsInShop((prev) => {
                        const copy = [...prev];
                        copy[i] = {
                            ...prev.find(
                                (item) =>
                                    +item.decks === shipsInShop[i].decks &&
                                    !item.positioned
                            ),
                            positioned: true,
                        };
                        return copy;
                    });
                    break;
                }
            }
        }
    }, [positionedShips]);

    useEffect(() => {
        //Логика разморозки корабля после удаления иконки с поля игры
        if (shipsInShop) {
            setShipsInShop((prevState) => {
                const copyPositionedShips = [...positionedShips];

                const placed = [];
                const removed = [];

                for (let i = 0; i < prevState.length; i++) {
                    const indexInProps = copyPositionedShips.findIndex(
                        (ship) => {
                            return ship.numberOfDeck == prevState[i].decks;
                        }
                    );
                    if (indexInProps === -1) {
                        removed.push(prevState[i]);
                    } else {
                        placed.push(prevState[i]);
                        copyPositionedShips.splice(indexInProps, 1);
                    }
                }
                return [
                    ...placed.map((item) => ({ ...item, positioned: true })),
                    ...removed.map((item) => ({ ...item, positioned: false })),
                ].sort((a, b) => b.decks - a.decks);
            });
        }
    }, [positionedShips]);

    useEffect(() => {
        setCurrentlyChosenShipIndex(null);
    }, [positionedShips]);
    const handleClickOnShip = (e, index) => {
        setCurrentNumberOfDeck(
            e.target.closest(".player-zone__ship").getAttribute("decks")
        );
        setCurrentlyChosenShipIndex(index);
    };

    return (
        <div className="player-zone__ship-shop">
            {shipsInShop &&
                shipsInShop.map((ship, index) => {
                    return (
                        <div
                            key={ship.alt + "-" + index}
                            className={`player-zone__ship ${ship.altClass} ${
                                ship.positioned ||
                                currentlyChosenShipIndex === index
                                    ? "player-zone__ship--placed"
                                    : ""
                            }`}
                            decks={ship.decks}
                            onClick={(e) => {
                                handleClickOnShip(e, index);
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
