
import TableItem from "../../components/TableItem/index.vue"
export default {
    name: "index",
    components: {
        TableItem
    },
    props: {
        timeInfo: {
            type: Object
        }
    },

    data() {
        return {

        }
    },

    created() {
        console.log(this.timeInfo);
    }
}