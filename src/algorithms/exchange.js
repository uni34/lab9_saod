export default function forwardChange(array) {
    let time = performance.now();

    for (let i = 0; i < array.length - 1; i++) {
        let wasSwap = false;
        for (let j = 0; j < array.length - i; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }

    return performance.now() - time;
}
