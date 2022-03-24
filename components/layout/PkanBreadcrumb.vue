<template>
    <client-only>
        <div class="breadcrumb hidesmallscreen" aria-label="Pfadangabe">
            <div><span class="describer">Sie sind hier: </span>
                <span v-for="item in breadcrumbStore.BCElements">
        <span v-if="item !== '/'"> <i class="fa fa-caret-right"></i> </span>

        <NuxtLink class="" :to="item"> {{ breadcrumbStore.BCTitle(item) }} </NuxtLink>
      </span>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
    import {useBreadcrumbStore} from '~/stores/breadcrumb.js'

    const breadcrumbStore = useBreadcrumbStore();

    breadcrumbStore.get_elements();
</script>

<style scoped>
    .describer {
        color: #C73C35;
        font-weight: bold;
    }

    .breadcrumb a {
        color: #161616;
        text-decoration: unset;
    }

    .breadcrumb a:hover, .breadcrumb a:active, .breadcrumb a:focus {
        background-color: unset;
        color: #C73C35;
    }

    .breadcrumb {
        font-size: 0.8125rem;
    }

    .breadcrumb p {
        margin-bottom: 0;
    }

    .fa {
        padding-left: 5px;
        padding-right: 5px;
    }

</style>