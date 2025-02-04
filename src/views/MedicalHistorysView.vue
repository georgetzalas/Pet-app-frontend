<template>
    <div class="medical-history-list">
      <h1>Medical Histories</h1>
      <router-link to="/medical-history/new" class="btn btn-primary">Add New Medical History</router-link>
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
            <td>{{ history.vet?.name }}</td>
            <td>{{ history.pet?.id }}</td>
            <td>{{ history.healthStatus }}</td>
            <td>
              <router-link :to="`/medical-history/${history.id}/details`" class="btn btn-info">View</router-link>
              <router-link :to="`/medical-history/${history.id}/edit`" class="btn btn-warning">Edit</router-link>
              <router-link :to="`/medical-history/${history.id}/delete`" class="btn btn-danger">Delete</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "MedicalHistorysView",
    data() {
      return {
        medicalHistories: []
      };
    },
    created() {
      axios.get("/api/medical-history")
        .then(response => {
          this.medicalHistories = response.data;
        })
        .catch(error => {
          console.error("Error fetching medical histories:", error);
        });
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