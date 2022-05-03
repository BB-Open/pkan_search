<template>
    <NuxtLayout name="plone">
      <div v-if="entityStore.dataset">
        <div class="header">
          <h1 class="dct_title" v-if="entityStore.dataset.dct_title">{{ entityStore.dataset.dct_title }}</h1>
        </div>

        <div class="header">
          <h2 class="dct_description" v-if='entityStore.dataset.dct_description'>{{ entityStore.dataset.dct_description[0] }}</h2>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_distribution">
          <h3 class="dataset_header">Links:</h3>
          <Distributions v-if='entityStore.dataset.dcat_distribution' :distributions="JSON.parse(entityStore.dataset.dcat_distribution)" >
          </Distributions>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_endpointURL">
          <h3 class="dataset_header">Service URIs:</h3>
          <Endpoints v-if='entityStore.dataset.dcat_endpointURL' :endpoints="JSON.parse(entityStore.dataset.dcat_endpointURL)" >
          </Endpoints>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_servesDataset">
          <h3 class="dataset_header">Angebotene Datensätze:</h3>
          <Datasets v-if='entityStore.dataset.dcat_servesDataset' :datasets="JSON.parse(entityStore.dataset.dcat_servesDataset)" >
          </Datasets>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_servesDataset">
          <Publisher v-if='entityStore.dataset.dct_publisher' :publisher="entityStore.dataset.dct_publisher">
          </Publisher>
        </div>

        <div class="header">
          <ContactPoint v-if='entityStore.dataset.dcat_contactPoint' :contactPoint="JSON.parse(entityStore.dataset.dcat_contactPoint[0])">
          </ContactPoint>
        </div>

        <div class="header">
          <License v-if='entityStore.dataset.dct_license_facet' :license="entityStore.dataset.dct_license_facet">
          </License>
        </div>
        <div class="header">
          <RightsStatement v-if="entityStore.dataset.dct_rightsstatement" :statement="entityStore.dataset.dct_rightsstatement[0]"></RightsStatement>
        </div>
      </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
    import {onMounted} from 'vue';
    import {useEntityStore} from '~/stores/entities'
    import Distributions from "~/components/Distributions.vue";
    import Endpoints from "~/components/Endpoints.vue";
    import Publisher from "~/components/Publisher.vue";
    import ContactPoint from "~/components/ContactPoint.vue";
    import License from "~/components/License.vue";
    import RightsStatement from "~/components/RightsStatement.vue";
    import {useHead} from "@vueuse/head";

    const entityStore = useEntityStore()
    const route = useRoute()

    const head = useHead({
      title: 'Datenadler: Das OpenDataPortal für Brandenburg: Datensatz Detail'
    })

    onMounted( () => {
      entityStore.dataset_uri = route.params.dataset
      setTimeout(() => {entityStore.getDataset()}, 10)
    })

</script>

<style scoped>
    .dct_title {
       margin-bottom: 5px;
       font-size: 1.8rem;
        color: inherit;
    }

    .dct_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: 1.2rem;
    }

    .header {
      margin-bottom: 1rem;
    }

    .endpoint_item {
      margin-right : 1em;
    }


</style>
