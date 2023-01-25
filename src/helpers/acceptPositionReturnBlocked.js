export default function acceptPositionReturnBlocked (position) {
    const setOfBlockedCells = new Set();
    const splittedPosition = position.split("-");
    setOfBlockedCells.add(position);
    if (splittedPosition[0] > 1) {
        setOfBlockedCells.add(
            `${splittedPosition[0] - 1}-${splittedPosition[1]}`
        );
        if (+splittedPosition[1] > 1) {
            setOfBlockedCells.add(
                `${splittedPosition[0] - 1}-${
                    splittedPosition[1] - 1
                }`
            );
        }
    }
    if (+splittedPosition[1] > 1) {
        setOfBlockedCells.add(
            `${splittedPosition[0]}-${splittedPosition[1] - 1}`
        );

        if (+splittedPosition[0] < 10) {
            setOfBlockedCells.add(
                `${+splittedPosition[0] + 1}-${
                    splittedPosition[1] - 1
                }`
            );
        }
    }
    if (+splittedPosition[0] < 10) {
        setOfBlockedCells.add(
            `${+splittedPosition[0] + 1}-${+splittedPosition[1]}`
        );

        if (+splittedPosition[1] < 10) {
            setOfBlockedCells.add(
                `${+splittedPosition[0] + 1}-${
                    +splittedPosition[1] + 1
                }`
            );
        }
    }
    if (+splittedPosition[1] < 10) {
        setOfBlockedCells.add(
            `${+splittedPosition[0]}-${+splittedPosition[1] + 1}`
        );

        if (splittedPosition[0] > 1) {
            setOfBlockedCells.add(
                `${+splittedPosition[0] - 1}-${
                    +splittedPosition[1] + 1
                }`
            );
        }
    }

    return Array.from(setOfBlockedCells)
}