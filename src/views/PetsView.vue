<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const { getRole, getId } = useApplicationStore();

const backendEnvVar = import.meta.env.VITE_BACKEND;
const baseUrl = `${backendEnvVar}/api/pets`;
const typeUrl = `${backendEnvVar}/api/pets/types`;
const regionUrl = `${backendEnvVar}/api/pets/regions`;

const types = ref([]);
const regions = ref([]);

const selectedType = ref('');
const selectedRegion = ref('');

const urlRef = ref(baseUrl);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const accessToken = userData ? userData.accessToken : '';

        const typesResponse = await fetch(typeUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
        });
        types.value = await typesResponse.json();

        const regionsResponse = await fetch(regionUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
        });
        regions.value = await regionsResponse.json();

        performRequest();
    } catch (error) {
        console.error("Error fetching filter options:", error);
    }
});

const filteredUrl = computed(() => {
    let query = [];
    if (selectedType.value) query.push(`type=${selectedType.value}`);
    if (selectedRegion.value) query.push(`region=${selectedRegion.value}`);
    return query.length ? `${baseUrl}?${query.join('&')}` : baseUrl;
});

watch([selectedType, selectedRegion], () => {
    console.log('Selected Type:', selectedType.value);
    console.log('Selected Region:', selectedRegion.value);
    urlRef.value = filteredUrl.value;
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

                    <div class="mb-4 d-flex gap-3" v-if="getRole() == 'ROLE_CITIZEN'">
                        <select v-model="selectedType" class="form-select">
                            <option value="">All types</option>
                            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
                        </select>

                        <select v-model="selectedRegion" class="form-select">
                            <option value="">All regions</option>
                            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                        </select>
                    </div>

                    
                    <!--Vet-->

                        <table class="table" v-if="getRole() == 'ROLE_VET'">
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
                                    <td v-if="pet.vetApprovalStatus != 'REJECT'">{{ pet.id }}</td>
                                    <td v-if="pet.vetApprovalStatus != 'REJECT'">{{ pet.name }}</td>
                                    <td v-if="pet.vetApprovalStatus != 'REJECT'">{{ pet.age }}</td>
                                    <td v-if="pet.vetApprovalStatus != 'REJECT'">
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                    </td>
                                    <td v-if="pet.vetApprovalStatus != 'REJECT'">
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
                    

                        <!--Shelter-->

                        <table class="table" v-if="getRole() == 'ROLE_SHELTER'">
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
                                    <td v-if="getId() === pet.shelter.id">{{ pet.id }}</td>
                                    <td v-if="getId() === pet.shelter.id">{{ pet.name }}</td>
                                    <td v-if="getId() === pet.shelter.id">{{ pet.age }}</td>
                                    <td v-if="getId() === pet.shelter.id">
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                    </td>
                                    <td v-if="getId() === pet.shelter.id">
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

                        <!--Citizen-->

                        <table class="table" v-if="getRole() == 'ROLE_CITIZEN'">
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
                            <tr v-for="pet in data" :key="pet.id">
                                <td v-if="pet.adminApprovalStatus === 'APPROVED' && pet.vetApprovalStatus === 'APPROVED' && (!selectedType || pet.type === selectedType) && (!selectedRegion || pet.shelter.region === selectedRegion)">
                                    {{ pet.id }}
                                </td>
                                <td v-if="pet.adminApprovalStatus === 'APPROVED' && pet.vetApprovalStatus === 'APPROVED' && (!selectedType || pet.type === selectedType) && (!selectedRegion || pet.shelter.region === selectedRegion)">
                                    {{ pet.name }}
                                </td>
                                <td v-if="pet.adminApprovalStatus === 'APPROVED' && pet.vetApprovalStatus === 'APPROVED' && (!selectedType || pet.type === selectedType) && (!selectedRegion || pet.shelter.region === selectedRegion)">
                                    {{ pet.age }}
                                </td>
                                <td v-if="pet.adminApprovalStatus === 'APPROVED' && pet.vetApprovalStatus === 'APPROVED' && (!selectedType || pet.type === selectedType) && (!selectedRegion || pet.shelter.region === selectedRegion)">
                                    <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                </td>
                                <td v-if="pet.adminApprovalStatus === 'APPROVED' && pet.vetApprovalStatus === 'APPROVED' && (!selectedType || pet.type === selectedType) && (!selectedRegion || pet.shelter.region === selectedRegion)">
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

                        <!--Admin-->
                        
                        <h5 v-if="getRole() == 'ROLE_ADMIN'">Pending Pets</h5>
                        <table class="table" v-if="getRole() == 'ROLE_ADMIN'">
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
                            <tbody v-else-if="!loading">No pets</tbody>
                        </table>

                        <h5 v-if="getRole() == 'ROLE_ADMIN'">All pets</h5>
                        <table class="table" v-if="getRole() == 'ROLE_ADMIN'">
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
                                    <td>{{ pet.id }}</td>
                                    <td>{{ pet.name }}</td>
                                    <td>{{ pet.age }}</td>
                                    <td>
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90"/>
                                    </td>
                                    <td>
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
                </div>
            </div>
        </div>
    </div>
</template>
