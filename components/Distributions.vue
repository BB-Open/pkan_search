<template>
    <ul class="distribution_div">
      <li class="distribution_item" v-for="dist in distributions">
        <a v-if="dist.dcat_downloadURL" :href="dist.dcat_downloadURL">
          <span v-if="dist.dct_title" >{{dist.dct_title}}</span> <span v-if="dist.dct_format">[{{dist.dct_format}}]</span>
        </a>
        <a v-else v-if="dist.dcat_accessURL" :href="dist.dcat_accessURL">
          <span v-if="dist.dct_title" >{{dist.dct_title}}</span>
          <span v-if="dist.dct_format">[{{dist.dct_format}}]</span>
        </a>
      </li>
    </ul>
</template>

<script setup lang="ts">
    const props = defineProps({
        distributions: {type: Object, required: true},
    });
</script>

<style scoped>
    .distribution_item {
      margin-right : 1em;
    }

    .element_title {
       margin-bottom: 5px;
       font-size: 1rem;
        color: inherit;
    }

    .element_logo img {
        max-width: 100px;
    }

    .element_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: 0.9rem;
    }

    .hide {
        display: none
    }

</style>
