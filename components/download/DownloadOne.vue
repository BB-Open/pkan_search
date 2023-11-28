<template>
  <h3>Metadaten Download:</h3>
  <ul>
    <li>RDF/XML exportieren: <a :href="DOWNLOAD_ONE + '?id=' + encodeURIComponent(entityStore.dataset_uri)">Metadaten herunterladen</a></li>
    <li>RDF/JSON exportieren: <a :href="DOWNLOAD_ONE + '?format=rdf/json&id=' + encodeURIComponent(entityStore.dataset_uri)">Metadaten herunterladen</a></li>
    <li>RDF/TTL exportieren: <a :href="DOWNLOAD_ONE + '?format=rdf/ttl&id=' + encodeURIComponent(entityStore.dataset_uri)">Metadaten herunterladen</a></li>
  </ul>
</template>


<script setup lang="ts">
import {DOWNLOAD_ONE} from "/etc/pkan/nuxt_config";
import {useEntityStore} from "~/stores/entities";

const entityStore = useEntityStore()
</script>



<style scoped>

</style>