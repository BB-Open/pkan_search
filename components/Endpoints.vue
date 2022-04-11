<template>
    <ul class="endpoint_div">
      <li class="endpoint_item" v-for="endpoint in endpoints">
        <a :href="endpoint.dcat_endpointURL">{{endpoint.dcat_endpointURL}}</a>
      </li>
    </ul>
</template>

<script setup lang="ts">
    const props = defineProps({
        endpoints: {type: Object, required: true},
    });
</script>

<style scoped>
    .endpoint_item {
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
