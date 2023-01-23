import { useEffect, useState } from "react";
import "./PlayerZoneField.scss";
import PlayerZoneFieldBlock from "./PlayerZoneFieldBlock/PlayerZoneFieldBlock";

const PlayerZoneField = ({
    numberOfDeck,
    onPlacingTheShip,
    positionedShips,
    onClickingTheShip,
}) => {
    const [highlightedBlocks, setHighlightedBlocks] = useState([]);
    const [blockedCells, setBlockedCells] = useState(new Set());
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

    useEffect(() => {
        if (
            highlightedBlocks.some(
                (block) => blockedCells && blockedCells.has(block)
            )
        ) {
            setHighlightedBlocks([]);
        }
    }, [highlightedBlocks]);

    useEffect(() => {
        setBlockedCells(new Set());
        //Логика определения заблокированных ячеек
        positionedShips &&
            positionedShips.forEach((ship) => {
                ship.positions.forEach((position) => {
                    const splittedPosition = position.split("-");
                    setBlockedCells((state) => state.add(position));
                    if (splittedPosition[0] > 1) {
                        setBlockedCells((state) =>
                            state.add(
                                `${splittedPosition[0] - 1}-${
                                    splittedPosition[1]
                                }`
                            )
                        );
                        if (+splittedPosition[1] > 1) {
                            setBlockedCells((state) =>
                                state.add(
                                    `${splittedPosition[0] - 1}-${
                                        splittedPosition[1] - 1
                                    }`
                                )
                            );
                        }
                    }
                    if (+splittedPosition[1] > 1) {
                        setBlockedCells((state) =>
                            state.add(
                                `${splittedPosition[0]}-${
                                    splittedPosition[1] - 1
                                }`
                            )
                        );

                        if (+splittedPosition[0] < 10) {
                            setBlockedCells((state) =>
                                state.add(
                                    `${+splittedPosition[0] + 1}-${
                                        splittedPosition[1] - 1
                                    }`
                                )
                            );
                        }
                    }
                    if (+splittedPosition[0] < 10) {
                        setBlockedCells((state) =>
                            state.add(
                                `${
                                    +splittedPosition[0] + 1
                                }-${+splittedPosition[1]}`
                            )
                        );

                        if (+splittedPosition[1] < 10) {
                            setBlockedCells((state) =>
                                state.add(
                                    `${+splittedPosition[0] + 1}-${
                                        +splittedPosition[1] + 1
                                    }`
                                )
                            );
                        }
                    }
                    if (+splittedPosition[1] < 10) {
                        setBlockedCells((state) =>
                            state.add(
                                `${+splittedPosition[0]}-${
                                    +splittedPosition[1] + 1
                                }`
                            )
                        );
                        if (splittedPosition[0] > 1) {
                            setBlockedCells((state) =>
                                state.add(
                                    `${+splittedPosition[0] - 1}-${
                                        +splittedPosition[1] + 1
                                    }`
                                )
                            );
                        }
                    }
                });
            });
    }, [positionedShips]);

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
    const handleClickingTheCell = (cellId) => {
        if (numberOfDeck && highlightedBlocks.length) {
            onPlacingTheShip(highlightedBlocks, currentDirection);
            setHighlightedBlocks([]);
        } else {
            onClickingTheShip(cellId);
        }
    };

    return (
        <div className="player-zone__field" onContextMenu={handleRightClick}>
            {[...Array(121)].map((item, index) => {
                return (
                    <PlayerZoneFieldBlock
                        key={index}
                        index={index}
                        positionedShips={positionedShips}
                        highlightedBlocks={highlightedBlocks}
                        blockedCells={blockedCells}
                        setHoveredBlockId={setHoveredBlockId}
                        setHighlightedBlocks={setHighlightedBlocks}
                        handleClickingTheCell={handleClickingTheCell}
                    />
                );
            })}
        </div>
    );
};

export default PlayerZoneField;
