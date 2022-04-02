<template>
    <NuxtLayout name="search">
      <div>
      <h1 class="dcterms_title" v-if='entityStore.dataset'>{{ entityStore.dataset.dcterms_title[0] }}</h1>
      <h2 class="dcterms_description" v-if='entityStore.dataset'>{{ entityStore.dataset.dcterms_description[0] }}</h2>

      <Distributions v-if='entityStore.dataset' :distributions="JSON.parse(entityStore.dataset.dcat_distribution)" >
      </Distributions>

      <Publisher v-if='entityStore.dataset && entityStore.dataset.dct_publisher' :publisher="entityStore.dataset.dct_publisher">
      </Publisher>

      <ContactPoint v-if='entityStore.dataset && entityStore.dataset.dcat_contactPoint' :contactPoint="JSON.parse(entityStore.dataset.dcat_contactPoint[0])">
      </ContactPoint>

      </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
    import {onMounted} from 'vue';
    import {useEntityStore} from '~/stores/entities'
    import Distributions from "~/components/Distributions.vue";
    import Publisher from "~/components/Publisher.vue";
    import ContactPoint from "~/components/ContactPoint.vue";

    const entityStore = useEntityStore()
    const route = useRoute()

    onMounted( () => {
      entityStore.dataset_uri = route.params.dataset
      entityStore.getDataset()
})

</script>

<style scoped>
    .dcterms_title {
       margin-bottom: 5px;
       font-size: 1.8rem;
        color: inherit;
    }

    .dcterms_description {
        margin-bottom: 0;
        margin-top: 0;
        font-size: 1.3rem;
    }



</style>
