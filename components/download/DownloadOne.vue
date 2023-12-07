<template>
  <p class="metadata">Links zu den Metadaten in folgenden Formaten:</p>
  <ul class="nobull metadata">
    <li><a :href="DOWNLOAD_ONE + '?id=' + encodeURIComponent(entityStore.dataset_uri)">RDF/XML exportieren</a></li>
    <li><a :href="DOWNLOAD_ONE + '?format=rdf/json&id=' + encodeURIComponent(entityStore.dataset_uri)">RDF/JSON exportieren</a></li>
    <li><a :href="DOWNLOAD_ONE + '?format=rdf/ttl&id=' + encodeURIComponent(entityStore.dataset_uri)">RDF/TTL exportieren</a></li>
  </ul>
</template>


<script setup lang="ts">
import {DOWNLOAD_ONE} from "/etc/pkan/nuxt_config";
import {useEntityStore} from "~/stores/entities";

const entityStore = useEntityStore()
</script>



<style scoped>
  .metadata {
    margin-top: unset;
    padding-top: unset;
    margin-bottom: unset;
  }

</style>