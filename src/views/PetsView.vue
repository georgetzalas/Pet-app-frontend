<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const urlRef = ref(`${backendEnvVar}/api/pets`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const { getRole } = useApplicationStore();

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
                        <h1 class="fs-3">Pets</h1>
                    </div>
                    <div>
                        <h5 v-if="getRole() == 'ROLE_VET' || getRole() == 'ROLE_ADMIN'">Non Pending Pets</h5>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="data && data.length > 0">
                                <tr v-for="pet in data">
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING' && getRole()!='ROLE_CITIZEN'">{{ pet.id }}</td>
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING'">{{ pet.id }}</td>
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING'">{{ pet.name }}</td>
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING'">{{ pet.age }}</td>
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING'">
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                    </td>
                                    <td v-if="pet.adminApprovalStatus != 'PENDING' && pet.vetApprovalStatus != 'PENDING'">
                                        <RouterLink
                                            :to="{
                                                name: 'pet-details',
                                                params: { id: pet.id }
                                            }"
                                            >Display</RouterLink
                                        >
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="!loading">No pets</tbody>
                        </table>


                        <h5 v-if="getRole() == 'ROLE_VET' || getRole() == 'ROLE_ADMIN'">Pending pets</h5>
                        <table class="table" v-if="getRole() == 'ROLE_VET' || getRole() == 'ROLE_ADMIN'">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="data && data.length > 0">
                                <tr v-for="pet in data">
                                    <td v-if="pet.adminApprovalStatus == 'PENDING' || pet.vetApprovalStatus == 'PENDING'">{{ pet.id }}</td>
                                    <td v-if="pet.adminApprovalStatus == 'PENDING' || pet.vetApprovalStatus == 'PENDING'">{{ pet.name }}</td>
                                    <td v-if="pet.adminApprovalStatus == 'PENDING' || pet.vetApprovalStatus == 'PENDING'">{{ pet.age }}</td>
                                    <td v-if="pet.adminApprovalStatus == 'PENDING' || pet.vetApprovalStatus == 'PENDING'">
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                    </td>
                                    <td v-if="pet.adminApprovalStatus == 'PENDING' || pet.vetApprovalStatus == 'PENDING'">
                                        <RouterLink
                                            :to="{
                                                name: 'pet-details',
                                                params: { id: pet.id }
                                            }"
                                            >Display</RouterLink
                                        >
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else-if="!loading">No pending pets</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
