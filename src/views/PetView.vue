<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const route = useRoute();

const petIdRef = ref(null);
const authRef = ref(true);

const urlRef = computed(() => {
    return backendEnvVar + '/api/pets/' + petIdRef.value;
});

const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    petIdRef.value = route.params.id;
    performRequest();
});

const onDelete = () => {
    alert("AAA");
};

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'pets' }"
                            >Back to pets</RouterLink
                        >
                        <h1 class="fs-3">Pet #{{ petIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-details', params: { id: petIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-delete', params: { id: petIdRef } }"
                                    >Delete</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-edit', params: { id: petIdRef } }"
                                    >Edit</RouterLink
                                >
                            </li>
                        </ul>
                    </div>
                    <div v-if="data">
                        <button class="btn btn-danger" @click="onDelete">
                            Send Email
                        </button>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
