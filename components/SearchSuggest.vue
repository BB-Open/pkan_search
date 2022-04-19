<template>
  <div class="textsearch">
    <div class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Die Ergebnisse werden dynamisch geladen.</div>
    <div class="simple-typeahead">
      <label class="simple-typeahead-input-block">
        <input class="simple-typeahead-input"
               v-model="entityStore.query"
               @keyup="onKeyUp"
               @blur="onBlur"
               @focus="onFocus"
               @keydown.down.prevent="onArrowDown"
               @keydown.up.prevent="onArrowUp"
               @keydown.enter.tab.prevent="onEnter"
               placeholder="Bitte Suchbegriffe eingeben"
               ref="searchInput"
               type="text"
               autofocus
        />
        <span class="simple-typeahead-count">Treffer: {{entityStore.entityTotalCount}}</span>
        </label>
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
    setTimeout(() => {searchInput?.value?.focus()}, 10)
  })


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
    searchInput?.value?.focus()
  }

  const onFocus = () => {
    entityStore.isBlur = false
  }

  const onArrowDown = () => {
    if (currentSelectionIndex.value < entityStore.suggestionList.length - 1 ) {
      currentSelectionIndex.value ++;
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


  const is_visible = computed( () => !entityStore.isBlur && entityStore.is_suggestions)


</script>

<style scoped>
.simple-typeahead {
  margin-bottom: 0.3rem;
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
  left : 0;
  right : 0;
  background-color: #f5f5f5 ;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
  cursor: pointer;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem;
  /*border-bottom: 0.1rem solid #d1d1d1;
  border-left: 0.1rem solid #d1d1d1;
  border-right: 0.1rem solid #d1d1d1;*/
  font-size: 0.7rem;
}

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item:last-child {
  border-bottom: none;
}
.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item.simple-typeahead-list-item-active {
  background-color: #e1e1e1;
  text-decoration: underline;
  color: #C73C35;
}
  .simple-typeahead {
/*    margin-bottom: 8%; */
  }

@media (max-width: 640px){

}

</style>

