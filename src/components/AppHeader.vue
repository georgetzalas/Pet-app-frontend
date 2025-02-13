<script setup>
import { RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const applicationStore = useApplicationStore();
</script>

<template>
    <header class="text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-center py-2 px-3">
                <a
                    href="/"
                    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <span class="fs-5 fw-bolder text-white">Pet App</span>
                </a>
                <ul class="nav nav-pills">
                    <!-- @EXERCISE: Add different color to active link (improve UX/UX). -->
                    <!-- @EXERCISE: Add different color to active link with nested routes (improve UX/UX). -->
                    <!-- @EXERCISE: Hide links that users has no access to. -->
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'home' }" class="nav-link text-white"
                            >Home</router-link
                        >
                    </li>
                    <!-- TODO enable.
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'students' }" class="nav-link text-white"
                            >Students</router-link
                        >
                    </li>
                    -->
                    <!--<li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'courses' }" class="nav-link text-white"
                            >Courses</router-link
                        >
                    </li>-->
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles[0] === 'ROLE_SHELTER'">
                        <router-link :to="{ name: 'shelter-email' }" class="nav-link text-white">Send email</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles[0] === 'ROLE_SHELTER'">
                        <router-link :to="{ name: 'pet-create' }" class="nav-link text-white">Add pet</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles[0] === 'ROLE_CITIZEN'">
                        <router-link :to="{ name: 'adoption-request-create' }" class="nav-link text-white">Make an adoption</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (applicationStore.userData.roles[0] === 'ROLE_ADMIN' || applicationStore.userData.roles[0] === 'ROLE_SHELTER')">
                        <router-link :to="{ name: 'adoption-requests' }" class="nav-link text-white">Adoptions</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && (applicationStore.userData.roles[0] === 'ROLE_ADMIN' || applicationStore.userData.roles[0] === 'ROLE_SHELTER' || applicationStore.userData.roles[0] === 'ROLE_CITIZEN' || applicationStore.userData.roles[0] === 'ROLE_VET')">
                        <router-link :to="{ name: 'pets' }" class="nav-link text-white">Pets</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles[0] === 'ROLE_ADMIN'">
                        <router-link :to="{ name: 'users' }" class="nav-link text-white">Users</router-link>
                    </li>

                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'profile' }" class="nav-link text-white"
                            >Profile
                            <span style="font-size: 10px"
                                >({{ applicationStore.userData?.username }})</span
                            ></router-link
                        >
                    </li>
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true && applicationStore.userData.roles[0] === 'ROLE_VET'">
                        <router-link :to="{ name: 'medical-histories' }" class="nav-link text-white">Medical History</router-link>
                    </li>
                    
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
                        <router-link :to="{ name: 'login' }" class="nav-link text-white">Login</router-link>
                    </li>
            
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
                        <router-link :to="{ name: 'signup' }" class="nav-link text-white">Sign up</router-link>
                    </li>
            
                    <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
                        <router-link :to="{ name: 'logout' }" class="nav-link text-white">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
