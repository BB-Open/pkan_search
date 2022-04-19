<template>
    <NuxtLayout name="search">
        <StartSearchField></StartSearchField>
        <ContentBySubject portal_type="Document" tag="startseite"></ContentBySubject>
        <div class="hidesmallscreen">
            <h2>Kategorien:</h2>
            <StartFacets></StartFacets>
        </div>
    </NuxtLayout>
</template>


<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    import SearchField from "~/components/StartSearchField"
    import StartFacets from "~/components/StartFacets"
    export default {
        name: "index",
        components: {ContentBySubject, SearchField, StartFacets},
      head : {
        title: 'Datenadler: Das OpenDataPortal für Brandenburg: Startseite'
      }

    }


</script>

<style scoped>

</style>
