<template>
    <div id="app">

        <div class="app__form">
            <label class="app__label" for="percent">Задать процент упорядоченности</label>
            <br>
            <input class="app__percent" @input="showPercent = false" v-model="percent" id="percent" placeholder="Введите процент..."/>%
            <button @click="showPercent = true" class="app__btn">Задать процент</button>

        </div>
        <div v-if="showPercent" class="app__label">
          <p v-if="!isNaN(percent)">Процент {{percent}} задан!</p>
          <p v-else> Ошибка! Неверный тип данных </p>
        </div>

        <h3 class="app__label">Графики сравнения временных характеристик</h3>
        <div class="app__label">Неупорядоченная последовательность</div>
        <div v-if="show1">Время, мс</div>
        <Graphics v-if="show1" :chartdata="chartData1" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show1" class="app__text">Размерность СД</div>
        <div class="app__form">
            <button @click="notSortedGraphic" class="app__btn">Задать график</button>
            <button v-if="!show1" @click="show1 = true" class="app__btn">Показать график</button>
            <button v-if="show1" @click="show1 = false" class="app__btn">Скрыть график</button>
        </div>


        <div class="app__label">Упорядоченная последовательность</div>
        <div v-if="show2">Время, мс</div>
        <Graphics v-if="show2" :chartdata="chartData2" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show2" class="app__text">Размерность СД</div>
        <div class="app__form">
            <button @click="sortedGraphic" class="app__btn">Задать график</button>
            <button v-if="!show2" @click="show2 = true" class="app__btn">Показать график</button>
            <button v-if="show2" @click="show2 = false" class="app__btn">Скрыть график</button>
        </div>


        <div class="app__label">Обратно упорядоченная последовательность</div>
        <div v-if="show3">Время, мс</div>
        <Graphics v-if="show3" :chartdata="chartData3" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show3" class="app__text">Размерность СД</div>
        <div class="app__form">
            <button @click="revertSortedGraphic" class="app__btn">Задать график</button>
            <button v-if="!show3" @click="show3 = true" class="app__btn">Показать график</button>
            <button v-if="show3" @click="show3 = false" class="app__btn">Скрыть график</button>
        </div>


        <div class="app__label">Частично упорядоченная последовательность</div>
        <div v-if="show4">Время, мс</div>
        <Graphics v-if="show4" :chartdata="chartData4" :options="chartOptions" class="app__graphics"></Graphics>
        <div v-if="show4" class="app__text">Размерность СД</div>
        <div class="app__form">
            <button @click="halfSortedGraphic" class="app__btn">Задать график</button>
            <button v-if="!show4" @click="show4 = true" class="app__btn">Показать график</button>
            <button v-if="show4" @click="show4 = false" class="app__btn">Скрыть график</button>
        </div>

        <div class="table">
            <h3 class="app__label">Таблица сравнения временных характеристик</h3>
            <TableItem
                class="table__row"
                algorithmName=""
                notSortedValue="Неупорядоченная последовательность"
                sortedValue="Упорядоченная последовательность"
                revertSortedValue="Упорядоченная в обратном порядке последовательность"
                halfSortedValue="Частично упорядоченная последовательность"
            >
            </TableItem>
            <TableItem v-for="(item, index) in tableInfo"
                       class="table__row"
                       :key="index"
                       :algorithmName="item.name"
                       :notSortedValue="item.notSortedValue"
                       :sortedValue="item.sortedValue"
                       :halfSortedValue="item.halfSortedValue"
                       :revertSortedValue="item.revertSortedValue"
    
            >
            </TableItem>
        </div>
            <div class="app__form">
                <button @click="setTableInfo" class="app__btn">Показать результаты</button>
            </div>


     </div>
</template>

<script>
import Graphics from '../src/components/Graphics/index.vue';
import TableItem from '../src/components/TableItem/index.vue'
import sortArray from '../src/algorithms/array.js';
import sortHalfLinkedList from '../src/algorithms/halfLinkedList.js';
import sortLinkedList from '../src/algorithms/linkedList.js';
import {initHalfSortedList, initRevertSortedList, initSortedList} from '../src/algorithms/index.js';
import initNotSortedList from "../src/algorithms/index.js";

