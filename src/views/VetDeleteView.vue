<template>
    <div class="vet-delete">
      <h1>Delete Vet</h1>
      <p>Are you sure you want to delete {{ vet.name }} {{ vet.surname }}?</p>
      <button @click="deleteVet">Yes, Delete</button>
      <router-link to="/vets">Cancel</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "VetDeleteView",
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
          console.error("Error fetching vet for deletion:", error);
        });
    },
    methods: {
      deleteVet() {
        const vetId = this.$route.params.id;
        axios.delete(`/api/vets/${vetId}`)
          .then(() => {
            alert("Vet deleted successfully!");
            this.$router.push("/vets");
          })
          .catch(error => {
            console.error("Error deleting vet:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .vet-delete {
    padding: 1rem;
  }
  </style>
  