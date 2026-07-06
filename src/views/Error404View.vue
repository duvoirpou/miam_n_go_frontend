<script setup>
import { RouterLink } from "vue-router";
import bgimg from "../assets/images/background/bg1.jpg";
import Header2 from "../Layouts/Header2.vue";

let canvas = document.createElement("canvas");
(function () {
  let ctx = canvas.getContext("2d"),
    w = (canvas.width = innerWidth),
    h = (canvas.height = innerHeight),
    particles = [],
    properties = {
      bgColor: "rgba(17,17,19, 1)",
      particleColor: "rgba(255, 40, 40, 1)",
      particleRadius: 3,
      particleCount: 60,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6,
    };

  window.onresize = function () {
    (w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
  };

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.velocityY =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
    }

    position() {
      (this.x + this.velocityX > w && this.velocityX > 0) ||
      (this.x + this.velocityX < 0 && this.velocityX < 0)
        ? (this.velocityX *= -1)
        : this.velocityX;
      (this.y + this.velocityY > h && this.velocityY > 0) ||
      (this.y + this.velocityY < 0 && this.velocityY < 0)
        ? (this.velocityY *= -1)
        : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.velocityY =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }
      this.life--;
    }
  }

  function reDrawBackground() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  function drawLines() {
    var x1, y1, x2, y2, length, opacity;
    for (var i in particles) {
      for (var j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = "0,5";
          ctx.strokeStyle = "rgba(255, 40, 40, " + opacity + ")";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (var i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for (var i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
    loop();
  }

  init();

  //   console.log(document.getElementById("errorPage").appendChild(canvas));
})();
</script>

<template>
  <div class="page-content bg-white">
    <header class="site-header mo-left header header-transparent style-1">
      <Header2 />
    </header>
    <div
      class="content-inner overflow-hidden pt-4 error-page"
      id="app-banner"
      :style="`  background-image: url(${bgimg});
        background-repeat: no-repeat;
        background-size: cover;`"
    >
      <div class="container" id="errorPage">
        <div class="inner-content text-center">
          <h1 class="error-head">404</h1>
          <h3 class="error-para">Opps! Page not Found</h3>
          <p>Sorry. The page you are looking for is not found</p>
          <RouterLink to="/" class="btn btn-md btn-primary btn-hover-1"
            ><span>Back to Home</span></RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
