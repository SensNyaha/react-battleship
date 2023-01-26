import createBlockedCellArrayPositions from "./createBlockedCellArrayPositions";
import predictCells from "./predictCells";

export class Bot {
    constructor(fieldSelector) {
        this.field = document.querySelector(fieldSelector);
        this.positionedShips = [
            { numberOfDeck: 4, positions: [], destroyed: false },
            { numberOfDeck: 3, positions: [], destroyed: false },
            { numberOfDeck: 3, positions: [], destroyed: false },
            { numberOfDeck: 2, positions: [], destroyed: false },
            { numberOfDeck: 2, positions: [], destroyed: false },
            { numberOfDeck: 2, positions: [], destroyed: false },
            { numberOfDeck: 1, positions: [], destroyed: false },
            { numberOfDeck: 1, positions: [], destroyed: false },
            { numberOfDeck: 1, positions: [], destroyed: false },
            { numberOfDeck: 1, positions: [], destroyed: false },
        ];
        this.playersPositionedShips = [];
        this.blockedCells = new Set();
        this.shotCells = {}; //{id: true/false}
        this.toRandom = true;
        this.recommendedCellsToShot = [];
        this.hitShipPositions = [];
    }

    createPositions() {
        for (let i = 0; i < this.positionedShips.length; i++) {
            const currentShip = this.positionedShips[i] || {};
            const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
            let newPositionsIsValid = true;

            currentShip.orientation = orientation;

            let x = 0;
            let y = 0;

            const xIncrease =
                orientation === "horizontal" ? currentShip.numberOfDeck : 0;
            const yIncrease =
                orientation === "vertical" ? currentShip.numberOfDeck : 0;

            do {
                x = Math.ceil(Math.random() * 10);
            } while (x + xIncrease >= 10);

            do {
                y = Math.ceil(Math.random() * 10);
            } while (y + yIncrease >= 10);

            currentShip.positions = [];
            for (let j = 0; j < currentShip.numberOfDeck; j++) {
                if (orientation === "horizontal") {
                    currentShip.positions.push(`${x + j}-${y}`);
                }
                if (orientation === "vertical") {
                    currentShip.positions.push(`${x}-${y + j}`);
                }
            }

            for (let position of currentShip.positions) {
                if (this.blockedCells.has(position)) {
                    newPositionsIsValid = false;
                }
            }
            if (newPositionsIsValid) {
                createBlockedCellArrayPositions(
                    this.positionedShips,
                    (position) => this.blockedCells.add(position)
                );
            } else {
                i--;
            }
        }
    }
    initPlayersField(playersPositionedShips) {
        this.playersPositionedShips = playersPositionedShips;
    }
    doTurn() {
        if (this.toRandom) {
            const infoShot = this.randomShot();

            if (infoShot.hit) {
                this.toRandom = false;

                this.hitShipPositions.push(infoShot.id);

                const killedShip = this.checkDestroy();

                if (killedShip) {
                    createBlockedCellArrayPositions([killedShip], (id) => {
                        if (!this.shotCells[id]) {
                            this.shotCells[id] = false;
                        }
                    });

                    this.toRandom = true;

                    this.recommendedCellsToShot = [];
                    this.hitShipPositions = [];
                } else {
                    this.recommendedCellsToShot = predictCells(
                        this.hitShipPositions
                    ).filter((item) => this.shotCells[item] === undefined);
                }
            }
            return infoShot.id;
        } else {
            const infoShot = this.notRandomShot(this.recommendedCellsToShot[0]);

            if (infoShot.hit) {
                this.hitShipPositions.push(infoShot.id);

                const killedShip = this.checkDestroy();

                if (killedShip) {
                    createBlockedCellArrayPositions([killedShip], (id) => {
                        if (!this.shotCells[id]) {
                            this.shotCells[id] = false;
                        }
                    });

                    this.toRandom = true;

                    this.recommendedCellsToShot = [];
                    this.hitShipPositions = [];
                } else {
                    this.recommendedCellsToShot = predictCells(
                        this.hitShipPositions
                    ).filter((item) => this.shotCells[item] === undefined);
                }
            } else {
                this.recommendedCellsToShot.splice(0, 1);
            }
            return infoShot.id;
        }
    }
    randomShot() {
        let x = Math.ceil(Math.random() * 10);
        let y = Math.ceil(Math.random() * 10);
        let id = `${x}-${y}`;

        while (this.shotCells[id] !== undefined) {
            x = Math.ceil(Math.random() * 10);
            y = Math.ceil(Math.random() * 10);
            id = `${x}-${y}`;
        }

        const hit = this.playersPositionedShips.some((position) =>
            position.positions.some((posId) => posId === id)
        );
        this.shotCells = { ...this.shotCells, [id]: hit };

        return { id, hit };
    }
    notRandomShot(id) {
        const hit = this.playersPositionedShips.some((position) =>
            position.positions.some((posId) => posId === id)
        );
        this.shotCells = { ...this.shotCells, [id]: hit };

        return { id, hit };
    }

    checkDestroy() {
        const killedShip = this.playersPositionedShips.find((ship) =>
            ship.positions.every((id) => this.hitShipPositions.includes(id))
        );

        return killedShip;
    }
}
