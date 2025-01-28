<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const urlRef = ref(`${backendEnvVar}/api/users/accounts`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Users</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="data">
                                <tr v-for="user in data">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <RouterLink
                                            :to="{
                                                name: 'user',
                                                params: { id: user.id }
                                            }"
                                            >Display</RouterLink
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
