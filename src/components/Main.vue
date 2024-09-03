<template>
  <main>
    <div class="countries-container">
      <div
        v-for="country in filteredCountries"
        :key="country.name"
        class="country-box"
        @click="clickItem(country)"
      >
        <picture>
          <source :srcset="country.flags.png" type="image/svg+xml" />
          <img :src="country.flags.svg" :alt="`${country.name} flag`" />
        </picture>
        <div class="info">
          <h2>{{ country.name }}</h2>
          <p>
            <span>Population:</span> {{ country.population.toLocaleString() }}
          </p>
          <p><span>Region:</span> {{ country.region }}</p>
          <p><span>Capital:</span> {{ country.capital }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
    };
  },
  async mounted() {
    this.countries = await this.loadCountries();
  },
  methods: {
    async loadCountries() {
      try {
        const res = await fetch("/data.json");
        if (res.ok) {
          return await res.json();
        } else {
          console.error("HTTP error with status " + res.status);
          return [];
        }
      } catch (error) {
        console.error(`HTTP error! ${error}`);
        return [];
      }
    },
    clickItem(country) {
      this.$emit("itemClicked", country);
    },
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
    selectedRegion: {
      type: String,
      default: "",
    },
  },
  computed: {
    filteredCountries() {
      const query = this.searchQuery.trim().toLowerCase();
      const region = this.selectedRegion;
      let results = this.countries;

      if (region) {
        results = results.filter((country) => country.region === region);
      }

      if (query) {
        results = results
          .filter((country) => country.name.toLowerCase().includes(query))
          .sort((a, b) => {
            const lowerNameA = a.name.toLowerCase();
            const lowerNameB = b.name.toLowerCase();
            const startsWithA = lowerNameA.startsWith(query);
            const startsWithB = lowerNameB.startsWith(query);

            if (startsWithA && !startsWithB) return -1;
            if (!startsWithA && startsWithB) return 1;
            return lowerNameA.localeCompare(lowerNameB);
          });
      }
      return results;
    },
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

.country-box {
  background-color: var(--color-background-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem var(--color-shadow);
  transition: all 0.2s;
  cursor: pointer;
  height: 100%;
  img {
    width: 100%;
    aspect-ratio: 3/2;
    object-fit: cover;
  }
  .info {
    padding: 1.5rem;
    h2 {
      padding: 1rem 0;
      color: var(--color-font-bold);
    }
    p {
      padding: 0.5rem 0;
      color: var(--color-font-light);
      span {
        font-weight: 500;
        color: var(--color-font-bold);
      }
    }
  }
}
.country-box:hover {
  background-color: var(--color-grey);
}
.countries-container {
  padding: 2rem;
  display: grid;
  gap: 3rem 2rem;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  /* @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  } */
}
</style>
