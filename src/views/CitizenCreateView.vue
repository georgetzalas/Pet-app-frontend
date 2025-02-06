<script setup>
import { ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();

const { getId } = useApplicationStore();

const formDataRef = ref({
    name: '',
    email: '',
    password: ''
});

const urlRef = ref(`${backendEnvVar}/api/citizens`);
const authRef = ref(true);
const methodRef = ref('POST');

const { performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest()
        .then((data) => {
            router.push({ name: 'citizens' });
        })
        .catch((ignored) => {
            //TODO Handle error
        });
};
</script>

<template>
    <div class="container">
        <h1 class="fs-3">New Citizen</h1>
        <form @submit.prevent="onSubmit">
            <div class="mb-2">
                <label for="name">Name</label>
                <input class="form-control" id="name" v-model="formDataRef.name" type="text" />
            </div>
            <div class="mb-2">
                <label for="email">Email</label>
                <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
            </div>
            <div class="mb-2">
                <label for="password">Password</label>
                <input class="form-control" id="password" v-model="formDataRef.password" type="password" />
            </div>
            <button class="btn btn-primary" type="submit">Create Citizen</button>
        </form>
    </div>
</template>
