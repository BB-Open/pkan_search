<template>
  <div class='facet'>
    <h4 class='facet_name'>{{facetTitle}}</h4>
    <div v-for='item in facet.buckets'>
      <input type='checkbox' :checked='isChecked(item.val)' @click='onClick(item.val)'>
      <span v-if="item.count > 0" class='name_column'>{{item.val}}</span>
      <span v-if="item.count > 0" class='count_column'>{{item.count}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useEntityStore } from '~/stores/entities'

const entityStore = useEntityStore();

const props = defineProps({
  facet: {type: Object, required: true},
  facetName: {type: String, required: true},
  facetTitle: {type: String, required: true},
});

const isChecked = (choice) => {
  return choice in entityStore.facetsChoices[props.facetName]
};

const onClick = (choice) => {
  if (choice in entityStore.facetsChoices[props.facetName]) {
    delete entityStore.facetsChoices[props.facetName][choice]
  } else {
    entityStore.facetsChoices[props.facetName][choice] = 1
  }
  entityStore.getSolr();
};
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
