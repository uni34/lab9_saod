export default function forwardChoice(array) {
    let time = performance.now();
    for (let i = array.length - 1; i > 0; i--) {
        let max = array[i];
        let index = i;
        for (let j = 0; j < i; j++) {
            if (array[j] > max) {
                max = array[j];
                index = j;
            }
        }
        let temp = array[index];
        array[index] = array[i];
        array[i] = temp;
    }

    return performance.now() - time;
}
