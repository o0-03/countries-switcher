<template>
  <header>
    <div class="header">
      <p>Where in the world?</p>
      <div class="mode" @click="toggleDarkMode">
        <img id="mode" class="svg" :src="moonSvg" alt="Dark Mode Icon" />
        <p>&nbsp;Dark Mode</p>
      </div>
    </div>
  </header>
</template>
<script>
import moonSvg from "@/assets/moon.svg";

export default {
  data() {
    return {
      countries: [],
      moonSvg,
    };
  },
  methods: {
    toggleDarkMode() {
      if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        sessionStorage.setItem("dark-mode", "disabled");
      } else {
        document.body.classList.add("dark-mode");
        sessionStorage.setItem("dark-mode", "enabled");
      }
    },
  },
  mounted() {
    if (sessionStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
  },
};
</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root {
  --color-background-light: rgb(255, 255, 255);
  --color-background-heavy: rgb(245, 245, 245);
  --color-font-bold: rgb(0, 0, 0);
  --color-font-light: rgba(0, 0, 0, 0.8);
  --color-shadow: rgba(0, 0, 0, 0.3);
  --color-grey: rgb(241, 241, 241);
}
.dark-mode {
  --color-background-light: rgb(48, 48, 48);
  --color-background-heavy: rgb(0, 0, 0);
  --color-font-bold: rgb(255, 255, 255);
  --color-font-light: rgba(255, 255, 255, 0.7);
  --color-shadow: rgba(0, 0, 0, 0.3);
  --color-grey: rgb(64, 64, 64);
}

body {
  background-color: var(--color-background-heavy);
}
header {
  position: sticky;
  top: 0;
  z-index: 99;
}
.header {
  background-color: var(--color-background-light);
  padding: 2rem;
  box-shadow: 0 0 0.5rem var(--color-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-font-bold);
  .mode {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      height: 20px;
    }
  }
}
</style>
