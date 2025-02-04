<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRemoteData } from "@/composables/useRemoteData.js";

const backendEnvVar = import.meta.env.VITE_BACKEND;
const router = useRouter();
const route = useRoute();

const historyIdRef = ref(route.params.id);
const urlRefDelete = computed(() => `${backendEnvVar}/api/medical-history/${historyIdRef.value}`);

const authRef = ref(true);
const { performRequest } = useRemoteData(urlRefDelete, authRef, ref("DELETE"));

const onDelete = () => {
  if (confirm("Are you sure you want to delete this medical history?")) {
    performRequest().then(() => {
      router.push("/medical-history");
    }).catch(error => {
      console.error("Error deleting medical history:", error);
    });
  }
};
</script>

<template>
  <div class="medical-history-delete">
    <h1>Delete Medical History</h1>
    <p>Are you sure you want to delete this medical history record?</p>
    <div class="buttons">
      <button @click="onDelete" class="btn btn-danger">Confirm Delete</button>
      <button @click="router.push('/medical-history')" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.medical-history-delete {
  padding: 1rem;
  text-align: center;
}

.buttons {
  margin-top: 1rem;
}

button {
  margin: 0 0.5rem;
}
</style>
