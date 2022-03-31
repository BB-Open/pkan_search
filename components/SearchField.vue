<template>
  <label class="textsearch">
    <div class="hidden_help_text">Geben Sie hier die Suchbegriffe ein, um in den Datensätzen zu suchen. Sie werden automatisch zur Suchseite weiter geleitet, sobald Sie eine Taste betätigen.</div>
    <input type="text" v-model="entityStore.query" placeholder="In den Datensätzen suchen" class="single_line_edit" @keyup="redirect_search">
  </label>
</template>

<script setup lang="ts">

import {useEntityStore} from '~/stores/entities'

const entityStore = useEntityStore();

entityStore.query = '';

function redirect_search() {
  let router = useRouter();
  if (entityStore.query !== '') {
    router.push('/search')
  }
}

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

