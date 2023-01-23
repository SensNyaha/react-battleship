import createBlockedCellArrayPositions from "./createBlockedCellArrayPositions";

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
        this.blockedCells = new Set();
    }

    createPositions() {
        for (let i = 0; i < this.positionedShips.length; i++) {
            const currentShip = this.positionedShips[i] || {};
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            let newPositionsIsValid = true;

            currentShip.orientation = orientation;

            let x = 0;
            let y = 0;

            const xIncrease = orientation === 'horizontal' ? currentShip.numberOfDeck : 0;
            const yIncrease = orientation === 'vertical' ? currentShip.numberOfDeck : 0;

            do {
                x = Math.ceil(Math.random() * 10);
            }
            while ((x + xIncrease >= 10))

            do {
                y = Math.ceil(Math.random() * 10);
            }
            while ((y + yIncrease >= 10))


            currentShip.positions = [];
            for (let j = 0; j < currentShip.numberOfDeck; j++) {
                if (orientation === 'horizontal') {
                    currentShip.positions.push(`${x+j}-${y}`)
                }
                if (orientation === 'vertical') {
                    currentShip.positions.push(`${x}-${y+j}`)
                }
            }
            
            for (let position of currentShip.positions) {
                if (this.blockedCells.has(position)) {
                    newPositionsIsValid = false;
                }
            }
            if (newPositionsIsValid) {
                createBlockedCellArrayPositions(this.positionedShips, (position) => this.blockedCells.add(position))
            }
            else {
                i--;
            }
        }
    }
}
