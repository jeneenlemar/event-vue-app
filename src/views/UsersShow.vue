<template>
  <div class="users-show">
    <h1>{{ message }}</h1>
    <div>
      <p>{{user}}</p>
      <h2>{{ user.first_name }} {{user.last_name}}</h2>
      <p>Email: {{ user.email }}</p>      
      <p>Address: {{ user.address }}</p>
      <p>profile_img: {{ user.profile_img }}</p>
      
      <p></p>
      <router-link :to="`/users/${user.id}/edit`">Edit User</router-link>
      
      <br>
    </div>
   
  </div>
</template>

<style>
 img {
  width: 250px;
 }
</style>

<script>

import axios from 'axios';
export default {
  data: function() {
    return {
      message: "User Profile",
      user: {}
      
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {}
    
};
</script>