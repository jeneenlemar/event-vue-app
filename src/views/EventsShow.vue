<template>
  <div class="events-show">

    <h1>{{ message }}</h1>

    <div v-if="event">
      {{event}}
      <h2>Title: {{ event.title }}</h2>
      <p>Hosted by: {{ event.host.first_name }}</p>
      
      <p>Short Description: {{ event.short_description }}</p>
      <p>Date & Time: {{ event.time_start }}</p>
      <p>Price: {{ event.kit_price }}</p>
      <p>Details: {{ event.details }}</p>
      <p>Location: {{ event.location_description }}</p>
      <p>Address: {{ event.address }}</p>
      <p>hostid: {{event.host.user_id}}</p>
      <button v-if="event.host.user_id != $parent.getUserId()" v-on:click="createUserEvent()">Join this Party</button>
      
      <!-- <p>Slots Remaining: {{ event.slots - event.user_events }}</p> -->
      <br>
      <router-link v-if="event.host.user_id == $parent.getUserId()" :to="`/events/${event.id}/edit`">Edit</router-link>
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
      message: "Party Details",
      event: null
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
    });
  },
  methods: {
    createUserEvent: function() {
      var params = {
        event_id: this.event.id
      };
      axios
        .post("/api/user_events", params)
        .then(response => {
          console.log("Party Reservation Accepted", response.data);
          this.$router.push("/user_events");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
    
};
</script>