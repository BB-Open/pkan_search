<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="faq"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"

    export default {
        name: "faq",
        components: {ContentBySubject},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: FAQ'
        },
    }
</script>

<style scoped>

</style>
