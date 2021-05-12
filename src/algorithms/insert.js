export default function insert(array) {
    let time = performance.now();
    for (let i = 1; i < array.length; i++) {
        const current = array[i];
        let j = i;
        while (j > 0 && array[j - 1] > current) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = current;
    }
    return performance.now() - time;
}
