<template>
  <div class="events-show">

    <h1>{{ message }}</h1>

    <div v-if="event">
      {{event}}
      <h2>Title: {{ event.title }}</h2>
      <img v-bind:src="event.img_url" height="100" width="100">
      <p>Hosted by: {{ event.host.first_name }}</p>
      
      <p>Short Description: {{ event.short_description }}</p>
      <p>Date & Time: {{ event.time_start }}</p>
      <p>Price: {{ event.kit_price }}</p>
      <p>Details: {{ event.details }}</p>
      <p>Location: {{ event.location_description }}</p>
      <p>Address: {{ event.address }}</p>
      <p>hostid: {{event.host.id}}</p>

      {{event.attendees}}
      <h2>Attendee List</h2>
      <div v-for="attendee in event.attendees">
        {{attendee.first_name}} 
        {{attendee.last_name}} 
        <img v-bind:src="attendee.profile_img" height="100" width="100">
      </div>
      
      <p>Slots Remaining: {{ event.slots - event.attendees.length }}</p>
      
      
      <button v-if="!event.attending && (event.host.id != $parent.getUserId())" v-on:click="createUserEvent()">Join this Party</button>
      <button v-if="event.attending && (event.host.id != $parent.getUserId())" v-on:click="destroyReservation">Cancel this reservation</button>
      
      
      
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
      event: null,
      attendee: {}
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
          this.event.attending = true;
          this.event.attendees.push(response.data.attendee);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyReservation: function() {
      if (confirm("Are you sure you want to cancel this reservation?")) {
        axios.delete(`api/user_events/${this.event.id}`).then(response => {
          console.log("This reservation has been cancelled", response.data);
          this.event.attending = false;
          var index = this.event.attendees.findIndex(user => user.id == this.$parent.getUserId());
          console.log(index);
          this.event.attendees.splice(index, 1);
        });

      }

    }
  }
    
};
</script>