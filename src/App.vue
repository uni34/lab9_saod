<template>
    <div id="app">
        <h3 class="app__label">Характеристики сортировок</h3>
        <div class="app__form" style="justify-content: space-evenly; width: 100%">
            <h4>
                Быстрая сортировка слева <br>
            </h4>
            <div v-for="(item, i) in quickLeftExample[3]" :key="i" style="width: 100%; margin: 2px 30px">
                {{item}}
            </div>
        </div>

        <div class="app__form" style="justify-content: space-evenly; width: 100%">
            <h4>
                Быстрая сортиировка справа <br>
            </h4>
            <div v-for="(item, i) in quickRightExample[3]" :key="i" style="width: 100%; margin: 2px 30px">
                {{item}}
            </div>
        </div>

        <button @click="sortExample1" class="app__btn">Сравнить</button>



        <h3 class="app__label">Сравнение алгоритмов быстрой сортировки</h3>
        <div style="display: flex; justify-content: center">
            Размерность<br><input type="number" v-model="sizeExample">
        </div>

        <div class="tableItem">
            <div class="tableItem__value"></div>
            <div class="tableItem__value">Быстрая слева</div>
            <div class="tableItem__value">Быстрая справа</div>
        </div>
        <div class="tableItem">
            <div class="tableItem__value">Время</div>
            <div class="tableItem__value">{{time}}</div>
            <div class="tableItem__value">{{time1}}</div>
        </div>
        <div class="tableItem">
            <div class="tableItem__value">
                Число чтений
            </div>
            <div class="tableItem__value">{{charLeft[1]}}</div>
            <div class="tableItem__value">{{charRight[1]}}</div>
        </div>
        <div class="tableItem">
            <div class="tableItem__value">
                Число сравнений
            </div>
            <div class="tableItem__value">{{sortOnePhaseExample.count}}</div>
            <div class="tableItem__value">{{sortTwoPhaseExample.count}}</div>
        </div>
        <div class="tableItem">
            <div class="tableItem__value">
                Число записей
            </div>
            <div class="tableItem__value">{{ charLeft[2] }}</div>
            <div class="tableItem__value">{{ charRight[2] }}</div>
        </div>
        <button @click="sortExample" class="app__btn">Сравнить</button>

        <h3 class="app__label">Сравнение алгоритмов</h3>
        <div class="app__form" style="justify-content: space-evenly; width: 100%">
            <div style="width: 30%">
                <label class="app__label" for="percent">Задать процент упорядоченности</label>
                <br>
                <input class="app__percent" v-model="percent" id="percent"
                       placeholder="Введите процент..."/>%
            </div>
            <div style="width: 20%">
                <h4>Упорядоченность</h4>
                <input type="radio" name="sort" value="notSort"> Неупорядоченный <br>
                <input type="radio" name="sort" value="sort"> Упорядоченный<br>
                <input type="radio" name="sort" value="revertSort"> По убыванию<br>
                <input type="radio" name="sort" value="halfSort"> Частично<br>
            </div>
            <div style="width: 20%">
                <h4>Сортировки</h4>
                <input type="checkbox" name="exchange" id="exchange"> Обмен <br>
                <input type="checkbox" name="choice" id="choice"> Выбор<br>
                <input type="checkbox" name="insert" id="insert"> Вставка<br>
                <input type="checkbox" name="shella" id="shella"> Шелла<br>
                <input type="checkbox" name="linear" id="linear"> Линейная<br>
                <input type="checkbox" name="onePhaseMerge" id="onePhaseMerge"> Однофазная простым слиянием<br>
                <input type="checkbox" name="twoPhaseMerge" id="twoPhaseMerge"> Двухфазная простым слиянием<br>
            </div>
            <div style="width: 15%">
                Размерность<input type="number" v-model="size1"><br>
                Число шагов<input type="number" v-model="steps1">
            </div>
        </div>

        <div v-if="show1">Время, мс</div>
        <Graphics v-if="show1" :chartdata="chartData1" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show1" class="app__text">Шаги</div>
        <div class="app__form">
            <button @click="sortCompare" class="app__btn">Сравнить</button>
            <button v-if="!show1" @click="show1 = true" class="app__btn">Показать график</button>
            <button v-if="show1" @click="show1 = false" class="app__btn">Скрыть график</button>
        </div>


        <h3 class="app__label">Анализ сортировок</h3>
        <div class="app__form" style="justify-content: space-evenly; width: 100%">
            <div style="width: 30%">
                <label class="app__label" for="percent1">Задать процент упорядоченности</label>
                <br>
                <input class="app__percent" v-model="percent1" id="percent1"
                       placeholder="Введите процент..."/>%
            </div>
            <div style="width: 20%">
                <h4>Упорядоченность</h4>
                <input type="checkbox" name="analise1" id="notSort"> Неупорядоченный <br>
                <input type="checkbox" name="analise2" id="sort"> Упорядоченный<br>
                <input type="checkbox" name="analise3" id="revertSort"> По убыванию<br>
                <input type="checkbox" name="analise4" id="halfSort"> Частично<br>
            </div>
            <div style="width: 20%">
                <h4>Сортировки</h4>
                <input type="radio" name="analise" value="exchange"> Обмен <br>
                <input type="radio" name="analise" value="choice"> Выбор<br>
                <input type="radio" name="analise" value="insert"> Вставка<br>
                <input type="radio" name="analise" value="shella"> Шелла<br>
                <input type="radio" name="analise" value="linear"> Линейная<br>
                <input type="radio" name="analise" value="onePhaseMerge"> Однофазная простым слиянием<br>
                <input type="radio" name="analise" value="twoPhaseMerge"> Двухфазная простым слиянием<br>
            </div>
            <div style="width: 15%">
                Размерность<input type="number" v-model="size2"><br>
                Число шагов<input type="number" v-model="steps2">
            </div>
        </div>
        <div v-if="show2">Время, мс</div>
        <Graphics v-if="show2" :chartdata="chartData2" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show2" class="app__text">Шаги</div>
        <div class="app__form">
            <button @click="analiseCompare" class="app__btn">Сравнить</button>
            <button v-if="!show2" @click="show2 = true" class="app__btn">Показать график</button>
            <button v-if="show2" @click="show2 = false" class="app__btn">Скрыть график</button>
        </div>
    </div>
