<template>
    <div class="breadcrumb hidesmallscreen" aria-label="Pfadangabe">
        <div>
            <span class="describer">Sie sind hier: </span><span> Todo </span><span> <i class="fa fa-caret-right"></i> </span><span> Todo </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PkanBreadcrumb"
        // todo
    }
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

</style>