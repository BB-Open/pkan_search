<template>
  <div></div>
</template>

<script setup lang='ts'>
  import {useEntityStore} from '~/stores/entities'

  const entityStore = useEntityStore();
  const router = useRouter();

    watch( [entityStore.showDeepLinks], (new_val, old_val) => {
      let currentRoute = router.currentRoute
      if (entityStore.showDeepLinks) {
        router.replace(currentRoute.value.path + '#/' + entityStore.getParams)
      } else
      {
        router.replace(currentRoute.value.path)
      }
    })

</script>

<style scoped>

</style>
