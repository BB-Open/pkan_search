<template>
    <div class='dataset'>
      <NuxtLink v-if="item.dct_title" :to="'/dataset' + encodeURIComponent(item.id)" :aria-label="item.dct_title[0] + ' weiterlesen'">
        <h2 class="dataset_title">{{ item.dct_title[0] }}</h2>
      </NuxtLink>
        <NuxtLink v-if="!item.dct_title" :to="'/' + encodeURIComponent(item.id)"
                  :aria-label="item.id + ' weiterlesen'">
            <h2 class="dataset_title">{{ item.id }}</h2>
        </NuxtLink>
      <p class="dataset_description" v-if="item.dct_description">{{ item.dct_description[0].split('.')[0] }}. ...</p>
      <p class="dataset_description" v-if="!item.dct_description">Keine Beschreibung verfügbar</p>
      <Distributions v-if="item.dcat_distribution" :distributions="JSON.parse(item.dcat_distribution)" >
      </Distributions>
      <Datasets v-if="item.dcat_servesDataset" :datasets="JSON.parse(item.dcat_servesDataset)" ></Datasets>
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
      margin-top: 0.5rem;
      margin-bottom: 5px;
      font-size: 1rem;
      color: inherit;
    }
    .element_logo img {
        max-width: 100px;
    }

    .dataset_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: 0.9rem;
    }

    .hide {
        display: none
    }

</style>
