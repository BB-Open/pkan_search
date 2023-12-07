<template>
  <div><p>Herausgeber: {{publisher[0]}}</p></div>
</template>

<script setup lang="ts">
    const props = defineProps({
        publisher: {type: Object, required: true},
    });

</script>

<style scoped>

</style>
