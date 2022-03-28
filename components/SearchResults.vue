<template>
    <div class="result">
    <Pagination></Pagination>
    <ol class="result-list">
        <li v-if="entityStore.entityCount > 0" v-for="item in entityStore.entities" >
            <DataSetSimple :item="item"></DataSetSimple>
        </li>
    </ol>
    <Pagination></Pagination>
    </div>
</template>

<script setup lang="ts">
    import { useEntityStore } from '~/stores/entities'
    import Pagination from "~/components/Pagination.vue";
    import DataSetSimple from '~/components/DataSetSimple.vue'

    const entityStore = useEntityStore();

    // Load entity store for SSR
    entityStore.getSolr()
</script>

<style scoped>
    ol ::marker {
        content: counter(list-item) ")\00A0";
    }

</style>
