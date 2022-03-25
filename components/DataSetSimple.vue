<template>
    <NuxtLink :to="'/' + encodeURIComponent(item.id)" :aria-label="item.dcterms_title[0]+ weiterlesen">
      <h3 class="element_title">{{ item.dcterms_title[0] }}</h3>
    </NuxtLink>
    <p class="element_description">{{ item.dcterms_description[0].split('.')[0] }}.</p>
</template>

<script setup lang="ts">
    const props = defineProps({
        item: {type: Object, required: true},
    });
</script>

<style scoped>
    .element_title {
        margin-bottom: 10px;
       font-size: small;
    }

    .element_logo img {
        max-width: 100px;
    }

    .element_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: xx-small;
    }

    .hide {
        display: none
    }

</style>
