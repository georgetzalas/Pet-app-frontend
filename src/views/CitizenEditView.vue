<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const router = useRouter();
const citizenIdRef = ref(route.params.id);

const urlRef = computed(() => `${backendEnvVar}/api/citizens/update-citizen/${citizenIdRef.value}`);
const authRef = ref(true);
const methodRef = ref('PUT');

const formDataRef = ref({
    name: '',
    email: ''
});

const { performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest()
        .then(() => {
            router.push({ name: 'citizen-details', params: { id: citizenIdRef.value } });
        })
        .catch((error) => {
            console.error('Error updating citizen:', error);
        });
};
</script>

<template>
    <div class="container">
        <h1 class="fs-3">Edit Citizen</h1>
        <form @submit.prevent="onSubmit">
            <div class="mb-2">
                <label for="name">Name</label>
                <input class="form-control" id="name" v-model="formDataRef.name" type="text" />
            </div>
            <div class="mb-2">
                <label for="email">Email</label>
                <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
            </div>
            <button class="btn btn-primary" type="submit">Update Citizen</button>
        </form>
    </div>
</template>