</template>

<script>
import Graphics from '../src/components/Graphics/index.vue';
import insert from './algorithms/insert.js';
import forwardChange from './algorithms/exchange.js'
import {initHalfSortedList, initRevertSortedList, initSortedList} from './algorithms';
import initNotSortedList from "../src/algorithms/index.js";
import forwardChoice from "./algorithms/choice";
import shellSort from "./algorithms/shella";
import linearSort from "./algorithms/linear";
import {SortOnePhase, SortTwoPhase} from "./algorithms/simpleMerge";

export default {
    name: 'App',

    components: {
        Graphics
    },

    data: function () {
        return {
            time: 0,
            time1: 0,
            percent: 0,
            percent1: 0,
            charLeft: [0,0,0,[]],
            charRight: [0,0,0,[]],
            quickLeftExample: [0,0,0,[]],
            quickRightExample: [0,0,0,[]],

            sizeExample: 0,
            size1: 0,
            size2:0,
            steps1: 0,
            steps2: 0,

            show1: false,
            show2: false,

            sets1: [],
            sets2: [],
            graphicLabels1: [],
            graphicLabels2: []
        }
    },

    methods: {
        sortExample1() {
            let a = initNotSortedList(7,100);
            let b = initNotSortedList(15,100);
            let result = '';
            for (let i of a) {
                result += i;
                result += ' ';
            }
            this.quickLeftExample[3].push(result + '\n');
            quickSortLeft(a, 0, a.length-1, this.quickLeftExample, true);
            quickSortRight(b, 0, b.length-1, this.quickRightExample, true);
console.log(this.quickLeftExample);

        },
        sortCompare() {
            this.graphicLabels1 = [];
            this.sets1 = [];
            let choiceSet = [];
            let exchangeSet = [];
            let insertSet = [];
            let linearSet = [];
            let shellaSet = [];
            let onePhaseMergeSet = [];
            let twoPhaseMergeSet = [];
            let list = [];
            let len = 0;
            for (let step = 1; step <= this.steps1; step++) {
                this.graphicLabels1.push(step);
                len = this.size1/this.steps1*(step);
                list = this.listForSort(len);

                if (document.getElementById('exchange').checked) {
                    exchangeSet.push(forwardChange(list));
                }
                if (document.getElementById('choice').checked) {
                    choiceSet.push(forwardChoice(list));
                }
                if (document.getElementById('insert').checked) {
                    insertSet.push(insert(list));
                }
                if (document.getElementById('shella').checked) {
                    shellaSet.push(shellSort(list));
                }
                if (document.getElementById('linear').checked) {
                    linearSet.push(linearSort(list));
                }
                if (document.getElementById('onePhaseMerge').checked) {
                    onePhaseMergeSet.push(SortOnePhase(list).time);
                }
                if (document.getElementById('twoPhaseMerge').checked) {
                    twoPhaseMergeSet.push(SortTwoPhase(list).time);
                }
                if (document.getElementById('quickLeft').checked) {
                    let time = performance.now();
                    quickSortLeft(list.slice(), 0, list.length-1, [0,0,0,[]], false);
                    time = performance.now() - time;
                    quickLeftSet.push(time);
                }
                if (document.getElementById('quickRight').checked) {
                    let time1 = performance.now();
                    quickSortRight(list.slice(), 0, list.length-1, [0,0,0,[]], false);
                    time1 = performance.now() - time1;
                    quickRightSet.push(time1);
                }
            }

            if (onePhaseMergeSet.length) {
                this.sets1.push(
                    {
                        label: 'Однофазная простым слиянием',
                        pointBackgroundColor: 'white',
                        borderColor: '#856cc7',
                        fill: 'none',
                        data: onePhaseMergeSet
                    }
                )
            }
            if (twoPhaseMergeSet.length) {
                this.sets1.push(
                    {
                        label: 'Двухфазная простым слиянием',
                        pointBackgroundColor: 'white',
                        borderColor: '#554e4e',
                        fill: 'none',
                        data: twoPhaseMergeSet
                    }
                )
            }
            if (exchangeSet.length) {
                this.sets1.push(
                    {
                        label: 'Обмен',
                        pointBackgroundColor: 'white',
                        borderColor: '#FF1703',
                        fill: 'none',
                        data: exchangeSet
                    }
                )
            }
            if (choiceSet.length) {
                this.sets1.push(
                    {
                        label: 'Выбор',
                        pointBackgroundColor: 'white',
                        borderColor: '#FF50A3',
                        fill: 'none',
                        data: choiceSet
                    }
                )
            }
            if (insertSet.length) {
                this.sets1.push(
                    {
                        label: 'Вставка',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: insertSet
                    }
                )
            }
            if (shellaSet.length) {
                this.sets1.push(
                    {
                        label: 'Шелла',
                        pointBackgroundColor: 'white',
                        borderColor: '#0000A3',
                        fill: 'none',
                        data: shellaSet
                    }
                )
            }
            if (linearSet.length) {
                this.sets1.push(
                    {
                        label: 'Линейная',
                        pointBackgroundColor: 'white',
                        borderColor: '#c6d710',
                        fill: 'none',
                        data: linearSet
                    }
                )
            }
            if (quickLeftSet.length) {
                this.sets1.push(
                    {
                        label: 'Быстрая слева',
                        pointBackgroundColor: 'white',
                        borderColor: '#080900',
                        fill: 'none',
                        data: quickLeftSet
                    }
                )
            }
            if (quickRightSet.length) {
                this.sets1.push(
                    {
                        label: 'Быстрая справа',
                        pointBackgroundColor: 'white',
                        borderColor: '#7fd46d',
                        fill: 'none',
                        data: quickRightSet
                    }
                )
            }
        },
        listForSort(length) {
            let inp = document.getElementsByName('sort');
            let massType = '';
            for (let i = 0; i < inp.length; i++) {
                if (inp[i].type === "radio" && inp[i].checked) {
                    massType = inp[i].value;
                }
            }
            switch (massType) {
                case "notSort":
                    return initNotSortedList(length, 100);
                case "sort":
                    return initSortedList(length, 100);
                case "halfSort":
                    return initHalfSortedList(length, 100, !isNaN(this.percent) ? this.percent / 100 : 0);
                case "revertSort":
                    return initRevertSortedList(length, 100);
                default:
                    return [];
            }
        },
        analiseCompare() {
            this.graphicLabels2 = [];
            this.sets2 = [];
            let notSorted = [];
            let sorted = [];
            let halfSorted = [];
            let revertSorted = [];
            let list1 = [];
            let list2 = [];
            let list3 = [];
            let list4 = [];
            let len = 0;
            let time = 0;

            let inp = document.getElementsByName('analise');
            let sortType = '';
            for (let i = 0; i < inp.length; i++) {
                if (inp[i].type === "radio" && inp[i].checked) {
                    sortType = inp[i].value;
                }
            }

            for (let step = 1; step <= this.steps2; step++) {
                this.graphicLabels2.push(step);
                len = this.size2/this.steps2*(step);

                if (document.getElementById('notSort').checked) {
                    list1 = initNotSortedList(len, 100);
                    switch (sortType) {
                        case "exchange":
                            notSorted.push(forwardChange(list1));
                            break;
                        case "choice":
                            notSorted.push(forwardChoice(list1));
                            break;
                        case "insert":
                            notSorted.push(insert(list1));
                            break;
                        case "shella":
                            notSorted.push(shellSort(list1));
                            break;
                        case "linear":
                            notSorted.push(linearSort(list1));
                            break;
                        case "onePhaseMerge":
                            notSorted.push(SortOnePhase(list1).time);
                            break;
                        case "twoPhaseMerge":
                            notSorted.push(SortTwoPhase(list1).time);
                            break;
                        case "quickLeft":
                            time = performance.now();
                            quickSortLeft(list1.slice(), 0, list1.length-1, [0,0,0,[]], false);
                            notSorted.push(performance.now() - time);
                            break;
                        case "quickRight":
                            time = performance.now();
                            quickSortRight(list1.slice(), 0, list1.length-1, [0,0,0,[]], false);
                            notSorted.push(performance.now() - time);
                            break;
                    }
                }
                if (document.getElementById('sort').checked) {
                    list2 = initSortedList(len, 100);
                    switch (sortType) {
                        case "exchange":
                            sorted.push(forwardChange(list2));
                            break;
                        case "choice":
                            sorted.push(forwardChoice(list2));
                            break;
                        case "insert":
                            sorted.push(insert(list2));
                            break;
                        case "shella":
                            sorted.push(shellSort(list2));
                            break;
                        case "linear":
                            sorted.push(linearSort(list2));
                            break;
                        case "onePhaseMerge":
                            sorted.push(SortOnePhase(list2).time);
                            break;
                        case "twoPhaseMerge":
                            sorted.push(SortTwoPhase(list2).time);
                            break;
                        case "quickLeft":
                            time = performance.now();
                            quickSortLeft(list2.slice(), 0, list2.length-1, [0,0,0,[]], false);
                            sorted.push(performance.now() - time);
                            break;
                        case "quickRight":
                            time = performance.now();
                            quickSortRight(list2.slice(), 0, list2.length-1, [0,0,0,[]], false);
                            sorted.push(performance.now() - time);
                            break;
                    }
                }
                if (document.getElementById('halfSort').checked) {
                    list3 = initHalfSortedList(len, 100, !isNaN(this.percent1) ? this.percent1 / 100 : 0);
                    switch (sortType) {
                        case "exchange":
                            halfSorted.push(forwardChange(list3));
                            break;
                        case "choice":
                            halfSorted.push(forwardChoice(list3));
                            break;
                        case "insert":
                            halfSorted.push(insert(list3));
                            break;
                        case "shella":
                            halfSorted.push(shellSort(list3));
                            break;
                        case "linear":
                            halfSorted.push(linearSort(list3));
                            break;
                        case "onePhaseMerge":
                            halfSorted.push(SortOnePhase(list3).time);
                            break;
                        case "twoPhaseMerge":
                            halfSorted.push(SortTwoPhase(list3).time);
                            break;
                        case "quickLeft":
                            time = performance.now();
                            quickSortLeft(list3.slice(), 0, list3.length-1, [0,0,0,[]], false);
                            halfSorted.push(performance.now() - time);
                            break;
                        case "quickRight":
                            time = performance.now();
                            quickSortRight(list3.slice(), 0, list3.length-1, [0,0,0,[]], false);
                            halfSorted.push(performance.now() - time);
                            break;
                    }
                }
                if (document.getElementById('revertSort').checked) {
                    list4 = initRevertSortedList(len, 100);
                    switch (sortType) {
                        case "exchange":
                            revertSorted.push(forwardChange(list4));
                            break;
                        case "choice":
                            revertSorted.push(forwardChoice(list4));
                            break;
                        case "insert":
                            revertSorted.push(insert(list4));
                            break;
                        case "shella":
                            revertSorted.push(shellSort(list4));
                            break;
                        case "linear":
                            revertSorted.push(linearSort(list4));
                            break;
                        case "onePhaseMerge":
                            revertSorted.push(SortOnePhase(list4).time);
                            break;
                        case "twoPhaseMerge":
                            revertSorted.push(SortTwoPhase(list4).time);
                            break;
                        case "quickLeft":
                            time = performance.now();
                            quickSortLeft(list4.slice(), 0, list4.length-1, [0,0,0,[]], false);
                            revertSorted.push(performance.now() - time);
                            break;
                        case "quickRight":
                            time = performance.now();
                            quickSortRight(list4.slice(), 0, list4.length-1, [0,0,0,[]], false);
                            revertSorted.push(performance.now() - time);
                            break;
                    }
                }
            }

            if (notSorted.length) {
                this.sets2.push(
                    {
                        label: 'Неупорядоченный',
                        pointBackgroundColor: 'white',
                        borderColor: '#FF1703',
                        fill: 'none',
                        data: notSorted
                    }
                )
            }
            if (sorted.length) {
                this.sets2.push(
                    {
                        label: 'Упорядоченный',
                        pointBackgroundColor: 'white',
                        borderColor: '#efab09',
                        fill: 'none',
                        data: sorted
                    }
                )
            }
            if (halfSorted.length) {
                this.sets2.push(
                    {
                        label: 'Частично',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: halfSorted
                    }
                )
            }
            if (revertSorted.length) {
                this.sets2.push(
                    {
                        label: 'По убыванию',
                        pointBackgroundColor: 'white',
                        borderColor: '#0000A3',
                        fill: 'none',
                        data: revertSorted
                    }
                )
            }
        },
        sortExample() {
            let example1 = initNotSortedList(this.sizeExample, 100);
            let example2 = example1.slice();

            this.time = performance.now();
            quickSortLeft(example1, 0, example1.length-1, this.charLeft, false);
            this.time = performance.now() - this.time;

            this.time1 = performance.now();
            quickSortRight(example2, 0, example2.length-1, this.charRight, false);
            this.time1 = performance.now() - this.time1;
            console.log(this.charRight);
        }
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false
            }
        },
        chartData1() {
            return {
                labels: this.graphicLabels1,
                datasets: this.sets1
            }
        },
        chartData2() {
            return {
                labels: this.graphicLabels2,
                datasets: this.sets2
            }
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');

#app {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #212130;
    font-style: normal;
    font-size: 14px;
    font-weight: normal;
    padding: 10px;
}

