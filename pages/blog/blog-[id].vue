<template>
    <NuxtLayout name="plone">
        <ContentByUID :uid="$route.params.id"></ContentByUID>
    </NuxtLayout>
</template>


<script>
    import ContentByUID from "~/components/plone/ContentByUID"
    export default {
        name: "blog-[id]",
        components: {ContentByUID}
    }
</script>

<style scoped>

</style>