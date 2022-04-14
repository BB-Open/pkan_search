<template>
    <NuxtLayout name="plone">
        <h1>Aktuelles</h1>
        <ListingBySubject tag="blog" portal_type="Document" title="Aktuelles" base_url="/blog/blog-"></ListingBySubject>
    </NuxtLayout>
</template>

<script>
    import ListingBySubject from "~/components/plone/ListingBySubject"
    export default {
        name: "blog",
        components: {ListingBySubject},
        head : {
          title: 'Datenadler: Das OpenDataPortal für Brandenburg: Blog'
        },
    }
</script>

<style scoped>

</style>
