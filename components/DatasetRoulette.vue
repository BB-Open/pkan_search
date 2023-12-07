<template>
  <div>
    <h2>Open-Data-Roulette (zufällig ausgewählter Datensatz)</h2>
    <div class='dataset' v-if="entityStore.roulette">
      <div class="controll">
        <div v-if="entityStore.TimerActive">
          <label for="timer" class="hidden_help_text">Open-Data-Roulette Timer:</label>
          <progress id="timer" class="timer" :value="entityStore.TimerTimeLeft" max="30" aria-label="Open-Data-Roulette Timer">{{entityStore.TimerTimeLeft}}s</progress>
          <button class="controll_button" @click="entityStore.destroyTimer()" aria-label="Open-Data-Roulette pausieren"><span class="fa-pause bb-ifa">
          </span></button>
        </div>
        <div v-else>
          <button class="controll_button" @click="entityStore.setUpTimer()" aria-label="Open-Data-Roulette fortsetzen"><span class="fa-play bb-ifa">
          </span></button>
        </div>
      </div>
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

.bb-ifa {
  color: white;
  font-size: 1rem;
  padding: 5px;
}

.controll_button {
  padding: 0px;
  border: unset;
}

.controll {
  margin: 1px;
  position: relative;
  float: right;
  margin-top: -29px;
  margin-right: -29px;
  background: #C13B33;
  padding-left: 3px;
  padding-right: 0px;
}

.timer {
  width: 50px;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  height: 5px;
  vertical-align: middle;
  border: unset;
}

</style>