<template>
  <div class="movie-footer">
    
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { createHelpers } from "vuex-map-fields";

const { mapFields: mapfields } = createHelpers({
  getterType: "chatbox/GET_FIELDS",
  mutationType: "chatbox/UPDATE_FIELDS",
});

@Options({
  computed: {
    ...mapfields({}),
  },
})
export default class MovieFooter extends Vue {
  
}
</script>
