<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  img: String,
  heading: String,
  title: String,
});
</script>

<template>
  <div
    class="dz-bnr-inr style-1 text-center bg-parallax bg-parallax"
    :style="`  background-image: url(${img});
      background-size: cover;
      background-position: center;`"
  >
    <div class="container">
      <div class="dz-bnr-inr-entry">
        <h1>{{ heading }}</h1>
        <!-- Breadcrumb Row -->
        <nav aria-label="breadcrumb" class="breadcrumb-row">
          <ul class="breadcrumb">
            <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ title }}
            </li>
          </ul>
        </nav>
        <!-- Breadcrumb Row End -->
      </div>
    </div>
  </div>
</template>
