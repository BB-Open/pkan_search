<template>
    <div class="body_content">
    <PkanAria></PkanAria>
    <a href="#maincontent" class="hidden_help_text">Weiter zum Hauptteil der Seite</a>
    <PkanHeader></PkanHeader>
    <div class="header_content content_container">
        <PkanMenu></PkanMenu>
        <hr/>
        <PkanBreadcrumb></PkanBreadcrumb>
    </div>
    <main class="content_container singlecolumncontent" id="maincontent">
        <PkanStatus></PkanStatus>
        <div class="main_content ">
        <slot />
        </div>
    </main>
    <PkanFooter></PkanFooter>
    </div>
</template>

<script setup lang='ts'>
    import PkanAria from "../components/layout/PkanAria.vue"
    import PkanFooter from "../components/layout/PkanFooter.vue"
    import PkanHeader from "../components/layout/PkanHeader.vue"
    import PkanMenu from "../components/layout/PkanMenu.vue";
    import PkanStatus from "../components/layout/PkanStatus.vue";
    import PkanBreadcrumb from "../components/layout/PkanBreadcrumb";
    import {useRouter} from 'nuxt3/app';
    import {useHead} from "@vueuse/head";

    const router = useRouter()
    const head = useHead({
      title: 'Datenadler: Das OpenDataPortal für Brandenburg:' + router.currentRoute.value.name.toString()
    })
</script>

<style scoped>
    .header_content {
        padding-bottom: 0;
    }

    .header_content .breadcrumb {
        padding-top: 30px;
        padding-bottom: 3px;
    }

    @media (max-width: 640px) {
        .header_content .breadcrumb {
            padding-top: 10px;
            padding-bottom: 3px;
        }
    }

</style>
