<template>
    <div>Pagination</div>
    <div>Pages: {{entityStore.numberOfPages}}</div>


</template>

<script setup lang="ts">
    import { useEntityStore } from '~/stores/entities'
    import VPagination from "vue3-pagination";


    const entityStore = useEntityStore()
</script>

<style scoped>



</style>