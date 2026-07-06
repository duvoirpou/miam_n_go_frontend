<template>
  <form
    ref="form"
    class="dzSubscribe"
    action="assets/script/mailchamp.php"
    method="post"
    @submit.prevent="sendEmail"
  >
    <div class="dzSubscribeMsg text-white"></div>
    <div class="input-group">
      <input
        name="dzEmail"
        required="required"
        type="email"
        class="form-control"
        id="subscription"
        placeholder="Enter Your Email"
      />
      <div class="input-group-addon">
        <button
          name="submit"
          value="submit"
          type="submit"
          @click="submitHandler"
          class="btn btn-primary btn-hover-2"
        >
          <span>{{ title }}</span
          ><i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import emailjs from "@emailjs/browser";

export default {
  methods: {
    sendEmail() {
      emailjs
        .sendForm(
          "emailId",
          "template_0byuv32",
          this.$refs.form,
          "qUDIPykc776NYHv4m"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
            let succesMgs = document.querySelector(".dzSubscribeMsg");
            succesMgs.innerHTML = `
            <div class="gen alert alert-success">
                You have successfully subscribed.
            </div>
            `;
            setTimeout(() => {
              succesMgs.innerHTML = "";
            }, 3000);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
    submitHandler() {
      let input = document.querySelector("#subscription").value;
      let succesMgs = document.querySelector(".dzSubscribeMsg");
      if (input == "") {
        succesMgs.innerHTML = `
            <div class="gen alert alert-danger">
                Please enter valid email address.
            </div>
            `;
        setTimeout(() => {
          succesMgs.innerHTML = "";
        }, 3000);
      }
    },
  },
};
</script>

<script setup>
defineProps({
  title: String,
});
</script>
