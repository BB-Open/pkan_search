<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="haftung"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"
    export default {
        name: "haftung",
        components: {ContentBySubject}
    }
</script>

<style scoped>

</style>