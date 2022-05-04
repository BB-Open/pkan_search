<template>
    <div>
        <ul class="box_area nobull">
            <li v-for="item in ploneStore.ploneListing['PublisherCard']" class="box" v-if="ploneStore.ploneListing['PublisherCard'] && ploneStore.ploneListing['PublisherCard'].length">
              <NuxtLink :to="'/publisher/publisher-' + item.UID" :aria-label="item.title + ' weiterlesen'">
                <div class="plone_listing_element">
                    <h2 class="element_title">{{ item.title }}</h2>
                    <div class="element_date" v-if="item.date_text">{{ item.date_text }}</div>
                    <div class="element_logo" v-if="item.logo"><img :src="item.logo.download" :alt="item.title + ' Logo'"/></div>
                    <div class="element_description">{{ item.description }}</div>
                </div>
              </NuxtLink>
            </li>
        </ul>
        <div v-if="!ploneStore.ploneListing['PublisherCard'] || !ploneStore.ploneListing['PublisherCard'].length">
            <p>Es sind keine Inhalte verfügbar oder diese werden noch geladen.</p>
        </div>
    </div>
</template>

<script setup type="ts">
    import {usePloneStore} from '~/stores/plone.js'
    import {onMounted, onServerPrefetch} from 'vue'


    const ploneStore = usePloneStore();

    onMounted(async () => {
        await ploneStore.ListingByType('PublisherCard', 'Datenbereitsteller')
    })

    onServerPrefetch(async () => {
        await ploneStore.ListingByType('PublisherCard', 'Datenbereitsteller')
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
        width: 240px;
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

    .plone_listing_element:hover, .plone_listing_element:focus {
      background-color: #C13B33;
      color: #fff;
    }

    .box {
        width: 300px;
    }

    .box_area {
      justify-content: space-between;
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
