import { useEffect, useState } from "react";
import "./SpinArrow.scss";

const SpinArrow = ({ gameStarted, setCurrentPlayer, currentPlayer }) => {
    const [show, setShow] = useState(gameStarted);
    const [infoBlockShow, setInfoBlockShow] = useState(false);
    const [fi, setFi] = useState("0deg");

    useEffect(() => {
        setFi(Math.random() * 720 + 720 + "deg" || 0);
    }, []);
    useEffect(() => {
        parseFloat(fi) % 360 <= 180 ? setCurrentPlayer(0) : setCurrentPlayer(1);
    }, [fi]);
    useEffect(() => {
        setShow(gameStarted);
    }, [gameStarted]);
    useEffect(() => {
        if ((currentPlayer === 0 || currentPlayer === 1) && gameStarted) {
            setTimeout(() => {
                setInfoBlockShow(true);
            }, 3000);
            setTimeout(() => {
                setShow(false);
                setInfoBlockShow(false);
            }, 10000);
        }
    }, [currentPlayer, gameStarted]);

    return (
        <>
            <div className="spin-arrow">
                <svg
                    fill="#000000"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    id="down-arrow"
                    style={{
                        opacity: `${show ? `1` : "0"}`,
                        zIndex: `${show ? "10000" : "-5"}`,
                        transition: "all 3s .5s",
                        transform: `${show ? `rotateZ(${fi})` : ""}`,
                    }}
                >
                    <path
                        id="primary"
                        d="M12,3V21M9,18l3,3,3-3"
                        style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "1.5",
                        }}
                    ></path>
                </svg>
            </div>
            {infoBlockShow ? (
                <div className="info-block">
                    Первым начинает игрок{" "}
                    {currentPlayer === 0 ? "слева" : "справа"}
                </div>
            ) : null}
        </>
    );
};

export default SpinArrow;
