<template>
    <aside class="info_column_right info_column">
        <div v-html="ploneStore.PortalTypeSubject('Document', 'seitentext').text.data"></div>
    </aside>
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {onMounted, onServerPrefetch} from 'vue'

    const ploneStore = usePloneStore();

    onMounted(async () => {
        await ploneStore.ContentBySubject('Document', 'seitentext', false);

    })

    onServerPrefetch(async () => {
        console.log('Prefetch')
        await ploneStore.ContentBySubject('Document', 'seitentext', false);
    })
</script>

<style scoped>

</style>