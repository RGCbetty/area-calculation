<template>
  <v-container fluid>
    <v-toolbar flat color="#FAFAFA">
      <v-btn icon v-show="isLoad" @click="clear()">
        <v-icon v-text="'mdi-autorenew'" />
      </v-btn>

      <file-select v-model="file" accept=".dtx" @close="checkFloorCount" />

      <v-btn-toggle
        v-show="isLoad"
        color="primary"
        v-model="selected"
        mandatory
        group
        tile
      >
        <v-btn
          v-for="(magnification, mag_i) in magnificationNames"
          :key="mag_i"
          v-text="magnification.name"
        />
      </v-btn-toggle>

      <loading-bar v-show="isLoading" />
      <v-spacer />
      <a :href="dxf.url" v-text="dxf.label" />
    </v-toolbar>

    <output-computation
      v-show="isLoad"
      v-model="selected"
      :items="item"
      :bearingItems="bwItems"
    />

    <!-- <v-btn @click="download()">Download</v-btn>
    <file-select 
      v-model="filecsv" 
      accept=".csv"
      @close="checkFloorCount"
    />

    <bearing-wall
      :items="bwItems"
      :floorArea="floorArea"
      :floorNumber="dtx.houseStructure.floorLevelCount"
    >

    </bearing-wall> -->

    <roof-type-dialog v-model="dialog" @close="load" />
  </v-container>
</template>

<script>
import axios from "axios";
import fileSaver from "file-saver";

