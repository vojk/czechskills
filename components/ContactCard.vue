<script setup lang="ts">
defineProps({
    name: String,
    title: String,
    description: String,
    image: String,
})
</script>

<template>
    <div class="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-md w-full h-[20rem]">
        <div class="flex flex-row gap-4 items-center">
            <img :src="image" class="w-20 h-20 rounded-full" />
            <div class="flex flex-col">
                <h3 class="text-2xl font-bold text-neutral-600">{{ name }}</h3>
                <p class="text-neutral-600 text-xl">{{ title }}</p>
            </div>
        </div>
        <!-- Description -->
        <p class="text-neutral-600">{{ description }}</p>

    </div>
</template>