export default {
    name: 'App',

    components: {
        Graphics,
        TableItem
    },

    data: function () {
        return {
            percent: 0,
            showPercent: false,
            show1: false,
            show2: false,
            show3: false,
            show4: false,

            tableInfo: {
                array: {
                    name: "Алгортм сортировки массива методом прямого включения",
                    notSortedValue: 0,
                    sortedValue: 0,
                    halfSortedValue: 0,
                    revertSortedValue: 0
                },
                halfLinkedList: {
                    name: "Алгортм сортировки односвязного списка методом прямого включения",
                    notSortedValue: 0,
                    sortedValue: 0,
                    halfSortedValue: 0,
                    revertSortedValue: 0
                },
                linkedList: {
                    name: "Алгортм сортировки двусвязного списка методом прямого включения",
                    notSortedValue: 0,
                    sortedValue: 0,
                    halfSortedValue: 0,
                    revertSortedValue: 0
                }
            },
            graphicsInfo: {
                notSorted: {
                    array: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    halfLinkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    linkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    }
                },
                sorted: {
                    array: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    halfLinkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    linkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    }
                },
                revertSorted: {
                    array: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    halfLinkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    linkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    }
                },
                halfSorted: {
                    array: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    halfLinkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    },
                    linkedList: {
                        first: 0,
                        second: 0,
                        third: 0
                    }
                }
            },
          }
    },

    methods: {
        notSortedGraphic() {
            let d = this.notSorted500.slice();
            this.graphicsInfo.notSorted.array.third = performance.now();
            sortArray(d);
            this.graphicsInfo.notSorted.array.third = performance.now() - this.graphicsInfo.notSorted.array.third;

            let a1 = this.notSorted100.slice();
            this.graphicsInfo.notSorted.array.first = performance.now();
            sortArray(a1);
            this.graphicsInfo.notSorted.array.first = performance.now() - this.graphicsInfo.notSorted.array.first;

            let c = this.notSorted200.slice();
            this.graphicsInfo.notSorted.array.second = performance.now();
            sortArray(c);
            this.graphicsInfo.notSorted.array.second = performance.now() - this.graphicsInfo.notSorted.array.second;

            let b = this.notSorted100.slice();
            this.graphicsInfo.notSorted.halfLinkedList.first = performance.now();
            sortHalfLinkedList(b);
            this.graphicsInfo.notSorted.halfLinkedList.first = performance.now() - this.graphicsInfo.notSorted.halfLinkedList.first;

            let f = this.notSorted200.slice();
            this.graphicsInfo.notSorted.halfLinkedList.second = performance.now();
            sortHalfLinkedList(f);
            this.graphicsInfo.notSorted.halfLinkedList.second = performance.now() - this.graphicsInfo.notSorted.halfLinkedList.second;

            let x = this.notSorted500.slice();
            this.graphicsInfo.notSorted.halfLinkedList.third = performance.now();
            sortHalfLinkedList(x);
            this.graphicsInfo.notSorted.halfLinkedList.third = performance.now() - this.graphicsInfo.notSorted.halfLinkedList.third;

            let a = this.notSorted100.slice();
            this.graphicsInfo.notSorted.linkedList.first = performance.now();
            sortLinkedList(a);
            this.graphicsInfo.notSorted.linkedList.first = performance.now() - this.graphicsInfo.notSorted.linkedList.first;

            let aa = this.notSorted200.slice();
            this.graphicsInfo.notSorted.linkedList.second = performance.now();
            sortLinkedList(aa);
            this.graphicsInfo.notSorted.linkedList.second = performance.now() - this.graphicsInfo.notSorted.linkedList.second;

            let s = this.notSorted500.slice();
            this.graphicsInfo.notSorted.linkedList.third = performance.now();
            sortLinkedList(s);
            this.graphicsInfo.notSorted.linkedList.third = performance.now() - this.graphicsInfo.notSorted.linkedList.third;
        },
        sortedGraphic() {
            let c = this.sorted5000.slice();
            this.graphicsInfo.sorted.array.third = performance.now();
            sortArray(c);
            this.graphicsInfo.sorted.array.third = performance.now() - this.graphicsInfo.sorted.array.third;

            let a = this.sorted1000.slice();
            this.graphicsInfo.sorted.array.first = performance.now();
            sortArray(a);
            this.graphicsInfo.sorted.array.first = performance.now() - this.graphicsInfo.sorted.array.first;

            let b = this.sorted2000.slice();
            this.graphicsInfo.sorted.array.second = performance.now();
            sortArray(b);
            this.graphicsInfo.sorted.array.second = performance.now() - this.graphicsInfo.sorted.array.second;

            let a1 = this.sorted1000.slice();
            this.graphicsInfo.sorted.halfLinkedList.first = performance.now();
            sortHalfLinkedList(a1);
            this.graphicsInfo.sorted.halfLinkedList.first = performance.now() - this.graphicsInfo.sorted.halfLinkedList.first;

            let b1 = this.sorted2000.slice();
            this.graphicsInfo.sorted.halfLinkedList.second = performance.now();
            sortHalfLinkedList(b1);
            this.graphicsInfo.sorted.halfLinkedList.second = performance.now() - this.graphicsInfo.sorted.halfLinkedList.second;

            let c1 = this.sorted5000.slice();
            this.graphicsInfo.sorted.halfLinkedList.third = performance.now();
            sortHalfLinkedList(c1);
            this.graphicsInfo.sorted.halfLinkedList.third = performance.now() - this.graphicsInfo.sorted.halfLinkedList.third;

            let a2 = this.sorted1000.slice();
            this.graphicsInfo.sorted.linkedList.first = performance.now();
            sortLinkedList(a2);
            this.graphicsInfo.sorted.linkedList.first = performance.now() - this.graphicsInfo.sorted.linkedList.first;

            let c2 = this.sorted5000.slice();
            this.graphicsInfo.sorted.linkedList.third = performance.now();
            sortLinkedList(c2);
            this.graphicsInfo.sorted.linkedList.third = performance.now() - this.graphicsInfo.sorted.linkedList.third;

            let b2 = this.sorted2000.slice();
            this.graphicsInfo.sorted.linkedList.second = performance.now();
            sortLinkedList(b2);
            this.graphicsInfo.sorted.linkedList.second = performance.now() - this.graphicsInfo.sorted.linkedList.second;

        },
        revertSortedGraphic() {
            let a = this.revertSorted200.slice();
            this.graphicsInfo.revertSorted.array.first = performance.now();
            sortArray(a);
            this.graphicsInfo.revertSorted.array.first = performance.now() - this.graphicsInfo.revertSorted.array.first;

            let b = this.revertSorted400.slice();
            this.graphicsInfo.revertSorted.array.second = performance.now();
            sortArray(b);
            this.graphicsInfo.revertSorted.array.second = performance.now() - this.graphicsInfo.revertSorted.array.second;

            let c = this.revertSorted600.slice();
            this.graphicsInfo.revertSorted.array.third = performance.now();
            sortArray(c);
            this.graphicsInfo.revertSorted.array.third = performance.now() - this.graphicsInfo.revertSorted.array.third;

            let a1 = this.revertSorted200.slice();
            this.graphicsInfo.revertSorted.halfLinkedList.first = performance.now();
            sortHalfLinkedList(a1);
            this.graphicsInfo.revertSorted.halfLinkedList.first = performance.now() - this.graphicsInfo.revertSorted.halfLinkedList.first;

            let b1 = this.revertSorted400.slice();
            this.graphicsInfo.revertSorted.halfLinkedList.second = performance.now();
            sortHalfLinkedList(b1);
            this.graphicsInfo.revertSorted.halfLinkedList.second = performance.now() - this.graphicsInfo.revertSorted.halfLinkedList.second;

            let c1 = this.revertSorted600.slice();
            this.graphicsInfo.revertSorted.halfLinkedList.third = performance.now();
            sortHalfLinkedList(c1);
            this.graphicsInfo.revertSorted.halfLinkedList.third = performance.now() - this.graphicsInfo.revertSorted.halfLinkedList.third;

            let a2 = this.revertSorted200.slice();
            this.graphicsInfo.revertSorted.linkedList.first = performance.now();
            sortLinkedList(a2);
            this.graphicsInfo.revertSorted.linkedList.first = performance.now() - this.graphicsInfo.revertSorted.linkedList.first;

            let b2 = this.revertSorted400.slice();
            this.graphicsInfo.revertSorted.linkedList.second = performance.now();
            sortLinkedList(b2);
            this.graphicsInfo.revertSorted.linkedList.second = performance.now() - this.graphicsInfo.revertSorted.linkedList.second;

            let c2 = this.revertSorted600.slice();
            this.graphicsInfo.revertSorted.linkedList.third = performance.now();
            sortLinkedList(c2);
            this.graphicsInfo.revertSorted.linkedList.third = performance.now() - this.graphicsInfo.revertSorted.linkedList.third;
        },
        halfSortedGraphic() {
            let c = this.halfSorted600.slice();
            this.graphicsInfo.halfSorted.array.third = performance.now();
            sortArray(c);
            this.graphicsInfo.halfSorted.array.third = performance.now() - this.graphicsInfo.halfSorted.array.third;

            let b = this.halfSorted400.slice();
            this.graphicsInfo.halfSorted.array.second = performance.now();
            sortArray(b);
            this.graphicsInfo.halfSorted.array.second = performance.now() - this.graphicsInfo.halfSorted.array.second;

            let a = this.halfSorted200.slice();
            this.graphicsInfo.halfSorted.array.first = performance.now();
            sortArray(a);
            this.graphicsInfo.halfSorted.array.first = performance.now() - this.graphicsInfo.halfSorted.array.first;

            let a1 = this.halfSorted200.slice();
            this.graphicsInfo.halfSorted.halfLinkedList.first = performance.now();
            sortHalfLinkedList(a1);
            this.graphicsInfo.halfSorted.halfLinkedList.first = performance.now() - this.graphicsInfo.halfSorted.halfLinkedList.first;

            let b1 = this.halfSorted400.slice();
            this.graphicsInfo.halfSorted.halfLinkedList.second = performance.now();
            sortHalfLinkedList(b1);
            this.graphicsInfo.halfSorted.halfLinkedList.second = performance.now() - this.graphicsInfo.halfSorted.halfLinkedList.second;

            let c1 = this.halfSorted600.slice();
            this.graphicsInfo.halfSorted.halfLinkedList.third = performance.now();
            sortHalfLinkedList(c1);
            this.graphicsInfo.halfSorted.halfLinkedList.third = performance.now() - this.graphicsInfo.halfSorted.halfLinkedList.third;

            let c2 = this.halfSorted600.slice();
            this.graphicsInfo.halfSorted.linkedList.third = performance.now();
            sortLinkedList(c2);
            this.graphicsInfo.halfSorted.linkedList.third = performance.now() - this.graphicsInfo.halfSorted.linkedList.third;

            let b2 = this.halfSorted400.slice();
            this.graphicsInfo.halfSorted.linkedList.second = performance.now();
            sortLinkedList(b2);
            this.graphicsInfo.halfSorted.linkedList.second = performance.now() - this.graphicsInfo.halfSorted.linkedList.second;

            let a2 = this.halfSorted200.slice();
            this.graphicsInfo.halfSorted.linkedList.first = performance.now();
            sortLinkedList(a2);
            this.graphicsInfo.halfSorted.linkedList.first = performance.now() - this.graphicsInfo.halfSorted.linkedList.first;
        },
        setTableInfo() {
            let a = initNotSortedList(1100, 100);
            let b = initSortedList(1100, 100);
            let c = initHalfSortedList(1100, 100, !isNaN(this.percent) ? this.percent/100 : 0);
            let d = initRevertSortedList(1100, 100);

            this.tableInfo.array.notSortedValue = performance.now();
            sortArray(a.slice());
            this.tableInfo.array.notSortedValue = performance.now() - this.tableInfo.array.notSortedValue;

            this.tableInfo.array.sortedValue = performance.now();
            sortArray(b.slice());
            this.tableInfo.array.sortedValue = performance.now() - this.tableInfo.array.sortedValue;

            this.tableInfo.array.halfSortedValue = performance.now();
            sortArray(c.slice());
            this.tableInfo.array.halfSortedValue = performance.now() - this.tableInfo.array.halfSortedValue;

            this.tableInfo.array.revertSortedValue = performance.now();
            sortArray(d.slice());
            this.tableInfo.array.revertSortedValue = performance.now() - this.tableInfo.array.revertSortedValue;

            this.tableInfo.halfLinkedList.notSortedValue = performance.now();
            sortHalfLinkedList(a.slice());
            this.tableInfo.halfLinkedList.notSortedValue = performance.now() - this.tableInfo.halfLinkedList.notSortedValue;

            this.tableInfo.halfLinkedList.sortedValue = performance.now();
            sortHalfLinkedList(b.slice());
            this.tableInfo.halfLinkedList.sortedValue = performance.now() - this.tableInfo.halfLinkedList.sortedValue;

            this.tableInfo.halfLinkedList.halfSortedValue = performance.now();
            sortHalfLinkedList(c.slice());
            this.tableInfo.halfLinkedList.halfSortedValue = performance.now() - this.tableInfo.halfLinkedList.halfSortedValue;

            this.tableInfo.halfLinkedList.revertSortedValue = performance.now();
            sortHalfLinkedList(d.slice());
            this.tableInfo.halfLinkedList.revertSortedValue = performance.now() - this.tableInfo.halfLinkedList.revertSortedValue;


            this.tableInfo.linkedList.notSortedValue = performance.now();
            sortLinkedList(a.slice());
            this.tableInfo.linkedList.notSortedValue = performance.now() - this.tableInfo.linkedList.notSortedValue;

            this.tableInfo.linkedList.sortedValue = performance.now();
            sortLinkedList(b.slice());
            this.tableInfo.linkedList.sortedValue = performance.now() - this.tableInfo.linkedList.sortedValue;

            this.tableInfo.linkedList.halfSortedValue = performance.now();
            sortLinkedList(c.slice());
            this.tableInfo.linkedList.halfSortedValue = performance.now() - this.tableInfo.linkedList.halfSortedValue;

            this.tableInfo.linkedList.revertSortedValue = performance.now();
            sortLinkedList(d.slice());
            this.tableInfo.linkedList.revertSortedValue = performance.now() - this.tableInfo.linkedList.revertSortedValue;
        }
    },
    
    computed: {
        notSorted100() {
            return initNotSortedList(200, 100);
        },
        notSorted200() {
            return initNotSortedList(1000, 100);
        },
        notSorted500() {
            return initNotSortedList(2000, 100);
        },
        sorted1000() {
            return initSortedList(200, 100);
        },
        sorted2000() {
            return initSortedList(1000, 100);
        },
        sorted5000() {
            return initSortedList(1500, 100);
        },
        halfSorted200() {
            return initHalfSortedList(200, 100, !isNaN(this.percent) ? this.percent/100 : 0);
        },
        halfSorted400() {
            return initHalfSortedList(1000, 100, !isNaN(this.percent) ? this.percent/100 : 0);
        },
        halfSorted600() {
            return initHalfSortedList(1500, 100, !isNaN(this.percent) ? this.percent/100 : 0);
        },
        revertSorted200() {
            return initRevertSortedList(300, 100);
        },
        revertSorted400() {
            return initRevertSortedList(1000, 100);
        },
        revertSorted600() {
            return initRevertSortedList(2000, 100);
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false
            }
        },
        chartData1() {
            return {
                labels: ['0', '200','1000','1500'],
                datasets: [
                    {
                        label: 'Сортировка массива методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: [0, this.graphicsInfo.notSorted.array.first,this.graphicsInfo.notSorted.array.second,this.graphicsInfo.notSorted.array.third]
                    },
                    {
                        label: 'Сортировка односвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: 'yellow',
                        fill: 'none',
                        data: [0, this.graphicsInfo.notSorted.halfLinkedList.first,this.graphicsInfo.notSorted.halfLinkedList.second,this.graphicsInfo.notSorted.halfLinkedList.third]
                    },
                    {
                        label: 'Сортировка двусвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#CE6796',
                        fill: 'none',
                        data: [0, this.graphicsInfo.notSorted.linkedList.first,this.graphicsInfo.notSorted.linkedList.second,this.graphicsInfo.notSorted.linkedList.third]
                    }
                ]
            }
        },
        chartData2() {
            return {
                labels: ['0', '200','1000','1500'],
                datasets: [
                    {
                        label: 'Сортировка массива методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: [0, this.graphicsInfo.sorted.array.first,this.graphicsInfo.sorted.array.second,this.graphicsInfo.sorted.array.third]
                    },
                    {
                        label: 'Сортировка односвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: 'yellow',
                        fill: 'none',
                        data: [0, this.graphicsInfo.sorted.halfLinkedList.first,this.graphicsInfo.sorted.halfLinkedList.second,this.graphicsInfo.sorted.halfLinkedList.third]
                    },
                    {
                        label: 'Сортировка двусвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#CE6796',
                        fill: 'none',
                        data: [0, this.graphicsInfo.sorted.linkedList.first,this.graphicsInfo.sorted.linkedList.second,this.graphicsInfo.sorted.linkedList.third]
                    }
                ]
            }
        },
        chartData3() {
            return {
                labels: ['0', '200','1000','1500'],
                datasets: [
                    {
                        label: 'Сортировка массива методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: [0, this.graphicsInfo.revertSorted.array.first,this.graphicsInfo.revertSorted.array.second,this.graphicsInfo.revertSorted.array.third]
                    },
                    {
                        label: 'Сортировка односвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: 'yellow',
                        fill: 'none',
                        data: [0, this.graphicsInfo.revertSorted.halfLinkedList.first,this.graphicsInfo.revertSorted.halfLinkedList.second,this.graphicsInfo.revertSorted.halfLinkedList.third]
    
                    },
                    {
                        label: 'Сортировка двусвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#CE6796',
                        fill: 'none',
                        data: [0, this.graphicsInfo.revertSorted.linkedList.first,this.graphicsInfo.revertSorted.linkedList.second,this.graphicsInfo.revertSorted.linkedList.third]
                    }
                ]
            }
        },
        chartData4() {
            return {
                labels: ['0', '200','1000','1500'],
                datasets: [
                    {
                        label: 'Сортировка массива методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#006703',
                        fill: 'none',
                        data: [0, this.graphicsInfo.halfSorted.array.first,this.graphicsInfo.halfSorted.array.second,this.graphicsInfo.halfSorted.array.third]
                    },
                    {
                        label: 'Сортировка односвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: 'yellow',
                        fill: 'none',
                        data: [0, this.graphicsInfo.halfSorted.halfLinkedList.first,this.graphicsInfo.halfSorted.halfLinkedList.second,this.graphicsInfo.halfSorted.halfLinkedList.third]
    
                    },
                    {
                        label: 'Сортировка двусвязного списка методом прямого включения',
                        pointBackgroundColor: 'white',
                        borderColor: '#CE6796',
                        fill: 'none',
                        data: [0, this.graphicsInfo.halfSorted.linkedList.first,this.graphicsInfo.halfSorted.linkedList.second,this.graphicsInfo.halfSorted.linkedList.third]
                    }
                ]
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

.app__btn{
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
.app__btn:hover{
    -moz-box-shadow:0 0 10px #CE6796;
    -webkit-box-shadow:0 0 10px #CE6796;
    box-shadow:0 0 10px #CE6796;
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
a{
    cursor: pointer;
}
label{
    cursor: pointer;
}
a:hover{
    text-decoration: underline;
}
body {
    margin: 0;
    background: #FFFFFF;
}
/* fonts */
/* roboto-regular - latin_cyrillic */
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'),
    url('/fonts/roboto-v20-latin_cyrillic-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
    url('/fonts/roboto-v20-latin_cyrillic-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700 - latin_cyrillic */
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'),
    url('/fonts/roboto-v20-latin_cyrillic-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
    url('/fonts/roboto-v20-latin_cyrillic-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
</style>
