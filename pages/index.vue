<script setup lang="ts">
import Header from '~/components/Header.vue'
import WelcomeScreen from '~/components/webComponents/WelcomeScreen.vue'

interface text {
    header: string,
    content: string
}

const texts: text[] = [
    {
        header: 'We are Nebula Forge Studios',
        content: 'Nebula Forge Studios is an independent game development company founded in 2018 and based in Seattle, Washington. Our mission is to create immersive gaming experiences that blend rich storytelling with innovative gameplay mechanics. We are passionate about pushing the boundaries of what\'s possible in interactive entertainment.'
    },
    {
        header: 'Our Mission',
        content: 'test'
    },
    {
        header: 'Our Vision',
        content: 'test'
    }
]
</script>

<template>
    <Wrapper>
        <WelcomeScreen />
        <div class="w-full h-screen flex flex-col relative gap-2 bg-brand-midnightBlack" id="infopart">
            <div class="flex flex-col gap-16 items-center justify-center px-16 h-full">
                <div>
                    <h1 class="text-5xl">Nebula Forge Studios</h1>
                </div>
                <!-- Simplified Textbox -->
                <div v-for="(text, index) in texts" :key="text.header"
                    class="flex flex-col gap-4 py-6 w-full max-w-[50rem] min-w-[22rem] transition-transform duration-300 hover:scale-[1.01]">
                    <div class="h-full flex flex-col justify-center gap-4">
                        <h2 class="text-3xl font-bold text-white">
                            {{ text.header }}
                        </h2>
                        <p class="text-lg leading-relaxed">
                            {{ text.content }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-screen flex flex-col relative gap-2 bg-brand-midnightBlack/90" id="gameInfoPart">
            <div class="flex flex-col gap-16 items-center justify-center px-16 h-full">
                <div>
                    <h1 class="text-5xl">Echoes of Eternity</h1>
                    <h4>Release Date: Anticipated for Q3 2024</h4>
                    <h4>Platforms: PC, PlayStation 5, Xbox Series X|S</h4>
                </div>
                <div
                    class="flex flex-col gap-4 py-6 w-full max-w-[50rem] min-w-[22rem] transition-transform duration-300 hover:scale-[1.01]">
                    <div class="h-full flex flex-col justify-center gap-4">
                        <h2 class="text-3xl font-bold text-white">
                            Game Overview
                        </h2>
                        <p class="text-lg leading-relaxed">
                            "Echoes of Eternity" is an upcoming single-player action-adventure game that immerses
                            players in a visually stunning post-apocalyptic world where time itself has become
                            fractured. Step into the shoes of Aiden, a daring time-traveling explorer on a critical
                            quest to repair temporal anomalies threatening to unravel the very fabric of reality.
                        </p>
                    </div>
                </div>

                <NuxtLink href="/game"
                    class="rounded-3xl border-2 border-white relative px-4 py-2 hover:bg-white/10 cursor-pointer select-none overflow-hidden transition">
                    <h2>Get Know More, Lets Jump Into The Time Travel</h2>
                </NuxtLink>
            </div>

        </div>
        <div class="w-full min-h-screen flex flex-col relative gap-2 items-center justify-center bg-brand-midnightBlack py-12"
            id="whoAreWe">
            <div class="flex flex-col gap-16 py-6 items-center justify-center max-w-[50rem] min-w-[22rem] h-full">
                <div>
                    <h2 class="text-3xl font-bold text-white">Our Team</h2>
                    <p>We are a team of passionate and creative individuals who are dedicated to creating innovative and
                        immersive gaming experiences. Our team is comprised of talented developers, designers, and
                        artists
                        who are committed to pushing the boundaries of what is possible in interactive entertainment.
                    </p>
                </div>
                <div class="flex gap-6 items-center justify-center flex-wrap">
                    <ContactCard name="Joe Doe" description="That One Guy" title="CEO"
                        image="https://picsum.photos/id/10/200/200" />
                    <ContactCard name="Joe Doe" description="That One Guy" title="CEO"
                        image="https://picsum.photos/id/10/200/200" />
                    <ContactCard name="Joe Doe" description="That One Guy" title="CEO"
                        image="https://picsum.photos/id/10/200/200" />
                    <ContactCard name="Joe Doe" description="That One Guy" title="CEO"
                        image="https://picsum.photos/id/10/200/200" />
                </div>
            </div>
        </div>
    </Wrapper>
</template>

<style>
/* Add the fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
