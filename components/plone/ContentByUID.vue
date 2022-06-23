<template>
    <div v-if="ploneStore.UID(props.uid)">
        <h1 v-if="ploneStore.UID(props.uid)">{{ ploneStore.UID(props.uid).title }}</h1>
        <div class="publish_date" v-if="ploneStore.UID(props.uid) && ploneStore.UID(props.uid).effective">Veröffentlicht am {{ploneStore.UID(props.uid).effective.split('T')[0]}}</div>
        <div v-if="ploneStore.UID(props.uid) && ploneStore.UID(props.uid).description" class="description">{{ ploneStore.UID(props.uid).description}}</div>
      <client-only>

        <div v-html="ploneStore.improveAccessibility(ploneStore.UID(props.uid).text.data)" v-if="ploneStore.UID(props.uid) && ploneStore.UID(props.uid).text"></div></client-only>
    </div>
    
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {onMounted, onServerPrefetch} from 'vue'


    const ploneStore = usePloneStore();

    const props = defineProps({
        uid: {type: String, required: true},
    });

    onMounted(async () => {
        await ploneStore.ContentByUID(props.uid);
    })

    onServerPrefetch(async () => {
        await ploneStore.ContentByUID(props.uid);

    })
</script>

<style scoped>
    .publish_date {
        font-style: italic;
    }

</style>