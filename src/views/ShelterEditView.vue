<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const shelterIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/shelters/' + shelterIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const urlRefUpdate = computed(() => {
    return backendEnvVar + '/api/shelters/update/' + shelterIdRef.value;
});
const { performRequest: performRequestUpdate } = useRemoteData(
    urlRefUpdate,
    ref(true),
    ref('PUT')
);

const formData = ref({
    name: '',
    username: '',
    email: '',
    region: ''
});

onMounted(() => {
    shelterIdRef.value = route.params.id;
    performRequest().then((response) => {
        formData.value = { ...response };
    });
});

const onUpdate = () => {
    performRequestUpdate(formData.value)
        .then(() => {
            router.push({ name: 'shelters' });
        })
        .catch((ignored) => {
            // TODO Handle.
        });
};
</script>

<template>
    <div>
        <div v-if="data">
            <form @submit.prevent="onUpdate">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="formData.name" type="text" id="name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input v-model="formData.username" type="text" id="username" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="formData.email" type="email" id="email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="region" class="form-label">Region</label>
                    <input v-model="formData.region" type="text" id="region" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Update Shelter</button>
            </form>
        </div>
    </div>
</template>