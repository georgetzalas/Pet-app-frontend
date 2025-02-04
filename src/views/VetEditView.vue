<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();
const router = useRouter();

const vetIdRef = ref(route.params.id);
const backendEnvVar = import.meta.env.VITE_BACKEND;

const vetUrl = computed(() => `${backendEnvVar}/api/vets/${vetIdRef.value}`);
const updateUrl = computed(() => `${backendEnvVar}/api/vets/update/${vetIdRef.value}`);

const authRef = ref(true);
const { data: vet, performRequest } = useRemoteData(vetUrl, authRef);
const { performRequest: performUpdate } = useRemoteData(updateUrl, authRef, ref('PUT'));

const formData = ref({
  name: '',
  surname: '',
  email: ''
});

onMounted(() => {
  performRequest().then(response => {
    formData.value = { ...response };
  });
});

const updateVet = () => {
  performUpdate(formData.value).then(() => {
    router.push(`/vets/${vetIdRef.value}`);
  }).catch(error => {
    console.error("Error updating vet:", error);
  });
};
</script>

<template>
  <div class="vet-edit">
    <h1>Edit Vet</h1>
    <form @submit.prevent="updateVet">
      <label for="name">Name:</label>
      <input v-model="formData.name" id="name" type="text" />

      <label for="surname">Surname:</label>
      <input v-model="formData.surname" id="surname" type="text" />

      <label for="email">Email:</label>
      <input v-model="formData.email" id="email" type="email" />

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<style scoped>
.vet-edit {
  padding: 1rem;
}
</style>
