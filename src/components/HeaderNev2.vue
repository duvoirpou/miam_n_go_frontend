<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import router from "../router";

const menus = ref([
  {
    className: "sub-menu-down",
    menuClass: "mega-menu",
    menu: "Home",
    menuChild: [
      { child: "Home 1", link: "/" },
      { child: "Home 2", link: "/home-2" },
      { child: "Home 3", link: "/home-3" },
    ],
  },

  {
    className: "has-mega-menu",
    menu: "Pages",
    menuChild: [
      {
        child: "Pages",
        megaChild: [
          { menuChildren: "About Us", link: "/about-us" },
          { menuChildren: "FAQ", link: "/faq" },
          { menuChildren: "Team", link: "/team" },
          { menuChildren: "Team Detail", link: "/team-detail" },
          { menuChildren: "Testimonial", link: "/testimonial" },
        ],
      },
      {
        child: "Pages",
        megaChild: [
          { menuChildren: "Services", link: "/services" },
          { menuChildren: "Service Details", link: "/service-detail" },
          { menuChildren: "Error 404", link: "/error-404" },
          { menuChildren: "Coming Soon", link: "/coming-soon" },
          { menuChildren: "Under Maintenance", link: "/under-maintenance" },
        ],
      },
      {
        child: "Our Menu",
        megaChild: [
          { menuChildren: "Menu Style 1", link: "/our-menu-1" },
          { menuChildren: "Menu Style 2", link: "/our-menu-2" },
          { menuChildren: "Menu Style 3", link: "/our-menu-3" },
          { menuChildren: "Menu Style 4", link: "/our-menu-4" },
          { menuChildren: "Menu Style 5", link: "/our-menu-5" },
        ],
      },
    ],
  },

  {
    className: "sub-menu-down",
    menuClass: "mega-menu",
    menu: "Shop",
    menuChild: [
      { child: "Shop Style 1", link: "/shop-style-1" },
      { child: "Shop Style 2", link: "/shop-style-2" },
      { child: "Shop Cart", link: "/shop-cart" },
      { child: "Shop Wishlist", link: "/shop-wishlist" },
      { child: "Shop Chekout", link: "/shop-checkout" },
      { child: "Product Detail", link: "/product-detail" },
    ],
  },
  {
    className: "has-mega-menu",
    menu: "Blog",
    menuChild: [
      {
        child: "Blog Grid",
        megaChild: [
          { menuChildren: "Blog Grid 2", link: "/blog-grid-2" },
          { menuChildren: "Blog Grid 3", link: "/blog-grid-3" },
          {
            menuChildren: "Blog Grid Left Sidebar",
            link: "/blog-grid-left-sidebar",
          },
          {
            menuChildren: "Blog Grid Right Sidebar",
            link: "/blog-grid-right-sidebar",
          },
        ],
      },
      {
        child: "Blog List",
        megaChild: [
          { menuChildren: "Blog List", link: "/blog-list" },
          {
            menuChildren: "Blog List Left Sidebar",
            link: "/blog-list-left-sidebar",
          },
          {
            menuChildren: "Blog List Right Sidebar",
            link: "/blog-list-right-sidebar",
          },
          { menuChildren: "Blog Both Sidebar", link: "/blog-both-sidebar" },
        ],
      },
      {
        child: "log Single",
        megaChild: [
          { menuChildren: "Blog Detail", link: "/blog-standard" },
          { menuChildren: "Blog Open Gutenberg", link: "/blog-open-gutenberg" },
          {
            menuChildren: "Blog Details Left Sidebar",
            link: "/blog-detail-left-sidebar",
          },
          {
            menuChildren: "Blog Details Right Sidebar",
            link: "/blog-detail-right-sidebar",
          },
        ],
      },
      {
        child: "Blog Masonry",
        megaChild: [
          {
            menuChildren: "Blog Grid 3 Masonry",
            link: "/blog-grid-3-masonary",
          },
          {
            menuChildren: "Blog Grid 4 Masonry",
            link: "/blog-grid-4-masonary",
          },
          {
            menuChildren: "Blog Wide List Sidebar",
            link: "/blog-wide-list-sidebar",
          },
          {
            menuChildren: "Blog Wide Grid Sidebar",
            link: "/blog-wide-grid-sidebar",
          },
        ],
      },
    ],
  },
]);

let active = ref("");

function mobileActiveMenu(ind) {
  let item = document.querySelectorAll(".nevList");
  item.forEach((ell, index) => {
    ell.classList.toggle("open");
    if (index !== ind) {
      ell.classList.remove("open");
    }
  });
}

function dataItem() {
  menus.value.map((ele) => {
    ele.menuChild.map((ell) => {
      if (router.currentRoute.value.fullPath === ell.link) {
        active.value = ele.menu;
      }
      ell.megaChild &&
        ell.megaChild.map((item) => {
          if (router.currentRoute.value.fullPath === item.link) {
            active.value = ele.menu;
          }
        });
    });
  });
}

router.afterEach(() => {
  dataItem();
});
</script>

<template>
  <div class="logo-header">
    <RouterLink to="/" class="anim-logo"
      ><img src="../assets/images/logo.png" alt="/"
    /></RouterLink>
  </div>
  <ul class="nav navbar-nav navbar white show">
    <li
      v-for="(item, ind) in menus"
      :class="`${item.className} nevList`"
      :key="ind"
    >
      <a
        @click="mobileActiveMenu(ind)"
        :class="` ${item.menu === active ? 'active' : ''}`"
        href="javascript:void(0);"
        >{{ item.menu }}</a
      >
      <ul class="sub-menu" v-if="item.menuClass === 'mega-menu'">
        <li v-for="(subItem, index) in item.menuChild" :key="index">
          <RouterLink :to="`${subItem.link}`">{{ subItem.child }}</RouterLink>
        </li>
      </ul>
      <ul class="mega-menu" v-else>
        <li
          v-for="(subItem, index) in item.menuChild"
          :key="index"
          :class="subItem.class"
        >
          <a href="javascript:void(0)">{{ subItem.child }}</a>
          <ul>
            <li v-for="(data, index) in subItem.megaChild" :key="index">
              <RouterLink :to="`${data.link}`">{{
                data.menuChildren
              }}</RouterLink>
            </li>
          </ul>
        </li>
        <li class="header-adv p-0">
          <img src="../assets/images/adv-media.jpg" alt="" />
        </li>
      </ul>
    </li>
    <li>
      <RouterLink
        :class="
          router.currentRoute.value.fullPath === '/contact-us' ? 'active' : ''
        "
        to="/contact-us"
        >Contact Us</RouterLink
      >
    </li>
  </ul>
  <div class="dz-social-icon">
    <ul>
      <li>
        <a
          target="_blank"
          class="fab fa-facebook-f"
          href="https://www.facebook.com/"
        ></a>
      </li>
      <li>
        <a
          target="_blank"
          class="fab fa-twitter"
          href="https://twitter.com/"
        ></a>
      </li>
      <li>
        <a
          target="_blank"
          class="fab fa-linkedin-in"
          href="https://www.linkedin.com/"
        ></a>
      </li>
      <li>
        <a
          target="_blank"
          class="fab fa-instagram"
          href="https://www.instagram.com/"
        ></a>
      </li>
    </ul>
  </div>
</template>
