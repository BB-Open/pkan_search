<template>
    <NuxtLayout name="plone">
        <h1>{{ $route.params.id }}</h1>
        <p>Das ist eine dynamischer Seite</p>
    </NuxtLayout>
</template>

<script>
    export default {
        name: "blog-[id].vue",
    }
</script>

<style scoped>

</style>