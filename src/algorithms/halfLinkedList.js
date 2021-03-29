export default function sortHalfLinkedList(list) {
    list.push('*');
    var currentElemLink = 0;                // текущий сравниваемый элемент упорядоченной части
    var link = 1;                           // ссылка добавляемого элемента
    while (list[link] !== '*') {
        let lastElemLink = link - 1;     // правый барьер упорядоченной части
        for (let i = 0; i < link; i++) {    // проходка по упорядоченной части
            while (currentElemLink !== lastElemLink) { // проходка от головы списка до нужного элемента
                currentElemLink++;
            }
            if (list[link] > list[currentElemLink]) {
                currentElemLink++;
                break;
            }
            currentElemLink = 0;
            lastElemLink--;
        }
        list.splice(currentElemLink, 0, list[link]);

        list.splice(link + 1, 1);
        link++;
    }
    return list;
}