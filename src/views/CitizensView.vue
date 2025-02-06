<script setup>
import { ref, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const urlRef = ref(`${backendEnvVar}/api/citizens`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="container">
        <h1 class="fs-3">Citizens</h1>
        <table class="table" v-if="data">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="citizen in data" :key="citizen.id">
                    <td>{{ citizen.id }}</td>
                    <td>{{ citizen.name }}</td>
                    <td>{{ citizen.email }}</td>
                    <td>
                        <router-link :to="{ name: 'citizen-details', params: { id: citizen.id } }" class="btn btn-info">View</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No citizens found.</p>
    </div>
</template>