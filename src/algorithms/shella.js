export default function shellSort(array) {
    let time = performance.now();
    let tmp, j;
    let t = Math.floor(Math.log2(array.length)) - 1;
    let h = 2 * t + 1;
    for (h; h > 0; h = Math.floor(h / 2)) {
        for (let i = h; i < array.length; i++) {
            tmp = array[i];
            for (j = i - h; j >= h && tmp < array[j]; j -= h) {
                array[j + h] = array[j];
            }
            array[j + h] = tmp;
        }
    }
    return performance.now() - time;
}
