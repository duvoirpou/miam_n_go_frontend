<script setup>
import { RouterLink } from "vue-router";
import Footer2Subscrption from "./Footer2Subscrption.vue";
</script>

<template>
  <footer class="site-footer style-2" id="footer">
    <div class="footer-bg-wrapper" id="app-banner">
      <div class="footer-top">
        <div class="container">
          <div class="footer-subscribe-wrapper">
            <div class="wrapper-inner">
              <div class="row justify-content-between">
                <div
                  class="col-xl-4 col-lg-4 m-lg-0 m-b20 wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div class="footer-logo">
                    <RouterLink to="/" class="anim-logo-white">
                      <img src="../assets/images/logo2.png" alt="/" />
                    </RouterLink>
                  </div>
                  <p class="text-white mb-0 font-14">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div
                  class="col-xl-6 col-lg-6 wow fadeInUp"
                  data-wow-delay="0.6s"
                >
                  <h4 class="text-white title m-b15">
                    Subscribe To Our Newsletter
                  </h4>
                  <Footer2Subscrption  title="Subscribe"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div class="widget widget_getintuch">
                <h5 class="footer-title">Contact</h5>
                <ul>
                  <li>
                    <i class="flaticon-placeholder"></i>
                    <p>
                      1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad
                    </p>
                  </li>
                  <li>
                    <i class="flaticon-telephone"></i>
                    <p>
                      +91 987-654-3210<br />
                      +91 123-456-7890
                    </p>
                  </li>
                  <li>
                    <i class="flaticon-email-1"></i>
                    <p>
                      info@example.com<br />
                      info@example.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-2 col-md-6 col-sm-6">
              <div class="widget widget_services">
                <h5 class="footer-title">Liens</h5>
                <ul>
                  <li>
                    <RouterLink to="/"><span>Accueil</span></RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/partenaires"
                      ><span>Partenaires</span></RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/panier"><span>Panier</span></RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/contact-us"
                      ><span>Contact</span></RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div class="widget widget_services">
                <h5 class="footer-title">Mon compte</h5>
                <ul>
                  <li>
                    <RouterLink to="/connexion"
                      ><span>Connexion</span></RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/inscription"
                      ><span>Inscription</span></RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/mes-commandes"
                      ><span>Mes commandes</span></RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div class="widget widget_services">
                <h5 class="footer-title">Aide</h5>
                <ul>
                  <li>
                    <RouterLink to="/contact-us"
                      ><span>Contact Us</span></RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Bottom Part -->
    <div class="container">
      <div class="footer-bottom">
        <div class="row">
          <div class="col-xl-6 col-lg-6">
            <span class="copyright-text"
              >Crafted With
              <span
                class="heart"
                @click="
                  (e) => {
                    e.target.classList.toggle('heart-blast');
                  }
                "
              ></span>
              by
              <a href="https://dexignzone.com/" target="_blank"
                >DexignZone</a
              ></span
            >
          </div>
          <div class="col-xl-6 col-lg-6">
            <ul class="footer-link">
              <li><RouterLink to="/partenaires">Partenaires</RouterLink></li>
              <li><RouterLink to="/contact-us">Contact</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
