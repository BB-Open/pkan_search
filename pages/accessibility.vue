<template>
    <NuxtLayout name="plone">
        <ContentBySubject portal_type="Document" tag="barrierefreiheit"></ContentBySubject>
    </NuxtLayout>
</template>

<script>
    import ContentBySubject from "~/components/plone/ContentBySubject"

    export default {
        name: "accessibility",
        components: {ContentBySubject}
    }
</script>

<style scoped>

</style>