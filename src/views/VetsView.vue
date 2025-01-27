<template>
    <div class="vets-view">
      <h1>All Vets</h1>
      <ul>
        <li v-for="vet in vets" :key="vet.id">
          <router-link :to="`/vets/${vet.id}`">{{ vet.name }} {{ vet.surname }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "VetsView",
    data() {
      return {
        vets: [],
      };
    },
    created() {
      axios.get('/api/vets')
        .then(response => {
          this.vets = response.data;
        })
        .catch(error => {
          console.error("Error fetching vets:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  .vets-view {
    padding: 1rem;
  }
  </style>
  