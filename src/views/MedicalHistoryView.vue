<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from "vue-router";
import { useApplicationStore } from "@/stores/application.js";

const backendEnvVar = import.meta.env.VITE_BACKEND;
const { getId } = useApplicationStore();
const router = useRouter();

// Form Data
const formDataRef = ref({
  pet: {id :0}  , // Pet ID input
  healthStatus: "GOOD", // Default status
  treatment: "",
  vetNotes: "",
  vet: {id: getId()}, // Automatically set vet ID
  date: new Date().toISOString().split("T")[0], // Today's date
});

// API Info
const urlRef = ref(`${backendEnvVar}/api/medical-history`);
const authRef = ref(true);
const methodRef = ref("POST");

// Request Handler
const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

// Submit Form
const onSubmit = async () => {
  try {
    await performRequest(); // Send request
    router.push({ name: "medical-histories" }); // Redirect to list page
  } catch (error) {
    console.error("Error adding medical history:", error);
  }
};
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">New Medical History</h1>
          </div>
          <div>
            <!-- Pet ID Input -->
            <div class="mb-2">
              <label for="petId">Pet ID</label>
              <input
                class="form-control"
                id="petId"
                v-model="formDataRef.pet.id"
                type="text"
                placeholder="Enter the Pet ID"
              />
            </div>

            <!-- Status Dropdown -->
            <div class="mb-2">
              <label for="healthStatus">Health Status</label>
              <select class="form-control" id="healthStatus" v-model="formDataRef.healthStatus">
                <option value="GOOD">GOOD</option>
                <option value="OK">OK</option>
                <option value="BAD">BAD</option>
              </select>
            </div>

            <!-- Treatment Input -->
            <div class="mb-2">
              <label for="treatment">Treatment</label>
              <textarea
                class="form-control"
                id="treatment"
                v-model="formDataRef.treatment"
                placeholder="Enter the treatment details"
                rows="3"
              ></textarea>
            </div>

            <!-- Vet Notes -->
            <div class="mb-2">
              <label for="vetNotes">Vet Notes</label>
              <textarea
                class="form-control"
                id="vetNotes"
                v-model="formDataRef.vetNotes"
                placeholder="Additional notes from the vet"
                rows="3"
              ></textarea>
            </div>

            <!-- Date Input -->
            <div class="mb-2">
              <label for="date">Date</label>
              <input class="form-control" id="date" v-model="formDataRef.date" type="date" />
            </div>

            <!-- Submit Button -->
            <div class="">
              <button class="btn btn-primary" @click="onSubmit" type="button">
                Add Medical History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
