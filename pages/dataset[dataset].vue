<template>
    <NuxtLayout name="plone">
      <div v-if="entityStore.dataset">
        <div class="header">
          <h1 class="dct_title" v-if="entityStore.dataset.dct_title">{{ entityStore.dataset.dct_title }}</h1>
        </div>

        <div class="header">
          <p class="dct_description" v-if='entityStore.dataset.dct_description'>{{ entityStore.dataset.dct_description[0] }}</p>
          <p class="dct_description" v-if="entityStore.dataset.dcat_landingpage">Webseite: <a :href="entityStore.dataset.dcat_landingpage">{{entityStore.dataset.dcat_landingpage}}</a></p>
        </div>

        <div class="header" v-if="entityStore.dataset.dct_publisher">
          <Publisher v-if='entityStore.dataset.dct_publisher' :publisher="entityStore.dataset.dct_publisher">
          </Publisher>
        </div>

        <div class="header">
          <p class="dct_description" v-if="entityStore.dataset.dcat_theme_facet">Kategorie: {{entityStore.dataset.dcat_theme_facet.join(', ')}}</p>
          <p class="dct_description" v-if="entityStore.dataset.dct_modified">Letzte Änderung: {{entityStore.dataset.dct_modified}}</p>
          <p class="dct_description" v-if="entityStore.dataset.dcat_keyword">Schlagwörter: {{entityStore.dataset.dcat_keyword.join(', ')}}</p>
        </div>

        <div class="header">
          <DownloadOne></DownloadOne>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_endpointURL">
          <h2 class="dataset_header">Service URIs:</h2>
          <Endpoints v-if='entityStore.dataset.dcat_endpointURL' :endpoints="JSON.parse(entityStore.dataset.dcat_endpointURL)" >
          </Endpoints>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_servesDataset">
          <h2 class="dataset_header">Angebotene Datensätze:</h2>
          <Datasets v-if='entityStore.dataset.dcat_servesDataset' :datasets="JSON.parse(entityStore.dataset.dcat_servesDataset)" >
          </Datasets>
        </div>

        <div class="header" v-if="entityStore.dataset.dcat_distribution">
          <h2 class="dataset_header">Distributionen:</h2>
          <DistributionDetail v-if='entityStore.dataset.dcat_distribution' :distributions="JSON.parse(entityStore.dataset.dcat_distribution)" >
          </DistributionDetail>
        </div>

<!--        <div class="header">-->
<!--          <License v-if='entityStore.dataset.dct_license_facet' :license="entityStore.dataset.dct_license_facet">-->
<!--          </License>-->
<!--        </div>-->
<!--        <div class="header">-->
<!--          <RightsStatement v-if="entityStore.dataset.dct_rightsstatement" :statement="entityStore.dataset.dct_rightsstatement[0]"></RightsStatement>-->
<!--        </div>-->

      </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
    import {onMounted, onServerPrefetch} from 'vue';
    import {useEntityStore} from '~/stores/entities'
    import Distributions from "~/components/Distributions.vue";
    import Endpoints from "~/components/Endpoints.vue";
    import Publisher from "~/components/Publisher.vue";
    import ContactPoint from "~/components/ContactPoint.vue";
    import License from "~/components/License.vue";
    import RightsStatement from "~/components/RightsStatement.vue";
    import {useHead} from "@vueuse/head";
    import DownloadOne from "~/components/download/DownloadOne.vue";

    const entityStore = useEntityStore()
    const route = useRoute()

    const head = useHead({
      title: 'Datenadler: Das OpenDataPortal für Brandenburg: Datensatz Detail'
    })

    onMounted( async () => {
      entityStore.dataset_uri = route.params.dataset
      await entityStore.getDataset()
    })

    onServerPrefetch(async () => {
      entityStore.dataset_uri = route.params.dataset
      await entityStore.getDataset()
    })

</script>

<style scoped>
    .dct_title {
       margin-bottom: 5px;
      color: inherit;
    }

    .dct_description {
        margin-bottom: 0;
        margin-top: 0;
      font-size: 1rem;
    }

    .header {
      margin-bottom: 1rem;
    }

    .endpoint_item {
      margin-right : 1em;
    }


</style>
