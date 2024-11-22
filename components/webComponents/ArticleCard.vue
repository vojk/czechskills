<script setup lang="ts">
  defineProps({
    title: String,
    description: String,
    image: String,
    url: String,
    dateOfRelease: String,
    author: String,
  });
</script>
<template>
  <div
    class="flex gap-8 px-2 py-2 border-white/20 border bg-neutral-400/5 hover:-translate-y-1 transition cursor-pointer"
    @click="$router.push(`/articles/${url}`)"
  >
    <img
      :src="image"
      width="150rem"
      class="aspect-square"
    />
    <div>
      <h2 class="text-3xl font-bold text-white">
        {{ title }}
      </h2>
      <p class="text-sm opacity-35">{{ dateOfRelease }} &middot; {{ author }}</p>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>
