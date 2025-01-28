<script setup>
import { onBeforeMount, ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';
import { useRouter } from 'vue-router';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const loading = ref(false);
const signupFailed = ref(false);
const selectedCategory = ref('');
const userType = ref('');

const credentials = ref({
    name: '',
    username: '',
    email: '',
    password: '',
    surname: '',
    region: ''
});

const onFormSubmit = () => {
    loading.value = true;
    signupFailed.value = false;

    fetch(`${backendEnvVar}/api/auth/signup/${userType.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials.value)
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    router.push({ name: 'login' });
                });
            } else {
                signupFailed.value = true;
            }
        })
        .catch((err) => {
            console.warn(err);
            signupFailed.value = true;
        })
        .finally(() => {
            loading.value = false;
        });
};

const setUserType = () => {
    userType.value = selectedCategory.value;
};

</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-body-secondary">
        <div class="card p-4 shadow-lg">

            <div class="mb-4 text-center">
                <h1 class="fs-3">Sign up</h1>
            </div>

            <div class="spinner-border" role="status" v-if="loading">
                <span class="visually-hidden">Loading...</span>
            </div>

            <form v-else>

                <div class="mb-2" v-if="signupFailed">
                    <div class="alert alert-danger" role="alert">
                        Error when signing up
                    </div>
                </div>

                <div class="mb-2">
                    <label for="nameFormControl" class="form-label mb-1">Name</label>
                    <input
                        v-model="credentials.name"
                        type="text"
                        class="form-control"
                        id="nameFormControl"
                    />
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
                    <label for="passwordFormControl" class="form-label mb-1">Email</label>
                    <input
                        v-model="credentials.email"
                        type="email"
                        class="form-control"
                        id="emailFormControl"
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
                
                <div>
                        <label>
                            <input type="radio" name="role" v-model="selectedCategory" value="vet" @change="setUserType"/>
                            Vet
                        </label>
                        <label>
                            <input type="radio" name="role" v-model="selectedCategory" value="shelter" @change="setUserType"/>
                            Shelter
                        </label>
                        <label>
                            <input type="radio" name="role" v-model="selectedCategory" value="citizen" @change="setUserType"/>
                            Citizen
                        </label>

                        <div v-if="selectedCategory === 'vet'">
                            <div class="mb-2">
                                <label for="surnameFormControl" class="form-label mb-1">Surname</label>
                                <input v-model="credentials.surname" type="text" class="form-control" id="surnameFormControl"/>
                            </div>
                        </div>
                        <div v-if="selectedCategory === 'shelter'">
                            <div class="mb-2">
                                <label for="regionFormControl" class="form-label mb-1">Region</label>
                                <input v-model="credentials.region" type="text" class="form-control" id="regionFormControl"/>
                            </div>
                        </div>

                        <div v-if="selectedCategory === 'citizen'">
                            <div class="mb-2">
                                <label for="surnameFormControl" class="form-label mb-1">Surname</label>
                                <input v-model="credentials.surname" type="text" class="form-control" id="surname1FormControl"/>
                            </div>
                        </div>
                        
                </div>

                <button @click="onFormSubmit" type="submit" class="btn btn-primary w-100">Sign up</button>

            </form>
        </div>
    </div>
</template>