<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const petIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/pets/' + petIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    petIdRef.value = route.params.id;
    performRequest();
});
/*    
private String name;
private String type;
private String adoptionStatus;
private float age;
private byte[] picture;
private float weight;
private float height;
private String breed;
private String sex;
*/
</script>
<template>
    <div>
        <table class="table">
            <tbody v-if="data">
                <tr>
                    <th>ID</th>
                    <td>{{ data.id }}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ data.name }}</td>
                </tr>
                <tr>
                    <th>Type</th>
                    <td>{{ data.type }}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{{ data.age }}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>{{ data.weight }}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td>{{ data.height }}</td>
                </tr>
                <tr>
                    <th>Breed</th>
                    <td>{{ data.breed }}</td>
                </tr>
                <tr>
                    <th>Sex</th>
                    <td>{{ data.sex }}</td>
                </tr>
                <tr>
                    <th>Image</th>
                    <td><img :src="'data:image/png;base64,' + data.picture" alt="Uploaded Image" width="120" height="90"/></td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
