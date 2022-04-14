<template>
    <NuxtLayout name="plone">
        <h1>Datenbereitsteller</h1>
        <ListingPublisher></ListingPublisher>
    </NuxtLayout>
</template>

<script>
    import ListingPublisher from "../../components/plone/ListingPublisher";

    export default {
        name: "index.vue",
        components: {ListingPublisher},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Datenbereitsteller'
        },
    }
</script>

<style scoped>

</style>
