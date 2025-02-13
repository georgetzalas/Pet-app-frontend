<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const router = useRouter();
const historyIdRef = ref(route.params.id);

const urlRef = computed(() => { return `${backendEnvVar}/api/medical-history` });
const authRef = ref(true);
const methodRef = ref('PUT');

const healthStatus = ref('');
const selectedOption = ref('');

const formDataRef = ref({
    id: parseInt(historyIdRef.value, 10),
    healthStatus: selectedOption
});

const { data, loading, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest()
        .then(() => {
            router.push({ name: 'medical-histories' });
        })
        .catch((error) => {
            console.error('Error updating Medical History:', error);
        });
};
onMounted(() => {
    historyIdRef.value = route.params.id;
});

</script>

<template>
    <div class="container">
            <h1 class="fs-3">Edit Medical-History</h1>
            <label for="dropdown">Choose an option:</label>
            <select id="dropdown" v-model="selectedOption">
                <option value="GOOD" selected>Good</option>
                <option value="OK">Ok</option>
                <option value="BAD">Bad</option>
            </select>
            
            <br>
            <br>
            
            <button class="btn btn-danger" @click="onSubmit">
                Change health status {{ healthStatus }}
            </button>
            </div>
</template>