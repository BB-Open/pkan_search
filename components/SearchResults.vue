<template>
    <div class="result">
    <Pagination></Pagination>
    <ul class="result-list" :start='entityStore.offset'>
        <li class="result-list-item" v-if="entityStore.entityTotalCount > 0" v-for="item in entityStore.entities" >
            <DataSetSimple :item="item"></DataSetSimple>
        </li>
    </ul>
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
      margin: unset; /* important for vertical allignment */
    }

    ul li {
      list-style-type: none;
    }

    ul {
      padding-left: 0;
    }
    .result-list-item {
      margin-bottom: 0.5rem; /* adjustable margin */
    }


</style>
