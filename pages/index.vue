<template>
    <NuxtLayout name="search">
        <SearchField></SearchField>
        <ContentBySubject portal_type="Document" tag="startseite"></ContentBySubject>
        <div class="hidesmallscreen">
            <h2>Kategorien:</h2>
            <div>Todo</div>
        </div>
    </NuxtLayout>
</template>


<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    import SearchField from "~/components/SearchField"
    export default {
        name: "index",
        components: {ContentBySubject, SearchField}
    }


</script>

<style scoped>

</style>
