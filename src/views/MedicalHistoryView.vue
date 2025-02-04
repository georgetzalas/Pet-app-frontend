<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRemoteData } from "@/composables/useRemoteData.js";

const backendEnvVar = import.meta.env.VITE_BACKEND;
const route = useRoute();
const historyIdRef = ref(route.params.id);

const urlRef = computed(() => `${backendEnvVar}/api/medical-history/${historyIdRef.value}`);
const authRef = ref(true);
const { data: medicalHistory, performRequest, isLoading, error } = useRemoteData(urlRef, authRef);

onMounted(() => {
  performRequest();
});
</script>

<template>
  <div class="medical-history-details">
    <h1>Medical History Details</h1>
    
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="medicalHistory">
      <p><strong>Vet:</strong> {{ medicalHistory.vet?.name || "Unknown" }}</p>
      <p><strong>Pet ID:</strong> {{ medicalHistory.pet?.id || "Not Available" }}</p>
      <p><strong>Health Status:</strong> {{ medicalHistory.healthStatus || "No status provided" }}</p>
    </div>
  </div>
</template>

<style scoped>
.medical-history-details {
  padding: 1rem;
  text-align: left;
}

h1 {
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}
</style>
