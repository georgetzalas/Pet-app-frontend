<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const adoptionStatus = ref('');
const selectedOption = ref('');

const courseIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/adoption-requests/' + courseIdRef.value;
});
const authRef = ref(true);
const methodRef = ref("POST");
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const urlRefApprove = computed(() => {
    return backendEnvVar + '/api/adoption-requests/change-status-approve/' + courseIdRef.value;
});

const urlRefReject = computed(() => {
    return backendEnvVar + '/api/adoption-requests/change-status-reject/' + courseIdRef.value;
});

const { performRequest: performRequestApprove } = useRemoteData(
    urlRefApprove,
    authRef,
    methodRef
);

const { performRequest: performRequestReject } = useRemoteData(
    urlRefReject,
    authRef,
    methodRef
);


onMounted(() => {
    courseIdRef.value = route.params.id;
    performRequest();
});

const onUpdate = () => {
    if(adoptionStatus.value === "APPROVE")
    {
        performRequestApprove()
        .then((data) => {
            router.push({ name: 'adoption-requests' });
        })
        .catch((ignored) => {
            // TODO Handle.
        });
    }

    if(adoptionStatus.value === "REJECT"){
        performRequestReject()
        .then((data) => {
            router.push({ name: 'adoption-requests' });
        })
        .catch((ignored) => {
            // TODO Handle.
        });
    }
}

const setAdoptionStatus = () =>
{
    adoptionStatus.value = selectedOption.value;
}


</script>
<template>
    <div v-if="data">
        <h5>Adoption id <b>{{ data.id }}</b></h5>
        <h5>Statues <b>{{ data.status }}</b></h5>

        <label for="dropdown">Choose an option:</label>
        <select id="dropdown" v-model="selectedOption" @change="setAdoptionStatus">
            <option value="APPROVE" selected>Approve</option>
            <option value="REJECT">Reject</option>
        </select>
        
        <br>
        <br>
        
        <button class="btn btn-danger" @click="onUpdate">
            Change adoption status {{ adoptionStatus }}
        </button>
    </div>
</template>
