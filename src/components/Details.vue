<template>
  <div id="details">
    <Header />
    <Info :selectedCountry="selectedCountry" />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Info from "./Info.vue";
export default {
  name: "Details",
  components: {
    Header,
    Info,
  },

  created() {
    const query = this.$route.query.selectedCountry;
    if (query) {
      try {
        this.selectedCountry = JSON.parse(query);
      } catch (e) {
        console.error("Error parsing selectedCountry:", e);
      }
    }
  },
};
</script>
