<template>
    <NuxtLayout name="plone">
        <ContentByUID :uid="$route.params.id"></ContentByUID>
    </NuxtLayout>
</template>


<script>
    import ContentByUID from "~/components/plone/ContentByUID"
    export default {
        name: "blog-[id]",
        components: {ContentByUID},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Blog Detail'
        },
    }
</script>

<style scoped>

</style>
