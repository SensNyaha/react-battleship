import { useState } from "react";
import "./PlayerZoneField.scss";

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

const PlayerZoneField = ({ currentDirection, numberOfDeck }) => {
    const [highlightedBlocks, setHighlightedBlocks] = useState([]);

    const handleHoverFieldBlock = (id) => {
        const splitted = id.split("-");
        if (currentDirection === "horizontal") {
            if (splitted[0] <= 10 - numberOfDeck) {
                const positions = [...new Array(+numberOfDeck)].map(
                    (item, index) => {
                        return `${+splitted[0] + index}-${splitted[1]}`;
                    }
                );
                setHighlightedBlocks(positions);
                return null;
            }
            setHighlightedBlocks([]);
            return null;
        } else if (currentDirection === "vertical") {
            if (splitted[1] <= 10 - numberOfDeck) {
                const positions = [...new Array(+numberOfDeck)].map(
                    (item, index) => {
                        return `${splitted[0]}-${+splitted[1] + index}`;
                    }
                );
                setHighlightedBlocks(positions);
                return null;
            }
            setHighlightedBlocks([]);
            return null;
        }
    };

    const fieldBlocks = [...Array(121)].map((item, index) => {
        const content =
            marksObject[`${index + 1}-${Math.floor(index / 11) + 1}`];

        const id = `${(index % 11) - 1}-${Math.floor((index - 11) / 11) + 1}`;

        return (
            <div
                className={`player-zone__block ${
                    content ? "player-zone__block--blocked" : ""
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
                onClick={() => handleHoverFieldBlock(id)}
            >
                {content}
            </div>
        );
    });
    return <div className="player-zone__field">{fieldBlocks}</div>;
};

export default PlayerZoneField;
