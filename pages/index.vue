<script setup lang="ts">
import Header from '~/components/Header.vue'
import WelcomeScreen from '~/components/webComponents/WelcomeScreen.vue'
import axios from 'axios'

interface text {
    header: string,
    content: string
}

interface IContact {
    name: string,
    title: string,
    description: string,
    image: string
}

interface ICountdown {
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

const contacts = ref<IContact[]>([])
const config = useRuntimeConfig()

const timeDate = ref<ICountdown>({})
const interval = ref<NodeJS.Timeout | null>(null)

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

function countDownToRelease(): ICountdown {
    const date = new Date('12/05/2025');
    const currentDate = new Date();
    const timeDifference = date.getTime() - currentDate.getTime();
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

onMounted(async () => {
    timeDate.value = countDownToRelease()
    interval.value = setInterval(() => {
        timeDate.value = countDownToRelease()
    }, 1000)

    try {
        const response = await axios.get(`${config.public.baseUrl}/api/contact`)
        contacts.value = response.data
    } catch (error) {
        console.error('Error fetching contacts:', error)
    }

    try {
        const response = await axios.get(`${config.public.baseUrl}/api/web-pages?slug=/`)
    } catch (error) {
        console.error(error);
        
    }    
})

onMounted(() => {
    clearInterval(interval.value)
})


</script>

<template>
    <Wrapper>
        <Loading v-if="!contacts.length > 0" />
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
                    <h4 class="text-2xl">Release Date: Anticipated for 12. 05. 2025</h4>
                    <h4 class="text-xl">{{ `${timeDate.months} months, ${timeDate.days} days, ${timeDate.hours} hours, ${timeDate.minutes} minutes, ${timeDate.seconds} seconds` }}</h4>
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
                    <ContactCard v-for="(value, index) in contacts" :key="index" :name="value.name" :description="value.description" :title="value.title"
                        :image="value.image" />
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
