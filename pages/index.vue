<template>
    <NuxtLayout name="search">
        <StartSearchField></StartSearchField>
        <ContentBySubject portal_type="Document" tag="startseite"></ContentBySubject>
        <DatasetRoulette></DatasetRoulette>
        <div class="">
            <h2>Kategorien:</h2>
            <StartFacets></StartFacets>
        </div>
    </NuxtLayout>
</template>


<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    import SearchField from "~/components/StartSearchField"
    import StartFacets from "~/components/StartFacets"
    import DatasetRoulette from "../components/DatasetRoulette";
    export default {
        name: "index",
        components: {DatasetRoulette, ContentBySubject, SearchField, StartFacets},
      head : {
        title: 'Datenadler: Das OpenDataPortal für Brandenburg: Startseite'
      }

    }


</script>

<style scoped>

</style>
