<template>
    <v-container fluid class="pa-0">
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th colspan="3" class="text-center">Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Garage</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.summary.garage }}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Balcony</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.balconytotal }}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1F</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.overAll1F }}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2F</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.overAll2F }}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3F</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.overAll3F }}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td colspan="2" class="text-center">
                            {{ nokiten.totalSummary }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
    props: {
        nokiten: Object
    }
};
</script>

<style scoped>
table {
    border: solid 1px #e8e4c9;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    table-layout: fixed;
    width: 100%;
}

thead th {
    background-color: #4caf50;
    border: solid 1px;
    border-color: #424242;
    color: white !important;
    padding: 10px;
    text-align: left;
    /* text-shadow: 1px 1px 1px #fff; */
}
tbody td {
    border: solid 1px gray;
    color: #333;
    text-shadow: 1px 1px 1px #fff;
    height: 1vh;
}
tbody th {
    border: solid 1px gray;
    background-color: #424242;
    color: white;
    /* text-shadow: 1px 1px 1px #fff; */
    height: 1vh;
}
table td {
    position: relative;
}
table td input {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    border: none;
    padding: 10px;
    box-sizing: border-box;
}
.v-select > .dropdown-menu {
    text-align: center;
}
</style>
