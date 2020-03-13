<template>
  <div class="users-show">
    <h1>{{ message }}</h1>
    <div>
      <p>{{user}}</p>
      <!-- <h2>Title: {{ event.title }}</h2>
      <p>Hosted by: {{ event.host.first_name }}</p>
      
      <p>Short Description: {{ event.short_description }}</p>
      <p>Date & Time: {{ event.time_start }}</p>
      <p>Price: {{ event.kit_price }}</p>
      <p>Details: {{ event.details }}</p>
      <p>Location: {{ event.location_description }}</p>
      <p>Address: {{ event.address }}</p>
      <button v-on:click="createUserEvent()">Join this Party</button> -->
      <!-- fix this item and calculation!
      <p>Slots Remaining: {{ event.slots - event.user_events.count }}</p> -->
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