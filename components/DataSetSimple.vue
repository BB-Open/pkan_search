<template>
    <h3 class="element_title">{{ item.dcterms_title[0] }}</h3>
    <p class="element_description">{{ item.dcterms_description[0].slice(0, 255) }}</p>
    <p class="element_description">
        <NuxtLink :to="'/' + encodeURIComponent(item.id)" :aria-label="item.dcterms_title[0]+ weiterlesen">Weiterlesen</NuxtLink>
    </p>
    <!--
    <div>Debugg: {{item}}</div>
    -->
</template>

<script setup lang="ts">
    const props = defineProps({
        item: {type: Object, required: true},
    });
</script>

<style scoped>
    .element_title {
        margin-bottom: 10px;
    }

    .element_logo img {
        max-width: 100px;
    }

    .element_description {
        margin-bottom: 0;
        margin-top: 0;
    }

    .hide {
        display: none
    }

</style>