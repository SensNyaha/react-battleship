import getDirection from "./getDirection";

export default function predictCells(positionsArray) {
    if (positionsArray.length === 1) {
        const [x, y] = positionsArray[0].split('-');
        return [`${x}-${y-1}`,`${+x+1}-${y}`,`${x}-${+y+1}`,`${x-1}-${y}`]
    }
    if (positionsArray.length > 1) {
        const [x, y] = positionsArray[0].split('-');
        const direction = getDirection(positionsArray);

        let sorted;
        switch (direction) {
            case 'vertical': 
                sorted = positionsArray.sort((a,b) => a.split('-')[1] - b.split('-')[1]);
                return [`${x}-${sorted[0].split('-')[1]-1}`,`${x}-${+sorted[sorted.length].split('-')[1]+1}`];
            case 'horizontal':
                sorted = positionsArray.sort((a,b) => a.split('-')[0] - b.split('-')[0]);
                return [`${sorted[0].split('-')[0]-1}-${y}`,`${+sorted[sorted.length].split('-')[0]+1}-${y}`];
            default: 
                break;
        }
    }
}