<template>
    <div class="vet-edit">
      <h1>Edit Vet</h1>
      <form @submit.prevent="updateVet">
        <label for="name">Name:</label>
        <input v-model="vet.name" id="name" type="text" />
  
        <label for="surname">Surname:</label>
        <input v-model="vet.surname" id="surname" type="text" />
  
        <label for="email">Email:</label>
        <input v-model="vet.email" id="email" type="email" />
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "VetEditView",
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
          console.error("Error fetching vet for editing:", error);
        });
    },
    methods: {
      updateVet() {
        const vetId = this.$route.params.id;
        axios.put(`/api/vets/update-vet/${vetId}`, this.vet)
          .then(() => {
            alert("Vet updated successfully!");
            this.$router.push(`/vets/${vetId}`);
          })
          .catch(error => {
            console.error("Error updating vet:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .vet-edit {
    padding: 1rem;
  }
  </style>
  