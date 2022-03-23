<template>
    <h1>{{ data.title }}</h1>
    <div class="description" v-if="data.description">{{ data.description}}</div>
    <div v-html="data.text.data"></div>
    {{data}}
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'

    const ploneStore = usePloneStore();


    const props = defineProps({
        portal_type: {type: String, required: true},
        tag: {type: String, required: true},
    });

    ploneStore.ContentBySubject(props.portal_type, props.tag);

    // todo: How to make reactive
    let data = ploneStore.ploneState[props.portal_type][props.tag];
</script>

<style scoped>

</style>