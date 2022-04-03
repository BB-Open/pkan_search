<template>
  <div>
    <h2>{{facetFieldName}}</h2>
    <div v-for='nameCount in facetNameCount'>
      <span class='name_column'>{{nameCount[0]}}</span><span class='count_column'>{{nameCount[1]}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const facet = defineProps({
  facetField: {type: Array, required: true},
  facetFieldName: {type: String, required: true},
});

const chunk = <T>(arr: T[], size: number): T[][] =>
    [...Array(Math.ceil(arr.length / size))].map((_, i) =>
        arr.slice(size * i, size + size * i)
    );

const facetNameCount = computed(() => {
  return chunk(facet.facetField,2)
})
</script>

<style scoped>
.name_column {
  font-size: 0.5em;
}
.count_column {
  margin-left : 1em;
  font-size: 0.5em;
}
</style>