export default {
  data: () => ({
    magnificationNames: [{ name: "倍率S" }, { name: "倍率H" }],
    isLoading: false,
    tabs: null,
    dxf: { url: "", label: "" },
    item: {
      gravity: { url: "", label: "" },
      rigidity: { url: "", label: "" },
    },
    bwItems: [],
    floorArea: [],
    dialog: false,
    file: null,
    filecsv: null,
    selected: 0,
    isLoad: false,
  }),

  components: {
    FileSelect: () => import("../FileSelect"),
    LoadingBar: () => import("../LoadingBar"),
    RoofTypeDialog: () => import("../RoofTypeDialog"),
    OutputComputation: () => import("../OutputComputation"),
    // 'BearingWall': () => import('./BearingWall')
  },

  watch: {
    file(val) {
      if (val) this.isLoading = true;
    },

    selected(val) {
      this.downloadFile(val);
    },

    filecsv() {
      let formData = new FormData();
      formData.append("file", this.filecsv);
      axios
        .post("http://localhost/dtx/api/csvapi/loadFromUploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          let csv = res.data;
          csv.pop();
          this.floorArea = csv
            .filter((rec) => {
              return rec[1].indexOf("軸方向1/4") != -1;
            })
            .map((rec) => {
              return [rec[0], rec[1], rec[2], rec[3]];
            });
        });
    },
  },

  methods: {
    download() {
      let value = {
        values: this.bwItems,
        filename: `${this.dtx.planInfo.memo1}-${this.dtx.planInfo.memo2}_BearingWall`,
        folderName: this.dtx.planInfo.memo1,
      };

      axios.post("http://localhost/dtx/api/csvapi/saveFile", value).then(() => {
        fileSaver.saveAs(
          `http://localhost/dtx/api/download/${value.folderName}/${value.filename}.csv`,
          `${value.filename}.csv`
        );
      });
    },

    checkFloorCount(val) {
      if (val) {
        this.isLoading = false;
        this.dialog = val;
      } else {
        this.load();
      }
    },

    downloadFile(val) {
      const isSelect = () => {
        switch (val) {
          case 0:
            return "Standard";
          default:
            return "Higher";
        }
      };

      let caption = isSelect();
      let fileName = `${this.dtx.planInfo.memo1}-${this.dtx.planInfo.memo2}`;
      let filePath = `${this.dtx.planInfo.memo1}/${fileName}`;

      this.item.rigidity.url = this.dtx.downloadFile(
        `${filePath}-Rigidity_${caption}.csv`
      );
      this.item.rigidity.label = `Download: ${fileName}-Rigidity_${caption}.csv`;

      this.item.gravity.url = this.dtx.downloadFile(
        `${filePath}-Gravity_${caption}.csv`
      );
      this.item.gravity.label = `Download: ${fileName}-Gravity_${caption}.csv`;

      this.dxf.url = this.dtx.downloadFile(`${filePath}-${caption}.dxf`);
      this.dxf.label = `Download: ${fileName}-${caption}.dxf`;
    },

    clear() {
      location.reload();
    },

    load(roofTypeVal) {
      this.dialog = false;
      this.isLoading = true;

      this.dtx.bearingWall.asExtract();
      this.dtx.bearingWall.roofType = roofTypeVal;
      this.dtx.saveExtract();

      this.dtx.loadFromUploadFile(this.file).then(() => {
        let g_S = [];
        let g_H = [];
        let r_S_x = [];
        let r_S_y = [];
        let r_H_x = [];
        let r_H_y = [];
        let e_S = [];
        let e_H = [];

        this.dtx.bearingWall.gravityComputation.standard.floors.forEach(
          (rec) => {
            g_S = g_S.concat(rec.layouts);
          }
        );

        this.dtx.bearingWall.rigidityComputation.standard.x.floors.forEach(
          (rec) => {
            r_S_x = r_S_x.concat(rec.coordinateList);
          }
        );

        this.dtx.bearingWall.rigidityComputation.standard.y.floors.forEach(
          (rec) => {
            r_S_y = r_S_y.concat(rec.coordinateList);
          }
        );

        this.dtx.bearingWall.eccentricityRatio.standard.floors.forEach(
          (rec) => {
            let item = [];
            item.push(rec.x, rec.y);
            e_S = e_S.concat(item);
          }
        );

        this.dtx.bearingWall.gravityComputation.higher.floors.forEach((rec) => {
          g_H = g_H.concat(rec.layouts);
        });

        this.dtx.bearingWall.rigidityComputation.higher.x.floors.forEach(
          (rec) => {
            r_H_x = r_H_x.concat(rec.coordinateList);
          }
        );

        this.dtx.bearingWall.rigidityComputation.higher.y.floors.forEach(
          (rec) => {
            r_H_y = r_H_y.concat(rec.coordinateList);
          }
        );

        this.dtx.bearingWall.eccentricityRatio.higher.floors.forEach((rec) => {
          let item = [];
          item.push(rec.x, rec.y);
          e_H = e_H.concat(item);
        });

        this.bwList[0][0] = g_S;
        this.bwList[0][1] = r_S_x;
        this.bwList[0][2] = r_S_y;
        this.bwList[0][3] = e_S;

        this.bwList[1][0] = g_H;
        this.bwList[1][1] = r_H_x;
        this.bwList[1][2] = r_H_y;
        this.bwList[1][3] = e_H;

        this.isLoad = true;
        this.downloadFile(this.selected);
        this.isLoading = false;

        this.addBearingWall(0);
      });
    },

    addBearingWall() {
      //  coordinates, value, length, volume
      const add = (floorName, zone, coordinates, value, length, volume) => {
        let item = {
          floorName: floorName,
          zone: zone,
          coordinates: coordinates,
          value: value,
          length: length,
          volume: volume,
        };

        this.bwItems.push(item);
      };

      const coordinateNames = (coordinate, from, to) => {
        return `${coordinate.names[from]} － ${coordinate.names[to]}`;
      };

      for (
        let i = this.dtx.bearingWall.bearingwall.floors.length - 1;
        i >= 0;
        i--
      ) {
        let floor = this.dtx.bearingWall.bearingwall.floors[i];

        for (let item of floor.x.zones[2].values) {
          add(
            `${floor.x.name}軸方向${floor.floorName}`,
            `上１／４`,
            coordinateNames(
              floor.x.zones[2],
              floor.x.zones[2].names.length - 1,
              0
            ),
            item.bWValue,
            item.bWLength,
            item.wallVolume
          );
        }

        for (let item of floor.x.zones[0].values) {
          add(
            `${floor.x.name}軸方向${floor.floorName}`,
            `下１／４`,
            coordinateNames(
              floor.x.zones[0],
              floor.x.zones[0].names.length - 1,
              0
            ),
            item.bWValue,
            item.bWLength,
            item.wallVolume
          );
        }

        for (let item of floor.y.zones[0].values) {
          add(
            `${floor.y.name}軸方向${floor.floorName}`,
            `左１／４`,
            coordinateNames(
              floor.y.zones[0],
              0,
              floor.y.zones[0].names.length - 1
            ),
            item.bWValue,
            item.bWLength,
            item.wallVolume
          );
        }

        for (let item of floor.y.zones[2].values) {
          add(
            `${floor.y.name}軸方向${floor.floorName}`,
            `右１／４`,
            coordinateNames(
              floor.y.zones[2],
              0,
              floor.y.zones[2].names.length - 1
            ),
            item.bWValue,
            item.bWLength,
            item.wallVolume
          );
        }
      }
    },
  },
};
</script>