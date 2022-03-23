<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="datenschutz"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    export default {
        name: "data_protection",
        components: {ContentBySubject}
    }
</script>

<style scoped>

</style>