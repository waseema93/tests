<template>
  <button class="customButton" @click="$emit('handleButton')">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonText: String,
  },
};
</script>

<style lang="scss" scoped>
button[class="customButton"] {
  display: block;
  width: 100%;
  margin: 2.4em 0;
  text-align: center;
  border: 1px solid transparent;
  padding: 1em;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 0.25em;
  color: #404040;
  background-color: #2af8c8;
  border-color: #2df7c8;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
}
</style>
