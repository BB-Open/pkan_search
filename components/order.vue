<template>
    <h2 class="hidden_help_text">Sortierung</h2>
    <div class="order">
        <h3>Sortieren nach</h3>
        <form @submit.prevent="">
            <label aria-label="Wählen Sie die Sortierreihenfolge der Suchergebnisse.">
                <select v-model="entityStore.sortOrder" @change="entityStore.reset_pagination_and_solr_get()">
                    <option v-for="option in options" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </label>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useEntityStore } from '~/stores/entities'
    const entityStore = useEntityStore();

    const options = [
        { text: 'Relevanz', value: 'score' },
        { text: 'Alphabetisch aufsteigend', value: 'asc' },
        { text: 'Alphabetisch absteigend', value: 'desc' }
        ]
</script>

<style scoped>
    .order {
        margin-bottom: 0.9rem;
        background-color: #eeeeee;
        padding: 0.1rem;
    }

    .order h3{
        font-size: 1.2rem;
        font-style: normal;
    }

    .order label {
        font-size: 1rem;
    }

    .order label select {
        font-size: 1rem;
        background-color: white;
        width: 100%;
        margin-bottom: 0.45rem;
    }

</style>