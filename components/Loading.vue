<template>
    <div class="h-full w-full fixed bg-neutral-950/80 z-50 flex flex-col gap-4 justify-center items-center">
        <div class="flex gap-2 circles">
            <div class="h-2 w-2 bg-white rounded-full animate-bounce" />
            <div class="h-2 w-2 bg-white rounded-full animate-bounce" />
            <div class="h-2 w-2 bg-white rounded-full animate-bounce" />
        </div>
        <div class="text-center text-xl">
            Loading...
        </div>
    </div>
</template>

<style scoped>
div.circles > div:nth-child(1) {
    animation: bouncing 1s infinite;
    animation-delay: 0.1s;
}

div.circles > div:nth-child(2) {
    animation: bouncing 1s infinite;
    animation-delay: 0.2s;
}

div.circles > div:nth-child(3) {
    animation: bouncing 1s infinite;
    animation-delay: 0.3s;
}

@keyframes bouncing {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(10px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>