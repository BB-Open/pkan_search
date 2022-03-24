<template>
    <div v-if="ploneStore.UID(props.uid)">
        <h1>{{ ploneStore.UID(props.uid).title }}</h1>
        <div class="publish_date" v-if="ploneStore.UID(props.uid).effective">Veröffentlicht am {{ploneStore.UID(props.uid).effective.split('T')[0]}}</div>
        <div v-if="ploneStore.UID(props.uid).description" class="description">{{ ploneStore.UID(props.uid).description}}</div>
        <div v-html="ploneStore.removeSelfClosingTags(ploneStore.UID(props.uid).text.data)" v-if="ploneStore.UID(props.uid).text"></div>
    </div>
    
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'

    const ploneStore = usePloneStore();

    const props = defineProps({
        uid: {type: String, required: true},
    });

    ploneStore.ContentByUID(props.uid);
</script>

<style scoped>
    .publish_date {
        font-style: italic;
    }

</style>