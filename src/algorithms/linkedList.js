export default function sortLinkedList(list) {
    list.push('*');
    var link = 1;                           // ссылка добавляемого элемента
    while (list[link] !== '*') {
        let current = link - 1;     // правый барьер упорядоченной части
        let prev = current - 1;
        for (let i = 0; i < link; i++) {    // проходка по упорядоченной части
            if (list[link] > list[current]) {
                current++;
                break;
            }
            if (current !== 0) current = prev;
            prev--;
        }
        list.splice(current, 0, list[link]);
        list.splice(link + 1, 1);
        link++;
    }
    return list;
}