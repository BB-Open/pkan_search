<template>
    <NuxtLayout name="plone">
        <PublisherByUID :uid="$route.params.id"></PublisherByUID>
    </NuxtLayout>
</template>

<script>
    import PublisherByUID from "~/components/plone/PublisherByUID"
    export default {
        name: "publisher-[id].vue",
        components: {PublisherByUID},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Datenbereitsteller Detail'
        },
    }
</script>

<style scoped>

</style>
