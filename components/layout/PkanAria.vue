<template>
    <div>
        <div class="hidden_help_text" role="status" aria-live="polite" aria-relevant="all" aria-atomic="true" id="pkan_aria_polite">
            {{messageStore.politeMessage}}
        </div>
        <div class="hidden_help_text" role="status" aria-live="assertive" aria-relevant="all" aria-atomic="true" id="pkan_aria_assertive">
            {{messageStore.assertiveMessage}}
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useMessageStore} from '~/stores/messages.js'
    const messageStore = useMessageStore();

</script>


<style scoped>

</style>