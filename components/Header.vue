<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
    logginWindow: Function,
})

const router = useRouter();
const currentUrl = ref(router.currentRoute.value.fullPath);
const isMenuOpen = ref(false);

// Watch for route changes to update the current URL
watch(
    () => router.currentRoute.value.fullPath,
    (newPath) => {
        currentUrl.value = newPath;
        isMenuOpen.value = false; // Close menu on navigation
    }
);
</script>

<template>
    <header>
        <div class="w-full h-20 fixed top-0 flex items-center justify-between z-50 ">
            <!-- Desktop Menu -->
            <div class="hidden md:flex background-nav-menu flex-row items-center justify-between w-full px-20">
                <div class="flex gap-8">
                    <NuxtLink :href="currentUrl === '/' ? '#' : '/'"
                        :class="{ 'active-link': currentUrl === '/' || currentUrl === '/#' }">
                        Home
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#infopart' : '/#infopart'"
                        :class="{ 'active-link': currentUrl.includes('#infopart') }">
                        About
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#gameInfoPart' : '/#gameInfoPart'"
                        :class="{ 'active-link': currentUrl.includes('#gameInfoPart') }">
                        Echoes of Eternity
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#whoAreWe' : '/#whoAreWe'"
                        :class="{ 'active-link': currentUrl.includes('#whoAreWe') }">
                        Contacts
                    </NuxtLink>
                    <NuxtLink href="/articles" :class="{ 'active-link': currentUrl === '/articles' }">
                        Articles
                    </NuxtLink>
                </div>
                <div class="flex gap-4">
                    <div class="cursor-pointer user-select-none" @click="logginWindow">
                        Login
                    </div>
                    <div class="w-16">
                        <svg viewBox="0 0 508 242" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M146.23 6.22554L140.004 12.451H70.0022H0L2.21351 15.264C12.4971 28.4067 30.2513 46.4837 42.2411 56.0756C52.4325 64.1918 63.915 71.2473 72.5385 74.6598C80.2397 77.7034 96.9332 81.8998 109.338 83.8828C124.556 86.373 140.558 87.8948 158.127 88.5404C172.146 89.0476 177.911 89.7393 185.289 91.8145C201.521 96.3799 211.759 105.372 214.987 117.962C216.186 122.711 216.186 130.044 214.941 134.932C213.05 142.356 207.562 151.349 199.4 160.295C188.148 172.654 166.889 188.287 145.308 200.092C140.512 202.72 139.405 203.597 133.687 209.269L127.323 215.586V228.36V241.18H158.865H190.408L193.036 239.612C201.475 234.494 219.322 230.758 242.84 229.144C254 228.406 282.591 228.545 294.028 229.421C309.891 230.62 321.696 232.557 330.919 235.508C335.946 237.122 341.895 239.797 342.448 240.719C342.633 241.042 353.377 241.18 374.775 241.18H406.778V228.545V215.909L402.489 211.943C387.779 198.432 370.578 185.612 357.435 178.464C348.72 173.76 344.062 169.333 339.543 161.632C334.609 153.285 330.827 139.313 330.643 129.26C330.597 124.879 332.211 119.576 336.038 111.598C345.907 91.0306 363.015 75.9049 384.459 68.7571C396.956 64.5607 403.827 63.7306 428.452 63.1773C446.483 62.7622 454 62.3933 463.73 61.2865C478.809 59.6264 490.615 56.3062 494.212 52.7092L495.78 51.1413V38.2753V25.3632L497.071 25.0865C500.852 24.2564 501.913 23.8414 503.711 22.4579C504.818 21.6279 506.202 20.0139 506.847 18.9071C507.908 16.9703 508 16.3708 508 10.6064C508 3.45866 507.631 2.49025 504.403 1.06069C502.558 0.27674 496.056 0.230625 327.461 0.0922812L152.455 5.16847e-05L146.23 6.22554Z"
                            fill="white" />
                    </svg>
                    </div>
                </div>
            </div>

            <!-- Mobile Hamburger Menu -->
            <div class="flex items-center justify-between w-full md:hidden px-10">
                <button class="text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                    <span v-if="!isMenuOpen">☰</span>
                    <span v-else>×</span>
                </button>
                <div v-show="isMenuOpen"
                    class="absolute top-20 left-0 w-full bg-brand-midnightBlack text-white flex flex-col items-center space-y-6 py-6 z-50">
                    <NuxtLink :href="currentUrl === '/' ? '#' : '/'"
                        :class="{ 'active-link': currentUrl === '/' || currentUrl === '/#' }">
                        Home
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#infopart' : '/#infopart'"
                        :class="{ 'active-link': currentUrl.includes('#infopart') }">
                        About
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#gameInfoPart' : '/#gameInfoPart'"
                        :class="{ 'active-link': currentUrl.includes('#gameInfoPart') }">
                        Echoes of Eternity
                    </NuxtLink>
                    <NuxtLink :href="currentUrl === '/' ? '#whoAreWe' : '/#whoAreWe'"
                        :class="{ 'active-link': currentUrl.includes('#whoAreWe') }">
                        Contacts
                    </NuxtLink>
                    <NuxtLink href="/articles" :class="{ 'active-link': currentUrl === '/articles' }">
                        Articles
                    </NuxtLink>
                    <div class="cursor-pointer user-select-none" @click="logginWindow">
                        Login
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="css" scoped>
.background-nav-menu {
    height: 100%;
    width: 100%;
    background-color: transparent;
    background-image: radial-gradient(circle, rgba(15, 17, 21, 0.8) 1px, transparent 1px);
    background-size: 4px 4px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px); /* For Safari support */
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
    opacity: 1;
}

.active-link {
    font-weight: bold;
    color: #ff5722;
    text-decoration: underline;
}
</style>
