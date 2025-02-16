<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const { getRole } = useApplicationStore();

const approveStatus = ref('');
const selectedOption = ref('');

const petIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/pets/' + petIdRef.value;
});
const authRef = ref(true);
const methodRef = ref("PUT");
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const urlRefAdminApprove = computed(() => {
    return backendEnvVar + '/api/pets/approve-pet-admin/' + petIdRef.value;
});

const urlRefAdminReject = computed(() => {
    return backendEnvVar + '/api/pets/reject-pet-admin/' + petIdRef.value;
});

const urlRefVetApprove = computed(() => {
    return backendEnvVar + '/api/pets/approve-pet-vet/' + petIdRef.value;
});

const urlRefVetReject = computed(() => {
    return backendEnvVar + '/api/pets/reject-pet-vet/' + petIdRef.value;
});


const { performRequest: performRequestAdminApprove } = useRemoteData(
    urlRefAdminApprove,
    authRef,
    methodRef
);

const { performRequest: performRequestAdminReject } = useRemoteData(
    urlRefAdminReject,
    authRef,
    methodRef
);

const { performRequest: performRequestVetApprove } = useRemoteData(
    urlRefVetApprove,
    authRef,
    methodRef
);

const { performRequest: performRequestVetReject } = useRemoteData(
    urlRefVetReject,
    authRef,
    methodRef
);

onMounted(() => {
    petIdRef.value = route.params.id;
    performRequest();
});

const onUpdate = () => {
    let role = getRole();

    if(role === 'ROLE_ADMIN')
    {
        if(approveStatus.value === "APPROVE")
        {
            performRequestAdminApprove()
            .then((data) => {
                router.push({ name: 'pets' });
            })
            .catch((ignored) => {
                // TODO Handle.
            });
        }

        if(approveStatus.value === "REJECT"){
            performRequestAdminReject()
            .then((data) => {
                router.push({ name: 'pets' });
            })
            .catch((ignored) => {
                // TODO Handle.
            });
        }
    }
    if(role === 'ROLE_VET')
    {
        if(approveStatus.value === "APPROVE")
        {
            performRequestVetApprove()
            .then((data) => {
                router.push({ name: 'pets' });
            })
            .catch((ignored) => {
                // TODO Handle.
            });
        }

        if(approveStatus.value === "REJECT"){
            performRequestVetReject()
            .then((data) => {
                router.push({ name: 'pets' });
            })
            .catch((ignored) => {
                // TODO Handle.
            });
        }
    }
}

const setApprovalStatus = () =>
{
    approveStatus.value = selectedOption.value;
}


</script>
<template>
    <div v-if="data">
        <h5>Pet ID <b>{{ data.id }}</b></h5>
        <h5>Change approve status <b>{{ data.status }}</b></h5>

        <label for="dropdown">Choose an option:</label>
        <select id="dropdown" v-model="selectedOption" @change="setApprovalStatus">
            <option value="APPROVE" selected>Approve</option>
            <option value="REJECT">Reject</option>
        </select>
        
        <br>
        <br>
        
        <button class="btn btn-danger" @click="onUpdate">
            Change approve status {{ approveStatus }}
        </button>
    </div>
</template>
