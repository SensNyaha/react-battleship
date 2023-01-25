import acceptPositionReturnBlocked from "./acceptPositionReturnBlocked";

export default function createBlockedCellArrayPositions(
    shipPositionsArray,
    addFunc
) {
    if (shipPositionsArray) {
        shipPositionsArray.forEach((ship) => {
            ship.positions.forEach((position) => {
                acceptPositionReturnBlocked(position).forEach(addFunc)
            });
        });
    }
}
