export default function createBlockedCellArrayPositions(
    shipPositionsArray,
    addFunc
) {
    if (shipPositionsArray) {
        shipPositionsArray.forEach((ship) => {
            ship.positions.forEach((position) => {
                const splittedPosition = position.split("-");
                addFunc(position);
                if (splittedPosition[0] > 1) {
                    addFunc(
                        `${splittedPosition[0] - 1}-${splittedPosition[1]}`
                    );
                    if (+splittedPosition[1] > 1) {
                        addFunc(
                            `${splittedPosition[0] - 1}-${
                                splittedPosition[1] - 1
                            }`
                        );
                    }
                }
                if (+splittedPosition[1] > 1) {
                    addFunc(
                        `${splittedPosition[0]}-${splittedPosition[1] - 1}`
                    );

                    if (+splittedPosition[0] < 10) {
                        addFunc(
                            `${+splittedPosition[0] + 1}-${
                                splittedPosition[1] - 1
                            }`
                        );
                    }
                }
                if (+splittedPosition[0] < 10) {
                    addFunc(
                        `${+splittedPosition[0] + 1}-${+splittedPosition[1]}`
                    );

                    if (+splittedPosition[1] < 10) {
                        addFunc(
                            `${+splittedPosition[0] + 1}-${
                                +splittedPosition[1] + 1
                            }`
                        );
                    }
                }
                if (+splittedPosition[1] < 10) {
                    addFunc(
                        `${+splittedPosition[0]}-${+splittedPosition[1] + 1}`
                    );

                    if (splittedPosition[0] > 1) {
                        addFunc(
                            `${+splittedPosition[0] - 1}-${
                                +splittedPosition[1] + 1
                            }`
                        );
                    }
                }
            });
        });
    }
}
