<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRemoteData } from "@/composables/useRemoteData.js";

const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();

const historyIdRef = ref(route.params.id);
const urlRef = computed(() => `${backendEnvVar}/api/medical-history/${historyIdRef.value}`);
const urlRefUpdate = computed(() => `${backendEnvVar}/api/medical-history/update/${historyIdRef.value}`);

const authRef = ref(true);
const { data: medicalHistory, performRequest, isLoading, error } = useRemoteData(urlRef, authRef);
const { performRequest: performRequestUpdate } = useRemoteData(urlRefUpdate, ref(true), ref("PUT"));

const formData = ref({
  vet: "",
  pet: "",
  healthStatus: "NOT_SUBMITTED",
});

onMounted(() => {
  performRequest().then((response) => {
    if (response) {
      formData.value = { ...response };
    }
  });
});

const onUpdate = async () => {
  try {
    await performRequestUpdate(formData.value);
    alert("Medical history updated successfully!");
    router.push("/medical-history");
  } catch (err) {
    console.error("Error updating medical history:", err);
    alert("Failed to update medical history.");
  }
};
</script>

<template>
  <div class="medical-history-edit">
    <h1>Edit Medical History</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <form @submit.prevent="onUpdate" class="form-container">
        <div class="form-group">
          <label for="vet">Vet ID</label>
          <input v-model="formData.vet" id="vet" type="text" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="pet">Pet ID</label>
          <input v-model="formData.pet" id="pet" type="text" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="healthStatus">Health Status</label>
          <select v-model="formData.healthStatus" id="healthStatus" class="form-control">
            <option value="NOT_SUBMITTED">Not Submitted</option>
            <option value="HEALTHY">Healthy</option>
            <option value="SICK">Sick</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
        <button type="button" class="btn btn-secondary" @click="router.push('/medical-history')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.medical-history-edit {
  padding: 1rem;
  max-width: 500px;
  margin: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 0.5rem;
  font-size: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}
</style>
