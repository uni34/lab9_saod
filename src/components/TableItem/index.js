export default {
    name: "index",

    props: {
        algorithmName: {
            type: String
        },

        notSortedValue: {
            type: [Number , String]
        },

        sortedValue: {
            type: [Number , String]
        },

        revertSortedValue: {
            type: [Number , String]
        },

        halfSortedValue: {
            type: [Number , String]
        }
    }

}