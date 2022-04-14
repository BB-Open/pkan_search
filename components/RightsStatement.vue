<template>
  <div>
  <h3>Rechtliche Aussage:</h3>
  <div class="statement">{{statement}}</div>
  </div>
</template>

<script setup lang="ts" >

    const props = defineProps({
        statement: {type: String, required: true},
    });

</script>

<style scoped>

.statement {
  margin-right: 0.1em;
}

</style>
