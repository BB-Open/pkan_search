<template>
    <h1 v-if="ploneStore.PortalTypeSubject(props.portal_type, props.tag)">{{ ploneStore.PortalTypeSubject(props.portal_type, props.tag).title }}</h1>
    <div class="description" v-if="ploneStore.PortalTypeSubject(props.portal_type, props.tag) && ploneStore.PortalTypeSubject(props.portal_type, props.tag).description">{{ ploneStore.PortalTypeSubject(props.portal_type, props.tag).description}}</div>
  <client-only>
  <div v-html="ploneStore.PortalTypeSubject(props.portal_type, props.tag) && ploneStore.improveAccessibility(ploneStore.PortalTypeSubject(props.portal_type, props.tag).text.data)"></div>
  </client-only>
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {onMounted, onServerPrefetch} from 'vue'

    const ploneStore = usePloneStore();

    const props = defineProps({
        portal_type: {type: String, required: true},
        tag: {type: String, required: true},
    });

    onMounted(async () => {
        console.log('Mounted')
        await ploneStore.ContentBySubject(props.portal_type, props.tag);
    })

    onServerPrefetch(async () => {
        console.log('Prefetch')
        await ploneStore.ContentBySubject(props.portal_type, props.tag);
    })

</script>

<style scoped>

</style>