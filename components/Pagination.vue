<template>
    <div class="hidden_help_text" id="page_description">Sie befinden sich auf der Seitenverwaltung. Hier können Sie durch die Suchergebnisse blättern.
        Für die Steuerung der Seitenverwaltung nutzen Sie die Tab-Taste zum wechseln
        zwischen den Links. Bestätigen sie mit Enter. Mit der Tab-Taste können Sie die Seitenverwaltung ebenso verlassen.
    </div>
    <paginate v-if='entityStore.entityTotalCount > entityStore.perPageResults'
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
