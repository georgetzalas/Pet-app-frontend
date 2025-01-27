<template>
    <div class="vet-details">
      <h1>Vet Details</h1>
      <p><strong>Name:</strong> {{ vet.name }}</p>
      <p><strong>Surname:</strong> {{ vet.surname }}</p>
      <p><strong>Email:</strong> {{ vet.email }}</p>
      <router-link :to="`/vets/edit/${vet.id}`">Edit</router-link> |
      <router-link :to="`/vets/delete/${vet.id}`">Delete</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "VetDetailsView",
    data() {
      return {
        vet: {},
      };
    },
    created() {
      const vetId = this.$route.params.id;
      axios.get(`/api/vets/${vetId}`)
        .then(response => {
          this.vet = response.data;
        })
        .catch(error => {
          console.error("Error fetching vet details:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  .vet-details {
    padding: 1rem;
  }
  </style>
  