import bg from "./main-bg.jpg";
import "./Game.scss";
import Menu from "../Menu/Menu";
import SinglePlay from "../SinglePlay/SinglePlay";
import { Routes, Route } from "react-router-dom";

const Game = () => {
    return (
        <div className="game">
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="single" element={<SinglePlay />} />
                <Route path="*">нет такой страницы</Route>
            </Routes>
            <img className="game-bg" src={bg} alt="bg" />
        </div>
    );
};

export default Game;