.app__label {
    position: relative;
    width: 100%;
    padding: 15px 0;
    text-align: center;
}

.app__table {
    margin-top: 20px;
}

.app__graphics {
    color: #FFFFFF;
}

.app__btn {
    background: #CE6796;
    border-radius: 6px;
    position: relative;
    min-width: 110px;
    height: 40px;
    color: #FFFFFF;
    margin: 10px;
    border: none;
    outline: none;
}

.app__btn:hover {
    -moz-box-shadow: 0 0 10px #CE6796;
    -webkit-box-shadow: 0 0 10px #CE6796;
    box-shadow: 0 0 10px #CE6796;
    cursor: pointer;
}

.app__form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
    align-items: baseline;
}

.app__percent {
    background: #29293D;
    border-radius: 6px;
    width: 70px;
    height: 70%;
    color: #FFFFFF;
    border: none;
    padding: 10px;
    margin: 12px;
}

.app__text {
    text-align: right;
}

a {
    cursor: pointer;
}

label {
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}

body {
    margin: 0;
    background: #FFFFFF;
}

.tableItem {
    display: flex;
    justify-content: center;
}

.tableItem__value {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 20%;
    min-height: 60px;
    border: 1px solid #2c3e50;
}

/* fonts */
/* roboto-regular - latin_cyrillic */
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'),
    url('/fonts/roboto-v20-latin_cyrillic-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */ url('/fonts/roboto-v20-latin_cyrillic-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* roboto-700 - latin_cyrillic */
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'),
    url('/fonts/roboto-v20-latin_cyrillic-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */ url('/fonts/roboto-v20-latin_cyrillic-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
</style>
