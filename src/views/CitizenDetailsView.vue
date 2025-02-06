<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const citizenIdRef = ref(route.params.id);

const urlRef = computed(() => `${backendEnvVar}/api/citizens/${citizenIdRef.value}`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="container" v-if="data">
        <h1 class="fs-3">Citizen Details</h1>
        <table class="table">
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
                    <th>Email</th>
                    <td>{{ data.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
