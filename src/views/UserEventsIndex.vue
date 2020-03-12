<template>
  <div class="user_events-index">
    <div>
      <h1>{{ message }}</h1>
      {{user_events.hosting_events}}
      <div v-for="hosting_event in user_events.hosting_events">
        <p><b>{{hosting_event.title}}</b></p>     
      </div>
    </div>

    <div>
      <h1>{{message2}}</h1>
      <p>{{user_events.attending_events}}</p>
      <div v-for="attending_event in user_events.attending_events">
        <p><b>{{attending_event.event.title}}</b></p>     
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
      user_events: {},
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
