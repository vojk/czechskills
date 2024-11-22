<script setup lang="ts">
import ArticleCard from '../components/webComponents/ArticleCard.vue'
import axios from 'axios'

const articles = ref([])
const config = useRuntimeConfig()

onMounted(async () => {
    const _articles = await axios.get(config.public.baseUrl + '/api/articles')
    articles.value = _articles.data
    console.log(articles.value)
    
})
</script>

<template>
    <Loading v-if="!articles.length > 0" />
    <Wrapper>
        <div class="w-full min-h-screen flex flex-col relative gap-2 py-32 bg-brand-midnightBlack" id="infopart">
            <div class="flex flex-col gap-16 items-center justify-center px-16 h-full">
                <div class="flex flex-col gap-4 max-w-[50rem] min-w-[22rem]">
                    <div>
                        <h1 class="text-5xl">Articles</h1>
                        <p>We are a team of passionate and creative individuals who are dedicated to creating innovative
                            and
                            immersive gaming experiences. Our team is comprised of talented developers, designers, and
                            artists
                            who are committed to pushing the boundaries of what is possible in interactive
                            entertainment.
                        </p>
                    </div>

                    <div>
                        <ArticleCard v-for="article in articles" :key="article.id" :title="article.title"
                            :author="article.author" :date-of-release="article.dateOfRelease" :description="article.description"
                            :image="article.coverImage" :url="article.id" />
                    </div>
                </div>

            </div>
        </div>
    </Wrapper>
</template>