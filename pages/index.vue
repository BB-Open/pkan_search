<template>
    <NuxtLayout name="search">
        <SearchField></SearchField>
        <ContentBySubject portal_type="Document" tag="startseite"></ContentBySubject>
        <div class="hidesmallscreen">
            <h2>Kategorien:</h2>
            <StartFacets></StartFacets>
        </div>
    </NuxtLayout>
</template>


<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    import SearchField from "~/components/SearchField"
    import StartFacets from "~/components/StartFacets"
    export default {
        name: "index",
        components: {ContentBySubject, SearchField, StartFacets},
    }


</script>

<style scoped>

</style>
