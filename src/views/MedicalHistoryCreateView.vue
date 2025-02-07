<template>
    <div class="medical-history-create">
      <h1>Create Medical History</h1>
  
      <form @submit.prevent="createMedicalHistory">
        <div class="form-group">
          <label for="pet">Select Pet</label>
          <select v-model="medicalHistory.petId" required class="form-control">
            <option value="" disabled>Select a Pet</option>
            <option v-for="pet in pets" :key="pet.id" :value="pet.id">
              {{ pet.name }} (ID: {{ pet.id }})
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="healthStatus">Health Status</label>
          <textarea v-model="medicalHistory.healthStatus" required class="form-control" placeholder="Enter health status"></textarea>
        </div>
  
        <button type="submit" class="btn btn-success">Create</button>
        <router-link to="/medical-history" class="btn btn-secondary">Cancel</router-link>
      </form>
  
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    name: "MedicalHistoryCreateView",
    setup() {
      const medicalHistory = ref({
        petId: "",
        healthStatus: "",
      });
  
      const pets = ref([]);
      const message = ref("");
      const router = useRouter();
  
      // Fetch pets from the backend
      const fetchPets = async () => {
        try {
          const response = await fetch("/api/pets");
          if (!response.ok) throw new Error("Failed to fetch pets");
          pets.value = await response.json();
        } catch (error) {
          console.error("Error fetching pets:", error);
        }
      };
  
      // Submit medical history
      const createMedicalHistory = async () => {
        try {
          const response = await fetch(`/api/medical-history/${medicalHistory.value.petId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              healthStatus: medicalHistory.value.healthStatus,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to create medical history");
          }
  
          message.value = "Medical history created successfully!";
          setTimeout(() => router.push("/medical-history"), 1500);
        } catch (error) {
          console.error("Error creating medical history:", error);
          message.value = "Failed to create medical history.";
        }
      };
  
      onMounted(fetchPets);
  
      return {
        medicalHistory,
        pets,
        message,
        createMedicalHistory,
      };
    },
  };
  </script>
  
  <style scoped>
  .medical-history-create {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-control {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  .btn {
    margin-top: 10px;
    margin-right: 10px;
  }
  .message {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  