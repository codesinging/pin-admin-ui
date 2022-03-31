<template>
    <div v-if="screensaver.visible" class="h-screen flex flex-col items-center justify-center">
        <div class="h-16">
            <img src="../../assets/images/logo.svg" alt="PinFan Logo" class="h-16 w-16 animate-pulse">
        </div>
        <div v-if="screensaver.text" class="mt-2">
            <slot name="text">{{ screensaver.text }}</slot>
        </div>
    </div>
    <slot v-else></slot>
</template>

<script setup>
import {useScreensaver} from "../../states/screensaver";

const screensaver = useScreensaver()
</script>

<style scoped>

</style>
