<template>
  <div class="medical-history-list">
    <h1>Medical Histories</h1>
    <router-link to="/medical-history/new" class="btn btn-primary">
      Add New Medical History
    </router-link>

    <!-- Loading indicator -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Medical Histories Table -->
    <table class="table" v-if="!loading">
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
          <td>{{ history.status }}</td>
          <td>
            <router-link :to="`/medical-history/${history.id}/details`" class="btn btn-info">
              View
            </router-link>
            <router-link :to="`/medical-history/${history.id}/edit`" class="btn btn-warning">
              Edit
            </router-link>
            <button @click="deleteMedicalHistory(history.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-controls">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">
        Previous
      </button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages - 1">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "MedicalHistoriesView",
  setup() {
    const medicalHistories = ref([]);
    const API_URL = "/api/medical-history"; // Correct API URL
    const loading = ref(false);
    const currentPage = ref(0); // Current page number
    const pageSize = ref(10); // Number of records per page
    const totalPages = ref(0); // Total pages for pagination

    // Fetch medical histories
    const fetchMedicalHistories = async () => {
      loading.value = true; // Show loading indicator
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}?page=${currentPage.value}&size=${pageSize.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();  // Read the response as text first
          console.error("Error fetching data:", errorText);
          if (response.status === 403) {
            alert("You are not authorized to view this data. Please check your credentials.");
          }
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        medicalHistories.value = data.content || [];  // Assuming API response has a 'content' field
        totalPages.value = data.totalPages || 0;     // Assuming API response has a 'totalPages' field
      } catch (error) {
        console.error("Error fetching medical histories:", error.message);
        alert("An error occurred while fetching the medical histories. Please try again.");
      } finally {
        loading.value = false; // Hide loading indicator
      }
    };

    // Delete medical history
    const deleteMedicalHistory = async (id) => {
      if (!confirm("Are you sure you want to delete this record?")) return;
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();  // Read the response as text first
          console.error("Error deleting record:", errorText);
          throw new Error(`Failed to delete record: ${response.status}`);
        }
        medicalHistories.value = medicalHistories.value.filter((history) => history.id !== id);
      } catch (error) {
        console.error("Error deleting medical history:", error.message);
        alert("An error occurred while deleting the medical history. Please try again.");
      }
    };

    // Handle page change
    const goToPage = (page) => {
      if (page >= 0 && page < totalPages.value) {
        currentPage.value = page;
        fetchMedicalHistories();
      }
    };

    // Fetch data when mounted
    onMounted(fetchMedicalHistories);

    return { medicalHistories, deleteMedicalHistory, loading, goToPage, currentPage, totalPages };
  },
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

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.btn {
  margin-right: 5px;
}

.loading {
  font-size: 1.5rem;
  color: #007bff;
}

.pagination-controls {
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
}

.pagination-controls span {
  font-size: 1rem;
}
</style>
