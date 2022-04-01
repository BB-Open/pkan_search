<template>
    <div class='distributions'>
      <span class="distribution" v-for="dist in distributions">
        <a v-if="dist.dcat_downloadURL" :href="dist.dcat_downloadURL">
          <span v-if="dist.dcterms_title" >{{dist.dcterms_title}}</span>
          <span v-if="dist.dcterms_format">[{{dist.dcterms_format}}]</span>
          <span v-else>Download</span>
        </a>
        <a v-else v-if="dist.dcat_accessURL" :href="dist.dcat_accessURL">
          <span v-if="dist.dcterms_title" >{{dist.dcterms_title}}</span>
          <span v-if="dist.dcterms_format">[{{dist.dcterms_format}}]</span>
          <span v-else>Zugang</span>
        </a>
      </span>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        distributions: {type: Object, required: true},
    });
</script>

<style scoped>
    .distribution {
      margin-right : 1em;
    }

    li ::marker {
         content: "aa";
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
