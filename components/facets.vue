<template>
  <div class="facets">
    <facet v-if="entityStore.facets.dcat_theme_facet" :facet="entityStore.facets.dcat_theme_facet" :facetName="'Kategorien'"></facet>
    <facet v-if="entityStore.facets.dcterms_license_facet" :facet="entityStore.facets.dcterms_license_facet" :facetName="'Lizenzen'"></facet>
    <facet v-if="entityStore.facets.dcterms_publisher_facet" :facet="entityStore.facets.dcterms_publisher_facet" :facetName="'Datenbereitsteller'"></facet>
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
