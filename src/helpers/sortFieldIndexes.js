export default function sortFieldIndexes(index1, index2) {
    return index1[0] === index2[0] ? +index1.split('-')[1] - +index2.split('-')[1] : +index1.split('-')[0] - +index2.split('-')[0];

}