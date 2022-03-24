<template>
    <div role="alert">
        <div class="portalMessage error" v-if="messageStore.errorMessage">
            <div>Fehler</div>
            <div>{{messageStore.errorMessage}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useMessageStore} from '~/stores/messages.js'
    const messageStore = useMessageStore();
</script>

<style scoped>

</style>