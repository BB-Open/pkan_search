<template>
  <h3>Herausgeber:</h3>
  <div>{{publisher[0]}}</div>
</template>

<script setup lang="ts">
    const props = defineProps({
        publisher: {type: Object, required: true},
    });

</script>

<style scoped>

</style>
