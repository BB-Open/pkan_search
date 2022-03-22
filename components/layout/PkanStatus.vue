<template>
    <div role="alert">
        <div class="portalMessage error" v-if="value">
            <div>Fehler</div>
            <div>{{value}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PkanStatus"
        // todo
    }
</script>

<style scoped>

</style>