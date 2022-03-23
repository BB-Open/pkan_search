<template>
    <h1>{{ ploneStore.PortalTypeSubject(props.portal_type, props.tag).title }}</h1>
    <div class="description" v-if="ploneStore.PortalTypeSubject(props.portal_type, props.tag).description">{{ ploneStore.PortalTypeSubject(props.portal_type, props.tag).description}}</div>
    <div v-html="ploneStore.PortalTypeSubject(props.portal_type, props.tag).text.data"></div>
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'

    const ploneStore = usePloneStore();

    const props = defineProps({
        portal_type: {type: String, required: true},
        tag: {type: String, required: true},
    });

    ploneStore.ContentBySubject(props.portal_type, props.tag);
</script>

<style scoped>

</style>