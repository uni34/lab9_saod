export default function initNotSortedList(length, maxValue) {
    return Array.from({length: length}, () => Math.floor(Math.random() * maxValue));
}

export function initSortedList(length, maxValue) {
    let arr = Array.from({length: length}, () => Math.floor(Math.random() * maxValue));
    return arr.sort(function(a,b){
        return a - b
    });
}

export function initRevertSortedList(length, maxValue) {
    let arr = Array.from({length: length}, () => Math.floor(Math.random() * maxValue));
    return arr.sort(function(a,b){
        return b - a
    });
}

export function initHalfSortedList(length, maxValue, percent) {
    const sortedLength = Math.trunc(length * percent);
    let array = [];
    for (let key = 0; key < sortedLength; key++) {
        array[key] = key;
    }
    for (let key = sortedLength; key < length; key++) {
        array[key] = Math.floor(Math.random() * maxValue);
    }
    return array;
}

export function initNotSortedArray(maxValue, array) {
    for (let key in array) {
        array[key] = Math.floor(Math.random() * maxValue);
    }
    return array;
}

export function initSortedArray(maxValue, array) {
    for (let key = 0; key<maxValue; key++) {
        array[key] = key;
    }
    return array;
}

export function initRevertSortedArray(maxValue, array) {
    for (let key = 0; key<maxValue; key++) {
        array[key] = maxValue;
        maxValue--;
    }
    return array;
}

export function initHalfSortedArray(maxValue, array, percent) {
    const sortedLength = Math.trunc(array.length * percent);
    for (let key = 0; key < sortedLength; key++) {
        array[key] = key;
    }
    for (let key = sortedLength; key < array.length; key++) {
        array[key] = Math.floor(Math.random() * maxValue);
    }
    return array;
}
