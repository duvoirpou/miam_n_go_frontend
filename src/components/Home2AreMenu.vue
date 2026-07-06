<script setup>
import { ref } from "vue";
import meniSmallGridPic1 from "../assets/images/menu-small/grid/pic1.png";
import meniSmallGridPic2 from "../assets/images/menu-small/grid/pic2.png";
import meniSmallGridPic3 from "../assets/images/menu-small/grid/pic3.png";
import meniSmallGridPic4 from "../assets/images/menu-small/grid/pic4.png";
import meniSmallGridPic5 from "../assets/images/menu-small/grid/pic5.png";
import meniSmallGridPic6 from "../assets/images/menu-small/grid/pic6.png";
import meniSmallGridPic7 from "../assets/images/menu-small/grid/pic7.png";
import meniSmallGridPic8 from "../assets/images/menu-small/grid/pic8.png";
import { RouterLink } from "vue-router";

const buttons = ref([
  { title: "All", icon: "flaticon-fast-food" },
  { title: "COLD DRINK", icon: "flaticon-cocktail" },
  { title: "PIZZA", icon: "flaticon-pizza-slice" },
  { title: "SALAD", icon: "flaticon-salad" },
  { title: "SWEETS", icon: "flaticon-cupcake" },
  { title: "SPICY", icon: "flaticon-chili-pepper" },
  { title: "BURGER", icon: "flaticon-hamburger-1" },
]);
const menus = [
  {
    img: meniSmallGridPic1,
    name: "Pulled Chicken SandWich",
    price: "$30",
    categery: "COLD DRINK",
  },
  {
    img: meniSmallGridPic2,
    name: "Canada Dry Ginger Ale",
    price: "$60",
    categery: "SALAD",
  },
  {
    img: meniSmallGridPic3,
    name: "Martinelli’s Apple Juice",
    price: "$80",
    categery: "PIZZA",
  },
  {
    img: meniSmallGridPic4,
    name: "Mango Mania Smoothie",
    price: "$30",
    categery: "SALAD",
  },
  {
    img: meniSmallGridPic5,
    name: "BBQ Chicken Sandwich",
    price: "$30",
    categery: "BURGER",
  },
  {
    img: meniSmallGridPic6,
    name: "Honey Mustard Pasta",
    price: "$20",
    categery: "SPICY",
  },
  {
    img: meniSmallGridPic7,
    name: "Chicken Honey Plate",
    price: "$80",
    categery: "SWEETS",
  },
  {
    img: meniSmallGridPic8,
    name: "Jamaican Jerk Sandwich",
    price: "$80",
    categery: "COLD DRINK",
  },
];

let menuList = menus;
let addClass = ref(0);

const filterGalleryButton = (el, name) => {
  addClass.value = el;
  let updateItems = menus.filter((ell) => {
    return ell.categery === name;
  });
  menuList = updateItems;
  if (name === "All") {
    menuList = menus;
  }
};
</script>

<template>
  <div class="row">
    <div class="col-lg-12 text-center wow fadeInUp">
      <div class="site-filters style-2 clearfix">
        <ul class="filters">
          <li
            v-for="(item, ind) in buttons"
            :key="ind"
            :class="`btn ${addClass === ind ? 'active' : ''}`"
          >
            <a
              @click="filterGalleryButton(ind, item.title)"
              href="javascript:void(0);"
              ><span><i :class="item.icon"></i></span>{{ item.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix">
      <ul id="masonry" class="row dlab-gallery-listing gallery">
        <li
          class="card-container col-lg-6 col-md-6 m-b5 All drink sweet salad"
          v-for="(item, ind) in menuList"
          :key="ind"
        >
          <div class="dz-img-box style-6 wow fadeInUp">
            <div class="dz-media">
              <img :src="item.img" alt="/" />
            </div>
            <div class="dz-content">
              <div class="dz-head">
                <span class="header-text"
                  ><RouterLink to="/partenaires">{{ item.name }}</RouterLink></span
                >
                <span class="img-line"></span>
                <span class="header-price">{{ item.price }}</span>
              </div>
              <p class="dz-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
