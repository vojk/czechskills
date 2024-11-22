<script setup lang="ts">
import axios from "axios"
import Loading from '~/components/Loading.vue'
const route = useRoute()
const config = useRuntimeConfig()
const id = route.params.id
const article = ref({})

onMounted(async () => {
    const response = await axios.get(config.public.baseUrl + '/api/article/' + id)
    article.value = response.data[0]
})
</script>

<template>
    <Wrapper>
        <Loading v-if="!article.title" />
        <div>
            <div class="w-full min-h-screen flex flex-col relative gap-2 py-32 bg-brand-midnightBlack items-center"
                id="infopart">
                <div class="flex flex-col h-full max-w-[50rem] min-w-[22rem] gap-4 w-full">
                    <div>
                        <h1>
                            {{ article.title }}
                        </h1>
                        <p class="opacity-40">{{ article.dateOfRelease }} &bull; {{ article.author }}</p>
                    </div>
                    <p>{{ article.description }}</p>
                    <img :src="article.coverImage" class="w-full h-full object-cover" />
                    <p class="text-lg leading-relaxed" v-html="article.content">

                    </p>
                </div>
            </div>
        </div>
    </Wrapper>
</template>

<style scoped>
p {
    @apply text-white;

}

h1 {
    @apply text-5xl;
}

h2 {
    @apply text-3xl font-bold;
}

h3 {
    @apply text-2xl font-bold;
}

h4 {
    @apply text-xl font-bold;
}

h5 {
    @apply text-lg font-bold;
}

h6 {
    @apply text-base font-bold;
}

a {
    @apply text-white underline;
}

ul {
    @apply list-disc;
}

ol {
    @apply list-decimal;
}

li {
    @apply ml-4;
}

blockquote {
    @apply border-l-4 border-brand-midnightBlack pl-4 text-lg;
}

pre {
    @apply bg-brand-midnightBlack text-white p-4 rounded-lg;
}

code {
    @apply bg-brand-midnightBlack text-white p-1 rounded-lg;
}

table {
    @apply border-collapse border border-brand-midnightBlack;
}
</style>