<script setup>
import { ref, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
import { useRouter } from 'vue-router';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const { getId } = useApplicationStore();

// Form Data
const formDataRef = ref({
    pet: { id: null }, // Default to null
    citizen: { id: 0 },
    status: 'PENDING'
});

// API Request
const urlRef = ref(`${backendEnvVar}/api/adoption-requests`);
const authRef = ref(true);
const methodRef = ref('POST');
const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

// Fetch Pets (Only Positive IDs)
const petOptions = ref([]);

const fetchPets = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/pets`);
        const pets = await response.json();

        // Filter pets with positive IDs
        petOptions.value = pets.filter(pet => pet.id > 0);
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
};

// Run fetchPets on mount
onMounted(fetchPets);

// Handle Form Submission
const onSubmit = () => {
    let id = getId();
    formDataRef.value.citizen.id = id;

    console.log(formDataRef);

    performRequest()
        .then(() => {
            router.push({ name: 'adoption-request-create' });
        })
        .catch((ignored) => {
            // TODO: Handle error properly
        });
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div>
                        <!-- Pet Selection Dropdown -->
                        <div class="mb-2">
                            <label for="petSelect">Select Pet ID</label>
                            <select
                                class="form-select"
                                id="petSelect"
                                v-model="formDataRef.pet.id"
                            >
                                <option v-if="petOptions.length === 0" disabled>Loading...</option>
                                <option v-for="pet in petOptions" :key="pet.id" :value="pet.id">
                                    {{ pet.id }} - {{ pet.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="onSubmit" type="button">
                                Create new adoption
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
