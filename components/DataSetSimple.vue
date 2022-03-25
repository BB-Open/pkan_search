<template>
    <div>{{item}}</div>
</template>

<script setup lang="ts">
    const props = defineProps({
        item: {type: Object, required: true},
    });
</script>

<style scoped>

</style>