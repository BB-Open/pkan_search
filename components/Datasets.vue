<template>
    <div class='datasets'>
      <ul>
      <li class="datasets_dataset" v-for="dataset in datasets">
        <NuxtLink :to="'/dataset' + encodeURIComponent(dataset.dct_dataset)" >
          {{dataset.dct_title}}
        </NuxtLink>
      </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        datasets: {type: Array, required: true},
    });
</script>

<style scoped>
    .datasets_dataset{
      margin-right : 1em;  /* adjustable */
    }
</style>
