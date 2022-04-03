<template>
  <div class="facets">
    <facet v-if="entityStore.facets.dcterms_publisher_facet" :facet="entityStore.facets.dcterms_publisher_facet" :facetName="'Herausgeber'"></facet>
    <facet v-if="entityStore.facets.dcat_theme_facet" :facet="entityStore.facets.dcat_theme_facet" :facetName="'Kategorien'"></facet>
  </div>
</template>

v-for="(facetField, facetFieldName) in entityStore.facetFields"

<script setup lang="ts">
      import { useEntityStore } from '~/stores/entities'
      const entityStore = useEntityStore();
</script>

<style scoped>
.facets {
  margin-top: 2em;
}
</style>
