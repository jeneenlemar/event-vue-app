<template>
  <div class="categories-show">

    <h1>{{ message }}</h1>
    <div v-for="event in events">
      <p> Title: {{ event.title }}</p>
      <p> About: {{ event.short_description }}</p>
      <p> Date/Time: {{ event.time_start }}</p>
      <router-link :to="`/events/${event.id}`">Details</router-link> <br>
      <!-- ACTIVATE line 11 when edit is created!!!!! -->
      <!-- <router-link :to="`/events/${event.id}/edit`">Edit</router-link> -->
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
      message: "Crafting Events List By Category",
      events: []
    };
  },
  created: function() {
    axios.get(`/api/categories/${this.$route.params.id}`).then(response => {
      console.log(response.data); this.events = response.data;
    });
  },

  
  methods: {}
};
</script>