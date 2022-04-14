<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="barrierefreiheit"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"

    export default {
        name: "accessibility",
        components: {ContentBySubject},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Barrierefreiheit'
        },
    }
</script>

<style scoped>

</style>
