<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const baseUrl = `${backendEnvVar}/api/pets`;

// Filters (Dynamic Options from Backend)
const types = ref([]); // Stores available pet types
const regions = ref([]); // Stores available pet regions

// Selected Filters
const selectedType = ref('');
const selectedRegion = ref('');

// Fetch Pets
const urlRef = ref(baseUrl);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

// Fetch available types and regions
const fetchFilters = async () => {
    try {
        const response = await fetch(`${backendEnvVar}/api/pets/filters`);
        const result = await response.json();
        
        types.value = result.types || [];
        regions.value = result.regions || [];
    } catch (error) {
        console.error("Error fetching filter options:", error);
    }
};

// Fetch data when component mounts
onMounted(() => {
    performRequest();
    fetchFilters();
});

// Update the API request when filters change
watch([selectedType, selectedRegion], () => {
    let query = [];
    if (selectedType.value) query.push(`type=${selectedType.value}`);
    if (selectedRegion.value) query.push(`region=${selectedRegion.value}`);

    urlRef.value = query.length ? `${baseUrl}?${query.join('&')}` : baseUrl;
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

                    <!-- Filter Dropdowns -->
                    <div class="mb-4 d-flex gap-3">
                        <!-- Type Filter (Dynamic Options) -->
                        <select v-model="selectedType" class="form-select">
                            <option value="">All Types</option>
                            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
                        </select>

                        <!-- Region Filter (Dynamic Options) -->
                        <select v-model="selectedRegion" class="form-select">
                            <option value="">All Regions</option>
                            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                        </select>
                    </div>

                    <!-- Pets Table -->
                    <div>
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
                            <tbody v-if="data">
                                <tr v-for="pet in data" :key="pet.id">
                                    <td>{{ pet.id }}</td>
                                    <td>{{ pet.name }}</td>
                                    <td>{{ pet.age }}</td>
                                    <td>
                                        <img :src="'data:image/png;base64,' + pet.picture" alt="Pet Image" width="120" height="90"/>
                                    </td>
                                    <td>
                                        <RouterLink :to="{ name: 'pet-details', params: { id: pet.id } }">
                                            Display
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
