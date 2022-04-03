<template>
    <div class="flex items-center justify-center h-64 text-gray-500">Page [{{ routePath }}] Not Found</div>
</template>

<script setup>
import {inject} from "vue";

const routePath = inject('originalPath')

</script>

<style scoped>

</style>
