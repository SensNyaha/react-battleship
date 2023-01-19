export default function sortFieldIndexes(index1, index2) {
    if (index1[0] === index2[0]) {
        return index1.split('-')[1] - index2.split('-')[1]
    }
    return index1 - index2
}