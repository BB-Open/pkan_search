<template>
  <div>
    <div class="simple-typeahead">
      <input class="simple-typeahead-input"
             v-model='entityStore.query'
             @keyup='entityStore.getSolr'
             @blur='onBlur'
             @focus='onFocus'
             placeholder="Suchbegriffe eingeben"
      /><span class="simple-typeahead-count" v-if='entityStore.entityCount>0'>Treffer: {{entityStore.entityCount}}</span>
      <div v-if="is_visible" class="simple-typeahead-list">
        <div class="simple-typeahead-list-header" v-if="$slots['list-header']"><slot name="list-header"></slot></div>
        <div
            class="simple-typeahead-list-item"
            :class="{ 'simple-typeahead-list-item-active': currentSelectionIndex === index }"
            v-for="(item, index) in entityStore.suggestionList"
            :key="index"
            @mousedown.prevent
            @click="selectItem(item)"
            @mouseenter="currentSelectionIndex = index"
        >
          <div class="simple-typeahead-list-item-text" v-html='item.label'></div>
        </div>
      </div>
    </div>
    <div class='entity_payload'>
      <div v-for='entity in entityStore.entities'>
        <div class='entity_dcterms_title'>{{ entity.dcterms_title[0] }}</div>
        <div class='entity_dcterms_description'>{{ entity.dcterms_description[0].slice(0, 255) }}</div>
        <NuxtLink :to="'/datails&id=' + encodeURIComponent(entity.id)" :aria-label="entity.dcterms_title[0]+ weiterlesen">Weiterlesen</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useEntityStore } from '~/stores/entities'

/* import {onMounted} from "@vue/runtime-core";

onMounted( () => {
  if (process.server) {
    entityStore.query = '*:*'
    entityStore.getSolr()
    entityStore.query = ''
  }
})
*/

const currentSelectionIndex = ref(undefined)
const entityStore = useEntityStore()
const query = entityStore.query
const selectItem = (item) => {
/*  let split = entityStore.query.split(' ');
  split[split.length - 1] = item.label;
  entityStore.query = split.join(' ');
*/
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

</script>

<style scoped>
.simple-typeahead {
  width: 30%;
}
.simple-typeahead > input {
  margin-bottom: 0;
}
.simple-typeahead .simple-typeahead-count {
}

.simple-typeahead .simple-typeahead-list {
  position: absolute;
  border: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 0.1rem solid #d1d1d1;
  z-index: 9;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-header {
  background-color: #f5f5f5;
  padding: 0.6rem 1rem;
  border-bottom: 0.1rem solid #d1d1d1;
  border-left: 0.1rem solid #d1d1d1;
  border-right: 0.1rem solid #d1d1d1;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-footer {
  background-color: #f5f5f5;
  padding: 0.6rem 1rem;
  border-left: 0.1rem solid #d1d1d1;
  border-right: 0.1rem solid #d1d1d1;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
  cursor: pointer;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem;
  border-bottom: 0.1rem solid #d1d1d1;
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

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item-text {
  display: inline-block;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item-count {
  display: inline-block;
  float: left;
  padding-left: 1em;
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

