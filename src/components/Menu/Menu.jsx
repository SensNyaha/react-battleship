import "./Menu.scss";

import ship from "./ship.png";
import cruiser from "./cruiser.png";

const Menu = () => {
    return (
        <div className="menu">
            <h1 className="menu__title">МОРСКОЙ БОЙ</h1>
            <ul className="menu__list">
                <li className="menu__item">Бой против бота</li>
                <li className="menu__item">2 игрока</li>
            </ul>
            <img src={ship} alt="ship" className="menu__ship" />
            <img src={cruiser} alt="cruiser" className="menu__cruiser" />
        </div>
    );
};

export default Menu;
