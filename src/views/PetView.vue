<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;
const { getEmail } = useApplicationStore();

const route = useRoute();

const petIdRef = ref(null);
const authRef = ref(true);

const urlRef = computed(() => {
    return backendEnvVar + '/api/pets/' + petIdRef.value;
});

const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    console.log(getEmail())
    petIdRef.value = route.params.id;
    performRequest();
});




const sendEmail = () => {
    const email = computed(() => { return backendEnvVar + '/api/email/send-request/' + data.value.shelter.id + '/' + getEmail() });
    const { performRequest: sendEmailRequest} = useRemoteData(
        email,
        ref(true),
        ref('POST')
    );
 
    sendEmailRequest()
        .then((data) => {
            //router.push({ name: 'adoption-requests' });
            console.log(data)
        })
        .catch((ignored) => {
            console.log(ignored)
            // TODO Handle.
        });
};

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: 'pets' }"
                            >Back to pets</RouterLink
                        >
                        <h1 class="fs-3">Pet #{{ petIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-details', params: { id: petIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-delete', params: { id: petIdRef } }"
                                    >Delete</RouterLink
                                >
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'pet-edit', params: { id: petIdRef } }"
                                    >Edit</RouterLink
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="button-container" v-if="data">
                        <button class="btn btn-danger" @click="sendEmail">
                            Send Email
                        </button>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-container {
    position: fixed; 
    bottom: 20px;
    right: 20px;
    z-index: 1000; 
}
</style>
