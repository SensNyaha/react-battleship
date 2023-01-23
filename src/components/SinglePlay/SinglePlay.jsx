import GameBoard from "../GameBoard/GameBoard";
import GameTitle from "../GameTitle/GameTitle";

const SinglePlay = () => {
    return (
        <div className="game__single">
            <GameTitle text={"Бой против бота"} />
            <GameBoard mode="single" />
        </div>
    );
};

export default SinglePlay;
