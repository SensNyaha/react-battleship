import placeShipsIntoReadyPositions from "../../../../helpers/returnContentForPositionedCells";
import sortFieldIndexes from "../../../../helpers/sortFieldIndexes";

import hammer from "./hammer.gif";

import "./PlayerZoneFieldBlock.scss";

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

const PlayerZoneFieldBlock = ({
    index,
    positionedShips,
    highlightedBlocks,
    blockedCells,
    setHoveredBlockId,
    setHighlightedBlocks,
    handleClickingTheCell,
    botField,
}) => {
    let content = marksObject[`${index + 1}-${Math.floor(index / 11) + 1}`];

    const id = `${index % 11}-${Math.floor((index - 11) / 11) + 1}`;

    if (!botField) {
        const shipPositionInfo = positionedShips.find((pos) =>
            pos.positions.includes(id)
        );
        if (shipPositionInfo?.positions.sort(sortFieldIndexes)[0] === id) {
            content = placeShipsIntoReadyPositions(shipPositionInfo);
        }
    }

    return (
        <div
            className={`player-zone__block ${
                typeof content === "string" ? "player-zone__block--blocked" : ""
            }`}
            style={{
                borderTop: Math.floor(index / 11) + 1 === 1 ? "none" : "",
                borderBottom: Math.floor(index / 11) + 1 === 11 ? "none" : "",
                borderLeft: index % 11 === 0 ? "none" : "",
                borderRight: (index + 1) % 11 === 0 ? "none" : "",
                background: highlightedBlocks.includes(id)
                    ? `url(${hammer}) rgba(0, 1, 0, 0.05) center center/cover`
                    : blockedCells && blockedCells.has(id) && !botField
                    ? "rgba(0, 1, 0, 0.2)"
                    : "",
            }}
            id={id}
            onPointerEnter={() => setHoveredBlockId(id)}
            onPointerLeave={() => {
                setHighlightedBlocks([]);
                setHoveredBlockId("");
            }}
            onClick={() => {
                handleClickingTheCell(id);
            }}
        >
            {content}
        </div>
    );
};

export default PlayerZoneFieldBlock;
