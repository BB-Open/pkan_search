<template>
    <NuxtLayout name="search">
        <h1>Suche</h1>
        <SearchSuggest></SearchSuggest>
        <div class="search">
            <div class="content">
                <SearchResults></SearchResults>
            </div>
            <section class="hidesmallscreen">
                <h2 class="controls_heading">Kriterien</h2>
                <div>Todo</div>
            </section>
        </div>

    </NuxtLayout>
</template>


<script setup lang="ts">
    import SearchSuggest from "~/components/SearchSuggest.vue";
    import SearchResults from "~/components/SearchResults.vue"

    import {useMessageStore} from '~/stores/messages'

    const messageStore = useMessageStore();
    messageStore.write_polite('Die Suchseite für das Open-Data-Portal Brandenburg wurde geladen. Inhalte werden mit jeder Eingabe neu geladen.');
    messageStore.write_assertive('');
    messageStore.write_error('');

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
        width: 30%;
        padding-left: 15px;
    }

    .content {
        flex-direction: column;
        flex-wrap: wrap;
        width: 70%
    }

    @media (max-width: 640px) {
        .content {
            width: 100%;
        }
    }

</style>
