<template>
  <h3>Kontakt:</h3>
      <div>{{contactPoint}}</div>
</template>

<script setup lang="ts" >

    const props = defineProps({
        contactPoint: {type: Object, required: true},
    });

</script>

<style scoped>

</style>
