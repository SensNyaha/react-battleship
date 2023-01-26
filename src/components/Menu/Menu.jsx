import { Link } from "react-router-dom";

import "./Menu.scss";

import ship from "./ship.png";
import cruiser from "./cruiser.png";

const Menu = () => {
    return (
        <div className="menu">
            <h1 className="menu__title">МОРСКОЙ БОЙ</h1>
            <ul className="menu__list">
                <Link to="single" className="menu__item">
                    Бой против бота
                </Link>
                <li className="menu__item menu__item--blocked">
                    2 игрока
                    <span>В разработке</span>
                </li>
            </ul>
            <img src={ship} alt="ship" className="menu__ship" />
            <img src={cruiser} alt="cruiser" className="menu__cruiser" />
        </div>
    );
};

export default Menu;
