<template>
    <div>Pagination</div>
    <div>Pages: {{entityStore.numberOfPages}}</div>
</template>

<script setup lang="ts">
    import {useEntityStore} from '~/stores/entities'

    const entityStore = useEntityStore();


</script>

<style scoped>



</style>