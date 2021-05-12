export default function linearSort(array) {
    let helpArray = [];
    for (let i = 0; i < array.length; i++)
        helpArray.push(0);
    let time = performance.now();
    for (let i = 0; i < array.length; i++) {
        helpArray[array[i]]++;
    }
    let curIndex = 0;
    for (let i = 0; i < helpArray.length; i++) {
        for (let j = 0; j < helpArray[i]; j++) {
            array[curIndex++] = i;
        }
    }

    return performance.now() - time;
}
