import { useEffect, useState } from "react";
import "./PlayerZoneField.scss";

import deck1 from "../1deck.png";
import deck2 from "../2deck.png";
import deck3 from "../3deck.png";
import deck4 from "../4deck.png";
import sortFieldIndexes from "../../../helpers/sortFieldIndexes";

const marksObject = {
    "1-1": " ",
    "2-1": "A",
    "3-1": "B",
    "4-1": "C",
    "5-1": "D",
    "6-1": "E",
    "7-1": "F",
    "8-1": "G",
    "9-1": "H",
    "10-1": "I",
    "11-1": "K",
    "12-2": "1",
    "23-3": "2",
    "34-4": "3",
    "45-5": "4",
    "56-6": "5",
    "67-7": "6",
    "78-8": "7",
    "89-9": "8",
    "100-10": "9",
    "111-11": "10",
};

const PlayerZoneField = ({
    numberOfDeck,
    onPlacingTheShip,
    shipsPositions,
}) => {
    const [highlightedBlocks, setHighlightedBlocks] = useState([]);
    const [hoveredBlockID, setHoveredBlockId] = useState();
    const [currentDirection, setCurrentDirection] = useState("horizontal");

    useEffect(() => {
        if (hoveredBlockID && numberOfDeck) {
            const splitted = hoveredBlockID.split("-");
            if (currentDirection === "horizontal") {
                if (splitted[0] <= 10 - numberOfDeck) {
                    const positions = [...new Array(+numberOfDeck)].map(
                        (item, index) => {
                            return `${+splitted[0] + index}-${splitted[1]}`;
                        }
                    );
                    setHighlightedBlocks(positions);
                } else {
                    const positions = [...new Array(+numberOfDeck)].map(
                        (item, index) => {
                            return `${10 - index}-${splitted[1]}`;
                        }
                    );
                    setHighlightedBlocks(positions);
                }
            } else if (currentDirection === "vertical") {
                if (splitted[1] <= 10 - numberOfDeck) {
                    const positions = [...new Array(+numberOfDeck)].map(
                        (item, index) => {
                            return `${splitted[0]}-${+splitted[1] + index}`;
                        }
                    );
                    setHighlightedBlocks(positions);
                } else {
                    const positions = [...new Array(+numberOfDeck)].map(
                        (item, index) => {
                            return `${splitted[0]}-${10 - index}`;
                        }
                    );
                    setHighlightedBlocks(positions);
                }
            }
        }
    }, [hoveredBlockID, currentDirection]);

    const handleRightClick = (e) => {
        if (numberOfDeck) {
            e.preventDefault();

            setCurrentDirection((prev) => {
                if (prev === "horizontal") {
                    return "vertical";
                }
                return "horizontal";
            });
        }
    };
    const handlePlacingTheShip = () => {
        onPlacingTheShip(highlightedBlocks);
        setHighlightedBlocks([]);
    };

    const fieldBlocks = [...Array(121)].map((item, index) => {
        let content = marksObject[`${index + 1}-${Math.floor(index / 11) + 1}`];

        const id = `${index % 11}-${Math.floor((index - 11) / 11) + 1}`;

        const shipPositionInfo = shipsPositions.find((pos) =>
            pos.positions.includes(id)
        );

        if (shipPositionInfo?.positions.sort(sortFieldIndexes)[0] === id) {
            switch (shipPositionInfo?.numberOfDeck) {
                case 4:
                    content = (
                        <img
                            class="ship__decks-4"
                            src={deck4}
                            alt=""
                            style={{
                                transform:
                                    currentDirection === "vertical"
                                        ? "rotateZ(-90deg)"
                                        : "",
                            }}
                        />
                    );
                    break;
                case 3:
                    content = (
                        <img
                            class="ship__decks-3"
                            src={deck3}
                            alt=""
                            style={{
                                transform:
                                    currentDirection === "vertical"
                                        ? "rotateZ(-90deg)"
                                        : "",
                            }}
                        />
                    );
                    break;
                case 2:
                    content = (
                        <img
                            class="ship__decks-2"
                            src={deck2}
                            alt=""
                            style={{
                                transform:
                                    currentDirection === "vertical"
                                        ? "rotateZ(-90deg)"
                                        : "",
                            }}
                        />
                    );
                    break;
                case 1:
                    content = (
                        <img
                            class="ship__decks-1"
                            src={deck1}
                            alt=""
                            style={{
                                transform:
                                    currentDirection === "vertical"
                                        ? "rotateZ(-90deg)"
                                        : "",
                            }}
                        />
                    );
                    break;
                default:
                    break;
            }
        }

        return (
            <div
                className={`player-zone__block ${
                    typeof content === "string"
                        ? "player-zone__block--blocked"
                        : ""
                }`}
                key={id}
                style={{
                    borderTop: Math.floor(index / 11) + 1 === 1 ? "none" : "",
                    borderBottom:
                        Math.floor(index / 11) + 1 === 11 ? "none" : "",
                    borderLeft: index % 11 === 0 ? "none" : "",
                    borderRight: (index + 1) % 11 === 0 ? "none" : "",
                    background: highlightedBlocks.includes(id) ? "black" : "",
                }}
                id={id}
                onPointerEnter={() => setHoveredBlockId(id)}
                onPointerLeave={() => {
                    setHighlightedBlocks([]);
                    setHoveredBlockId("");
                }}
                onClick={handlePlacingTheShip}
            >
                {content}
            </div>
        );
    });
    return (
        <div className="player-zone__field" onContextMenu={handleRightClick}>
            {fieldBlocks}
        </div>
    );
};

export default PlayerZoneField;
