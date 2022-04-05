<template>
    <div class='testtest'>
      <NuxtLink v-if="item.dcterms_title" :to="'/dataset' + encodeURIComponent(item.id)" :aria-label="item.dcterms_title[0] + ' weiterlesen'">
        <h2 class="element_title">{{ item.dcterms_title[0] }}</h2>
      </NuxtLink>
        <NuxtLink v-if="!item.dcterms_title" :to="'/' + encodeURIComponent(item.id)"
                  :aria-label="item.id + ' weiterlesen'">
            <h2 class="element_title">{{ item.id }}</h2>
        </NuxtLink>
      <p class="element_description" v-if="item.dcterms_description">{{ item.dcterms_description[0].split('.')[0] }}. ...</p>
      <p class="element_description" v-if="!item.dcterms_description">Keine Beschreibung verfügbar</p>
      <Distributions v-if="item.dcat_distribution" :distributions="JSON.parse(item.dcat_distribution)" >
      </Distributions>
    </div>
</template>

<script setup lang="ts">
    import Distributions from "~/components/Distributions.vue";

    const props = defineProps({
        item: {type: Object, required: true},
    });
</script>

<style scoped>
    .element_title {
       margin-bottom: 5px;
       font-size: 1rem;
        color: inherit;
    }

    .element_logo img {
        max-width: 100px;
    }

    .element_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: 0.9rem;
    }

    .hide {
        display: none
    }

</style>
