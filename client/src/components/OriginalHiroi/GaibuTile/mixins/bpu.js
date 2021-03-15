import GTadd from "@/assets/class/areadata/bpu/gt/addAndDeduct";
import GTdeduct from "@/assets/class/areadata/bpu/gt/addAndDeduct";
import Porch from "@/assets/class/areadata/bpu/porch";
import Deduction from "@/assets/class/areadata/bpu/deduction";
import RoofDeduct from "@/assets/class/areadata/bpu/gt/roofDeduct";
import Sash from "@/assets/class/areadata/bpu/gt/sash";

export const BpuMix = {
    data() {
        return {
            dialogGtAdd: false,
            dialogGtDeduct: false,
            dialogPorch: false,
            dialogdeduction: false,
            dialogHeight: false,
            dialogRoof: false,
            dialogSash: false,
            dialogRemove: false,
            selected: [],
            addEdit: {},
            editIndex: -1,
            pitchList: [],
            balconyMaterialChoices: ["GT", "SD", "-"],
            balconyJobschedTypes: ["Unit", "Normal"],
            quantityList: [],
            addHead: [
                { value: "", width: "10" },
                { value: "Description" },
                { value: "Area" },
                { value: "Floor" }
            ]
        };
    },
    created() {
        for (let i = 1; i <= 30; i++) {
            this.quantityList.push(i);
        }
    },
    computed: {
        addType() {
            if (this.addEdit.type) {
                return this.addEdit.type.slice(-4);
            } else {
                return 0;
            }
        },

        floorList() {
            if (
                this.addType == "Roof" ||
                this.addType == " Rec" ||
                this.addType == " Tri"
            ) {
                return ["1F-1F", "1F-2F", "2F-2F", "2F-3F", "3F-3F"];
            } else if (this.addEdit.type == "Garage H-Wall") {
                return ["Gar"];
            } else if (this.addEdit.type == "Shutter") {
                return ["Gar", "1F"];
            } else {
                return ["1F", "2F", "3F", "PH"];
            }
        }
    },

    methods: {
        getSummary() {
            if (!this.value) {
                console.log("areaData");
                this.areaData.gt.wallSummary();
            } else {
                console.log("areaDataDB");
                this.areaDataDB.gt.wallSummary();
            }
        },

        updatePitchList(item) {
            let p = item.includes("PH") ? "PH" : `${item.slice(0, 1)}F`;
            if (!this.bool) {
                for (let i = 1; i <= 3; i++) {
                    if (
                        this.areaData.standard.allpitch[p][`p${i}`].value != 0
                    ) {
                        this.pitchList.push(
                            this.areaData.standard.allpitch[p][`p${i}`].value
                        );
                    }
                }
            } else {
                for (let i = 1; i <= 3; i++) {
                    if (p !== "PH") {
                        if (
                            this.areaDataDB.standard.allpitch[p][`p${i}`]
                                .value != 0
                        ) {
                            this.pitchList.push(
                                this.areaDataDB.standard.allpitch[p][`p${i}`]
                                    .value
                            );
                        }
                    } else {
                        if (this.areaDataDB.standard.allpitch[p].value != 0) {
                            this.pitchList.push(
                                this.areaDataDB.standard.allpitch[p].value
                            );
                        }
                    }
                }
            }
        },

        //Filter Items to delete
        getDelete(val) {
            if (!this.bool) {
                this.selected = this.areaData.gt[val].filter(
                    o => o.forDelete == true
                );
            } else {
                this.selected = this.areaDataDB.gt[val].filter(
                    o => o.forDelete == true
                );
            }
        },

        ///alert to delete
        itemDelete(field) {
            this.swal
                .fire({
                    title: "Delete selected item/s?",
                    text: "Data will be deleted permanently!",
                    icon: "question",
                    showCancelButton: true
                })
                .then(choice => {
                    //if user chooses to delete
                    if (choice.value) {
                        if (!this.bool) {
                            for (let i = 0; i < this.selected.length; i++) {
                                let index = this.areaData.gt[field].indexOf(
                                    this.selected[i]
                                );
                                this.areaData.gt[field].splice(index, 1);
                            }
                        } else {
                            for (let i = 0; i < this.selected.length; i++) {
                                let index = this.areaDataDB.gt[field].indexOf(
                                    this.selected[i]
                                );
                                this.areaDataDB.gt[field].splice(index, 1);
                            }
                        }

                        this.swal
                            .fire({ title: "Deleted!", icon: "info" })
                            .then(() => {
                                this.selected = [];
                                this.getSummary();
                            });

                        ///if user chooses to dismiss delete
                    } else if (choice.dismiss) {
                        this.swal.close();
                    }
                });
        },

        ///used for both Sash and Roof Deduct
        quantity(item, type) {
            if (!this.bool) {
                this.areaData.gt.addShapeData(item, type);
            } else {
                this.areaDataDB.gt.addShapeData(item, type);
            }
        },

        ///commands for both Additional and Deduction for GT Wall
        clearDeduct() {
            if (!this.bool) {
                this.areaData.gt.clearDeduct(this.addEdit);
            } else {
                this.areaDataDB.gt.clearDeduct(this.addEdit);
            }
        },

        getPitch(item) {
            this.updatePitchList(item);
            this.comAdd();
        },

        comAdd() {
            if (!this.bool) {
                console.log(this.value);
                this.areaData.gt.computeGTadd(this.addEdit);
            } else {
                console.log(this.areaDataDB.gt);
                this.areaDataDB.gt.computeGTadd(this.addEdit);
            }
        },

        // LoadDataFromProp
        loadFromParent() {
            this.addEdit = this.value;
            this.editIndex = this.index;
        },

        //////////////////// DIALOG COMMANDS
        newDialog(text) {
            switch (text) {
                case "Porch":
                    this.addEdit = new Porch();
                    break;
                case "deduction":
                    this.addEdit = new Deduction();
                    break;
                case "GtDeduct":
                    this.addEdit = new GTdeduct();
                    break;
                case "GtAdd":
                    this.addEdit = new GTadd();
                    break;
                case "Roof":
                    this.addEdit = new RoofDeduct();
                    break;
                case "Sash":
                    this.addEdit = new Sash();
                    break;
            }

            this.openDialog(text);
            this.editIndex = -1;
        },

        openDialog(type) {
            let d = `dialog${type}`;
            this[d] = this[d] == false ? true : false;
        },

        editDialog(item, index, text) {
            this.addEdit = item;
            this.editIndex = index;

            this.openDialog(text);
        },

        saveData(area, type) {
            if (this.editIndex == -1) {
                if (!this.bool) {
                    this.areaData.gt[area].push(this.addEdit);
                } else {
                    this.areaDataDB.gt[area].push(this.addEdit);
                }
            } else {
                if (!this.bool) {
                    this.areaData.gt[area].splice(
                        this.editIndex,
                        1,
                        this.addEdit
                    );
                } else {
                    this.areaDataDB.gt[area].splice(
                        this.editIndex,
                        1,
                        this.addEdit
                    );
                }
                this.editIndex = -1;
            }

            this.close(type);
        },

        cancelDialog(type) {
            this.editIndex = -1;
            this.addEdit = {};

            this.close(type);
        },

        close(type) {
            this.$emit("closeDialog", false, type);
        },

        closeDialog(val, type) {
            let d = `dialog${type}`;
            this[d] = val;
            this.getSummary();
        }
    }
};
