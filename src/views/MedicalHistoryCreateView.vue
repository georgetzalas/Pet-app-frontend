<script setup>
import { ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const { getId } = useApplicationStore();
const router = useRouter();

const formDataRef = ref({
    pet: {id:0}, // ID of the pet for which the medical history is created
    healthStatus: 'GOOD', // Default status
    treatment: '',
    vetNotes: '',
    vet: {id:getId()}, // Automatically set to the logged-in veterinarian's ID
    date: new Date().toISOString().split('T')[0], // Default to today's date
});

const urlRef = ref(backendEnvVar + '/api/medical-history');
const authRef = ref(true);
const methodRef = ref('POST');

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest()
        .then(() => {
            router.push({ name: 'medical-histories' });
        })
        .catch((ignored) => {
            // TODO Handle error
        });
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">New Medical History</h1>
                    </div>
                    <div>
                        <div class="mb-2">
                            <label for="petId">Pet ID</label>
                            <input
                                class="form-control"
                                id="petId"
                                v-model="formDataRef.pet.id"
                                type="text"
                                placeholder="Enter the Pet ID"
                            />
                        </div>
                        <div class="mb-2">
                            <label for="healthStatus">Status</label>
                            <select class="form-control" id="healthStatus" v-model="formDataRef.healthStatus">
                                <option value="GOOD">GOOD</option>
                                <option value="OK">OK</option>
                                <option value="BAD">BAD</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label for="treatment">Treatment</label>
                            <textarea
                                class="form-control"
                                id="treatment"
                                v-model="formDataRef.treatment"
                                placeholder="Enter the treatment details"
                                rows="3"
                            ></textarea>
                        </div>
                        <div class="mb-2">
                            <label for="vetNotes">Vet Notes</label>
                            <textarea
                                class="form-control"
                                id="vetNotes"
                                v-model="formDataRef.vetNotes"
                                placeholder="Additional notes from the vet"
                                rows="3"
                            ></textarea>
                        </div>
                        <div class="mb-2">
                            <label for="date">Date</label>
                            <input
                                class="form-control"
                                id="date"
                                v-model="formDataRef.date"
                                type="date"
                            />
                        </div>
                        <div class="">
                            <button class="btn btn-primary" @click="onSubmit" type="button">
                                Add Medical History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>