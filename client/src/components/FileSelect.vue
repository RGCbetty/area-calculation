<template>
  <div>
    <label class="file-select">
      <div class="select-button">
        <span v-if="value" v-text="`Selected File: ${value.name}`" />
        <span v-else v-text="'Select File'" />
      </div>
      <input type="file" @change="handleFileChange" :accept="accept" />
    </label>
  </div>
</template>

<script>
import DTXClient from "@/assets/dtx-client";

export default {
  props: {
    value: File,
    accept: String,
  },

  methods: {
    handleFileChange(e) {
      if (this.accept == ".dtx") {
        let dtx = new DTXClient(false);
        dtx.loadFromUploadFile(e.target.files[0]).then(() => {
          this.$emit("close", !(dtx.houseStructure.floorLevelCount == 1));
        });
      }

      this.$emit("input", e.target.files[0]);
    },
  },
};
</script>

<style scoped>
.file-select > .select-button {
  padding: 13px;

  color: #ffffff;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>