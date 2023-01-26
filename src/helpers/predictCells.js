import getDirection from "./getDirection";

export default function predictCells(positionsArray) {
    if (positionsArray.length === 1) {
        const [x, y] = positionsArray[0].split("-");
        const result = [];
        if (x > 1) {
            result.push(`${x - 1}-${y}`);
        }
        if (x < 10) {
            result.push(`${+x + 1}-${y}`);
        }
        if (y > 1) {
            result.push(`${x}-${y - 1}`);
        }
        if (y < 10) {
            result.push(`${x}-${+y + 1}`);
        }

        return result;
    }
    if (positionsArray.length > 1) {
        const [x, y] = positionsArray[0].split("-");
        const direction = getDirection(positionsArray);

        let sorted;
        switch (direction) {
            case "vertical":
                sorted = positionsArray.sort(
                    (a, b) => a.split("-")[1] - b.split("-")[1]
                );

                return [
                    `${x}-${sorted[0].split("-")[1] - 1}`,
                    `${x}-${+sorted[sorted.length - 1].split("-")[1] + 1}`,
                ].filter((id) =>
                    id.split("-").every((index) => index > 0 && index < 11)
                );
            case "horizontal":
                sorted = positionsArray.sort(
                    (a, b) => a.split("-")[0] - b.split("-")[0]
                );

                return [
                    `${sorted[0].split("-")[0] - 1}-${y}`,
                    `${+sorted[sorted.length - 1].split("-")[0] + 1}-${y}`,
                ].filter((id) =>
                    id.split("-").every((index) => index > 0 && index < 11)
                );
            default:
                break;
        }
    }
}
