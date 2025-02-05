<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const urlRef = ref(`${backendEnvVar}/api/adoption-requests`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Adoptions</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Pet Name</th>
                                    <th>Citizen Name</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="data && data.length > 0">
                                <tr v-for="adoptions in data">
                                    <td v-if="adoptions.pet"> {{ adoptions.pet.name }} </td>
                                    <td v-if="adoptions.citizen"> {{ adoptions.citizen.username }} </td>
                                    <td v-if="adoptions.status">{{ adoptions.status }}</td>
                                    <td v-if="adoptions.id">
                                        <RouterLink
                                            :to="{
                                                name: 'adoption-request',
                                                params: { id: adoptions.id }
                                            }"
                                            >Display</RouterLink
                                        >
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="!loading">No Adoption Requests</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
