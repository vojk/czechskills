<script setup lang="ts">
import { hashCredentials } from "~/utils/hash";
import axios from "axios";
const oppendLoggingWindow = ref(false);
const nextStep = ref(false);

const username = ref("");
const password = ref("");

function logginWindow() {
    oppendLoggingWindow.value = !oppendLoggingWindow.value;
    nextStep.value = false;
}

function FnextStep() {
    nextStep.value = !nextStep.value;
}

function login() {
    hashCredentials('exampleUsername', 'examplePassword').then(({ usernameHash, passwordHash }) => {
        // Send these hashes to your API
        const response = axios.post('/api/login', {
            specialHash: usernameHash + passwordHash
        });

        response.then((response) => {
            console.log(response.data);
            // Handle the response from your API
        });
    });
}

</script>

<template>
    <div class="w-full h-screen fixed z-[100] flex justify-center items-center bg-black/40" @click="logginWindow"
        v-if="oppendLoggingWindow">
        <div class="w-fit rounded-lg gap-4 bg-brand-midnightBlack flex flex-col px-10 py-12" @click.stop>
            <div class="select-none font-bold self-end cursor-pointer">
                X
            </div>
            <div class="flex flex-col gap-2" v-if="!nextStep">
                <h2 class="text-white text-2xl font-bold text-center">
                    Login As
                </h2>
                <div>
                    <div class="flex flex-col gap-4 items-center">
                        <NuxtLink href="https://strapi.zalubo.com"
                            class="px-6 py-1 border border-white rounded w-fit hover:bg-white/10">As Admin</NuxtLink>
                        <div class="px-6 py-1 border select-none border-white rounded w-fit hover:bg-white/10"
                            @click="FnextStep">As
                            Beta testing
                        </div>
                    </div>
                </div>
            </div>
            <form class="flex flex-col gap-2" v-if="nextStep" @submit.prevent="login">
                <label for="username" class="text-white font-bold">Username</label>
                <input type="text" id="username" placeholder="Username" class="w-full rounded-lg border border-white px-4 py-2"
                    ref="username" />
                <label for="password" class="text-white font-bold">Password</label>
                <input type="password" id="password" placeholder="Password" class="w-full rounded-lg border border-white px-4 py-2"
                    ref="password" />
                <button class="w-full rounded-lg border border-white px-4 py-2 select-none bg-brand-midnightBlack"
                    @click="login">Login</button>
            </form>

        </div>
    </div>
    <Header :loggin-window="logginWindow" />
    <div class="min-h-full">
        <slot />
    </div>
    <Footer />
</template>