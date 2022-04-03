<template>
  <div class='facet'>
    <h4 class='facet_name'>{{facetName}}</h4>
    <div v-for='item in facet.buckets'>
      <span v-if="item.count > 0" class='name_column'>{{item.val}}</span>
      <span v-if="item.count > 0" class='count_column'>{{item.count}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  facet: {type: Object, required: true},
  facetName: {type: String, required: true},
});

</script>

<style scoped>

.facet {
  margin-top: 0.4em;
}
.facet_name {
  margin-bottom: 0.1em;
}
.name_column {
  font-size: 0.5em;
}
.count_column {
  margin-left : 1em;
  font-size: 0.5em;
}
</style>
