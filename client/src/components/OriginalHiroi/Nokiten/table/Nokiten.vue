<template>
    <table-component
        post-title="Nokiten"
        :nokiten="nokiten"
        :index="index"
        :standard="standard"
        :value="value"
        keep-alive
    ></table-component>
</template>
<script>
// import AreaData from '../../../assets/class/areadata'
export default {
    props: {
        index: Number,
        nokiten: Object,
        value: Boolean,
        standard: Object
    },

    components: {
        TableComponent: () => import("./MainTable")
    },

    created() {},

    data: () => ({
        // temp : new AreaData,
    }),
    methods: {}
};
</script>
<style scoped></style>
