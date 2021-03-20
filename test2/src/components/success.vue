<template>
  <div class="success">
    <img class="imageSc" :src="success"/>
    <div class="paymentMessage">
      {{paymentText}}
    </div>
    <div class="orderMessage">
      {{orderText}}{{orderId}}
    </div>
    <div class="continueMessage">
      {{continueText}}
    </div>
  </div>
</template>

<script>
import {success} from "../common";

export default {
  name: "success",
  data(){
    return{
      paymentText:"ORDER SUCCESSFULL",
      orderText:"Order Id : ",
      orderId:"1234567895",
      continueText:"Click Here to Continue Shopping...",
      success
    }
  }
};
</script>

<style lang="scss" scoped>
div[class="success"] {
  display: flex;
  flex-direction: column;
  padding: 5.5em 3em;
  align-items: center;
  img {
    height: 5em;
  }
  div[class="paymentMessage"] {
    margin: 1em 0;
    font-size: 1.4em;
    font-weight: 700;
    color: #16a56e;
  }
  div[class="orderMessage"] {
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 700;
    color: #393d3a;
  }
  div[class="continueMessage"] {
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 700;
    color: #19afeb;
  }
}
</style>
