

<template>
  <div class="events-index">
    <h1>{{ message }}</h1>
    <div v-for="event in events">
      <p> Title: {{ event.title }}</p>
      <p> About: {{ event.short_description }}</p>
      <p> Date/Time: {{ event.time_start }}</p>
    </div>

    <div v-for="category in categories">
      <p>{{category.name}}</p>
      <img v-bind:src="category.img_url" height="100" width="100">
      
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
      message: "Crafting Events List",
      events: [],
      categories: []
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log(response.data); this.events = response.data;
    });
    axios.get("/api/categories").then(response => {
      console.log(response.data); this.categories = response.data;
    });
  },

  
  methods: {}
};
</script>
