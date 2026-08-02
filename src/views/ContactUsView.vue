<script setup>
import { ref } from "vue";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "../assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";

const detailCard = ref([
  {
    icon: "flaticon-placeholder",
    title: "Adresse",
    text: "Centre-ville",
    text2: "Pointe-Noire",
  },
  {
    icon: "flaticon-telephone",
    title: "Téléphone",
    text: "+242 05 576 47 52",
    text2: "+242 05 576 47 52",
  },
  {
    icon: "flaticon-email-1",
    title: "Adresse email",
    text: "info@miamngo.com",
    text2: "info@miamngo.com",
  },
  {
    icon: "flaticon-clock-1",
    title: "Ouverture/Fermeture",
    text: "Lundi - Vendredi: 07:00 ",
    text2: "à 19:00",
  },
]);

const hoverActive = ref(1);
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Contactez-nous" title="Contactez-nous" />
    <section class="section-wrapper-8 content-inner-1">
      <div class="container">
        <div class="row inner-section-wrapper align-items-center">
          <div
            class="col-lg-3 col-sm-6"
            v-for="(item, ind) in detailCard"
            :key="ind"
          >
            <div
              @mouseenter="hoverActive = ind"
              :class="`icon-bx-wraper style-5 hover-aware box-hover ${
                hoverActive === ind ? 'active' : ''
              }`"
            >
              <div class="icon-bx">
                <div class="icon-cell">
                  <i :class="item.icon"></i>
                </div>
              </div>
              <div class="icon-content">
                <h5 class="title">{{ item.title }}</h5>
                <p>{{ item.text }}<br />{{ item.text2 }}</p>
                <div class="effect bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-head text-center">
          <h2 class="title">Réservation</h2>
        </div>
        <form
          class="dzForm dezPlaceAni"
          method="POST"
          action="assets/script/contact_smtp.php"
        >
          <div class="dzFormMsg"></div>
          <input
            type="hidden"
            class="form-control"
            name="dzToDo"
            value="Contact"
          />
          <div class="row">
            <div class="col-lg-6 col-md-6 m-b30 m-sm-b50">
              <label class="form-label text-primary">Votre Nom</label>
              <div class="input-group input-line input-black">
                <input
                  name="dzName"
                  required
                  type="text"
                  class="form-control"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 m-b30 m-sm-b50">
              <label class="form-label text-primary">Votre Email</label>
              <div class="input-group input-line input-black">
                <input
                  name="dzEmail"
                  required
                  type="text"
                  class="form-control"
                  placeholder="info@example.com"
                />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 m-b30 m-sm-b50">
              <label class="form-label text-primary">Votre Numéro</label>
              <div class="input-group input-line input-black">
                <input
                  name="dzPhoneNumber"
                  required
                  type="text"
                  class="form-control dz-number"
                  placeholder="9876543210"
                />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 m-b30 m-sm-b50">
              <label class="form-label text-primary">Membres</label>
              <div class="input-group input-line input-black">
                <input
                  name="dzOther[Person]"
                  required
                  type="text"
                  class="form-control"
                  placeholder="1 Person"
                />
              </div>
            </div>
            <div class="col-sm-12 m-b40">
              <label class="form-label text-primary">Votre Message</label>
              <div class="input-group input-line input-black">
                <textarea
                  name="dzMessage"
                  required
                  class="form-control"
                  placeholder="Hi, do you Have a moment to talk About !"
                ></textarea>
              </div>
            </div>
            <div class="col-sm-12 m-b20">
              <div class="input-recaptcha">
                <div
                  class="g-recaptcha"
                  data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN"
                  data-callback="verifyRecaptchaCallback"
                  data-expired-callback="expiredRecaptchaCallback"
                ></div>
                <input
                  class="form-control d-none"
                  style="display: none"
                  data-recaptcha="true"
                  required
                  data-error="Please complete the Captcha"
                />
              </div>
            </div>
            <div class="col-12 text-center">
              <button
                name="submit"
                value="submit"
                type="submit"
                class="btn btn-primary btn-hover-1"
              >
                <span>Réserver une table</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <Footer2View />
  </div>
</template>
