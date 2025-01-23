<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Profile</h1>
                    </div>
                    <div>
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ userData.username }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Details</h6>
                    <h5>Name: {{ userData.name }}</h5>
                    <h5>Email: {{ userData.email }}</h5>
                    <h5>Role: {{ userData.roles[0] }}</h5>
                    <h5 v-if="userData.roles[0]==='ROLE_SHELTER'">Region: {{ userData.region }}</h5>
                    <h5 v-else>Surname: {{ userData.surname }}</h5>
                </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
