<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useRouter } from 'vue-router';

const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();

const citizenData = ref({email:''});

onMounted(() => {
});

const sendEmail = () => {
    const email = computed(() => { return backendEnvVar + '/api/email/send-program/' + citizenData.value.email});
    const { performRequest: sendEmailRequest} = useRemoteData(
        email,
        ref(true),
        ref('POST')
    );
 
    sendEmailRequest()
        .then((data) => {
            router.push({ name: 'shelter-email' });
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
                        <h1 class="fs-3">Send Email</h1>
                    </div>
                    <input
                        class="form-control"
                        id="email"
                        v-model="citizenData.email"
                        type="text"
                    />

                    <div class="button-container">
                        <button class="btn btn-danger" @click="sendEmail">
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
