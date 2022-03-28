<template>
  <label class="textsearch">
    <div class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Die Ergebnisse werden dynamisch geladen.</div>
    <div class="simple-typeahead">
      <div class="simple-typeahead-input-block">
        <input class="simple-typeahead-input"
               v-model="entityStore.query"
               @keyup="entityStore.getSolr"
               @blur="onBlur"
               @focus="onFocus"
               placeholder="Bitte Suchbegriffe eingeben"
               ref="searchInput"
               type="text"
        />
        <span class="simple-typeahead-count">Treffer: {{entityStore.entityCount}}</span>
        </div>
      <div v-if="is_visible" class="simple-typeahead-list">
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
  </label>
</template>

<script setup lang="ts">

import { useEntityStore } from '~/stores/entities'
import {ref, onMounted, nextTick} from 'vue'

const currentSelectionIndex = ref(undefined)
const entityStore = useEntityStore()

const searchInput = ref()

onMounted(() => {
  console.log('onMounted')
  nextTick(() => searchInput.value.focus())
})

const onSelectItem = (item) => {

  entityStore.query = item.label.replaceAll(/(<([^>]+)>)/gi, "");
  entityStore.getSolr()
}

const onBlur = () => {
  entityStore.isBlur = true
}

const onFocus = () => {
  entityStore.isBlur = false
}

const is_visible = computed( () => !entityStore.isBlur && entityStore.is_suggestions)

console.log('onSSR')

</script>

<style scoped>
.simple-typeahead {
  position: relative;
}

.simple-typeahead-input-block {
  display: flex;
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
  position: absolute;
  left : 0;
  right : 0;
  max-height: 400px;
  overflow-y: auto;
  z-index: 9;
}

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
  cursor: pointer;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem;
  /*border-bottom: 0.1rem solid #d1d1d1;*/
  border-left: 0.1rem solid #d1d1d1;
  border-right: 0.1rem solid #d1d1d1;
  font-size: x-small;
}

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item:last-child {
  border-bottom: none;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item.simple-typeahead-list-item-active {
  background-color: #e1e1e1;
}

.entity_payload {
  width: 100%;
  font-size: small;
  padding-top: 1em;
}
.entity_dcterms_title {
  font-size: small;
  padding-top: 1em;
}
.entity_dcterms_description {
  font-size: xx-small;
}

</style>

