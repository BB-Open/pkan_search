<template>
  <p>Links zu allen Metadaten des Datenadlers in folgenden Formaten:</p>
  <ul class="nobull">
    <li><a :href="DOWNLOAD_ALL">RDF/XML exportieren</a></li>
    <li><a :href="DOWNLOAD_ALL + '?format=rdf/json'">RDF/JSON exportieren</a></li>
    <li><a :href="DOWNLOAD_ALL + '?format=rdf/ttl'">RDF/TTL exportieren</a></li>
  </ul>
</template>


<script setup lang="ts">
import {
  DOWNLOAD_ALL
} from "/etc/pkan/nuxt_config";

</script>



<style scoped>

</style>