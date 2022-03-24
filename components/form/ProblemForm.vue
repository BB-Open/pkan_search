<template>
    <h1>Fehler melden</h1>
    <div class="portalMessage info" v-if="problemStore.infoMessage">
        <div>Info</div>
        <div>{{problemStore.infoMessage}}</div>
    </div>
    <form @submit.prevent="">
        <label class="textsearch">
            <div class="textsearch_label">Ihre Nachricht</div>
            <textarea class="textsearch_area_problem" v-model="problemStore.message" placeholder="Geben Sie Ihre Nachricht ein" rows="8" aria-describedby="help" aria-label="Ihre Nachricht"></textarea>
            <div class="input_button">
                <button
                        @click="problemStore.send_message()"
                        class="button textsearch_button"
                        type="submit" title="Fehler senden">
                    Fehler senden
                </button>
            </div>

        </label>
        <div class="help hidden_help_text" id="help">Mit diesem Formular können Sie Fehler auf der Seite melden. Fügen Sie dazu eine Beschreibung des Problems in das Textfeld ein</div>
    </form>
</template>

<script setup lang="ts">
    import {useProblemStore} from '~/stores/problem.js'

    const problemStore = useProblemStore();

    const props = defineProps({
        last_route: {type: String, required: true},
    });

    problemStore.set_route(props.last_route)
    problemStore.page_loaded()

</script>

<style scoped>

</style>