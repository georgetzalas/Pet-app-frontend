<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const baseUrl = `${backendEnvVar}/api/pets`;

// Filters (Dynamic Options from Backend)
const types = ref([]);
const regions = ref([]);

// Store
const { getRole, getId } = useApplicationStore();

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
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const result = await response.json();
    types.value = result.types || [];
    regions.value = result.regions || [];
  } catch (error) {
    console.error("❌ Error fetching filter options:", error);
  }
};

// Filter pets based on role & approval status
const filteredPets = computed(() => {
  if (!data.value) return [];
  
  return data.value.filter(pet => {
    const userRole = getRole();
    const userId = getId();

    if (userRole === "ROLE_CITIZEN") {
      return pet.adminApprovalStatus === "APPROVED" && pet.vetApprovalStatus === "APPROVED";
    }
    if (userRole === "ROLE_VET") {
      return pet.adminApprovalStatus === "PENDING" || pet.vetApprovalStatus === "PENDING";
    }
    if (userRole === "ROLE_SHELTER") {
      return pet.shelter && pet.shelter.id === userId;
    }
    if (userRole === "ROLE_ADMIN") {
      return true; // Show all pets for admins
    }
    return false;
  });
});

// Update API request when filters change
watch([selectedType, selectedRegion], () => {
  let query = [];
  if (selectedType.value) query.push(`type=${selectedType.value}`);
  if (selectedRegion.value) query.push(`region=${selectedRegion.value}`);

  urlRef.value = query.length ? `${baseUrl}?${query.join('&')}` : baseUrl;
  performRequest();
});

// Fetch Data when Component Mounts
onMounted(() => {
  performRequest();
  fetchFilters();
});
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <h1 class="fs-3">Pets</h1>

          <!-- Filters for Citizens -->
          <div class="mb-4 d-flex gap-3" v-if="getRole() === 'ROLE_CITIZEN'">
            <select v-model="selectedType" class="form-select">
              <option value="">All Types</option>
              <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
            </select>

            <select v-model="selectedRegion" class="form-select">
              <option value="">All Regions</option>
              <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
            </select>
          </div>

          <!-- Table -->
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
            <tbody v-else-if="filteredPets.length > 0">
              <tr v-for="pet in filteredPets" :key="pet.id">
                <td>{{ pet.id }}</td>
                <td>{{ pet.name }}</td>
                <td>{{ pet.age }}</td>
                <td>
                  <img :src="'data:image/png;base64,' + pet.picture" alt="Uploaded Image" width="120" height="90" />
                </td>
                <td>
                  <RouterLink :to="{ name: 'pet-details', params: { id: pet.id } }">Display</RouterLink>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5">No pets found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
