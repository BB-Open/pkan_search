<template>
    <div class="hidden_help_text" id="page_description">Für die Seitenverwaltung nutzen Sie die Pfeiltasten zum wechseln
        zwischen den Buttons. Bestätigen sie mit Enter. Mit Tab verlassen sie die Seitenverwaltung.
    </div>
    <paginate
            :page-count="entityStore.numberOfPages"
            v-model="entityStore.pagination_page"
            prev-text="Vorherige"
            next-text="Nächste"
            container-class="pagination b-pagination text-center"
            align="fill"
            aria-label="Seitenverwaltung."
            aria-describedby="page_description"
            page-class="page-item flex-fill"
            aria-disabled="false"
            :margin-pages="2"
            next-class="page-item flex-fill hidesmallscreen"
            prev-class="page-item flex-fill hidesmallscreen"
            :first-last-button="true"
            first-button-text="Erste"
            last-button-text="Letzte"
            :click-handler="entityStore.getSolr"
    >
    </paginate>
</template>

<script setup lang="ts">
    import {useEntityStore} from '~/stores/entities'
    import Paginate from "vuejs-paginate-next";

    const entityStore = useEntityStore();


</script>

<style scoped>



</style>