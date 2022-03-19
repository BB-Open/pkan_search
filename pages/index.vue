<template>
  <input v-model='entityStore.query' @keyup='entityStore.getSolr'>
  <div>
    <div v-if='entityStore.is_suggestions' v-for='suggestion in entityStore.suggestions'> {{ suggestion }} </div>
  </div>

<div>
  <div v-for='entity in entityStore.entities'> {{ entity.dcterms_title }} </div>
</div>

</template>


<script setup lang="ts">
import { useEntityStore } from '~/stores/entities'

const entityStore = useEntityStore()

</script>

<style scoped>
</style>
