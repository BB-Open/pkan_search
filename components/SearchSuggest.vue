<template>
    <div class="textsearch">
        <div class="simple-typeahead">
            <label class="simple-typeahead-input-block">
                <span class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Die
                    Ergebnisse werden dynamisch geladen.
                    Mit den Hoch-und Runter-Pfeiltasten können Sie zwischen den Vorschlägen navigieren und mit Enter
                    übernehmen. Mit der Tab-Taste verlassen Sie das Suchfeld.
                </span>
                <input class="simple-typeahead-input"
                       v-model="entityStore.query"
                       @keyup="onKeyUp"
                       @blur="onBlur"
                       @focus="onFocus"
                       @keydown.down.prevent="onArrowDown"
                       @keydown.up.prevent="onArrowUp"
                       @keydown.enter.prevent="onEnter"
                       placeholder="Bitte Suchbegriffe eingeben"
                       ref="searchInput"
                       type="text"
                       autofocus
                />
            </label>

            <div v-if="is_visible && entityStore.suggestionList.length" class="simple-typeahead-list">
                <li
                        class="simple-typeahead-list-item"
                        :class="{ 'simple-typeahead-list-item-active': currentSelectionIndex === index }"
                        v-for="(item, index) in entityStore.suggestionList"
                        :key="index"
                        @mousedown.prevent
                        @click="onSelectItem(item)"
                        @mouseenter="currentSelectionIndex = index"
                        v-html='item.label'
                >
                </li>
            </div>
        </div>
        <div class="input_button">
            <button
                    @click="delete_clicked()"
                    class="button textsearch_button"
                    type="submit" aria-label="Suchtext löschen" title="Löschen">
                X
            </button>
        </div>
        <div class="simple-typeahead-count">Treffer: {{entityStore.entityTotalCount}}</div>
    </div>
</template>

<script setup lang="ts">

    import {useEntityStore} from '~/stores/entities'
    import {onMounted, ref} from 'vue'

    const entityStore = useEntityStore()
    const currentSelectionIndex = ref(0)
    const searchInput = ref()

    onMounted(() => {
        console.log('onMounted')
        setTimeout(() => {
            searchInput?.value?.focus()
        }, 10)
    })

    const delete_clicked = () => {
        entityStore.reset_query()
        entityStore.reset_pagination_and_solr_get()
        setTimeout(() => {
            searchInput?.value?.focus()
        }, 10)
    }


    const onKeyUp = (keyEvent) => {
        if ((keyEvent.key == "ArrowDown") || (keyEvent.key == "ArrowUp")) {
            return
        }

        entityStore.reset_pagination_and_solr_get()
        currentSelectionIndex.value = 0
    }


    const onSelectItem = (item) => {
        entityStore.query = item.label.replaceAll(/(<([^>]+)>)/gi, "");
        entityStore.reset_pagination_and_solr_get()
    }

    const onBlur = () => {
        entityStore.isBlur = true
        // searchInput?.value?.focus()
    }

    const onFocus = () => {
        entityStore.isBlur = false
    }

    const onArrowDown = () => {
        if (currentSelectionIndex.value < entityStore.suggestionList.length - 1) {
            currentSelectionIndex.value++;
        }
    }

    const onArrowUp = () => {
        if (currentSelectionIndex.value > 0) {
            currentSelectionIndex.value--;
        }
    }

    const onEnter = () => {
        onSelectItem(entityStore.suggestionList[currentSelectionIndex.value])
    }


    const is_visible = computed(() => !entityStore.isBlur && entityStore.is_suggestions)


</script>

<style scoped>
    .textsearch_button:hover, .textsearch_button:focus {
        border: 2px solid #C13B33;
        background-color: #eeeeee;
        color: #C13B33;
    }

    .textsearch_button {
        padding: 0;
        margin: 0;
        height: 30px;
        width: 30px;
        border-radius: 2px;
    }

    .input_button {
        display: table-cell;
        width: 30px;
        height: 30px;
    }

    .simple-typeahead-count {
        display: table-cell;
        padding-left: 1rem;
        width: 150px
    }

    .simple-typeahead {
        margin-bottom: 0.3rem;
        white-space: nowrap;
        display: table-cell;
    }

    .simple-typeahead-input-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .simple-typeahead-input-block > input {
        flex: 1;
        margin-bottom: 0;
    }

    .simple-typeahead .simple-typeahead-count {
        margin-left: 1em;
        white-space: nowrap;
    }

    .simple-typeahead .simple-typeahead-list {
        column-width: 30ch;
        list-style-type: none; /* Remove bullets */
        left: 0;
        right: 0;
        background-color: #eeeeee;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }

    .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
        cursor: pointer;
        background-color: #eeeeee;
        padding: 0.3rem 0.5rem;
        font-size: 0.7rem;
    }

    .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item:last-child {
        border-bottom: none;
    }

    .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item.simple-typeahead-list-item-active {
        background-color: #e1e1e1;
        text-decoration: underline;
        color: #C13B33;
    }

    .simple-typeahead {
        /*    margin-bottom: 8%; */
    }

    .textsearch {
        display: table;
        width: 100%;
        margin-bottom: 1rem;
    }

    @media (max-width: 640px) {

    }

</style>

