<template>
    <facet  :facetField="entityStore.facetFields.dct_publisher_facet" :facetFieldName="'Herausgeber'"></facet>
</template>

v-for="(facetField, facetFieldName) in entityStore.facetFields"

<script setup lang="ts">
      import { useEntityStore } from '~/stores/entities'
      const entityStore = useEntityStore();
</script>

<style scoped>

</style>
