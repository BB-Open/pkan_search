<template>
  <div>
    <h2>Open-Data-Roulette (zufällig ausgewählter Datensatz)</h2>
    <div class='dataset' v-if="entityStore.roulette">
      <h3 class="dataset_title">{{ entityStore.roulette.dct_title }}</h3>
      <div>
        <p class="dct_description" v-if='entityStore.roulette.dct_description'>
          {{ entityStore.roulette.dct_description[0] }}</p>
      </div>
      <div>
        <NuxtLink v-if="entityStore.roulette.dct_title" :to="'/dataset' + encodeURIComponent(entityStore.roulette.id)"
                  :aria-label="entityStore.roulette.dct_title + ' weiterlesen'">
          Weiterlesen
        </NuxtLink>
      </div>
    </div>
    <div v-else class="dataset">
      Der Datensatz wird noch geladen.
    </div>
  </div>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'
import {onBeforeUnmount, onMounted} from 'vue'


const entityStore = useEntityStore();

onMounted(() => {
  entityStore.getSolrRoulette()
  entityStore.setUpTimer()
})

onBeforeUnmount(() => {
  entityStore.destroyTimer()
})

</script>

<style scoped>
.dataset {
  background: #eee;
  padding: 30px;
}

.dataset_title {
  margin-top: 0; /* important for vertical alignment */
  margin-bottom: 0.2rem; /* adjustable */
  font-size: 1.2rem; /* adjustable */
  color: inherit;
  background-color: inherit;
}

</style>