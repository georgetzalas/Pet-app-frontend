<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/users/accounts/' + userIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    userIdRef.value = route.params.id;
    performRequest();
});
</script>
<template>
    <div>
        <table class="table">
            <tbody v-if="data">
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
                    <th>Role</th>
                    <td>{{ data.roles[0].name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
