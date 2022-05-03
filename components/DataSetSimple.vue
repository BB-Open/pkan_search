<template>
    <div class='dataset'>
      <NuxtLink v-if="item.dct_title" :to="'/dataset' + encodeURIComponent(item.id)" :aria-label="item.dct_title + ' weiterlesen'">
        <h2 class="dataset_title">{{ item.dct_title }}</h2>
      </NuxtLink>
        <NuxtLink v-if="!item.dct_title" :to="'/' + encodeURIComponent(item.id)"
                  :aria-label="item.id + ' weiterlesen'">
            <h2 class="dataset_title">{{ item.id }}</h2>
        </NuxtLink>
      <p class="dataset_description" v-if="item.dct_description">{{ item.dct_description[0].split('.')[0] }}. ...</p>
      <p class="dataset_description" v-if="!item.dct_description">Keine Beschreibung verfügbar</p>
      <Distributions v-if="item.dcat_distribution" :distributions="JSON.parse(item.dcat_distribution)" >
      </Distributions>
      <div v-if="item.dcat_servesDataset">
        <h3 class="dataset_header">Angebotene Datensätze:</h3>
        <Datasets :datasets="JSON.parse(item.dcat_servesDataset)" ></Datasets>
      </div>
    </div>
</template>

<script setup lang="ts">
    import Distributions from "~/components/Distributions.vue";

    const props = defineProps({
        item: {type: Object, required: true},
    });
</script>

<style scoped>

    .dataset_title {
      margin-top : 0; /* important for vertical alignment */
      margin-bottom: 0.2rem; /* adjustable */
      font-size: 1.2rem; /* adjustable */
      color: inherit;
      background-color: inherit;
    }
    .element_logo img {
        max-width: 100px;
    }

    .dataset_description {
        margin-top: 0; /* important for vertical alignment */
        margin-bottom: 0.2rem; /* adjustable */
        font-size: 0.9rem;  /* adjustable */
    }

    .dataset_header {
      font-size: 1rem;  /* adjustable */
    }

</style>
