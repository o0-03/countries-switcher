<template>
  <div class="flex-box">
    <div class="search">
      <img class="svg" :src="searchSvg" alt="" />
      <input
        type="text"
        id="search-box"
        placeholder="Search for a country…"
        v-model="searchQuery"
        @input="debounceSearch"
      />
    </div>
    <div class="filter">
      <label for="continent" class="visually-hidden">Filter by region</label>
      <div class="custom-select">
        <div class="select-selected" @click="toggleDropdown">
          <p>{{ selectedRegion || "Filter by region" }}</p>
          <span class="arrow">&#9662;</span>
        </div>
        <div class="select-items" :class="{ 'select-hide': !dropdownOpen }">
          <div
            v-for="region in regions"
            :key="region"
            @click="selectRegion(region)"
          >
            <p class="filter-text">{{ region }}</p>
          </div>
        </div>
        <select
          id="continent"
          class="original-select"
          v-model="selectedRegion"
          aria-hidden="true"
        >
          <option value="" disabled>Filter by region</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import searchSvg from "@/assets/search-icon.svg";
import { ref, computed } from "vue";

export default {
  props: ["regions"],
  emits: ["search", "filter"],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const selectedRegion = ref("");
    const dropdownOpen = ref(false);

    const debounceSearch = debounce(() => {
      emit("search", searchQuery.value);
    }, 300);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const selectRegion = (region) => {
      selectedRegion.value = region;
      emit("filter", region);
      toggleDropdown();
    };

    function debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }

    return {
      searchQuery,
      selectedRegion,
      dropdownOpen,
      toggleDropdown,
      selectRegion,
      debounceSearch,
      searchSvg,
    };
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
.search {
  background-color: var(--color-background-light);
  padding: 1rem;
  margin: 2rem;
  display: flex;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.5rem var(--color-shadow);
  transition: all 0.2s;
  img {
    height: 20px;
    margin-right: 1rem;
  }
  #search-box {
    width: 100%;
    border: 0;
    outline: none;
    background-color: var(--color-background-light);
    color: var(--color-font-bold);
    padding: 0 1rem;
    transition: all 0.2s;
  }
}
.filter {
  margin: 2rem;
  color: var(--color-font-bold);
}
.original-select {
  display: none;
}

.custom-select {
  position: relative;
  width: 12rem;
}

.select-selected {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-background-light);
  transition: all 0.2s;
  padding: 1rem 1.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.3rem var(--color-shadow);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.select-items {
  position: absolute;
  bottom: -1rem;
  transform: translateY(100%);
  background-color: var(--color-background-light);
  border-radius: 0.3rem;
  box-shadow: 0 0 0.3rem var(--color-shadow);
  width: 100%;
}
.filter-text {
  padding: 0 1rem;
}
/* gpt说为了确保表单提交时数据能被正确发送到服务器，避免了完全依赖自定义元素的潜在问题 
我也不太懂 */
.select-hide {
  display: none;
}

.select-items div {
  padding: 10px;
  cursor: pointer;
}

.select-items div:hover {
  background-color: var(--color-grey);
}

.visually-hidden {
  position: absolute;
  overflow: hidden;
  border: 0;
}
@media (min-width: 768px) {
  .flex-box {
    display: flex;
    justify-content: space-between;
  }
  .search {
    width: 30rem;
  }
}
</style>
