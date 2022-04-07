<template>
  <div class="facets">
    <h2 class="hidden_help_text">Suchkriterien</h2>
    <facet :facet="entityStore.facets.rdf_type"
           :facetTitle="'Datentyp'"
           :facetName="'rdf_type'"
    ></facet>
    <facet :facet="entityStore.facets.dct_format_facet"
           :facetTitle="'Format'"
           :facetName="'dct_format_facet'"
    ></facet>
    <facet :facet="entityStore.facets.dcat_theme_facet"
           :facetTitle="'Kategorie'"
           :facetName="'dcat_theme_facet'"
    ></facet>
    <facet :facet="entityStore.facets.dct_license_facet"
           :facetTitle="'Lizenz'"
           :facetName="'dct_license_facet'"
    ></facet>
    <facet :facet="entityStore.facets.dct_publisher_facet"
           :facetTitle="'Datenbereitsteller'"
           :facetName="'dct_publisher_facet'"
    ></facet>
  </div>
</template>

<script setup lang="ts">
      import { useEntityStore } from '~/stores/entities'
      const entityStore = useEntityStore();
</script>

<style scoped>

 .hidden_help_text {
   margin :0;
 }

</style>
