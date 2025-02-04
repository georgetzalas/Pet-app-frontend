<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();
const vetIdRef = ref(route.params.id);

const backendEnvVar = import.meta.env.VITE_BACKEND;
const vetUrl = computed(() => `${backendEnvVar}/api/vets/${vetIdRef.value}`);

const authRef = ref(true);
const { data: vet, performRequest } = useRemoteData(vetUrl, authRef);

onMounted(() => {
  performRequest();
});
</script>

<template>
  <div class="vet-details" v-if="vet">
    <h1>Vet Details</h1>
    <p><strong>Name:</strong> {{ vet.name }}</p>
    <p><strong>Surname:</strong> {{ vet.surname }}</p>
    <p><strong>Email:</strong> {{ vet.email }}</p>
    <router-link :to="`/vets/${vet.id}/edit`">Edit</router-link> |
    <router-link :to="`/vets/${vet.id}/delete`">Delete</router-link>
  </div>
</template>

<style scoped>
.vet-details {
  padding: 1rem;
}
</style>
