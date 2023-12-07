<template>
    <ul class="distribution_div nobull">
      <li class="distribution_item" v-for="dist in distributions">
        <p>Medientyp oder Erweiterung: {{dist.dct_format}}<br/>{{dist.dct_title}}</p>
        <p>
          <span v-if="dist.dct_license">Lizens: {{dist.dct_license}}</span><span v-else>Lizens: Keine Lizens</span><br/>
          Download URL: <a v-if="dist.dcat_downloadURL" :href="dist.dcat_downloadURL">
          <span v-if="dist.dct_title" >{{dist.dct_title}}</span> <span v-if="dist.dct_format">[{{dist.dct_format}}]</span>
          <em v-if="is_external_link(dist.dcat_downloadURL)" class="external_link" title="Externer Link"></em>
        </a>
        <a v-else v-if="dist.dcat_accessURL" :href="dist.dcat_accessURL">
          <span v-if="dist.dct_title" >{{dist.dct_title}}</span>
          <span v-if="dist.dct_format">[{{dist.dct_format}}]</span>
          <em v-if="is_external_link(dist.dcat_accessURL)" class="external_link" title="Externer Link"></em>
        </a></p>
      </li>
    </ul>
</template>

<script setup lang="ts">
    import {is_external_link} from "~/stores/utils";

    const props = defineProps({
        distributions: {type: Object, required: true},
    });
</script>

<style scoped>
    .distribution_item {
      padding-right: 1rem;
      padding-left: 1rem;
      border: #d9d9d9 3px solid;
      margin-bottom: 1px;
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

    distribution_div {

    }

</style>
