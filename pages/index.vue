<template>
    <NuxtLayout name="search">
        <h1>DatenAdler: Das Open-Data-Portal für Brandenburg</h1>
        <SearchSuggest></SearchSuggest>
        <SearchResults></SearchResults>
    </NuxtLayout>
</template>


<script setup lang="ts">
import SearchSuggest from "~/components/SearchSuggest.vue";
import SearchResults from "~/components/SearchResults.vue"

import { useMessageStore } from '~/stores/messages'

    const messageStore = useMessageStore();
    messageStore.write_polite('Die Startseite für das Open-Data-Portal Brandenburg wurde geladen. Sie befinden sich auf einer Suchseite. Inhalte werden mit jeder Eingabe neu geladen.');
    messageStore.write_assertive('');
    messageStore.write_error('');

</script>

<style scoped>

    h1 {
        font-size: 1.3rem;
    }

</style>
