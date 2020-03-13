<template>
  <div class="user_events-index">
    <div>
      <h1>{{ message }}</h1>
      {{userEvents.hosting_events}}
      <div v-for="hostingEvent in userEvents.hosting_events">
        <p><b>{{hostingEvent.title}}</b></p>
        <p>{{hostingEvent.id}}</p> 
        <p>{{hostingEvent.short_description}}</p>    
        <p>{{hostingEvent.time_start}}</p>
        <button v-on:click="destroyEvent(hostingEvent)">Cancel This Event</button> 
        <div>
          <button v-on:click="showEventDetails()">Details</button> 
        </div>          
      </div>
    </div>
    <div>
      <h1>{{message2}}</h1>
      <p>{{userEvents.attending_events}}</p>
      <div v-for="attendingEvent in userEvents.attending_events">
        <p><b>{{attendingEvent.event.title}}</b></p> 
        <p>{{attendingEvent.event.id}}</p> 
        <p>{{attendingEvent.event.short_description}}</p> 
        <p>{{attendingEvent.event.time_start}}</p> 
        <button v-on:click="destroyUserEvent(attendingEvent)">Cancel This Party Reservation</button>
        <div>
          <button v-on:click="showEventDetails()">Details</button> 
        </div>    
      </div>
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
      userEvents: {},
    };
  },
  created: function() {
    axios.get("/api/user_events").then(response => {
      console.log(response.data); this.userEvents = response.data;
    });
  },

  
  methods: {
    destroyEvent: function(hostingEvent) {
      confirm("Are you sure you want to cancel this event?");
      axios.delete(`api/events/${hostingEvent.id}`).then(response => {
        console.log("Cancellation Successful", response.data);
        var index = this.userEvents.hosting_events.indexOf(hostingEvent);
        this.userEvents.hosting_events.splice(index, 1);
      });
    },
    destroyUserEvent: function(attendingEvent) {
      confirm("Are you sure you want to cancel this event?");
      axios.delete(`api/user_events/${attendingEvent.id}`).then(response => {
        console.log("Reservation Cancellation Successful", response.data);
        var index = this.userEvents.attending_events.indexOf(attendingEvent);
        this.userEvents.attending_events.splice(index, 1);
      });
    },
  }
};
</script>
