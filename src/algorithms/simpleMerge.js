//Фаза разделения
function Divide(MainArray,ArrayB,ArrayC,DegreeSession) {
    let Change = true;
    for (let i=0; i< MainArray.length; i++) {
        if (Change) {
            ArrayB.push(MainArray[i]);
            if (ArrayB.length % DegreeSession === 0) {
                Change = !Change;
            }
        }
        else {
            ArrayC.push(MainArray[i])
            if (ArrayC.length % DegreeSession === 0) {
                Change = !Change
            }
        }
    }
}

//Фаза слияния
function Merge(MainArray,FirstHalfB,SecondHalfC,SessionSize,IndexB,IndexC) {
    let IterationValueB;
    let IterationValueC;
    let LastElementSessionIndexB;
    let LastElementSessionIndexC;
    if (FirstHalfB.length - IndexB < SessionSize) {
        IterationValueB = FirstHalfB.length - IndexB;
    }
    else {
        IterationValueB = SessionSize;
    }
    if (SecondHalfC.length - IndexC < SessionSize) {
        IterationValueC = SecondHalfC.length - IndexC;
    }
    else {
        IterationValueC = SessionSize;
    }
    LastElementSessionIndexB = IndexB + IterationValueB;
    LastElementSessionIndexC = IndexC + IterationValueC;
    for (let i=0; i<(IterationValueB + IterationValueC); i++) {
        if (LastElementSessionIndexB === IndexB) {
            MainArray.push(SecondHalfC[IndexC]);
            IndexC += 1;
            continue;
        }
        if (LastElementSessionIndexC === IndexC) {
            MainArray.push(FirstHalfB[IndexB]);
            IndexB += 1;
            continue;
        }
        if (FirstHalfB[IndexB] < SecondHalfC[IndexC]) {
            MainArray.push(FirstHalfB[IndexB]);
            IndexB += 1;
        }
        else {
            MainArray.push(SecondHalfC[IndexC])
            IndexC += 1;
        }
    }
    return [IndexB, IndexC];
}

//Двухфазная сортировка простым слиянием
export function SortTwoPhase(MainArray) {
    let allSwaps = [MainArray.slice()];
    let sourceMass = MainArray.toString();
    let time = performance.now();
    let IndexArr;
    let CoupleSession = Math.pow(2, Math.round(Math.log2(MainArray.length)-1));  //максимальный размер серии
    let CurrentCoupleSession = 1;    //текущий размер серии
    while (CurrentCoupleSession <= CoupleSession) {
        let B = []
        let C = []
        Divide(MainArray, B, C, CurrentCoupleSession)
        allSwaps.push(B);
        allSwaps.push(C);
        MainArray = []
        let IndexFirst = 0
        let IndexSecond = 0
        while (B.length !== IndexFirst || C.length !== IndexSecond){
            IndexArr = Merge(MainArray, B, C, CurrentCoupleSession, IndexFirst, IndexSecond);
            IndexFirst = IndexArr[0];
            IndexSecond = IndexArr[1];
        }
        allSwaps.push(MainArray.slice());
        CurrentCoupleSession *= 2
    }
    return {
        "methodName": "Двухфазная сортировка массива простым слиянием",
        "sourceMass": "[" + sourceMass + "]",
        "resultMass": "[" + allSwaps[allSwaps.length - 1].toString() + "]",
        "allSwaps": allSwaps,
        "time": performance.now() - time,
        "count": Math.round(Math.log2(MainArray.length)),
    };
}

function MergeChoice(FromArrayFirst,FromArraySecond,ToArrayFirst,ToArraySecond,CoupleSession) {
    let Change = true;
    let IndexFirst = 0;
    let IndexSecond = 0;
    let IndexArr;
    while (FromArrayFirst.length !== IndexFirst || FromArraySecond.length !== IndexSecond) {
        if (Change) {
            IndexArr = Merge(ToArrayFirst, FromArrayFirst, FromArraySecond, CoupleSession, IndexFirst, IndexSecond);
            IndexFirst = IndexArr[0];
            IndexSecond = IndexArr[1];
        }
        else{
            IndexArr = Merge(ToArraySecond, FromArrayFirst, FromArraySecond, CoupleSession, IndexFirst, IndexSecond);
            IndexFirst = IndexArr[0];
            IndexSecond = IndexArr[1];
        }
        Change = !Change;
    }
}

export function SortOnePhase(MainArray) {
    let allSwaps = [MainArray.slice()];
    let sourceMass = MainArray.toString();
    let CoupleSessionMax = Math.pow(2, Math.round(Math.log2(MainArray.length)-1));
    let time = performance.now();
    let B = [];
    let C = [];
    let D = [];
    let E = [];
    let IndexOfFirstHalf;
    let IndexOfSecondHalf;
    let IndexArr;
    Divide(MainArray, B, C, 1);
    allSwaps.push(B);
    allSwaps.push(C);
    let CurrentCoupleSession = 1;
    let Change = true;
    while (CurrentCoupleSession <= CoupleSessionMax / 2) {
        if (Change) {
            MergeChoice(B, C, D, E, CurrentCoupleSession)
            B = []
            C = []
            allSwaps.push(D);
            allSwaps.push(E);
        }
        else {
            MergeChoice(D, E, B, C, CurrentCoupleSession);
            D = [];
            E = [];
            allSwaps.push(B);
            allSwaps.push(C);
        }
        Change = !Change;
        CurrentCoupleSession *= 2;
    }
    MainArray = [];
    if (Change) {
        IndexOfFirstHalf = 0
        IndexOfSecondHalf = 0
        while (B.length !== IndexOfFirstHalf || C.length !== IndexOfSecondHalf) {
            IndexArr = Merge(MainArray, B, C, CurrentCoupleSession, IndexOfFirstHalf, IndexOfSecondHalf);
            IndexOfFirstHalf = IndexArr[0];
            IndexOfSecondHalf = IndexArr[1];
        }
    }
    else {
        IndexOfFirstHalf = 0
        IndexOfSecondHalf = 0
        while (D.length !== IndexOfFirstHalf || E.length !== IndexOfSecondHalf) {
            IndexArr = Merge(MainArray, D, E, CurrentCoupleSession, IndexOfFirstHalf, IndexOfSecondHalf);
            IndexOfFirstHalf = IndexArr[0];
            IndexOfSecondHalf = IndexArr[1];
        }
    }
    allSwaps.push(MainArray.slice());
    return {
        "methodName": "Однофазная сортировка массива простым слиянием",
        "sourceMass": "[" + sourceMass + "]",
        "resultMass": "[" + allSwaps[allSwaps.length - 1].toString() + "]",
        "allSwaps": allSwaps,
        "time": performance.now() - time,
        "count": Math.round(Math.log2(MainArray.length))
    };
}
