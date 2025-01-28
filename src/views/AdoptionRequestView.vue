<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const { getRole } = useApplicationStore();
const backendEnvVar = import.meta.env.VITE_BACKEND;

const route = useRoute();

const adoptionIdRef = ref(null);
const userRole = ref(null);

onMounted(() => {
    adoptionIdRef.value = route.params.id;
    userRole.value = getRole();
});

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'adoption-requests' }"
                            >Back to Adoptions</RouterLink
                        >
                        <h1 class="fs-3">Adoption #{{ adoptionIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'adoption-request-details', params: { id: adoptionIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <li v-if="userRole === 'ROLE_ADMIN'" class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'adoption-request-delete', params: { id: adoptionIdRef } }"
                                    >Delete</RouterLink
                                >
                            </li>
                            <li v-if="userRole === 'ROLE_SHELTER'" class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'adoption-request-edit', params: { id: adoptionIdRef } }"
                                    >Edit</RouterLink
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>