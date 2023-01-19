import bg from "./main-bg.jpg";
import "./Game.scss";
import Menu from "../Menu/Menu";
import SinglePlay from "../SinglePlay/SinglePlay";

const Game = () => {
    return (
        <div className="game">
            {/* <Menu /> */}
            <img className="game-bg" src={bg} alt="bg" />
            <SinglePlay />
        </div>
    );
};

export default Game;
