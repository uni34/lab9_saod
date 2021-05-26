function swap(items, leftIndex, rightIndex) {
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right, pivot, characteristics, isForPrint) {
    let i = left;
    let j = right;
    while (i < j) {
        while (items[i] < pivot) {
            characteristics[0] += 1
            characteristics[1] += 1
            i++;
        }
        characteristics[0] += 1
        characteristics[1] += 1
        while (items[j] > pivot) {
            characteristics[0] += 1
            characteristics[1] += 1
            j--;
        }
        characteristics[0] += 1
        characteristics[1] += 1
        if (i < j) {
            swap(items, i, j, characteristics);

            if (isForPrint) {
                let result = '';
                for (let i of items) {
                    result += i;
                    result += ' ';
                }
                // console.log(result);
                characteristics[3].push(result + '\n');
            }
            characteristics[2] += 2
            characteristics[1] += 2
            i++;
            j--;
        }
        // if (i===j) {
        //     let temp = items[i];
        //     items[i] = pivot;
        //     items[left] = temp;
        // }
    }
    let temp = items[j];
        items[j] = pivot;
        items[left] = temp;
    return i;
}

// export function quickSortLeft(items, left, right, characteristics, isForPrint) {
//     let index;
//     characteristics[1] += 1
//     // console.log(items[left]);
//     index = partition(items, left, right, items[left], characteristics, isForPrint);
//     if (left < index - 1) {
//         quickSortLeft(items, left, index - 1, characteristics, isForPrint);
//     }
//     if (index < right) {
//         quickSortLeft(items, index, right, characteristics, isForPrint);
//     }
//     return items;
// }

export function quickSortRight(items, left, right, characteristics, isForPrint) {
    let index;
    characteristics[1] += 1
    index = partition(items, left, right, items[right - 1], characteristics, isForPrint);
    if (left < index - 1) {
        quickSortRight(items, left, index - 1, characteristics, isForPrint);
    }
    if (index < right) {
        quickSortRight(items, index, right, characteristics, isForPrint);
    }
    return items;
}








export function quickSortLeft(items, left, right, characteristics, isForPrint) {
    let pivot; // разрешающий элемент
    let temp;
    let l_hold = left; //левая граница
    let r_hold = right; // правая граница
    pivot = items[left];
    while (left < right) // пока границы не сомкнутся
    {
        while ((items[right] >= pivot) && (left < right))
            right--; // сдвигаем правую границу пока элемент [right] больше [pivot]
        if (left !== right) // если границы не сомкнулись
        {
            temp = items[left];
            items[left] = items[right];
            items[right] = temp; // перемещаем элемент [right] на место разрешающего
            // if (isForPrint) {
            //     let result = '';
            //     for (let i of items) {
            //         result += i;
            //         result += ' ';
            //     }
            //     characteristics[3].push(result + '\n');
            // }
            left++; // сдвигаем левую границу вправо
        }
        while ((items[left] <= pivot) && (left < right))
            left++; // сдвигаем левую границу пока элемент [left] меньше [pivot]
        if (left !== right) // если границы не сомкнулись
        {
            // temp = items[left];
            // items[left] = items[right];
            // items[right] = temp; // перемещаем элемент [left] на место [right]
            // if (isForPrint) {
            //     let result = '';
            //     for (let i of items) {
            //         result += i;
            //         result += ' ';
            //     }
            //     characteristics[3].push(result + '\n');
            // }
            right--; // сдвигаем правую границу вправо
        }
    }
    items[left] = pivot;
    if (isForPrint) {
        let result = '';
        for (let i of items) {
            result += i;
            result += ' ';
        }
        characteristics[3].push(result + '\n');
    }
    let pivotIndex = left;
    left = l_hold;
    right = r_hold;
    if (left < pivotIndex - 1) {
        quickSortLeft(items, left, pivotIndex - 1, characteristics, isForPrint);
    }
    if (pivotIndex < right) {
        quickSortLeft(items, pivotIndex + 1, right, characteristics, isForPrint);
    }
    return items;

    // let index;
    // characteristics[1] += 1
    // // console.log(items[left]);
    // index = partition(items, left, right, items[left], characteristics, isForPrint);

}



// function partition1(arr, start, end){
//     // Taking the last element as the pivot
//     const pivotValue = arr[end];
//     let pivotIndex = start;
//     for (let i = start; i < end; i++) {
//         if (arr[i] < pivotValue) {
//             // Swapping elements
//             [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
//             // Moving to next element
//             pivotIndex++;
//         }
//     }
//
//     // Putting the pivot value in the middle
//     [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
//     return pivotIndex;
// }
//
//
// function quickSortRecursive(arr, start, end) {
//     // Base case or terminating case
//     if (start >= end) {
//         return;
//     }
//
//     // Returns pivotIndex
//     let index = partition1(arr, start, end);
//
//     // Recursively apply the same logic to the left and right subarrays
//     quickSortRecursive(arr, start, index - 1);
//     quickSortRecursive(arr, index + 1, end);
// }
