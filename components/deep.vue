<template>
  <div class="deep">
    <h2 class="hidden_help_text">Suchlink Anzeigen</h2>
      <div class="input_checkbox">
        <input type='checkbox'
           name='Suchlink anzeigen'
           :checked='entityStore.showDeepLinks'
           @click='entityStore.toggleDeepLinks'
           @keydown.enter.prevent="entityStore.toggleDeepLinks">
        <label>Suchlink anzeigen</label>
      </div>
  </div>
</template>

<script setup lang="ts" >
  import {useEntityStore} from '~/stores/entities'

  const entityStore = useEntityStore();
  const router = useRouter();

  watch( () => entityStore.showDeepLinks, (showDeepLinks) => {
    let currentRoute = router.currentRoute
    if (showDeepLinks) {
      let newPath = currentRoute.value.path + "#/" + entityStore.getParams
      router.replace(newPath)
    } else
    {
      router.replace(currentRoute.value.path)
    }
  })
</script>

<style scoped>

</style>
