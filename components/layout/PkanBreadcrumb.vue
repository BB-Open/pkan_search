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
    import {onMounted} from 'vue'

    const breadcrumbStore = useBreadcrumbStore();

    onMounted(() => {
        console.log('Mounted')
        breadcrumbStore.get_elements();
    })


</script>

<style scoped>
    .describer {
        color: #C13B33;
        font-weight: bold;
    }

    .breadcrumb a {
        color: #161616;
        text-decoration: unset;
    }

    .breadcrumb a:hover, .breadcrumb a:active, .breadcrumb a:focus {
        background-color: unset;
        color: #C13B33;
      text-decoration: underline;
    }

    .breadcrumb {
        font-size: 0.8125rem;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .breadcrumb p {
        margin-bottom: 0;
    }

    .fa {
        padding-left: 5px;
        padding-right: 5px;
    }

</style>
