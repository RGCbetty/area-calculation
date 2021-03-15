<template>
  <div>
    <!-- <v-card outlined>
        <v-card-title class="display-1 font-weight-thin">
            Plans
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
                hide-details
                dense
                v-model="controlNumber"
                label="Control Number"
                return-masked-value
                mask="#######-####"
                outlined
                append-icon="mdi-magnify"
                single-line
                color="success"
                @keyup.enter="getPlanInfo(controlNumber)"
            />
        </v-card-title>
        <v-card-text outlined> -->
    <v-data-table
      :headers="headers"
      :items="items"
      fixed-header
      :items-per-page="10"
      sort-by="created_date"
      :search="controlNumber"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            class="display-1 font-weight-thin"
            v-text="'Plans'"
          />
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-text-field
            hide-details
            dense
            v-model="controlNumber"
            label="Control Number"
            return-masked-value
            mask="#######-####"
            outlined
            append-icon="mdi-magnify"
            single-line
            color="success"
            @keyup.enter="getPlanInfo(controlNumber)"
          />
        </v-toolbar>

        <v-divider></v-divider>
      </template>

      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="viewModal(item)">mdi-eye</v-icon> -->
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <!-- </v-card-text> -->
    <computed-dialog
      v-model="dialog"
      :selected="selected"
      :doc_id="doc_list"
      :selectedIndex="editedIndex"
      @close="close"
    ></computed-dialog>
  </div>
  <!-- </v-card> -->
</template>

<script>
import DBClient from "../../assets/class/db";
import AreaCalculationDB from "../../assets/class/db/areacalculation";
import moment from "moment";

export default {
  components: {
    ComputedDialog: () => import("./Computed"),
  },
  data() {
    return {
      db: new DBClient(),
      areaCalcDB: new AreaCalculationDB(),
      items: [],
      doc_list: [],
      selected: {},
      dialog: false,
      controlNumber: "",
      editedIndex: -1,
      headers: [
        {
          text: "Plan Code",
          width: "100px",
          fixed: true,
          value: "plan_code",
        },
        {
          text: "Plan No.",
          width: "100px",
          fixed: true,
          value: "plan_no",
        },
        // {
        //     text: "Encoder",
        //     width: "100px",
        //     fixed: true,
        //     value: "employee_name"
        // },
        {
          text: "Employee Code",
          width: "100px",
          fixed: true,
          value: "employee_code",
        },
        {
          text: "Created Date",
          width: "100px",
          fixed: true,
          value: "created_date",
        },
        {
          text: "Updated Date",
          width: "100px",
          fixed: true,
          value: "updated_date",
        },
        {
          text: "Checked Date",
          width: "100px",
          fixed: true,
          value: "checked_date",
        },
        {
          text: "Actions",
          width: "100px",
          fixed: true,
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  created() {
    // AreaCalculationDB.getDataEmployee("38610").then((res) => {
    //     console.debug(res);
    //     // this.items = res.data[0].items
    // });
  },

  computed: {},
  methods: {
    async getPlanInfo(controlNumber) {
      this.doc_list = [];
      this.items = [];
      let res = await this.areaCalcDB.getPlanInfo(controlNumber);
      res.data.map((item) => {
        this.doc_list.push(item.doc_id);
        this.items.push(item.doc_value);
      });

      // this.items = res.data;
    },
    async editItem(item) {
      let index = this.items.indexOf(item);

      this.selected = item;
      this.dialog = true;
      this.editedIndex = this.items.indexOf(item);
      item.checked_date = moment().format("YYYY-MM-DD HH:mm:ss");
      await this.areaCalcDB.checkDate({
        payload: item,
        doc_id: this.doc_list[index],
      });
      this.doc_list[index];
    },
    async deleteItem(item) {
      let index = this.items.indexOf(item);
      this.swal
        .fire({
          title: "Delete selected item/s?",
          text: "Data will be deleted permanently!",
          icon: "question",
          showCancelButton: true,
        })
        .then((choice) => {
          //if user chooses to delete
          if (choice.value) {
            this.swal
              .fire({ title: "Deleted!", icon: "info" })
              .then(async () => {
                await this.areaCalcDB.deleteDoc({
                  doc_id: this.doc_list[index],
                });
                this.getPlanInfo(this.controlNumber);
                // this.selected = [];
                // this.getSummary();
              });

            ///if user chooses to dismiss delete
          } else if (choice.dismiss) {
            this.swal.close();
          }
        });
      // await this.areaCalcDB.deleteDoc({
      //   doc_id: this.doc_list[index],
      // });
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white !important;
}
.my-data-table {
  display: flex;
  flex-direction: column;
}

.my-data-table .v-datatable.v-table {
  order: -1;
}
</style>
