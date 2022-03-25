<template>
    <div class="result">
    <Pagination></Pagination>
    <h2 v-if="entityStore.entityCount > 0" class="results_amount">Suchergebnisse</h2>

    <ol>
        <li v-if="entityStore.entityCount > 0" v-for="item in entityStore.entities" >
            <DataSetSimple :item="item"></DataSetSimple>
        </li>
    </ol>
    <h2 v-if="entityStore.entityCount === 0" class="results_amount">Es wurden keine Suchergebnisse gefunden.</h2>
    <Pagination></Pagination>
    </div>
</template>

<script setup lang="ts">
    import { useEntityStore } from '~/stores/entities'
    import Pagination from "~/components/Pagination.vue";
    import DataSetSimple from '~/components/DataSetSimple.vue'

    const entityStore = useEntityStore()
</script>

<style scoped>
    ol ::marker {
        content: counter(list-item) ")\00A0";
    }

</style>