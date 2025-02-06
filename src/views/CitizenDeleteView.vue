<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const router = useRouter();
const citizenIdRef = ref(route.params.id);

const urlRef = computed(() => `${backendEnvVar}/api/citizens/${citizenIdRef.value}`);
const authRef = ref(true);
const methodRef = ref('DELETE');

const { performRequest } = useRemoteData(urlRef, authRef, methodRef);

const onDelete = () => {
    performRequest()
        .then(() => {
            router.push({ name: 'citizens' });
        })
        .catch((error) => {
            console.error('Error deleting citizen:', error);
        });
};
</script>

<template>
    <div class="container">
        <h1 class="fs-3">Delete Citizen</h1>
        <p>Are you sure you want to delete this citizen?</p>
        <button class="btn btn-danger" @click="onDelete">Delete</button>
        <router-link :to="{ name: 'citizens' }" class="btn btn-secondary">Cancel</router-link>
    </div>
</template>
