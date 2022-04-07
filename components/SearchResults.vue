<template>
    <div class="result">
    <Pagination></Pagination>
    <ol class="result-list" :start='entityStore.offset'>
        <li v-if="entityStore.entityTotalCount > 0" v-for="item in entityStore.entities" >
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

    onMounted(() => {
        entityStore.reset_pagination_and_solr_get()
    })

    // Load entity store for SSR
    entityStore.reset_pagination_and_solr_get()

</script>

<style scoped>
    .result-list {
      margin-top : -1rem;
    }
    .result ol ::marker {
        content: counter(list-item) ")\00A0";
    }

</style>
