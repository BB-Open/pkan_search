<template>
    <div class='datasets'><span>Angebotene Datensätze:</span>
      <ul>
      <li class="datasets_dataset" v-for="dataset in datasets">
        <a class="datasets_dataset_link" :href="dataset.dct_dataset">
          {{dataset.dcterms_title}}
        </a>
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
      margin-right : 1em;
    }
    .datasets_dataset_link {
    }
</style>
