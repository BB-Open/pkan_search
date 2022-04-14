<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="impressum"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    export default {
        name: "impressum",
        components: {ContentBySubject},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Impressum'
        }

    }
</script>

<style scoped>

</style>
