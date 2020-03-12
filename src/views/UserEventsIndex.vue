<template>
  <div class="user_events-index">

    {{user_events}}
    <h1>{{ message }}</h1>
    

    <h1>{{message2}}</h1>
    

    <!-- <div v-for="attending_event in attending_events">
      <p> {{attending_event}}</p>          
    </div> -->

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
      attending_events: []
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
