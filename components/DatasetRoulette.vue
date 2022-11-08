<template>
  <div>
    <h2>Open Data Roulette (zufällig ausgewählter Datensatz)</h2>
    <div class='dataset' v-if="entityStore.roulette">
      <NuxtLink v-if="entityStore.roulette.dct_title" :to="'/dataset' + encodeURIComponent(entityStore.roulette.id)" :aria-label="entityStore.roulette.dct_title + ' weiterlesen'">
        <h3 class="dataset_title">{{ entityStore.roulette.dct_title }}</h3>
      </NuxtLink>
      <div>
        <p class="dct_description" v-if='entityStore.roulette.dct_description'>{{ entityStore.roulette.dct_description[0] }}</p>
      </div>
<!--      <div v-if="entityStore.roulette.dcat_distribution">-->
<!--        <h4>Veröffentlichungen:</h4>-->
<!--        <Distributions :distributions="JSON.parse(entityStore.roulette.dcat_distribution)" >-->
<!--        </Distributions>-->
<!--      </div>-->
<!--      <div v-if="entityStore.roulette.dcat_endpointURL">-->
<!--        <h4>Service URIs:</h4>-->
<!--        <Endpoints v-if='entityStore.roulette.dcat_endpointURL' :endpoints="JSON.parse(entityStore.roulette.dcat_endpointURL)" >-->
<!--        </Endpoints>-->
<!--      </div>-->
<!--      <div  v-if="entityStore.roulette.dcat_servesDataset">-->
<!--        <h4>Angebotene Datensätze:</h4>-->
<!--        <Datasets v-if='entityStore.roulette.dcat_servesDataset' :datasets="JSON.parse(entityStore.roulette.dcat_servesDataset)" >-->
<!--        </Datasets>-->
<!--      </div>-->
<!--      <div v-if='entityStore.roulette.dct_license_facet'>-->
<!--        <h4>Lizenz:</h4>-->
<!--        <div class="lizenz">{{entityStore.roulette.dct_license_facet}}</div>-->
<!--      </div>-->
<!--      <div v-if="entityStore.roulette.dct_rightsstatement">-->
<!--        <h4>Rechtliche Aussage:</h4>-->
<!--        <div class="statement">{{entityStore.roulette.dct_rightsstatement[0]}}</div>-->
<!--      </div>-->
    </div>
    <div v-else class="dataset">
      Der Datensatz wird noch geladen.
    </div>
  </div>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'
import {onMounted} from 'vue'


const entityStore = useEntityStore();

onMounted(() => {
  entityStore.getSolrRoulette()
})

</script>

<style scoped>
  .dataset {
    background: #eee;
    padding: 30px;
  }

  .dataset_title {
    margin-top : 0; /* important for vertical alignment */
    margin-bottom: 0.2rem; /* adjustable */
    font-size: 1.2rem; /* adjustable */
    color: inherit;
    background-color: inherit;
  }

</style>