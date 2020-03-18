

<template>
  <div class="events-index">
    <h1>{{ message }}</h1>
    <div>
      Search: <input type="text" v-model="keywordFilter">  
    </div>

    
    <div v-for="event in filterBy(orderBy(events, 'time_start', 1), keywordFilter)">
      <p> Title: {{ event.title }}</p>
      <p> About: {{ event.short_description }}</p>
      <p> Date/Time: {{ event.time_start }}</p>
      <img v-bind:src="event.img_url" height="100" width="100"><br>
      <!-- <p> Slots Remaining: {{ event.slots - event.user_events.count }}</p> -->
      <router-link :to="`/events/${event.id}`">Details</router-link> <br>
      <!-- ACTIVATE line 11 when edit is created!!!!! -->
      
    </div>

<h1>Categories</h1>
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
import Vue2Filters from 'vue2-filters';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Upcoming Parties",
      events: [],
      categories: [],
      keywordFilter: ""
      
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
