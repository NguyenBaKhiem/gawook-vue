<template>
  <component
    :is="this.device == 'mobile' ? this.device : 'desktop'"
    :key="this.device == 'mobile' ? this.device : 'desktop'"
  />
</template>

<script>
import { mapGetters } from "vuex";
import mobile from "./mobile";
import desktop from "./desktop";

export default {
  name: "Home",
  components: { mobile, desktop },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["device"])
  },
  watch: {},
  created() {}
};
</script>
