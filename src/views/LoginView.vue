<script setup>
// @EXERCISE: If user is authenticated redirect to the requested URL.
// @EXERCISE: If user is not authenticated, keep the requested URL and after a successful authentication redirect to the requested resource.
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();

const loading = ref(false);
const credentials = ref({
    username: '',
    password: ''
});
const authenticationFailed = ref(false);

const onFormSubmit = () => {
    loading.value = true;
    authenticationFailed.value = false;

    fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials.value)
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setUserData(data);
                    persistUserData();
                    router.push({ name: 'home' });
                });
            } else {
                authenticationFailed.value = true;
            }
        })
        .catch((err) => {
            console.warn(err);
            authenticationFailed.value = true;
        })
        .finally(() => {
            loading.value = false;
        });
};

onBeforeMount(() => {
    if (isAuthenticated === true) {
        router.push({ name: 'home' });
    }
});
</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-body-secondary">
        <div class="card p-4 shadow-lg">
                    <div class="mb-4 text-center">
                        <h1 class="fs-3">Login</h1>
                    </div>
                    <div class="spinner-border" role="status" v-if="loading">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <form v-else>
                        <div class="mb-2" v-if="authenticationFailed">
                            <div class="alert alert-danger" role="alert">
                                Authentication failed!
                            </div>
                        </div>
                        <div class="mb-2">
                            <label for="usernameFormControl" class="form-label mb-1">Username</label>
                            <input
                                v-model="credentials.username"
                                type="text"
                                class="form-control"
                                id="usernameFormControl"
                            />
                        </div>
                        <div class="mb-2">
                            <label for="passwordFormControl" class="form-label mb-1">Password</label>
                            <input
                                v-model="credentials.password"
                                type="password"
                                class="form-control"
                                id="passwordFormControl"
                            />
                        </div>
                        <button @click="onFormSubmit" type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
</template>