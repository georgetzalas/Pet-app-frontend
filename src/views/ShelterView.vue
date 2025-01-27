<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const shelterIdRef = ref(null);

onMounted(() => {
    shelterIdRef.value = route.params.id;
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'shelters' }"
                            >Back to Shelters</RouterLink
                        >
                        <h1 class="fs-3">Shelter #{{ shelterIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'shelter-details', params: { id: shelterIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'shelter-edit', params: { id: shelterIdRef } }"
                                    >Edit</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'shelter-delete', params: { id: shelterIdRef } }"
                                    >Delete</RouterLink
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
