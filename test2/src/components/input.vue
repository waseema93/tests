<template>
  <div class="customInput" :id="data.name">
    <label class="customInputLabel" :for="data.name">{{ data.label }} </label>
    <input
      :class="{
        inputField: !$v.inputValue.$error,
        'inputField inputError': $v.inputValue.$error,
      }"
      :id="data.name"
      :type="data.type"
      @input="handleInput($event.target.value)"
      @blur="handleBlur($event.target.value)"
      v-model.trim="inputValue"
    />
    <p class="errMsg" v-if="$v.inputValue.$error">{{ data.errMsg }}</p>
  </div>
</template>

<script>
import { required, email, minLength, numeric } from "../common";
export default {
  name: "CustomInput",
  data() {
    return {
      inputValue: "",
    };
  },
  props: ["data"],
  validations() {
    if (this.data.name == "email") {
      return {
        inputValue: {
          required,
          email,
        },
      };
    } else if (this.data.name == "cardNumber") {
      return {
        inputValue: {
          minLength: minLength(16),
          numeric,
          required,
        },
      };
    } else {
      return {
        inputValue: {
          required,
        },
      };
    }
  },
  methods: {
    handleInput(event) {
      this.$emit("updateInput", {
        inputValue: event,
        error: this.$v.$error,
        name: this.data.name,
      });
    },
    handleBlur(event) {
      this.$v.$touch();
      this.$emit("updateInput", {
        inputValue: event,
        error: this.$v.$error,
        name: this.data.name,
      });
    },
    handleTouch() {
      this.$v.$touch();
    },
  },
};
</script>

<style lang="scss" scoped>
div[class="customInput"] {
  display: flex;
  flex-direction: column;
  // font-family: $primaryFontFamily;
  padding: 1.2em 0em;
  label[class="customInputLabel"] {
    font-weight: 500;
    font-size: 1.2em;
    color: #909090;
  }
  .inputField {
    margin: 1em 0 0.5em 0;
    padding: 0.8em 0.6em;
    font-size: 1em;
    line-height: 1.5;
    border: 1px solid transparent;
    color: #495057;
    background-color: #f5f5f5;
    border-radius: 0.25rem;
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .inputError {
    border-color: #d9534f;
  }
  p[class="errMsg"] {
    font-size: 0.9em;
    color: #d9534f;
    align-self: flex-start;
  }
}
</style>
