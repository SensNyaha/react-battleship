import deck1 from "../components/PlayerZone/1deck.png";
import deck2 from "../components/PlayerZone/2deck.png";
import deck3 from "../components/PlayerZone/3deck.png";
import deck4 from "../components/PlayerZone/4deck.png";

export default function returnContentForPositionedCells (shipPositionInfo) {
    switch (String(shipPositionInfo?.numberOfDeck)) {
            case "4":
                return <img
                        className="ship__decks-4"
                        src={deck4}
                        alt=""
                        style={{
                            transform:
                                shipPositionInfo?.orientation === "vertical"
                                    ? "rotateZ(90deg) translateY(-100%)"
                                    : "",
                        }}
                    />
            case "3":
                return    <img
                        className="ship__decks-3"
                        src={deck3}
                        alt=""
                        style={{
                            transform:
                                shipPositionInfo?.orientation === "vertical"
                                    ? "rotateZ(90deg) translateY(-100%)"
                                    : "",
                        }}
                    />
            case "2":
                return                    <img
                        className="ship__decks-2"
                        src={deck2}
                        alt=""
                        style={{
                            transform:
                                shipPositionInfo?.orientation === "vertical"
                                    ? "rotateZ(90deg) translateY(-100%)"
                                    : "",
                        }}
                    />

            case "1":
                return <img className="ship__decks-1" src={deck1} alt="" />;
            default:
                break;
        }
}