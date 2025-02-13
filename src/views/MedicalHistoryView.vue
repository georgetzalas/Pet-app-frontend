<script setup>
import { ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const medicalIdRef = ref(null);

onMounted(() => {
    medicalIdRef.value = route.params.id;
});

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'medical-histories' }"
                            >Back to Medical Histories</RouterLink
                        >
                        <h1 class="fs-3">Medical #{{ medicalIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'medical-history-details', params: { id: medicalIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'medical-history-delete', params: { id: medicalIdRef } }"
                                    >Delete</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'medical-history-edit', params: { id: medicalIdRef } }"
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