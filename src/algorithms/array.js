export default function sortArray(array) {
    for (let i = 1; i < array.length; i++) {
        let k = i;
        const currentValue = array[i];
        while (k > 0 && currentValue <= array[k-1]) {
            array[k] = array[k-1];
            k--;
        }
        array[k] = currentValue;
    }
    return array;
}