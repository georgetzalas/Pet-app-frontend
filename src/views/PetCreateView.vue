<script setup>
import { ref, watch } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const { getId } = useApplicationStore();
const router = useRouter();

// Default form data with 'PENDING' adoption status
const formDataRef = ref({
    name: '',
    type: '',
    adoptionStatus: 'PENDING', // ✅ Default to "PENDING"
    age: 0,
    strPicture: null,
    weight: 0,
    height: 0,
    breed: '',
    sex: '',
    picture: null,
    shelter: { id: 0 }
});

const urlRef = ref(backendEnvVar + '/api/pets');
const authRef = ref(true);
const methodRef = ref('POST');

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

// Prevent negative age input
watch(() => formDataRef.value.age, (newAge, oldAge) => {
    if (newAge < 0) {
        formDataRef.value.age = 0; // Reset to 0 if negative
    }
});

const onSubmit = () => {
    formDataRef.value.shelter.id = getId();
    formDataRef.value.adoptionStatus = "PENDING"; // ✅ Ensure "PENDING" is sent

    performRequest()
        .then(() => {
            router.push({ name: 'pets' });
        })
        .catch((ignored) => {
            // TODO Handle error.
        });
};

// Handle image upload
const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
            const base64Image = e.target.result.split(",")[1];
            formDataRef.value.strPicture = base64Image;
        }
    }
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">New Pet</h1>
                    </div>
                    <div>
                        <div class="mb-2">
                            <label for="name">Name</label>
                            <input class="form-control" id="name" v-model="formDataRef.name" type="text" />
                        </div>
                        <div class="mb-2">
                            <label for="type">Type</label>
                            <input class="form-control" id="type" v-model="formDataRef.type" type="text" />
                        </div>
                        <div class="mb-2">
                            <label>Adoption Status</label>
                            <input class="form-control" v-model="formDataRef.adoptionStatus" type="text" disabled />
                        </div>
                        <div class="mb-2">
                            <label for="age">Age</label>
                            <input class="form-control" id="age" v-model="formDataRef.age" type="number" min="0" />
                        </div>
                        <div class="mb-2">
                            <label for="image">Picture</label>
                            <input class="form-control" id="image" accept="image/*" type="file" @change="handleFileInput" />
                        </div>
                        <div class="mb-2">
                            <label for="weight">Weight</label>
                            <input class="form-control" id="weight" v-model="formDataRef.weight" type="number" />
                        </div>
                        <div class="mb-2">
                            <label for="height">Height</label>
                            <input class="form-control" id="height" v-model="formDataRef.height" type="number" />
                        </div>
                        <div class="mb-2">
                            <label for="breed">Breed</label>
                            <input class="form-control" id="breed" v-model="formDataRef.breed" type="text" />
                        </div>
                        <div class="mb-2">
                            <label for="sex">Sex</label>
                            <input class="form-control" id="sex" v-model="formDataRef.sex" type="text" />
                        </div>

                        <div class="">
                            <button class="btn btn-primary" @click="onSubmit" type="button">
                                New pet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
