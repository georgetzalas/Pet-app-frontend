<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
const urlRef = computed(() => `${backendEnvVar}/api/shelter/${userIdRef.value}`);
const authRef = ref(true);

const { data, loading, performRequest, error } = useRemoteData(urlRef, authRef);

onMounted(() => {
    userIdRef.value = route.params.id;
    performRequest();
});
</script>

<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{{ data.id }}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{ data.name }}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{{ data.username }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ data.email }}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{{ data.status }}</td>
                    </tr>
                    <tr>
                        <th>First Pet</th>
                        <td v-if="data.Pet && data.Pet.length">{{ data.Pet[0].name }}</td>
                        <td v-else>No pets assigned</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>{{ data.Region }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
