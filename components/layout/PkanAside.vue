<template>
    <aside class="info_column_right info_column">
        <div v-html="ploneStore.PortalTypeSubject('Document', 'seitentext').text.data"></div>
    </aside>
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'

    const ploneStore = usePloneStore();

    ploneStore.ContentBySubject('Document', 'seitentext');
</script>

<style scoped>

</style>