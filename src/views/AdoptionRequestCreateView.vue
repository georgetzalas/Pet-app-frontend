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
            router.push({ name: 'pets' });
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
                    <div>
                        <div class="mb-2">
                            <label for="firstName">Pet ID</label>
                            <input
                                class="form-control"
                                id="firstName"
                                v-model="formDataRef.pet.id"
                                type="number"
                            />
                        </div>
                        <div class="">
                            <button class="btn btn-primary" @click="onSubmit" type="button">
                                Create new adoption
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
