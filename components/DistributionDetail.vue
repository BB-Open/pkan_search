<template>
    <ul class="distribution_div nobull">

      <li class="distribution_item" v-for="dist in distributions">
        <p><span v-if="dist.dct_format">Medientyp oder Erweiterung: {{dist.dct_format}}<br/></span>{{dist.dct_title}}</p>
        <p v-if="dist.dct_description">Beschreibung: {{dist.dct_description}}</p>
        <p>
          <span v-if="dist.dct_license">Lizenz: {{dist.dct_license}}</span><span v-else>Lizenz: Keine Lizenz</span><br/>
          Download URL: <a v-if="dist.dcat_downloadURL" :href="dist.dcat_downloadURL">
          {{dist.dcat_downloadURL}}
          <em v-if="is_external_link(dist.dcat_downloadURL)" class="external_link" title="Externer Link"></em>
        </a>
        <a v-else v-if="dist.dcat_accessURL" :href="dist.dcat_accessURL">
          {{dist.dcat_accessURL}}
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
      border-top: #d9d9d9 2px solid;
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
