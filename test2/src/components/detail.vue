<template>
  <div class="detail">
    <div class="detailInfo">
      {{fillText}}
    </div>
    <Input
      v-for="data in formData"
      :key="data.name"
      :data="data"
      @updateInput="handleInput"
      :ref="data.name"
    />
    <div class="detailInfo">
     {{downloadText}}
    </div>
    <Button buttonText="Continue" @handleButton="handleContinue" />
  </div>
</template>

<script>
import Button from "./button.vue";
import Input from "./input.vue";
import {lang} from "../common"
export default {
  components: {Input, Button },
  name: "d",
  data() {
    let {downloadText,fillText}=lang.details
    return {
      formData: [
        {
          label: "Name",
          name: "name",
          type: "text",
          errMsg: "Name is required!",
        },
        {
          label: "Email",
          name: "email",
          type: "text",
          errMsg: "Enter valid email!",
        },
      ],
      nameInput: "",
      nameInputErr: true,
      emailInput: "",
      emailInputErr: true,
      downloadText,
      fillText
    };
  },
  computed: {
    checkErr() {
      return !this.nameInputErr && !this.emailInputErr;
    },
  },
  methods: {
    handleContinue() {
      if (this.checkErr) {
        this.$emit("next", 1);
      } else {
        this.$refs.name[0].handleTouch();
        this.$refs.email[0].handleTouch();
      }
    },
    handleInput({ name, inputValue, error }) {
      if (name == "name") {
        this.nameInput = inputValue;
        this.nameInputErr = error;
      } else if (name == "email") {
        this.emailInput = inputValue;
        this.emailInputErr = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div[class="detail"] {
  padding: 1em 3em;
  div[class="detailInfo"] {
    color: #c0c0c0;
    padding: 0.2em 0em;
  }
}
</style>
