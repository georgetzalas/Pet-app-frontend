<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const route = useRoute();

const medicalIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/medical-history/' + medicalIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    medicalIdRef.value = route.params.id;
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
                    <th>Vet-notes</th>
                    <td>{{ data.vetNotes }}</td>
                </tr>
                <tr>
                    <th>Treatment</th>
                    <td>{{ data.treatment }}</td>
                </tr>
                <tr>
                    <th>Vet</th>
                    <td>{{ data.vet.surname }}</td>
                </tr>
                <tr>
                    <th>Pet</th>
                    <td>{{ data.pet.name }}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{{ data.date }}</td>
                </tr>
                <tr>
                    <th>Health-Status</th>
                    <td>{{ data.healthStatus }}</td>
                </tr>
              
            </tbody>
        </table>
    </div>
</template>