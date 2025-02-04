<script setup>
import { ref, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const vetsUrl = `${backendEnvVar}/api/vets`;

const authRef = ref(true);
const { data: vets, performRequest } = useRemoteData(vetsUrl, authRef);

onMounted(() => {
  performRequest();
});
</script>

<template>
  <div class="vets-view">
    <h1>All Vets</h1>
    <ul>
      <li v-for="vet in vets" :key="vet.id">
        <router-link :to="`/vets/${vet.id}`">{{ vet.name }} {{ vet.surname }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.vets-view {
  padding: 1rem;
}
</style>
