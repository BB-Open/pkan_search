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
        components: {ListingPublisher}
    }
</script>

<style scoped>

</style>