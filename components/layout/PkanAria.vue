<template>
    <div>
        <div class="hidden_help_text" role="status" aria-live="polite" aria-relevant="all" aria-atomic="true" id="pkan_aria_polite">
            {{aria_polite}}
        </div>
        <div class="hidden_help_text" role="status" aria-live="assertive" aria-relevant="all" aria-atomic="true" id="pkan_aria_assertive">
            {{aria_assertive}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PkanAria'
        // todo
    }
</script>

<style scoped>

</style>