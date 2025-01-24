<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { update } from 'lodash';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const userIdRef = ref(null);
var urlRef = computed(() => {
    return backendEnvVar + '/api/users/accounts/' + userIdRef.value;
});

const selectedOption = ref('');
const userStatus = ref('');
const userType = ref('');
const dataToUpdate = ref({
    id: '',
    status: ''
});
const updateUrl = ref('');

const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const urlRefUpdateApprove = computed(() => {
    return backendEnvVar + '/api/users' + '/' + userType.value + '/' + userIdRef.value + '/approve' ;
});

const urlRefUpdateReject= computed(() => {
    return backendEnvVar + '/api/users' + '/' + userType.value + '/' + userIdRef.value + '/reject' ;
});

/*const { performRequest: performRequestDelete } = useRemoteData(
    urlRefDelete,
    ref(true),
    ref('DELETE')
);*/

const { performRequest: performUpdateApprove } = useRemoteData(urlRefUpdateApprove, authRef, ref("POST"), dataToUpdate);
const { performRequest: performUpdateReject } = useRemoteData(urlRefUpdateReject, authRef, ref("POST"), dataToUpdate);

onMounted(() => {
    userIdRef.value = route.params.id;
    performRequest();
});

const onUpdate = () => {
    dataToUpdate.value.id = data.value.id;
    

    if(data.value.roles[0].name === 'ROLE_CITIZEN')
    {
        userType.value = 'citizen';
    }
    if(data.value.roles[0].name === 'ROLE_SHELTER')
    {
        userType.value = 'shelter';
    }
    if(data.value.roles[0].name === 'ROLE_VET')
    {
        userType.value = 'vet';
    }

    if(userStatus.value === 'APPROVE')
    {
        dataToUpdate.value.status = 'APPROVED';
        performUpdateApprove()
        .then((data) => {
            router.push({ name: 'users' });
        })
        .catch((ignored) => {
            // TODO Handle.
        });

    }else if(userStatus.value === 'REJECT')
    {
        performUpdateReject()
        .then((data) => {
            router.push({ name: 'users' });
        })
        .catch((ignored) => {
            // TODO Handle.
        });

        dataToUpdate.value.status = 'REJECTED';
    }
};
const setUserStatus= () => {
    userStatus.value = selectedOption.value;
};

</script>
<template>
    <div>
        <div v-if="data">
            <div>
                <h5>User: <b>{{ data.username }}</b></h5>
                <h5>Current status: {{ data.status }}</h5>
            </div>
            
            <br>
            
            <div>
            <label for="dropdown">Choose an option:</label>
            <select id="dropdown" v-model="selectedOption" @change="setUserStatus">
                <option value="APPROVE" selected>Approve</option>
                <option value="REJECT">Reject</option>
            </select>
            </div>
            
            <br>
            
            <button class="btn btn-danger" @click="onUpdate">
                Change user status {{ userStatus }}
            </button>
        </div>
    </div>
</template>
