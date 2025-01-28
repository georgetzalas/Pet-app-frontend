<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/adoption-requests/' + userIdRef.value;
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
                    <th>Pet</th>
                    <td>[Name {{ data.pet.name }} | Type {{ data.pet.type }} | Breed {{ data.pet.breed }} | Sex {{ data.pet.sex }}]</td>
                </tr>
                <tr>
                    <th>Citizen</th>
                    <td>[Name {{ data.citizen.name }} | Email {{ data.citizen.email }} | Role {{ data.citizen.roles[0].name }}]</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ data.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
