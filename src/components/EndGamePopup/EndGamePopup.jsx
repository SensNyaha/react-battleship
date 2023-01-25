import "./EndGamePopup.scss";

const EndGamePopup = ({ totalMoves, winnerId }) => {
    const handleRestart = () => {
        window.location.href = "/";
    };

    return (
        <div className="game__end-wrapper">
            <div className="game__end">
                <h1 className="game__end-title">ИГРА ОКОНЧЕНА</h1>
                <div className="game__end-text">
                    Игра завершена за {totalMoves} ходов
                </div>
                <div className="game__end-text">
                    В игре победил игрок {winnerId === 0 ? "слева" : "справа"}
                </div>
                <button onClick={handleRestart} className="game__end-tomenu">
                    Обратно в меню
                </button>
            </div>
        </div>
    );
};

export default EndGamePopup;
