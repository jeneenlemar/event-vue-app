<template>
  <div class="user_events-index">
    <h1>{{ message }}</h1>
    <div v-for="event in events">
      <p> Title: {{ event.title }}</p>
      <p> About: {{ event.short_description }}</p>
      <p> Date/Time: {{ event.time_start }}</p>
      <router-link :to="`/events/${event.id}`">Details</router-link> <br>
      <!-- ACTIVATE line 11 when edit is created!!!!! -->
      <!-- <router-link :to="`/events/${event.id}/edit`">Edit</router-link> -->
    </div>

    <div v-for="category in categories">
      <p>{{category.name}}</p>
      <img v-bind:src="category.img_url" height="100" width="100">
      <router-link :to="`/categories/${category.id}`">Go To Events For This Category</router-link> 
      
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Parties I'm Hosting",
      message2: "Parties I'm Attending",
      user_events: [],
    };
  },
  created: function() {
    axios.get("/api/user_events").then(response => {
      console.log(response.data); this.user_events = response.data;
    });
  },

  
  methods: {}
};
</script>
