<template>
  <div id="details">
    <Header />
    <Info :selectedCountryName="selectedCountryName" />
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
  data() {
    return {
      selectedCountryName: "",
    };
  },
  created() {
    this.selectedCountryName = this.$route.params.countryName;
    console.log(this.selectedCountryName);
  },
};
</script>
