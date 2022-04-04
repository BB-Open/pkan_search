<template>
  <div class="facets">
    <facet :facet="entityStore.facets.dcterms_format_facet"
           :facetTitle="'Formate'"
           :facetName="'dcterms_format_facet'"
    ></facet>
    <facet :facet="entityStore.facets.dcat_theme_facet"
           :facetTitle="'Kategorien'"
           :facetName="'dcat_theme_facet'"
    ></facet>
    <facet :facet="entityStore.facets.dcterms_license_facet"
           :facetTitle="'Lizenzen'"
           :facetName="'dcterms_license_facet'"
    ></facet>

    <facet :facet="entityStore.facets.dcterms_publisher_facet"
           :facetTitle="'Datenbereitsteller'"
           :facetName="'dcterms_publisher_facet'"
    ></facet>
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
