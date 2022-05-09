<template>
    <client-only>
        <h2 class="hidden_help_text">Suche konfigurieren</h2>
        <div class="deep">
            <h3 class="facet_name">Deep Links</h3>
            <form @submit.prevent="">
                <div class="parent">
                    <div class="input_checkbox">
                        <input type='checkbox'
                               name='Suchlink anzeigen'
                               :checked='entityStore.showDeepLinks'
                               @click='entityStore.toggleDeepLinks'
                               @keydown.enter.prevent="entityStore.toggleDeepLinks">
                    </div>
                    <div class="label" @click='entityStore.toggleDeepLinks'><label
                            :class="entityStore.showDeepLinks && 'checked'"><span class="name_column">Suchlink im Browser anzeigen</span></label>
                    </div>
                </div>

            </form>
        </div>
    </client-only>
</template>

<script setup lang="ts">
    import {useEntityStore} from '~/stores/entities'

    const entityStore = useEntityStore();

    onMounted(() => {
        entityStore.load_query()
    });

    watch(() => [entityStore.showDeepLinksVal, entityStore.getParams], entityStore.set_deep_link)
</script>

<style scoped>
    .label {
        padding-left: 2px;
    }

    .parent {
        display: flex;
    }

    .checked {
        font-weight: 700;
    }

    .deep {
        margin-bottom: 0.9rem;
        background-color: #eeeeee;
        padding: 0.1rem;
    }

    .deep h3 {
        font-size: 1.2rem;
        font-style: normal;
    }

    .facet_name {
        margin-bottom: 0.1rem;
    }

    .name_column {
        font-size: 0.8rem;
    }

    .count_column {
        font-size: 0.8rem;
    }

    div label:hover {
        text-decoration: underline;
        background-color: unset;
        color: #C13B33;
    }

</style>
