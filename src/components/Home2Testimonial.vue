<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted } from "vue";
import { Navigation } from "swiper/modules";
import { getReviews } from "@/services/reviews";
import placeholderImg from "@/assets/images/testimonial/large/pic1.jpg";

const reviews = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    reviews.value = await getReviews();
  } catch (err) {
    reviews.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="text-center py-4">Chargement…</div>
  <div v-else-if="!reviews.length" class="text-center py-4">
    Aucun avis client pour le moment.
  </div>
  <Swiper
    v-else
    class="swiper testimonial-two-swiper swiper-btn-lr swiper-single swiper-visible"
    :speed="1500"
    :modules="[Navigation]"
    :navigation="{
      prevEl: '.btn-prev',
      nextEl: '.btn-next',
    }"
  >
    <SwiperSlide
      class="swiper-slide"
      v-for="item in reviews"
      :key="item.id_reviews"
    >
      <div class="testimonial-2">
        <div class="dz-media">
          <img :src="placeholderImg" alt="/" />
        </div>
        <div class="testimonial-detail">
          <div class="testimonial-text wow fadeInUp" data-wow-delay="0.4s">
            <p>{{ item.comment || "Un client satisfait de Miam'n'Go." }}</p>
          </div>
          <div class="testimonial-info wow fadeInUp" data-wow-delay="0.6s">
            <h5 class="testimonial-name">
              {{ item.customer?.first_name_customers }}
              {{ item.customer?.last_name_customers }}
            </h5>
            <span class="testimonial-position">
              {{ item.partner?.label_partners || "Client Miam'n'Go" }}
              · {{ "★".repeat(item.rating) }}
            </span>
          </div>
          <i class="flaticon-right-quote quote"></i>
        </div>
      </div>
    </SwiperSlide>
    <div class="pagination">
      <div class="testimonial-2-button-prev btn-prev rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div class="testimonial-2-button-next btn-next rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  </Swiper>
</template>
