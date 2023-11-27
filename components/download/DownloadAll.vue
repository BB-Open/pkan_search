<template>
  <h3>Metadaten Download:</h3>
  <ul>
    <li>RDF/XML exportieren: <a :href="DOWNLOAD_ALL">Metadaten herunterladen</a></li>
    <li>RDF/JSON exportieren: <a :href="DOWNLOAD_ALL + '?format=rdf/json'">Metadaten herunterladen</a></li>
    <li>RDF/TTL exportieren: <a :href="DOWNLOAD_ALL + '?format=rdf/ttl'">Metadaten herunterladen</a></li>
  </ul>
</template>


<script setup lang="ts">
import {
  DOWNLOAD_ALL
} from "/etc/pkan/nuxt_config";

</script>



<style scoped>

</style>