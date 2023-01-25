export default function getDirection(positionsArray) {
    const columnIndexes = positionsArray.map(id => id.split('-')[0]);
    const rowIndexes = positionsArray.map(id => id.split('-')[1]);

    let sameColumn = true;
    let sameRow = true;

    for (let i = 1; i < columnIndexes.length; i++) {
        if (columnIndexes[i] !== columnIndexes[i-1]) {
            sameColumn = false;
        }
        if (rowIndexes[i] !== rowIndexes[i-1]) {
            sameRow = false;
        }
    }

    if (sameColumn) {
        return 'vertical'
    }
    if (sameRow) {
        return 'horizontal'
    }
}