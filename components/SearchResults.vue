<template>
    <div class="result">
    <Pagination element_id="top"></Pagination>
    <ol class="result-list nobull" :start='entityStore.offset'>
        <li class="result-list-item" v-if="entityStore.entityTotalCount > 0" v-for="item in entityStore.entities" >
            <DataSetSimple :item="item"></DataSetSimple>
        </li>
    </ol>
    <Pagination element_id="bottom"></Pagination>
    </div>
</template>

<script setup lang="ts">
    import { useEntityStore } from '~/stores/entities'
    import Pagination from "~/components/Pagination.vue";
    import DataSetSimple from '~/components/DataSetSimple.vue'
    import {onMounted, onServerPrefetch} from 'vue'


    const entityStore = useEntityStore();

    // this is done by deep_link

    // onMounted(async () => {
    //     await entityStore.reset_pagination_and_solr_get()
    // })
    //
    // onServerPrefetch(async () => {
    //     await entityStore.getSolr()
    //
    // })

    // Load entity store for SSR

</script>

<style scoped>
    .result-list {
      margin: unset; /* important for vertical allignment */
        padding-bottom: 15px;
        padding-top: 15px;
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
