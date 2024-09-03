<template>
  <main>
    <RouterLink class="back" to="/">
      <img class="svg" :src="arrowLeftSvg" alt="Back" />Back
    </RouterLink>
    <div v-if="selectedCountry" class="country-info">
      <div class="details">
        <picture>
          <source :srcset="selectedCountry.flags.svg" type="image/svg+xml" />
          <img
            :src="selectedCountry.flags.png"
            :alt="selectedCountry.name + ' flag'"
          />
        </picture>
        <div class="text">
          <h2 class="info-title">{{ selectedCountry.name }}</h2>
          <div class="info-middle">
            <div class="info-left">
              <p><span>Native Name:</span> {{ selectedCountry.nativeName }}</p>
              <p>
                <span>Population:</span>
                {{ selectedCountry.population.toLocaleString() }}
              </p>
              <p><span>Region:</span> {{ selectedCountry.region }}</p>
            </div>
            <div class="info-right">
              <p><span>Subregion:</span> {{ selectedCountry.subregion }}</p>
              <p><span>Capital:</span> {{ selectedCountry.capital }}</p>
              <p>
                <span>Top Level Domain:</span>
                {{ selectedCountry.topLevelDomain.join(", ") }}
              </p>
              <p>
                <span>Currencies:</span>
                {{ selectedCountry.currencies.map((c) => c.name).join(", ") }}
              </p>
              <p>
                <span>Languages:</span>
                {{ selectedCountry.languages.map((l) => l.name).join(", ") }}
              </p>
            </div>
          </div>
          <div class="info-bottom">
            <span>Border Countries:</span>
            <div class="border-countries">
              <p v-if="selectedCountry.borders.length === 0" class="none-text">
                none
              </p>
              <p
                v-for="code in selectedCountry.borders"
                :key="code"
                class="borderCountry"
                @click="handleBorderClick(code)"
              >
                {{ findCountryByCode(code)?.name || code }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import arrowLeftSvg from "@/assets/arrow-left.svg";
export default {
  props: {
    selectedCountryName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedCountry: null,
      countries: [],
      arrowLeftSvg,
    };
  },
  methods: {
    async loadCountries() {
      try {
        const response = await fetch("/data.json");
        this.countries = await response.json();
        this.selectedCountry = this.findCountryByName(this.selectedCountryName);
      } catch (error) {
        console.error("Error loading countries data:", error);
      }
    },
    findCountryByCode(code) {
      return this.countries.find((c) => c.alpha3Code === code);
    },
    findCountryByName(name) {
      return this.countries.find((c) => c.name === name);
    },
    handleBorderClick(code) {
      const borderCountry = this.findCountryByCode(code);
      if (borderCountry) {
        this.selectedCountry = borderCountry;
        this.$router.push({
          path: `/details/${borderCountry.name}`,
        });
      }
    },
  },
  async mounted() {
    await this.loadCountries();
  },
};
</script>

<style scoped>
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
  padding: 2rem 1rem;
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

/* datails css */
.back {
  margin: 2rem;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.3rem var(--color-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  text-decoration: none;
  color: var(--color-font-bold);
  background-color: var(--color-background-light);
  img {
    height: 1rem;
  }
}

.country-info {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
.details {
  color: var(--color-font-bold);
  transition: all 0.2s;
  img {
    width: 30rem;
    margin-bottom: 2rem;
  }
  .text {
    p {
      margin: 1rem 0;
      font-weight: 300;
      span {
        font-weight: 500;
      }
    }
  }
}

.info-bottom {
  display: flex;
  .border-countries {
    display: flex;
    flex-wrap: wrap;
    .borderCountry {
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.3rem;
      box-shadow: 0 0 0.3rem var(--color-shadow);
      background-color: var(--color-background-light);
      padding: 0 1rem;
      margin: 0.3rem;
      cursor: pointer;
    }
    .none-text {
      font-weight: 300;
      padding-left: 1rem;
    }
  }
}
@media (min-width: 768px) {
  .flex-box {
    display: flex;
    justify-content: space-between;
  }
  .search {
    width: 30rem;
  }

  .details {
    padding: 2rem;
    display: grid;
    place-content: center;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    img {
      width: 100%;
      max-width: 40rem;
    }
    .text {
      width: 100%;
      max-width: 40rem;
      display: flex;
      flex-direction: column;
    }
  }
}

.info-middle {
  display: grid;
  @media (min-width: 768px) and(max-width:1300px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1260px) {
    grid-template-columns: 1fr 1fr;
    .info-left {
      grid-column: 1/2;
    }
    .info-right {
      grid-column: 2/2;
    }
  }
}

.countries-container {
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
