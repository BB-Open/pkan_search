<template>
  <div>
  <h3>Lizenz:</h3>
  <div class="lizenz">{{license}}</div>
  </div>
</template>

<script setup lang="ts" >

    const props = defineProps({
        license: {type: String, required: true},
    });

</script>

<style scoped>

.lizenz {
  margin-right: 0.1em;
}

</style>
