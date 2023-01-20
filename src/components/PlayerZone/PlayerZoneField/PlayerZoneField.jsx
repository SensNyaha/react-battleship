import { useEffect, useState } from "react";
import "./PlayerZoneField.scss";
import PlayerZoneFieldBlock from "./PlayerZoneFieldBlock/PlayerZoneFieldBlock";

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
        if (numberOfDeck) {
            onPlacingTheShip(highlightedBlocks, currentDirection);
            setHighlightedBlocks([]);
        }
    };

    return (
        <div className="player-zone__field" onContextMenu={handleRightClick}>
            {[...Array(121)].map((item, index) => {
                return (
                    <PlayerZoneFieldBlock
                        key={index}
                        index={index}
                        shipsPositions={shipsPositions}
                        currentDirection={currentDirection}
                        highlightedBlocks={highlightedBlocks}
                        setHoveredBlockId={setHoveredBlockId}
                        setHighlightedBlocks={setHighlightedBlocks}
                        handlePlacingTheShip={handlePlacingTheShip}
                    />
                );
            })}
        </div>
    );
};

export default PlayerZoneField;
