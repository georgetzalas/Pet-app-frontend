<template>
  <div class="medical-history-list">
    <h1>Medical Histories</h1>
    <router-link to="/medical-history/new" class="btn btn-primary">
      Add New Medical History
    </router-link>
    
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vet</th>
          <th>Pet</th>
          <th>Health Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in medicalHistories" :key="history.id">
          <td>{{ history.id }}</td>
          <td>{{ history.vet?.name ?? "Unknown Vet" }}</td>
          <td>{{ history.pet?.name ?? "Unknown Pet" }}</td>
          <td>{{ history.healthStatus }}</td>
          <td>
            <router-link :to="`/medical-history/${history.id}/details`" class="btn btn-info">View</router-link>
            <router-link :to="`/medical-history/${history.id}/edit`" class="btn btn-warning">Edit</router-link>
            <button @click="deleteMedicalHistory(history.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "MedicalHistorysView",
  setup() {
    const medicalHistories = ref([]);
    const API_URL = "/api/medical-history";

    // Fetch medical histories
    const fetchMedicalHistories = async () => {
      try {
        const token = localStorage.getItem("token"); // Αν έχεις authentication
        const response = await fetch(API_URL, {
          headers: {
            "Authorization": `Bearer ${token}`, // Πρόσθεσε το αν χρειάζεται authentication
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
        medicalHistories.value = await response.json();
      } catch (error) {
        console.error("Error fetching medical histories:", error);
      }
    };

    // Delete medical history
    const deleteMedicalHistory = async (id) => {
      if (!confirm("Are you sure you want to delete this record?")) return;
      try {
        const token = localStorage.getItem("token"); // Αν έχεις authentication
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Αν χρειάζεται
          },
        });
        if (!response.ok) throw new Error("Failed to delete record");
        medicalHistories.value = medicalHistories.value.filter((history) => history.id !== id);
      } catch (error) {
        console.error("Error deleting medical history:", error);
      }
    };

    onMounted(fetchMedicalHistories);

    return { medicalHistories, deleteMedicalHistory };
  }
};
</script>

<style scoped>
.medical-history-list {
  padding: 1rem;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.btn {
  margin-right: 5px;
}
</style>
