<template>
    <NuxtLayout name="plone">
        <ProblemForm :last_route="$router.options.history.state.back"></ProblemForm>
    </NuxtLayout>
</template>

<script>
    import ProblemForm from "~/components/form/ProblemForm"
    export default {
        name: "problem",
        components: {
            ProblemForm
        },
      head : {
        title: 'Datenadler: Das OpenDataPortal für Brandenburg: Probleme'
      }
    }
</script>

<style scoped>

</style>
