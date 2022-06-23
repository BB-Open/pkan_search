<template>
    <NuxtLayout name="search">
        <h1>Suche</h1>
        <SearchSuggest></SearchSuggest>
        <div class="search">
            <div class="content">
                <SearchResults></SearchResults>
            </div>
            <section class="">
                <order></order>
                <facets></facets>
                <deep></deep>
            </section>
        </div>
    </NuxtLayout>
</template>


<script setup lang="ts">
    import SearchSuggest from "~/components/SearchSuggest.vue";
    import SearchResults from "~/components/SearchResults.vue"

    import {useEntityStore} from '~/stores/entities'
    import {useMessageStore} from '~/stores/messages'
    import Facets from "~/components/facets.vue";
    import Order from "~/components/order.vue";
    import Deep from "~/components/deep.vue";
    import {useHead} from "@vueuse/head";

    const messageStore = useMessageStore();
    messageStore.write_polite('Die Suchseite für das Open-Data-Portal Brandenburg wurde geladen. Inhalte werden mit jeder Eingabe neu geladen.');
    messageStore.write_assertive('');
    messageStore.write_error('');

    const head = useHead({
      title: 'Datenadler: Das OpenDataPortal für Brandenburg: Suche'
    })

</script>

<style scoped>

    h1 {
        font-size: 1.5rem;
    }

    .search {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    section h2 {
        margin-top: 25px;
    }

    section {
        width: 25%;
        padding-left: 1.4rem;
    }

    .content {
        flex-direction: column;
        flex-wrap: wrap;
        width: 75%
    }

    @media (max-width: 640px) {

        .search {
          display: block;
        }

        .content {
            width: 100%;
        }

        .search {
          width: 100%;
        }

        section {
          width: 100%;
          padding-left: 0;
        }
    }

</style>
