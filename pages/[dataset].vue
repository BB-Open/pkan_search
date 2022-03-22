<template>
    <NuxtLayout name="plone">
        <h1>{{ $route.params.dataset }}</h1>
        <p>Das ist eine dynamischer Seite</p>
    </NuxtLayout>
</template>

<script>
    export default {
        name: "[dataset].vue",
    }
</script>

<style scoped>

</style>