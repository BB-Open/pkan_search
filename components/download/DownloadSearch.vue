<template>
  <h2>Metadaten Download:</h2>
  <ul>
    <li>RDF/XML exportieren: <button @click="download('rdf/xml')">Metadaten herunterladen</button></li>
    <li>RDF/JSON exportieren: <button @click="download('rdf/json')">Metadaten herunterladen</button></li>
    <li>RDF/TTL exportieren: <button @click="download('rdf/ttl')">Metadaten herunterladen</button></li>
  </ul>
  <div v-if="show_modal">
    <p>Leider sind zu viele Suchergebnisse vorhanden. Was möchten Sie machen?</p>
    <button @click="cancel()">Abbrechen</button>
    <button @click="download(download_format, true)">Die ersten 100 Ergebnisse herunterladen</button>
    <button @click="download_all()">Download All</button>
  </div>
</template>


<script setup lang="ts">

import {useEntityStore} from "~/stores/entities";
import {
  DOWNLOAD_ALL, DOWNLOAD_SEARCH
} from "/etc/pkan/nuxt_config";


const router = useRouter()
const entityStore = useEntityStore()
const show_modal = ref(false)
const download_format = ref('rdf/xml')
const download = async (format, force:boolean=false) => {
  download_format.value = format
  if (entityStore.entityTotalCount > 100 && !force){
    // todo: Real Modal
    show_modal.value = true
  } else {
    show_modal.value = false
    window.location.href = DOWNLOAD_SEARCH + '?format=' + download_format.value + '&' + entityStore.SearchParams;
  }
};

const cancel = async () => {
  show_modal.value = false
}

const download_all = async () => {
  show_modal.value = false
  window.location.href = DOWNLOAD_ALL + '?format=' + download_format.value;
}
</script>



<style scoped>

h2 {
  font-size: 1.2rem;
}

li {
  font-size: 0.8rem;
}

button {
  font-size: 0.8rem;
}

</style>