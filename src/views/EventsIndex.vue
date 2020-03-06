

<template>
  <div class="events-index">
    <h1>{{ message }}</h1>
    <div v-for="event in events">
      <p> Title: {{ event.title }}</p>
      <p> About: {{ event.short_description }}</p>
      <p> Date/Time: {{ event.time_start }}</p>
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
      events: []
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log(response.data);
      this.events = response.data;
    });
  },
  methods: {}
};
</script>
