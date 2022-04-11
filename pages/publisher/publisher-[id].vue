<template>
    <NuxtLayout name="plone">
        <PublisherByUID :uid="$route.params.id"></PublisherByUID>
    </NuxtLayout>
</template>

<script>
    import PublisherByUID from "~/components/plone/PublisherByUID"
    export default {
        name: "publisher-[id].vue",
        components: {PublisherByUID}
    }
</script>

<style scoped>

</style>