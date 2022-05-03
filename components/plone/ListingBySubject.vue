<template>
    <div>
        <ul class="nobull">
            <li v-for="item in ploneStore.PortalTypeSubjectListing(props.portal_type, props.tag)" class="" v-if="ploneStore.PortalTypeSubjectListing(props.portal_type, props.tag) && ploneStore.PortalTypeSubjectListing(props.portal_type, props.tag).length">
                <div class="plone_listing_element">
                    <h2 class="element_title">{{ item.title }}</h2>
                    <div class="element_date" v-if="item.effective">Veröffentlicht am {{item.effective.split('T')[0]}}</div>
                    <div class="element_description">{{ item.description }}</div>
                    <NuxtLink :to="props.base_url + item.UID" :aria-label="item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
                </div>
            </li>
        </ul>
        <div v-if="!ploneStore.PortalTypeSubjectListing(props.portal_type, props.tag) || !ploneStore.PortalTypeSubjectListing(props.portal_type, props.tag).length">
            <p>Es sind keine Inhalte verfügbar oder diese werden noch geladen.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {onMounted, onServerPrefetch} from 'vue'

    const ploneStore = usePloneStore();

    const props = defineProps({
        portal_type: {type: String, required: true},
        tag: {type: String, required: true},
        title: {type: String, required: true},
        base_url: {type: String, required: true},
    });

    onMounted(async () => {
        await ploneStore.ListingBySubject(props.portal_type, props.tag, props.title);
    })

    onServerPrefetch(async () => {
        await ploneStore.ListingBySubject(props.portal_type, props.tag, props.title);
    })



</script>

<style scoped>

    .element_title {
        font-weight: bold;
        font-style: normal;
        font-size: 1rem;
        margin: 0;
    }

    .element_logo img {
        max-width: 100px;
    }

    .element_date {
        font-style: italic;
    }

    .plone_listing_element {
        padding: 15px;
        padding-left: 0;
    }

    .box .plone_listing_element {
        padding-left: 15px;
    }

    @media (max-width: 640px) {
        .plone_listing_element {
            padding: 5px;
            padding-left: 0;
        }

        .box .plone_listing_element {
            padding-left: 5px;
        }

    }

</style>