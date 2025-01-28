<script setup>

import { ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
import { useRouter } from 'vue-router';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();

const { getId } = useApplicationStore();

const formDataRef = ref({
    pet: {id: 0},
    citizen: {id: 0},
    status: 'PENDING'
});
const urlRef = ref(backendEnvVar + '/api/adoption-requests');
const authRef = ref(true);
const methodRef = ref('POST');

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    let id = getId();
    formDataRef.value.citizen.id = id;

    console.log(formDataRef);

    performRequest()
        .then((data) => {
            router.push({ name: 'adoption-request-create' });
        })
        .catch((ignored) => {
            // TODO Handle error.
        });
};
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
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
</template>
