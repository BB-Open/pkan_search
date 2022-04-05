<template>
  <label class="textsearch">
    <div class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Sie werden automatisch zur Suchseite weiter geleitet, sobald Sie eine Taste betätigen.</div>
    <input ref="startInput" type="text" v-model="entityStore.query" placeholder="In den Datensätzen suchen" class="single_line_edit" @keyup="redirect_search">
  </label>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'
import {onMounted} from "vue";

const entityStore = useEntityStore();

entityStore.reset_all();

const router = useRouter();

function redirect_search() {
  if (entityStore.query !== '') {
    router.push('/search')
  }
}
// focussing the input on entering the site
const startInput = ref()
onMounted(() => {
  setTimeout(() => {startInput.value.focus()}, 10)
})
</script>

<style scoped>
  .single_line_edit {
    margin: 0;
    white-space: nowrap;
    display: table-cell;
    vertical-align: middle;
    padding-left: 5px;
    height: 30px;
    width: 100%;
  }
</style>

