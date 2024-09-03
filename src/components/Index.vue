<template>
  <div id="index">
    <Header />
    <Nav :regions="regions" @search="handleSearch" @filter="handleFilter" />
    <Main
      :countries="filteredCountries"
      :searchQuery="searchQuery"
      :selectedRegion="selectedRegion"
      @itemClicked="goToDetails"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Main from "@/components/Main.vue";

export default {
  name: "Index",
  components: {
    Header,
    Nav,
    Main,
  },

  setup() {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    const countries = ref([]);
    const searchQuery = ref("");
    const selectedRegion = ref("");

    const filteredCountries = computed(() => {
      const query = searchQuery.value.toLowerCase();
      const region = selectedRegion.value;

      const filtered = countries.value.filter((country) => {
        const matchesRegion = !region || country.region === region;
        const matchesQuery = country.name.toLowerCase().includes(query);
        return matchesRegion && matchesQuery;
      });

      return filtered.sort((a, b) => {
        const aStartsWithQuery = a.name.toLowerCase().startsWith(query);
        const bStartsWithQuery = b.name.toLowerCase().startsWith(query);

        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;
        return a.name.localeCompare(b.name);
      });
    });

    const handleSearch = (query) => {
      searchQuery.value = query;
      console.log("Search Query:", searchQuery.value);
    };

    const handleFilter = (region) => {
      selectedRegion.value = region;
      console.log("Selected Region:", selectedRegion.value);
    };

    return {
      regions,
      filteredCountries,
      searchQuery,
      selectedRegion,
      handleSearch,
      handleFilter,
    };
  },
  methods: {
    goToDetails(selectedCountry) {
      console.log(selectedCountry.name); //这里能成
      this.$router.push({
        name: "Details",
        query: { selectedCountry: JSON.stringify(selectedCountry) },
      });
    },
  },
};
</script>

<style scoped></style>
