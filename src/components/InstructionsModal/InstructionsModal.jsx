import { useEffect } from "react";
import { useState } from "react";

import "./InstructionsModal.scss";

import slide2 from "./slide2.jpg";
import slide3 from "./slide3.jpg";
import slide4 from "./slide4.jpg";
import slide5 from "./slide5.jpg";
import slide6 from "./slide6.jpg";
import slide7 from "./slide7.jpg";
import slide8 from "./slide8.jpg";
import slide9 from "./slide9.jpg";
import slide10 from "./slide10.jpg";
import slide11 from "./slide11.jpg";
import slide12 from "./slide12.jpg";
import slide13 from "./slide13.jpg";

const instructionsSlides = [
    [
        <div key="instructions__title" className="instructions__title">
            Добро пожаловать в одиночный режим морского боя!
        </div>,
        <div key="instructions__text" className="instructions__text">
            В этом режиме Вам будет противостоять компьютер.
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Быстрый брифинг по игровому полю
        </div>,
        <div key="instructions__text" className="instructions__text">
            Слева и справа находятся изолированные игровые поля. Вашему
            управлению подвергается поле с левой стороны. Именно на нём вы
            можете устанавливать свои корабли.
            <img className="instructions__img" src={slide2} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Ваше игровое поле
        </div>,
        <div key="instructions__text" className="instructions__text">
            Ваше игровое поле состоит из трёх частей: статистики, самой сетки
            поля, а также магазина доступных Вам кораблей
            <img className="instructions__img" src={slide3} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Выбор корабля
        </div>,
        <div key="instructions__text" className="instructions__text">
            Для выбора корабля кликните на иконке корабля в магазине доступных
            кораблей. При выборе одного из кораблей, его иконка в магазине
            станет полупрозрачной. Тот же визуальный эффект показывает, что
            корабль такого типа уже установлен на поле боя.
            <img className="instructions__img" src={slide4} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Позиционирование корабля
        </div>,
        <div key="instructions__text" className="instructions__text">
            Для размещения корабля после клика на желаемом корабле переместите
            указатель мыши на ту ячейку, с которой хотите начать постройку
            корабля. Автоматическая система подскажет в каких ячейках будет
            расположен Ваш корабль. С помощью правой кнопки мыши Вы можете
            изменить ориентацию устанавливаемого судна с горизонтальной на
            вертикальную, и обратно.
            <img className="instructions__img" src={slide5} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Установка корабля
        </div>,
        <div key="instructions__text" className="instructions__text">
            Определившись с позицией корабля кликните ЛКМ по полю, в этом месте
            расположится Ваш корабль. Логотип корабля будет помещен в пределы
            ячеек размещения. Вокруг корабля будет построены система ближних
            вод, в которых нельзя будет разместить новые корабли.
            <br />
            Логотипа размещенного типа корабля в магазине сохранит
            полупрозрачный вид, чтобы Вы легко могли сориентироваться, какие
            корабли еще не вошли в воды.
            <br />
            Чтобы удалить установленный корабль - кликните ЛКМ по его
            изображению на игровом поле. Корабль снова будет доступен для
            постройки в любой другой доступной части поля.
            <img className="instructions__img" src={slide6} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Начало игры
        </div>,
        <div key="instructions__text" className="instructions__text">
            Когда Ваше поле будет заполнено кораблями, а в магазине все иконки
            суден станут полупрозрачными - в нижней части экрана появится
            кнопка, нажав, которую Вы дадите согласие на начало игры.
            <br />
            Не переживайте за то, что боту не дали время расставить свои
            корабли, он это сделал, пока вы делали свой выбор. Это можно
            определить по количеству кораблей в поле статистики на правой
            половине игрового поля.
            <img className="instructions__img" src={slide7} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Случайный игрок
        </div>,
        <div key="instructions__text" className="instructions__text">
            После того, как Вы дадите согласие на начало игры, запустится
            рулетка, которая определит, какой из игроков начнет игру. Стрелка
            укажет на игрока, имеющего право на первый ход. В нижней части
            экрана так же будет продублирован выбор рулетки.
            <img className="instructions__img" src={slide8} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Игра
        </div>,
        <div key="instructions__text" className="instructions__text">
            Первый игрок делает свой выбор. Если первый игрок - Вы, делайте
            выстрел по игровому полю бота. Наведитесь на любую из ячеек на
            правой части игрового поля и нажмите ЛКМ, чтобы выпустить
            противокорабельную торпеду. <br />
            Появившийся под указателем мыши спрайт расскажет о Ваших успехах:
            пузырьки - промах, взрыв - попадание.
            <img className="instructions__img" src={slide9} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Переход хода
        </div>,
        <div key="instructions__text" className="instructions__text">
            Если один из игроков допускает промах, право хода переходит его
            сопернику. В случае, если Вы начинали первым и промахнулись, бот
            ударит по Вашей части поля. Пораженные ячейки будут дополнительно
            подсвечиваться, чтобы Вы могли увидеть, куда бьет противник.
            <br />
            Если бот выстрелил и промахнулся, право хода снова Ваше. Определить,
            можно ли Вам сейчас произвести выстрел легко понять по спрайту
            торпед в границах вражеских полей. Если они есть - Вы можете нанести
            удар.
            <br />
            Бот специально будет производить замедленные выстрелы, чтобы Вы
            могли видеть, как именно он поражает цели.
            <img className="instructions__img" src={slide10} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Попадание
        </div>,
        <div key="instructions__text" className="instructions__text">
            Если игрок попал в цель и нанес урон флоту соперника, право хода
            сохраняется за ним.
            <img className="instructions__img" src={slide11} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Разрушение корабля
        </div>,
        <div key="instructions__text" className="instructions__text">
            Если Вам удалось разрушить корабль, Вы увидите это, так как вокруг
            бывшего судна будет выстроена запрещенная зона, в которой точно не
            будет ни одного вражеского корабля. <br />
            Разрушение корабля приравнивается к попаданию и сохраняет за игроком
            право хода.
            <br />
            При потере кораблей в верхней части игровых полей - в полях
            статистики можно будет увидеть, сколько еще экипажей осталось в
            живых.
            <img className="instructions__img" src={slide12} alt="slide" />
        </div>,
    ],
    [
        <div key="instructions__title" className="instructions__title">
            Конец игры
        </div>,
        <div key="instructions__text" className="instructions__text">
            Игра будет завершена, как только один из игроков разгромит флот
            своего противника. Вы увидите окно завершения, в котором будет
            указан победитель и количество ходов, потребовавшееся для одержания
            победы. <br />
            Из этого окна Вы сможете вернуться в главное меню.
            <img className="instructions__img" src={slide13} alt="slide" />
        </div>,
    ],
];

const InstructionsModal = ({ setShowInst }) => {
    const [curSlide, setCurSlide] = useState(1);

    useEffect(() => {
        const instr = document.querySelector(".instructions__inner");
        if (instr) {
            instr.scrollTo(0, 0);
        }

        if (curSlide > instructionsSlides.length) {
            setShowInst(false);
        }
    }, [curSlide]);

    return (
        <div className="instructions">
            <div className="instructions__inner">
                <div className="instructions__slide">
                    {instructionsSlides.filter((item, index) =>
                        index + 1 === curSlide ? true : false
                    )}
                </div>
                <div className="instructions__controls">
                    {curSlide === 1 ? null : (
                        <button
                            className="instructions__button instructions__button--prev"
                            onClick={() => setCurSlide((prev) => prev - 1)}
                        >
                            Назад
                        </button>
                    )}
                    <button
                        className="instructions__button instructions__button--next"
                        onClick={() => setCurSlide((prev) => prev + 1)}
                    >
                        Дальше
                    </button>
                </div>
                <button
                    onClick={() => setShowInst(false)}
                    className="instructions__close"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default InstructionsModal;
